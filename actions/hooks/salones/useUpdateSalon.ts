import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SalonUpdateRequest } from '@/types/mesas';
import { updateSalon } from '@/actions/salones';
import { toast } from '@/hooks/use-toast';

export function useUpdateSalon() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (salon: SalonUpdateRequest) => updateSalon(salon),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['salones'] });
			queryClient.setQueryData(['salon'], response.salon);
			queryClient.invalidateQueries({ queryKey: ['salon'] });
			toast({
				description: response.msg,
				duration: 3000,
				className: 'bg-chart-2 text-white [&>button]:text-white [&>button]:hover:text-white',
			});
		},
		onError: (error) => {
			toast({
				description: error.message,
				duration: 3000,
				className: 'bg-destructive text-white [&>button]:text-white [&>button]:hover:text-white',
			});
		},
	});
}
