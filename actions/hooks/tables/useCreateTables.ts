import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { createTable } from '../../tables';

export function useCreateTables() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTable,
		onSuccess: (response) => {
			queryClient.setQueryData(['table'], response.table._id);
			queryClient.invalidateQueries({ queryKey: ['tables'] });
			queryClient.invalidateQueries({ queryKey: ['table'] });
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
