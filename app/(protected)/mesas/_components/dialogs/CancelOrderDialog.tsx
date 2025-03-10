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

interface CancelOrderDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	currentTable: Table;
	currentOrder: Order | undefined;
	handleDeleteOrder: (orderId: string) => void;
}

export default function CancelOrderDialog({
	isOpen,
	onOpenChange,
	currentTable,
	currentOrder,
	handleDeleteOrder,
}: CancelOrderDialogProps) {
	if (!currentOrder || !currentTable) return null;
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Cancelar Orden</DialogTitle>
					<DialogDescription>
						Estas por cancelar la orden completa de la <span className="font-bold">Mesa {currentTable.number}</span>.
						¿Seguro que deseas continuar?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="items-center">
					<Button
						type="submit"
						variant="destructive"
						onClick={() => {
							handleDeleteOrder(currentOrder._id);
							onOpenChange(false);
						}}
					>
						Cancelar Orden
					</Button>
					<Button
						type="submit"
						onClick={() => {
							onOpenChange(false);
						}}
					>
						Volver atrás
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
