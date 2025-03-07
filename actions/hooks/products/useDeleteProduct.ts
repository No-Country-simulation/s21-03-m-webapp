import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSalon } from '@/actions/salones';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { deleteProduct } from '../../products';

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteProduct(id),
		onMutate: async (deletedSalonId) => {
			await queryClient.cancelQueries({ queryKey: ['products'] });

			const previousSalones = queryClient.getQueryData<Array<{ _id: string }>>(['products']);

			if (previousSalones && previousSalones.length > 1) {
				const updatedSalones = previousSalones.filter((s) => s._id !== deletedSalonId);
				queryClient.setQueryData(['products'], updatedSalones);
			}

			return { previousSalones };
		},
		onSuccess: (response) => {
			toast({
				description: response.msg,
				duration: TOAST_DURATION,
				variant: 'success',
			});
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
		onError: (error, _, context) => {
			toast({
				description: error.message,
				duration: TOAST_DURATION,
				variant: 'destructive',
			});
			queryClient.setQueryData(['products'], context?.previousSalones);
		},
	});
}
