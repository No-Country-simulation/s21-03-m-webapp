'use server';

import { Metadata } from 'next';
import { MembersPageClient } from './_components/MemberPageClient';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Mesa 360 - Miembros',
		description: 'Mesa 360 - Miembros',
	};
}

export default async function MembersPage() {
	return <MembersPageClient />;
}
