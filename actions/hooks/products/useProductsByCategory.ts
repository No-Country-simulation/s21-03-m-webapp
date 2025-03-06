import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthenticationContext';
import { Product } from '../../../types/products';
import { getProducts, getProductsByCategory } from '../../products';

export const useProductsByCategory = (categoryId: string) => {
	const { user } = useAuth();
	return useQuery<Array<Product>>({
		queryKey: ['productsByCategory', user?.ownerId],
		queryFn: () => getProductsByCategory(categoryId),
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
