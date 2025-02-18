import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../actions/authentication';
import { DASHBOARD_ROUTES } from '../../constants/routes';
import { useAuthenticationStore } from '../../store/providers/authentication-store-provider';

export function useLoginUser() {
	const router = useRouter();
	const { updateRole, updateToken, updateUser } = useAuthenticationStore((state) => state);

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (response) => {
			console.log(response);
			updateUser(response.user);
			updateRole(response.user.role);
			updateToken(response.token);
			router.push(DASHBOARD_ROUTES.DASHBOARD);
		},
		onError: (error: Error) => {
			throw new Error(error.message);
		},
	});
}
