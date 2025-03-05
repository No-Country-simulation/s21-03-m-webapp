import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { updateProfile } from '@/actions/profile';

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			toast({
				description: response.msg,
				duration: TOAST_DURATION,
				variant: 'success',
			});
		},
	});
}
