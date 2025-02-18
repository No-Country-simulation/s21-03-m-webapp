import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { DASHBOARD_ROUTES } from '../../constants/routes';
import useAuthenticationStore from '../../store/useAuthenticationStore';
import { RegisterUser } from '../authentication';

export function useRegisterUser() {
	const router = useRouter();
	const { updateUser, updateToken } = useAuthenticationStore();

	return useMutation({
		mutationFn: RegisterUser,
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
