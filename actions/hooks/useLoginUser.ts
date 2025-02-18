import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../actions/authentication';
import { DASHBOARD_ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthenticationContext';

export function useLoginUser() {
	const router = useRouter();
	const { updateToken } = useAuth();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (response) => {
			updateToken(response.token);
			router.push(DASHBOARD_ROUTES.DASHBOARD);
		},
		onError: (error: Error) => {
			throw new Error(error.message);
		},
	});
}
