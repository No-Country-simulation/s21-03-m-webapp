'use client';

import { useState, useRef, useEffect } from 'react';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCard, SalonesName } from '.';
import { Salon } from '@/types/salones';
import { useTables } from '@/actions/hooks/tables/useTables';
import { useCreateTables } from '@/actions/hooks/tables/useCreateTables';
import { useUpdateTables } from '../../../../actions/hooks/tables/useUpdateTables';
import { Table } from '@/types/tables';
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
	const { data: myTables } = useTables(salon._id);
	const { mutate: createTableMutation } = useCreateTables();
	const { mutate: updateTableMutation } = useUpdateTables();

	const [tables, setTables] = useState<Table[]>([]);
	const [currentTable, setCurrentTable] = useState<Table | null>(null);
	const [tableNumber, setTableNumber] = useState('');
	const [mapWidth, setMapWidth] = useState(0);
	const mapRef = useRef<HTMLDivElement | null>(null);

	const { setNodeRef } = useDroppable({ id: 'map-area' });

	useEffect(() => {
		function updateMapWidth() {
			if (mapRef.current) {
				setMapWidth(mapRef.current.offsetWidth);
			}
		}
		updateMapWidth();
		window.addEventListener('resize', updateMapWidth);
		return () => window.removeEventListener('resize', updateMapWidth);
	}, []);

	useEffect(() => {
		if (!myTables || mapWidth === 0) return;

		const newTables = myTables.map((t) => {
			const xRatio = t.xRatio ?? t.x / mapWidth;
			const yRatio = t.yRatio ?? t.y / MAP_HEIGHT;

			const x = xRatio * mapWidth;
			const y = yRatio * MAP_HEIGHT;

			const { clampedX, clampedY } = clampPosition(x, y, mapWidth, MAP_HEIGHT);
			return { ...t, xRatio, yRatio, x: clampedX, y: clampedY };
		});

		setTables(newTables);
	}, [myTables, mapWidth]);

	// Add table in center
	const addTable = () => {
		if (!tableNumber.trim()) return;

		const centerX = (mapWidth - TABLE_SIZE) / 2;
		const centerY = (MAP_HEIGHT - TABLE_SIZE) / 2;
		const xRatio = centerX / mapWidth;
		const yRatio = centerY / MAP_HEIGHT;

		createTableMutation(
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
				onSuccess: (res) => {
					const newTable: Table = {
						_id: res.table._id,
						salonId: res.table.salonId,
						number: res.table.number,
						x: res.table.x,
						y: res.table.y,
						status: res.table.status,
						xRatio: res.table.xRatio,
						yRatio: res.table.yRatio,
					};
					setTables((prev) => [...prev, newTable]);
					setTableNumber('');
				},
			},
		);
	};

	const CLICK_THRESHOLD = 2; // px
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, delta } = event;

		const distanceMoved = Math.abs(delta.x) + Math.abs(delta.y);
		if (distanceMoved < CLICK_THRESHOLD) {
			const clickedTable = tables.find((t) => t._id === active.id);
			if (clickedTable) {
				setCurrentTable(clickedTable);
			}
			return;
		}

		setTables((prev) =>
			prev.map((table) => {
				if (table._id === active.id) {
					let newX = table.x + delta.x;
					let newY = table.y + delta.y;

					const { clampedX, clampedY } = clampPosition(newX, newY, mapWidth, MAP_HEIGHT);
					newX = clampedX;
					newY = clampedY;

					const { table: closestTable } = prev.reduce<{
						table: Table | null;
						minDistance: number;
					}>(
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

					updateTableMutation({
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

	return (
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
				<DndContext onDragEnd={handleDragEnd}>
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
				</DndContext>
			</article>
			<article className="w-[550px] bg-chart-1 rounded-lg flex flex-col gap-2 items-center justify-center">
				<TablesInfo currentTable={currentTable} />
			</article>
		</div>
	);
};

export default TablesMap;
