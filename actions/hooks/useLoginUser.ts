import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../actions/authentication';
import { DASHBOARD_ROUTES } from '../../constants/routes';

export function useLoginUser() {
	const router = useRouter();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (response) => {
			console.log(response);
			router.push(DASHBOARD_ROUTES.DASHBOARD);
		},
		onError: (error: Error) => {
			throw new Error(error.message);
		},
	});
}
