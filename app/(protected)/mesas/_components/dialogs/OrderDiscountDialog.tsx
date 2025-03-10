'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '../../../../../types/orders';
import { Table } from '../../../../../types/tables';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';

interface OrderDiscountDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	currentTable: Table;
	currentOrder: Order | undefined;
	setAppliedDiscount: (value: number | null) => void;
	setAppliedDiscountPercentage: (value: number | null) => void;
}

export default function OrderDiscountDialog({
	isOpen,
	onOpenChange,
	currentTable,
	currentOrder,
	setAppliedDiscount,
	setAppliedDiscountPercentage,
}: OrderDiscountDialogProps) {
	const [localDiscount, setLocalDiscount] = useState<number | null>(null);
	const [localDiscountPercentage, setLocalDiscountPercentage] = useState<number | null>(null);

	const orderSubtotal = currentOrder?.subtotal ?? 0;

	useEffect(() => {
		if (isOpen && currentOrder) {
			setLocalDiscount(currentOrder.discount ?? null);
			setLocalDiscountPercentage(currentOrder.discountPercentage ?? null);
		}
	}, [isOpen, currentOrder]);

	const newTotal = useMemo(() => {
		if (localDiscountPercentage !== null && localDiscountPercentage > 0) {
			return orderSubtotal - (orderSubtotal * localDiscountPercentage) / 100;
		} else if (localDiscount !== null && localDiscount > 0) {
			return orderSubtotal - localDiscount;
		}
		return orderSubtotal;
	}, [localDiscount, localDiscountPercentage, orderSubtotal]);

	const formatPrice = (value: number | undefined) => {
		if (!value) return Number(0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
		return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
	};

	const handleApplyDiscount = () => {
		setAppliedDiscount(localDiscount);
		setAppliedDiscountPercentage(localDiscountPercentage);
		onOpenChange(false);
	};

	if (!currentOrder || !currentTable) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Descuentos</DialogTitle>
					<DialogDescription>
						Puedes aplicar un descuento al total de la cuenta:
						<span className="font-bold">{formatPrice(orderSubtotal)}</span>
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					{/* Descuento en Monto */}
					<div className="flex flex-col gap-2">
						<Label className="text-sm font-semibold">Descuento en Monto</Label>
						<Input
							type="number"
							className="border p-2 rounded w-full text-black"
							value={localDiscount ?? ''}
							onChange={(e) => {
								const value = Number(e.target.value) || null;
								setLocalDiscount(value);
								setLocalDiscountPercentage(null);
							}}
							min={0}
						/>
					</div>

					{/* Descuento en Porcentaje */}
					<div className="flex flex-col gap-2">
						<Label className="text-sm font-semibold">Descuento en Porcentaje</Label>
						<Input
							type="number"
							className="border p-2 rounded w-full text-black"
							value={localDiscountPercentage ?? ''}
							onChange={(e) => {
								const value = Number(e.target.value) || null;
								setLocalDiscountPercentage(value);
								setLocalDiscount(null);
							}}
							min={0}
							max={100}
						/>
					</div>

					{/* Botones de Descuento Rápido */}
					<div className="flex flex-wrap gap-2">
						{[5, 10, 15, 20].map((percent) => (
							<Button
								key={percent}
								variant="outline"
								className="text-black"
								onClick={() => {
									setLocalDiscountPercentage(percent);
									setLocalDiscount(null);
								}}
							>
								{percent}%
							</Button>
						))}
					</div>

					{/* Mostrar nuevo total calculado */}
					<div className="p-3 bg-yellow-100 rounded">
						<p className="text-sm font-semibold">Nuevo Total:</p>
						<p className="text-lg font-bold">{formatPrice(newTotal)}</p>
					</div>
				</div>
				<DialogFooter className="items-center">
					<Button type="submit" variant="outline" onClick={handleApplyDiscount}>
						Aplicar descuento
					</Button>
					<Button type="submit" onClick={() => onOpenChange(false)}>
						Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
