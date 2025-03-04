import { useQuery } from '@tanstack/react-query';
import { Table } from '@/types/tables';
import { getTables } from '@/actions/tables';

export const useTables = (salonId: string) => {

	return useQuery<Array<Table>>({
		queryKey: ['tables', salonId],
		queryFn: () => {
			return getTables(salonId);
		},
		retry: 1,
		staleTime: 1000 * 60 * 5,
	});
};
