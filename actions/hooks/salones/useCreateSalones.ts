import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSalon } from '../../salones';
import { toast } from '@/hooks/use-toast';

export function useCreateSalones() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createSalon,
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
		onError: (error: Error) => {
			toast({
				description: error.message,
				duration: 3000,
				className: 'bg-destructive text-white [&>button]:text-white [&>button]:hover:text-white',
			});
		},
	});
}
