'use client';
import { useOrders } from '@/actions/hooks/orders/useOrders';
import { ApiLoader } from '@/components/library/loading';
import { VentasTabs } from './VentasTabs';
import VentasMenu from './VentasMenu';

const VentasClientPage = () => {
	const { data: orders = [], isPending, isError } = useOrders();

	if (isPending) return <ApiLoader isPending />;
	if (isError) return <h2>Ocurrió un error, intente más tarde...</h2>;
	if (orders)
		return (
			<div className="w-fit">
				<VentasMenu />
				{orders.length > 0 ? (
					<div>
						<VentasTabs orders={orders} />
					</div>
				) : (
					<p>No existen órdenes todavía</p>
				)}
			</div>
		);
};

export default VentasClientPage;
