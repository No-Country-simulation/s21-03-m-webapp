import { useQuery } from '@tanstack/react-query';
import { getSalones } from '../../salones';
import { Salon } from '../../../types/salones';
import { useAuth } from '../../../context/AuthenticationContext';

export const useSalones = () => {
	const { user } = useAuth();
	return useQuery<Array<Salon>>({
		queryKey: ['salones', user?.ownerId],
		queryFn: () => {
			return getSalones();
		},
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
