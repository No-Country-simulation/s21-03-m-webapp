'use client';

import { useState, useRef, useEffect } from 'react';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCard } from './';
import { Salon, Table } from '@/types/mesas';

const MAP_HEIGHT = 650;
const TABLE_SIZE = 80;
const SNAP_DISTANCE = 85;

const TableMap = ({ salon }: { salon: Salon }) => {
	const [tables, setTables] = useState<Table[]>([{ _id: 1, number: 1, x: 0, y: 0, status: 'Free' }]);
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
			_id: Date.now(),
			number,
			x: (mapWidth - TABLE_SIZE) / 2,
			y: (MAP_HEIGHT - TABLE_SIZE) / 2,
			status: 'Free',
		};
		setTables((prev) => [...prev, newTable]);
		setTableNumber('');
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, delta } = event;

		setTables((prev) =>
			prev.map((table) => {
				if (table._id === active.id) {
					const originalX = table.x;
					const originalY = table.y;

					let newX = Math.max(0, Math.min(mapWidth - TABLE_SIZE, table.x + delta.x));
					let newY = Math.max(0, Math.min(MAP_HEIGHT - TABLE_SIZE, table.y + delta.y));

					const result = prev.reduce<{ table: Table | null; minDistance: number }>(
						(closest, otherTable) => {
							if (otherTable._id === table._id) return closest;

							const distanceX = Math.abs(newX - otherTable.x);
							const distanceY = Math.abs(newY - otherTable.y);
							const totalDistance = distanceX + distanceY;

							if (totalDistance < closest.minDistance) {
								return { table: otherTable, minDistance: totalDistance };
							}
							return closest;
						},
						{ table: null, minDistance: SNAP_DISTANCE },
					);

					const closestTable = result.table;

					if (closestTable) {
						const diffX = Math.abs(newX - closestTable.x);
						const diffY = Math.abs(newY - closestTable.y);

						if (diffX < SNAP_DISTANCE && diffX > diffY) {
							newX = closestTable.x + (newX > closestTable.x ? SNAP_DISTANCE : -SNAP_DISTANCE);
							newY = closestTable.y;
						} else if (diffY < SNAP_DISTANCE && diffY > diffX) {
							newY = closestTable.y + (newY > closestTable.y ? SNAP_DISTANCE : -SNAP_DISTANCE);
							newX = closestTable.x;
						} else if (diffX < SNAP_DISTANCE && diffY < SNAP_DISTANCE) {
							const virtualX = closestTable.x + (newX > closestTable.x ? SNAP_DISTANCE : -SNAP_DISTANCE);
							const virtualY = closestTable.y + (newY > closestTable.y ? SNAP_DISTANCE : -SNAP_DISTANCE);

							const adjustedX = Math.max(0, Math.min(mapWidth - TABLE_SIZE, virtualX));
							const adjustedY = Math.max(0, Math.min(MAP_HEIGHT - TABLE_SIZE, virtualY));

							if (adjustedX !== virtualX || adjustedY !== virtualY) {
								return { ...table, x: originalX, y: originalY };
							}

							newX = adjustedX;
							newY = adjustedY;
						}
					}

					if (newX < 0 || newX + TABLE_SIZE > mapWidth || newY < 0 || newY + TABLE_SIZE > MAP_HEIGHT) {
						console.warn('🚨 Movimiento inválido, revirtiendo...');
						return { ...table, x: originalX, y: originalY };
					}

					return { ...table, x: newX, y: newY };
				}
				return table;
			}),
		);
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<article className="w-full px-6 py-8 border bg-white shadow-md rounded-tr-lg rounded-b-lg">
				<h1 className="text-2xl font-bold mb-4">{salon.name}</h1>
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
						<TableCard key={table._id} table={table} size={TABLE_SIZE} />
					))}
				</div>
			</article>
		</DndContext>
	);
};

export default TableMap;
