import { useDeleteMember } from '@/actions/hooks/members/useDeleteMember';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Member } from '@/types/member';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MemberEditModal } from './MemberEditModal';

type MemberRole = 'Waiter' | 'Cashier';

export const dictionaryRol: Record<MemberRole, string> = {
	Waiter: 'Mesero',
	Cashier: 'Cajero',
};

export function MemberTabs({ members }: { members: Member[] }) {
	const router = useRouter();
	const { mutate: deleteMember } = useDeleteMember();

	return (
		<>
			<Table>
				<TableCaption>Lista de miembros del Staff.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[250px]">Nombre</TableHead>
						<TableHead className="w-[250px]">Rol</TableHead>
						<TableHead>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{members.map((member) => (
						<TableRow key={member._id}>
							<TableCell className="font-medium">{member.name}</TableCell>
							<TableCell>{dictionaryRol[member.rol]}</TableCell>
							<TableCell className="flex gap-5">
								<MemberEditModal member={member} />

								<button
									onClick={() => deleteMember(member._id)}
									className="cursor-pointer transition hover:underline text-2xl font-bold flex items-center gap-2 hover:text-chart-1"
								>
									<X className="w-4 text-red-500 hover:text-chart-1 hover:text-red-700" />
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
