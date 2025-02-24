import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSalon } from '@/actions/salones';
import { toast } from '@/hooks/use-toast';

export function useDeleteSalon() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteSalon(id),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['salones'] });
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
