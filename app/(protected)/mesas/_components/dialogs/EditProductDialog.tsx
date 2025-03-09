'use client';

import { Dispatch, SetStateAction } from 'react';
import { Item } from '@/types/orders';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditProductDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	editProduct: Item | null;
	setEditProduct: Dispatch<SetStateAction<Item | null>>;
	removeFromOrder: (productId: string) => void;
	setOrderItems: Dispatch<SetStateAction<Item[]>>;
	currentTableNumber: string;
}

export default function EditProductDialog({
	isOpen,
	onOpenChange,
	editProduct,
	setEditProduct,
	removeFromOrder,
	setOrderItems,
	currentTableNumber,
}: EditProductDialogProps) {
	if (!editProduct) return null;
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{editProduct.name}</DialogTitle>
					<DialogDescription>
						Editando <span className="font-bold">{editProduct.name} </span> de la
						<span className="font-bold"> mesa {currentTableNumber} </span>
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-4 items-center">
					<div className="w-full flex items-center justify-between">
						<Label htmlFor="name">Cantidad:</Label>
						<Input
							id="name"
							type="number"
							min={1}
							defaultValue={editProduct.quantity}
							className="w-[260px]"
							onChange={(e) => {
								const newQuantity = Number(e.target.value);
								setEditProduct((prev) => (prev ? { ...prev, quantity: newQuantity } : null));
							}}
						/>
					</div>
					<div className="w-full flex items-center justify-between">
						<Label htmlFor="name">Comentarios:</Label>
						<Input id="comentarios" type="text" defaultValue={' '} className="w-[260px]" />
					</div>
					<span
						className="text-destructive text-sm cursor-pointer self-start hover:underline transition-all"
						onClick={() => {
							removeFromOrder(editProduct.productId);
							onOpenChange(false);
						}}
					>
						Remover de la orden
					</span>
				</div>
				<DialogFooter className="items-center">
					<Button
						type="submit"
						variant={'outline'}
						onClick={() => {
							setOrderItems((prevItems) =>
								prevItems.map((item) =>
									item.productId === editProduct.productId ? { ...item, quantity: editProduct.quantity } : item,
								),
							);
							onOpenChange(false);
						}}
					>
						Guardar cambios
					</Button>
					<Button
						type="submit"
						variant={'default'}
						onClick={() => {
							onOpenChange(false);
						}}
					>
						Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
