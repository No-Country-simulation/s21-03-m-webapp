'use client';

import { useMembers } from '@/actions/hooks/members/useMembers';
import { ApiLoader } from '@/components/library/loading';
import { MemberCreateModal } from './MemberCreateModal';
import { MemberTabs } from './MemberTabs';

export const MembersPageClient = () => {
	const { data: members = [], isPending, isError } = useMembers();

	if (isPending) return <ApiLoader isPending />;
	if (isError) return <h2>Ocurrió un error, intente más tarde...</h2>;

	return (
		<section className=" flex flex-col items-center justify-center max-w-1800 m-auto">
			<h1 className="text-3xl font-bold">Agrega Miembros a tu Staff</h1>
			<p className="text-center mb-5">Crea miembros y asignale sus roles</p>

			<div>{members.length > 0 ? <MemberTabs members={members} /> : <p>No se encontraron miembros todavía</p>}</div>

			<MemberCreateModal />
		</section>
	);
};

export default MembersPageClient;
