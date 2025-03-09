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
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Cantidad
						</Label>
						<Input
							id="name"
							type="number"
							min={1}
							defaultValue={editProduct.quantity}
							className="col-span-3"
							onChange={(e) => {
								const newQuantity = Number(e.target.value);
								setEditProduct((prev) => (prev ? { ...prev, quantity: newQuantity } : null));
							}}
						/>
					</div>
				</div>
				<DialogFooter className="items-center">
					<Button
						type="submit"
						variant="destructive"
						onClick={() => {
							removeFromOrder(editProduct.productId);
							setEditProduct(null);
							onOpenChange(false);
						}}
					>
						Remover
					</Button>
					<Button
						type="submit"
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
