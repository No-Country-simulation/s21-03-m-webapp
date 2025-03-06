import { useQuery } from '@tanstack/react-query';
import { Order } from '../../../types/orders';
import { getOrderByTableId } from '../../orders';

export const useOrderByTableId = (tableId: string) => {
	return useQuery<Order>({
		queryKey: ['order', tableId],
		queryFn: () => getOrderByTableId(tableId),
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
