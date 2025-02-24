import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSalon } from '@/actions/salones';
import { toast } from '@/hooks/use-toast';

export function useDeleteSalon() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteSalon(id),
		onMutate: async (deletedSalonId) => {
			await queryClient.cancelQueries({ queryKey: ['salones'] });

			// Tomamos la data actual antes de modificarla
			const previousSalones = queryClient.getQueryData<Array<{ _id: string }>>(['salones']);

			// Filtramos el salón eliminado y actualizamos cache
			if (previousSalones) {
				const updatedSalones = previousSalones.filter((s) => s._id !== deletedSalonId);
				queryClient.setQueryData(['salones'], updatedSalones);
			}

			// Retornamos el snapshot en caso de rollback
			return { previousSalones };
		},
		onSuccess: (response) => {
			toast({
				description: response.msg,
				duration: 3000,
				className: 'bg-chart-2 text-white [&>button]:text-white [&>button]:hover:text-white',
			});
			queryClient.invalidateQueries({ queryKey: ['salones'] });
		},
		onError: (error, _, context) => {
			toast({
				description: error.message,
				duration: 3000,
				className: 'bg-destructive text-white [&>button]:text-white [&>button]:hover:text-white',
			});
			queryClient.setQueryData(['salones'], context?.previousSalones); // Rollback
		},
	});
}
