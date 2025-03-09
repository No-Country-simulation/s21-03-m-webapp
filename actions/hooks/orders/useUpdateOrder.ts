import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { OrderRequest } from '../../../types/orders';
import { updateOrder } from '../../orders';

export function useUpdateOrder() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (order: OrderRequest) => updateOrder(order),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			queryClient.setQueryData(['order'], response.order._id);
			queryClient.invalidateQueries({ queryKey: ['order'] });
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
