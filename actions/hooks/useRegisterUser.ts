import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../authentication';
import { DASHBOARD_ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthenticationContext';

export function useRegisterUser() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { updateToken } = useAuth();

	return useMutation({
		mutationFn: registerUser,
		onSuccess: (response) => {
			updateToken(response.token);
			queryClient.setQueryData(['currentUser'], response);
			router.push(DASHBOARD_ROUTES.DASHBOARD);
		},
		onError: (error: Error) => {
			throw new Error(error.message);
		},
	});
}
