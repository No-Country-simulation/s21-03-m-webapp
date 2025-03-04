import { useQuery } from '@tanstack/react-query';
import { currentUser } from '@/actions/authentication';
import { AuthenticationResponse } from '@/types/authentication';

export const useCurrentUserQuery = (token: string | null) => {
	return useQuery<AuthenticationResponse>({
		queryKey: ['currentUser', token],
		queryFn: () => {
			if (!token) throw new Error('No token available');
			return currentUser();
		},
		enabled: !!token,
		retry: 1,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
};
