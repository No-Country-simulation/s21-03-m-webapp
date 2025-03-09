import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';

import { editCategory } from '../../categories';
import { EditCategoryRequest } from '../../../types/category';

export function useUpdateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (category: EditCategoryRequest) => editCategory(category),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			queryClient.setQueryData(['category'], response.category._id);
			queryClient.invalidateQueries({ queryKey: ['category'] });
			toast({
				description: response.msg,
				duration: TOAST_DURATION,
				variant: 'success',
			});
		},
		onError: (error) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				variant: 'destructive',
			});
		},
	});
}
