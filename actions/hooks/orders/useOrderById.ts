import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../orders';

export const useOrderById = (orderId: string) => {
	return useQuery({
		queryKey: ['order', orderId],
		queryFn: () => getOrderById(orderId),
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
