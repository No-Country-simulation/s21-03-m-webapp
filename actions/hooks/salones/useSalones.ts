import { useQuery } from '@tanstack/react-query';
import { getSalones } from '../../salones';
import { Salon } from '../../../types/mesas';

export const useSalones = () => {
	return useQuery<Array<Salon>>({
		queryKey: ['salones'],
		queryFn: () => {
			return getSalones();
		},
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
