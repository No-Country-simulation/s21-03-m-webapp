import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TOAST_DURATION } from '@/constants/app_constants';
import { ProfileFormData } from '@/schemas/profileSchema';
import { updateProfile } from '@/actions/profile';

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (profile: ProfileFormData) => updateProfile(profile),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			toast({
				description: response.msg,
				duration: TOAST_DURATION,
				className: 'bg-chart-2 text-white [&>button]:text-white [&>button]:hover:text-white',
			});
		},
	});
}
