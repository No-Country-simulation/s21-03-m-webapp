'use client';

import { useState, useRef, useEffect } from 'react';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCard, SalonesName } from './';
import { Salon } from '@/types/salones';
import { useTables } from '../../../../actions/hooks/tables/useTables';
import { useCreateTables } from '../../../../actions/hooks/tables/useCreateTables';

// Extendemos la definición de Table, para almacenar también los ratios
type Table = {
	_id: string;
	salonId: string;
	number: number;
	x: number; // posición absoluta calculada
	y: number; // posición absoluta calculada
	xRatio?: number; // posición relativa en X (0..1)
	yRatio?: number; // posición relativa en Y (0..1)
	status: 'Free';
};

const MAP_HEIGHT = 650;
const TABLE_SIZE = 70;
const SNAP_DISTANCE = 73;

const clampPosition = (x: number, y: number, containerWidth: number, containerHeight: number) => {
	const clampedX = Math.max(0, Math.min(containerWidth - TABLE_SIZE, x));
	const clampedY = Math.max(0, Math.min(containerHeight - TABLE_SIZE, y));
	return { clampedX, clampedY };
};

const TableMap = ({ salon, onDelete }: { salon: Salon; onDelete: (id: string) => void }) => {
	const { data: myTables } = useTables(salon._id);
	const { mutate: create } = useCreateTables();

	const [tables, setTables] = useState<Table[]>([]);
	const [tableNumber, setTableNumber] = useState('');
	const [mapWidth, setMapWidth] = useState(0);
	const mapRef = useRef<HTMLDivElement | null>(null);
	const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

	// TODO - Remover
	console.log(myTables);

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
	// 1) Cargar mesas desde localStorage al tener mapWidth:
	//    - Leer xRatio, yRatio, calcular x, y absolutos (clamp)
	// -----------------------------------------------------
	useEffect(() => {
		if (hasLoadedFromStorage || mapWidth === 0) return;

		const storedTables = localStorage.getItem('tables');
		if (storedTables) {
			// Asumimos que en el localStorage guardamos
			//  { xRatio, yRatio, ... } para cada mesa
			const ratioTables = JSON.parse(storedTables) as Array<Table>;

			const absoluteTables = ratioTables.map((t) => {
				// Si no existen, calculamos ratio=0
				const xRatio = t.xRatio ?? 0;
				const yRatio = t.yRatio ?? 0;
				// Calculamos posiciones absolutas
				let x = xRatio * mapWidth;
				let y = yRatio * MAP_HEIGHT;
				// Clamp
				const { clampedX, clampedY } = clampPosition(x, y, mapWidth, MAP_HEIGHT);
				x = clampedX;
				y = clampedY;
				return { ...t, xRatio, yRatio, x, y };
			});
			setTables(absoluteTables);
		} else {
			// Si no hay nada en storage, definimos al menos una mesa
			setTables([{ _id: '1', salonId: 'test', number: 1, x: 0, y: 0, status: 'Free', xRatio: 0, yRatio: 0 }]);
		}

		setHasLoadedFromStorage(true);
	}, [mapWidth, hasLoadedFromStorage]);

	// -----------------------------------------------------
	// 2) Cada vez que cambie el array de mesas,
	//    guardamos en localStorage (usando xRatio,yRatio).
	// -----------------------------------------------------
	useEffect(() => {
		if (!hasLoadedFromStorage || mapWidth === 0) return;
		localStorage.setItem('tables', JSON.stringify(tables));
	}, [tables, mapWidth, hasLoadedFromStorage]);

	// -----------------------------------------------------
	// 3) Cada vez que se *redimensiona* la ventana y cambia
	//    mapWidth (ya cargado) recalc x,y = ratio * dimension
	// -----------------------------------------------------
	useEffect(() => {
		if (!hasLoadedFromStorage || mapWidth === 0) return;

		setTables((prev) =>
			prev.map((table) => {
				const xRatio = table.xRatio ?? 0;
				const yRatio = table.yRatio ?? 0;
				const newX = xRatio * mapWidth;
				const newY = yRatio * MAP_HEIGHT;
				// Clamp y asignamos
				const { clampedX, clampedY } = clampPosition(newX, newY, mapWidth, MAP_HEIGHT);
				return { ...table, x: clampedX, y: clampedY };
			}),
		);
	}, [mapWidth, hasLoadedFromStorage]);

	// Agregar mesa en el centro
	const addTable = () => {
		if (tableNumber.trim() === '') return;
		const number = parseInt(tableNumber, 10);
		if (isNaN(number)) return;

		// Centrada en el contenedor
		const centerX = (mapWidth - TABLE_SIZE) / 2;
		const centerY = (MAP_HEIGHT - TABLE_SIZE) / 2;

		const xRatio = centerX / mapWidth;
		const yRatio = centerY / MAP_HEIGHT;

		const newTable: Table = {
			_id: String(Date.now()),
			salonId: String(Date.now()),
			number,
			x: centerX,
			y: centerY,
			status: 'Free',
			xRatio,
			yRatio,
		};
		setTables((prev) => [...prev, newTable]);
		setTableNumber('');
	};

	// Al soltar el drag (mover mesa)
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, delta } = event;

		setTables((prev) =>
			prev.map((table) => {
				if (table._id === active.id) {
					const originalX = table.x;
					const originalY = table.y;

					let newX = originalX + delta.x;
					let newY = originalY + delta.y;

					// Clamp inicial (para no salirse del área)
					const { clampedX, clampedY } = clampPosition(newX, newY, mapWidth, MAP_HEIGHT);
					newX = clampedX;
					newY = clampedY;

					// Buscamos la mesa más cercana para “encajar”
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
						} else if (diffX < SNAP_DISTANCE && diffY < SNAP_DISTANCE) {
							const virtualX = closestTable.x + (newX > closestTable.x ? SNAP_DISTANCE : -SNAP_DISTANCE);
							const virtualY = closestTable.y + (newY > closestTable.y ? SNAP_DISTANCE : -SNAP_DISTANCE);

							const snapped = clampPosition(virtualX, virtualY, mapWidth, MAP_HEIGHT);
							// Si se sale del mapa, revertimos a su posición original
							if (snapped.clampedX !== virtualX || snapped.clampedY !== virtualY) {
								return { ...table, x: originalX, y: originalY };
							}
							newX = snapped.clampedX;
							newY = snapped.clampedY;
						}
					}

					// Verificamos si se sale tras el snap
					const finalPos = clampPosition(newX, newY, mapWidth, MAP_HEIGHT);
					if (finalPos.clampedX !== newX || finalPos.clampedY !== newY) {
						// Se sale => revertimos
						console.warn('🚨 Movimiento inválido, revirtiendo...');
						return { ...table, x: originalX, y: originalY };
					}

					// Se calcula la nueva relación con respecto al ancho/alto
					const xRatio = finalPos.clampedX / mapWidth;
					const yRatio = finalPos.clampedY / MAP_HEIGHT;

					return {
						...table,
						x: finalPos.clampedX,
						y: finalPos.clampedY,
						xRatio,
						yRatio,
					};
				}
				return table;
			}),
		);
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
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
		</DndContext>
	);
};

export default TableMap;
