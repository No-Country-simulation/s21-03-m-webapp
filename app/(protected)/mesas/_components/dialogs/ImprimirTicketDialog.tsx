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
import { Item, Order } from '../../../../../types/orders';
import { Table } from '../../../../../types/tables';
import { useAuth } from '../../../../../context/AuthenticationContext';
import Image from 'next/image';

interface ImprimirTicketDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	currentTable: Table;
	currentOrder: Order | undefined;
}

export default function ImprimirTicketDialog({
	isOpen,
	onOpenChange,
	currentTable,
	currentOrder,
}: ImprimirTicketDialogProps) {
	const { user } = useAuth();
	if (!currentOrder || !currentTable || !user) return null;

	const formatPrice = (value: number) => {
		if (!value) return;
		return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
	};

	const computedSubtotal = currentOrder.items.reduce((acc, item) => {
		return acc + item.price * item.quantity;
	}, 0);

	const orderDate = new Date(currentOrder.createdAt || Date.now()).toLocaleString();

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[350px] bg-[#efefef]">
				<DialogHeader>
					<DialogTitle>Cuenta de la Mesa {currentTable.number}</DialogTitle>
					<DialogDescription>Visualiza la cuenta antes de imprimir.</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2 text-sm text-gray-700 p-8 bg-white shadow-xl">
					{/* Restaurant info */}
					<div className="text-center">
						{user.profile?.logo && (
							<Image
								src={user.profile.logo}
								alt="Restaurant Logo"
								className="mx-auto mb-1 w-36 h-36 object-cover"
								width={0}
								height={0}
								priority // Carga la imagen de inmediato
								loading={'eager'} // Las demás, con carga diferida
								quality={75} // Reduce el peso de las imágenes sin perder mucha calidad
							/>
						)}
						<p className="font-bold text-lg">{user.profile?.name}</p>
						<p className=" tracking-wide">{user.profile?.address} </p>
						<p className=" tracking-wide">{user.profile?.email}</p>
						<p className=" tracking-wide">{user.profile?.phone}</p>
					</div>

					<hr className="my-1" />

					{/* Order */}
					<p>
						<span className="font-semibold">Fecha:</span> {orderDate}
					</p>
					<p>
						<span className="font-semibold">N° Mesa:</span> {currentTable.number}
					</p>
					<p>
						<span className="font-semibold">Personas:</span> {currentOrder.people}
					</p>

					<hr className="my-1" />

					{/* Items */}
					<div className="flex flex-col gap-2">
						{currentOrder.items.map((item: Item) => {
							const lineTotal = item.price * item.quantity;
							return (
								<div key={item.productId} className="flex justify-between items-center">
									<div className="flex flex-col items-center">
										<p>
											{item.quantity}x {item.name}
										</p>
										{item.commentaries && (
											<p className="font-thin text-xs text-gray-400 pl-2"> - {item.commentaries}</p>
										)}
									</div>
									<div>{formatPrice(lineTotal)}</div>
								</div>
							);
						})}
					</div>

					<hr className="my-2" />

					{/* Totals */}
					<div className="flex justify-between">
						<p className="font-medium">Subtotal:</p>
						<p>{formatPrice(currentOrder.subtotal || computedSubtotal)}</p>
					</div>

					{currentOrder.discount > 0 && (
						<div className="flex justify-between">
							<p className="font-medium">Descuento:</p>
							<p>
								{currentOrder.discountPercentage
									? `${currentOrder.discountPercentage}%`
									: formatPrice(currentOrder.discount)}
							</p>
						</div>
					)}

					<div className="flex justify-between text-lg font-bold">
						<p>Total:</p>
						<p>{formatPrice(currentOrder.total)}</p>
					</div>
				</div>

				<DialogFooter className="items-center">
					<Button
						onClick={() => {
							onOpenChange(false);
						}}
						className="bg-chart-2 hover:bg-emerald-500"
					>
						Imprimir
					</Button>
					<Button onClick={() => onOpenChange(false)}>Cerrar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
