import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../orders';
import { useAuth } from '@/context/AuthenticationContext';

export const useOrders = () => {
	const { user } = useAuth();
	return useQuery({
		queryKey: ['orders', user?.ownerId],
		queryFn: getOrders,
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
