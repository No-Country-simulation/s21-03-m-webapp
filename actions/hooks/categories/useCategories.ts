import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthenticationContext';
import { Category } from '../../../types/category';
import { getCategories } from '../../categories';

export const useCategories = () => {
	const { user } = useAuth();
	return useQuery<Array<Category>>({
		queryKey: ['categories', user?.ownerId],
		queryFn: getCategories,
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
