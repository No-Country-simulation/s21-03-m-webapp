import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { TableRequest } from '@/types/tables';
import { updateTable } from '../../tables';

export function useUpdateTables() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (salon: TableRequest) => updateTable(salon),
		onSuccess: (response) => {
			queryClient.setQueryData(['table'], response.table);
			queryClient.invalidateQueries({ queryKey: ['tables'] });
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
