import { getMembers } from '@/actions/member';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthenticationContext';

export const useMembers = () => {
	const { user } = useAuth();
	return useQuery({
		queryKey: ['members', user?.ownerId],
		queryFn: () => {
			return getMembers();
		},
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
