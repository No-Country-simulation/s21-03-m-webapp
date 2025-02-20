import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSalon } from '../../salones';

export function useCreateSalones() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createSalon,
		onSuccess: (response) => {
			queryClient.setQueryData(['salon'], response);
			queryClient.invalidateQueries({ queryKey: ['salon'] });
		},
		onError: (error: Error) => {
			throw new Error(error.message);
		},
	});
}
