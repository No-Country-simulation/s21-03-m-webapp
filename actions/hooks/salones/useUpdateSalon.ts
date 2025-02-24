import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SalonUpdateRequest } from '@/types/salones';
import { updateSalon } from '@/actions/salones';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';

export function useUpdateSalon() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (salon: SalonUpdateRequest) => updateSalon(salon),
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
		onError: (error) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				variant: 'destructive',
			});
		},
	});
}
