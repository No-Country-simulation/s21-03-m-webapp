import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { deleteOrder } from '../../orders';

export function useDeleteOrder(tableId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (orderId: string) => deleteOrder(orderId),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			queryClient.invalidateQueries({ queryKey: ['order', tableId] });
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
