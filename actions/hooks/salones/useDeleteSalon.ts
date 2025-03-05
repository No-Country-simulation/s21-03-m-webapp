import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSalon } from '@/actions/salones';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';

export function useDeleteSalon() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteSalon(id),
		onMutate: async (deletedSalonId) => {
			await queryClient.cancelQueries({ queryKey: ['salones'] });

			const previousSalones = queryClient.getQueryData<Array<{ _id: string }>>(['salones']);

			if (previousSalones && previousSalones.length > 1) {
				const updatedSalones = previousSalones.filter((s) => s._id !== deletedSalonId);
				queryClient.setQueryData(['salones'], updatedSalones);
			}

			return { previousSalones };
		},
		onSuccess: (response) => {
			toast({
				description: response.msg,
				duration: TOAST_DURATION,
				variant: 'success',
			});
			queryClient.invalidateQueries({ queryKey: ['salones'] });
		},
		onError: (error, _, context) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				variant: 'destructive',
			});
			queryClient.setQueryData(['salones'], context?.previousSalones);
		},
	});
}
