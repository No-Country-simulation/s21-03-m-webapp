import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthenticationContext';
import { Product } from '../../../types/products';
import { getProducts } from '../../products';

export const useProducts = () => {
	const { user } = useAuth();
	return useQuery<Array<Product>>({
		queryKey: ['products', user?.ownerId],
		queryFn: getProducts,
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
