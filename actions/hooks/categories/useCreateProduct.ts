import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSalon } from '../../salones';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { createCategory } from '../../categories';

export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCategory,
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
		onError: (error: Error) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				variant: 'destructive',
			});
		},
	});
}
