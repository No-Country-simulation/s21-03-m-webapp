import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SalonUpdateRequest } from '@/types/salones';
import { updateSalon } from '@/actions/salones';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { EditProductRequest } from '../../../types/products';
import { editProduct } from '../../products';

export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (product: EditProductRequest) => editProduct(product),
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
		onError: (error) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				variant: 'destructive',
			});
		},
	});
}
