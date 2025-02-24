import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSalon } from '../../salones';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';

export function useCreateSalones() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createSalon,
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['salones'] });
			queryClient.setQueryData(['salon'], response.salon._id);
			queryClient.invalidateQueries({ queryKey: ['salon'] });
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
