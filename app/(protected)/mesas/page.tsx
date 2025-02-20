'use client';

import { useState, useRef, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Table {
	id: number;
	number: number;
	x: number;
	y: number;
}

const MAP_HEIGHT = 650;
const TABLE_SIZE = 80;
const SNAP_DISTANCE = 85;

const DraggableTable = ({ table }: { table: Table }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: table.id });

	return (
		<article
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={{
				transform: `translate(${table.x + (transform?.x || 0)}px, ${table.y + (transform?.y || 0)}px)`,
				position: 'absolute',
				cursor: 'grab',
				width: `${TABLE_SIZE}px`,
				height: `${TABLE_SIZE}px`,
			}}
			className="bg-white flex items-center justify-center shadow-lg border rounded-lg"
		>
			<span className="flex items-center justify-center text-xl font-bold">{table.number}</span>
		</article>
	);
};

const TableMap = () => {
	const [tables, setTables] = useState<Table[]>([{ id: 1, number: 1, x: 0, y: 0 }]);
	const [tableNumber, setTableNumber] = useState('');
	const mapRef = useRef<HTMLDivElement | null>(null);
	const [mapWidth, setMapWidth] = useState(0);

	const updateMapWidth = () => {
		if (mapRef.current) {
			setMapWidth(mapRef.current.offsetWidth);
		}
	};

	useEffect(() => {
		updateMapWidth();
		window.addEventListener('resize', updateMapWidth);
		return () => window.removeEventListener('resize', updateMapWidth);
	}, []);

	const { setNodeRef } = useDroppable({ id: 'map-area' });

	const addTable = () => {
		if (tableNumber.trim() === '') return;
		const number = parseInt(tableNumber, 10);
		if (isNaN(number)) return;

		const newTable: Table = {
			id: Date.now(),
			number,
			x: (mapWidth - TABLE_SIZE) / 2,
			y: (MAP_HEIGHT - TABLE_SIZE) / 2,
		};
		setTables((prev) => [...prev, newTable]);
		setTableNumber('');
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, delta } = event;

		setTables((prev) =>
			prev.map((table) => {
				if (table.id === active.id) {
					// Initial position calculation
					let newX = Math.max(0, Math.min(mapWidth - TABLE_SIZE, table.x + delta.x));
					let newY = Math.max(0, Math.min(MAP_HEIGHT - TABLE_SIZE, table.y + delta.y));

					// Find closest table
					const result = prev.reduce<{ table: Table | null; minDistance: number }>(
						(closest, otherTable) => {
							if (otherTable.id === table.id) return closest;

							const distanceX = Math.abs(newX - otherTable.x);
							const distanceY = Math.abs(newY - otherTable.y);
							const totalDistance = distanceX + distanceY;

							if (totalDistance < closest.minDistance) {
								return {
									table: otherTable,
									minDistance: totalDistance,
								};
							}
							return closest;
						},
						{ table: null, minDistance: SNAP_DISTANCE },
					);

					const closestTable = result.table;

					// Apply snapping if we found a close table
					if (closestTable) {
						const diffX = Math.abs(newX - closestTable.x);
						const diffY = Math.abs(newY - closestTable.y);

						// Snap horizontally
						if (diffX < SNAP_DISTANCE && diffX > diffY) {
							newX = closestTable.x + (newX > closestTable.x ? SNAP_DISTANCE : -SNAP_DISTANCE);
							newY = closestTable.y;
						}
						// Snap vertically
						else if (diffY < SNAP_DISTANCE && diffY > diffX) {
							newY = closestTable.y + (newY > closestTable.y ? SNAP_DISTANCE : -SNAP_DISTANCE);
							newX = closestTable.x;
						}
						// Snap diagonally
						else if (diffX < SNAP_DISTANCE && diffY < SNAP_DISTANCE) {
							const virtualX = closestTable.x + (newX > closestTable.x ? SNAP_DISTANCE : -SNAP_DISTANCE);
							const virtualY = closestTable.y + (newY > closestTable.y ? SNAP_DISTANCE : -SNAP_DISTANCE);

							// Ensure we stay within bounds
							newX = Math.max(0, Math.min(mapWidth - TABLE_SIZE, virtualX));
							newY = Math.max(0, Math.min(MAP_HEIGHT - TABLE_SIZE, virtualY));
						}
					}

					return { ...table, x: newX, y: newY };
				}
				return table;
			}),
		);
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<section className="flex flex-col items-center justify-center max-w-1800">
				<Card className="w-full px-6 py-8 shadow-lg">
					<h1 className="text-2xl font-bold mb-4">Mapa de Mesas</h1>
					<div className="flex gap-2 mb-4">
						<Input
							placeholder="Número de mesa"
							value={tableNumber}
							type="text"
							className="form-input-text"
							onChange={(e) => setTableNumber(e.target.value)}
						/>
						<Button onClick={addTable}>Agregar Mesa</Button>
					</div>

					<div
						ref={(node) => {
							setNodeRef(node);
							mapRef.current = node;
						}}
						className="relative w-full h-[650px] bg-gray-200 border rounded-lg overflow-hidden"
					>
						{tables.map((table) => (
							<DraggableTable key={table.id} table={table} />
						))}
					</div>
				</Card>
			</section>
		</DndContext>
	);
};

export default TableMap;
