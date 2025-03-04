import { createMember } from '@/actions/member';
import { TOAST_DURATION } from '@/constants/app_constants';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateMembers = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createMember,
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['members'] });
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
};
