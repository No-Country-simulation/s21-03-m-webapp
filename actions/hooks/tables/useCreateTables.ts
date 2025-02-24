import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { createTable } from '../../tables';

export function useCreateTables() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTable,
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['tables'] });
			queryClient.setQueryData(['table'], response.table);
			queryClient.invalidateQueries({ queryKey: ['table'] });
			toast({
				description: response.msg,
				duration: TOAST_DURATION,
				className: 'bg-chart-2 text-white [&>button]:text-white [&>button]:hover:text-white',
			});
		},
		onError: (error: Error) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				className: 'bg-destructive text-white [&>button]:text-white [&>button]:hover:text-white',
			});
		},
	});
}
