'use client';

import { useState, useRef, useEffect } from 'react';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCard, SalonesName } from '.';
import { Salon } from '@/types/salones';
import { useTables } from '@/actions/hooks/tables/useTables';
import { useCreateTables } from '@/actions/hooks/tables/useCreateTables';
import { Table } from '@/types/tables';
import { useUpdateTables } from '../../../../actions/hooks/tables/useUpdateTables';
import TablesInfo from './TablesInfo';

const MAP_HEIGHT = 650;
const TABLE_SIZE = 70;
const SNAP_DISTANCE = 73;

const clampPosition = (x: number, y: number, containerWidth: number, containerHeight: number) => {
	const clampedX = Math.max(0, Math.min(containerWidth - TABLE_SIZE, x));
	const clampedY = Math.max(0, Math.min(containerHeight - TABLE_SIZE, y));
	return { clampedX, clampedY };
};

const TablesMap = ({ salon, onDelete }: { salon: Salon; onDelete: (id: string) => void }) => {
	const { data: myTables } = useTables(salon._id); // Fetch tables from backend
	const { mutate: create } = useCreateTables();
	const { mutate: updateTable } = useUpdateTables(); // ✅ Mutation for updates

	const [tables, setTables] = useState<Array<Table>>([]);
	const [tableNumber, setTableNumber] = useState('');
	const [mapWidth, setMapWidth] = useState(0);
	const mapRef = useRef<HTMLDivElement | null>(null);

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

	// -----------------------------------------------------
	// 1) Ensure tables update when backend data changes
	// -----------------------------------------------------
	useEffect(() => {
		if (!myTables || mapWidth === 0) return;

		const absoluteTables = myTables.map((t) => {
			const xRatio = t.xRatio ?? t.x / mapWidth;
			const yRatio = t.yRatio ?? t.y / MAP_HEIGHT;
			const x = xRatio * mapWidth;
			const y = yRatio * MAP_HEIGHT;

			// Clamp position
			const { clampedX, clampedY } = clampPosition(x, y, mapWidth, MAP_HEIGHT);

			return { ...t, xRatio, yRatio, x: clampedX, y: clampedY };
		});

		setTables(absoluteTables);
	}, [mapWidth, myTables]);

	// -----------------------------------------------------
	// 2) Add Table to Backend & Update State
	// -----------------------------------------------------
	const addTable = () => {
		if (tableNumber.trim() === '') return;

		// Centered Position
		const centerX = (mapWidth - TABLE_SIZE) / 2;
		const centerY = (MAP_HEIGHT - TABLE_SIZE) / 2;
		const xRatio = centerX / mapWidth;
		const yRatio = centerY / MAP_HEIGHT;

		// Create Table in Backend
		create(
			{
				salonId: salon._id,
				number: tableNumber,
				x: centerX,
				y: centerY,
				status: 'Free',
				xRatio,
				yRatio,
			},
			{
				onSuccess: (response) => {
					const savedTable: Table = {
						_id: response.table._id,
						salonId: response.table.salonId,
						number: response.table.number,
						x: response.table.x,
						y: response.table.y,
						status: response.table.status,
						xRatio: response.table.xRatio,
						yRatio: response.table.yRatio,
					};

					setTables((prev) => [...prev, savedTable]);
					setTableNumber('');
				},
			},
		);
	};

	// -----------------------------------------------------
	// 3) Drag & Drop + Update Table Position in DB (WITH SNAP LOGIC)
	// -----------------------------------------------------
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, delta } = event;

		setTables((prev) =>
			prev.map((table) => {
				if (table._id === active.id) {
					let newX = table.x + delta.x;
					let newY = table.y + delta.y;

					// Clamp position
					const { clampedX, clampedY } = clampPosition(newX, newY, mapWidth, MAP_HEIGHT);
					newX = clampedX;
					newY = clampedY;

					// 🟢 Snap to closest table
					const { table: closestTable } = prev.reduce<{ table: Table | null; minDistance: number }>(
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

					if (closestTable) {
						const diffX = Math.abs(newX - closestTable.x);
						const diffY = Math.abs(newY - closestTable.y);

						if (diffX < SNAP_DISTANCE && diffX > diffY) {
							newX = closestTable.x + (newX > closestTable.x ? SNAP_DISTANCE : -SNAP_DISTANCE);
							newY = closestTable.y;
						} else if (diffY < SNAP_DISTANCE && diffY > diffX) {
							newY = closestTable.y + (newY > closestTable.y ? SNAP_DISTANCE : -SNAP_DISTANCE);
							newX = closestTable.x;
						}
					}

					const xRatio = newX / mapWidth;
					const yRatio = newY / MAP_HEIGHT;

					updateTable({
						id: table._id,
						salonId: table.salonId,
						number: table.number,
						x: newX,
						y: newY,
						status: table.status,
						xRatio,
						yRatio,
					});

					return { ...table, x: newX, y: newY, xRatio, yRatio };
				}
				return table;
			}),
		);
	};

	// -----------------------------------------------------
	// 4) Render Tables in UI
	// -----------------------------------------------------
	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="w-full flex flex-row">
				<article className="w-full px-6 py-8 border bg-white shadow-md rounded-tr-lg rounded-b-lg">
					<SalonesName salon={salon} onDelete={onDelete} />
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
				<article className="w-[550px] lg:w-[650px] rounded-lg flex flex-col gap-2 items-center justify-center bg-chart-1">
					<TablesInfo></TablesInfo>
				</article>
			</div>
		</DndContext>
	);
};

export default TablesMap;
