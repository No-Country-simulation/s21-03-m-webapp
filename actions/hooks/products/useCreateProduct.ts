import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { createProduct } from '../../products';

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProduct,
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
			queryClient.setQueryData(['product'], response.product._id);
			queryClient.invalidateQueries({ queryKey: ['product'] });
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
