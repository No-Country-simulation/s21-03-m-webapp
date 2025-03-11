'use client';
import { useOrders } from '@/actions/hooks/orders/useOrders';
import { ApiLoader } from '@/components/library/loading';
import { VentasTabs } from './VentasTabs';
import VentasMenu from './VentasMenu';
import SelectedVenta from './SelectedVenta';
import { useVentas } from '@/hooks/useVentas';

const VentasClientPage = () => {
	const { data: orders = [], isPending, isError } = useOrders();
	const { selectedOrder } = useVentas();
	if (isPending) return <ApiLoader isPending />;
	if (isError) return <h2>Ocurrió un error, intente más tarde...</h2>;
	if (orders)
		return (
			<div className="grid grid-cols-1 lg:grid-cols-2">
				<div className="col-1 w-fit">
					<VentasMenu />
					{orders.length > 0 ? (
						<div>
							<VentasTabs orders={orders} />
						</div>
					) : (
						<p>No existen órdenes todavía</p>
					)}
				</div>
				<div className="justify-items-center">{selectedOrder && <SelectedVenta selectedOrder={selectedOrder} />}</div>
			</div>
		);
};

export default VentasClientPage;
