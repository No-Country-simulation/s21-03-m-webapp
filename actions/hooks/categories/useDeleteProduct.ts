import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { deleteCategory } from '../../categories';

export function useDeleteCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteCategory(id),
		onMutate: async (deletedSalonId) => {
			await queryClient.cancelQueries({ queryKey: ['categories'] });

			const previousSalones = queryClient.getQueryData<Array<{ _id: string }>>(['categories']);

			if (previousSalones && previousSalones.length > 1) {
				const updatedSalones = previousSalones.filter((s) => s._id !== deletedSalonId);
				queryClient.setQueryData(['categories'], updatedSalones);
			}

			return { previousSalones };
		},
		onSuccess: (response) => {
			toast({
				description: response.msg,
				duration: TOAST_DURATION,
				variant: 'success',
			});
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: (error, _, context) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				variant: 'destructive',
			});
			queryClient.setQueryData(['categories'], context?.previousSalones);
		},
	});
}
