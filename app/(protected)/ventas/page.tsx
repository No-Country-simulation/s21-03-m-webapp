'use server';

import { Metadata } from 'next';
import VentasClientPage from './_components/VentasClientPage';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Mesa 360 - Ventas',
		description: 'Mesa 360 - Ventas',
	};
}

export default async function MembersPage() {
	return (
		<div className="grid sm:grid-cols-2">
			<VentasClientPage />
		</div>
	);
}
