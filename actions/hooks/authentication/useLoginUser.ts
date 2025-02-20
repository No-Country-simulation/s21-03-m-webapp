import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '@/actions/authentication';
import { DASHBOARD_ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthenticationContext';

export function useLoginUser() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { updateToken } = useAuth();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (response) => {
			updateToken(response.token);
			queryClient.setQueryData(['currentUser'], response);
			queryClient.invalidateQueries({ queryKey: ['currentUser'] });
			router.push(DASHBOARD_ROUTES.DASHBOARD);
		},
		onError: (error: Error) => {
			throw new Error(error.message);
		},
	});
}
