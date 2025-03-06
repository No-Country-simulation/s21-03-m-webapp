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
		<section className="relative flex flex-col justify-around max-w-1800 m-auto min-h-screen max-h-s p-5">
			{/* Contenido central */}
			<div className="flex flex-col items-center justify-between">
				<h1 className="text-3xl font-bold">Agrega Miembros a tu Staff</h1>
				<p className="text-center mb-5">Crea miembros y asignale sus roles</p>
				<div>{members.length > 0 ? <MemberTabs members={members} /> : <p>No se encontraron miembros todavía</p>}</div>
			</div>

			{/* Botón en la esquina inferior derecha */}
			<div className="w-full flex justify-end">
				<MemberCreateModal />
			</div>
		</section>
	);
};
