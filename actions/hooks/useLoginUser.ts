import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../actions/authentication';
import { DASHBOARD_ROUTES } from '../../constants/routes';
import { useAuthenticationStore } from '../../store';

export function useLoginUser() {
	const router = useRouter();
	const { updateUser, updateToken } = useAuthenticationStore();

	return useMutation({
		mutationFn: loginUser,
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
