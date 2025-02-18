import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { DASHBOARD_ROUTES } from '../../constants/routes';
import { registerUser } from '../authentication';
import { useAuth } from '../../context/AuthenticationContext';

export function useRegisterUser() {
	const router = useRouter();
	const { updateUser, updateToken } = useAuth();

	return useMutation({
		mutationFn: registerUser,
		onSuccess: (response) => {
			updateUser(response.user);
			updateToken(response.token);
			router.push(DASHBOARD_ROUTES.DASHBOARD);
		},
		onError: (error: Error) => {
			throw new Error(error.message);
		},
	});
}
