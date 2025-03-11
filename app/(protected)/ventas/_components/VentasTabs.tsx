import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useVentas } from '@/hooks/useVentas';
import { formatDate, formatNumber } from '@/lib/utils';
import { OrderCompleteResponse } from '@/types/orders';
import { useEffect } from 'react';

type OrderStatus = 'pending' | 'completed' | 'billing';

export const dictionaryStatus: Record<OrderStatus, string> = {
	completed: 'Completada',
	pending: 'Pendiente',
	billing: 'Pagando',
};

export function VentasTabs({ orders }: { orders: OrderCompleteResponse[] }) {
	const { sortedOrders, setOrders, setSelectedOrder, selectedOrder } = useVentas();

	useEffect(() => {
		setOrders(orders);
	}, [orders, setOrders]);

	return (
		<Table>
			<TableCaption>Listado de Ventas</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-center font-bold  w-fit">Mesa</TableHead>
					<TableHead className="text-center font-bold  w-fit">Hora de Inicio</TableHead>
					<TableHead className="text-center font-bold w-fit">Hora de Cierre</TableHead>
					<TableHead className="text-center font-bold w-fit">Estado</TableHead>
					<TableHead className="text-center font-bold  w-fit">Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedOrders.map((order) => (
					<TableRow
						key={order._id}
						className={`text-center cursor-pointer   ${selectedOrder === order._id ? 'bg-chart-1 text-white hover:bg-none' : ''} hover:bg-chart-1 hover:text-white `}
						onClick={() => setSelectedOrder(order._id)}
					>
						<TableCell className="font-medium">
							{order.tableNumber?.number ? order.tableNumber?.number : 'Mesa Eliminada'}
						</TableCell>
						<TableCell className="font-medium">{formatDate(order.createdAt)}</TableCell>
						<TableCell className="font-medium">{order.closedAt ? formatDate(order.closedAt) : ''}</TableCell>
						<TableCell className="font-medium">{dictionaryStatus[order.status as OrderStatus]}</TableCell>
						<TableCell className="font-medium">${formatNumber(order.total)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
