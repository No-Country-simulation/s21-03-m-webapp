'use client';

import Link from 'next/link';
import { VerticalContainer, Container } from '../../components/library/structure';
import { useRouter } from 'next/navigation';
import { DASHBOARD_ROUTES, WEBSITE_ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthenticationContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { logoutUser } = useAuth();

	return (
		<div>
			<nav className="flex flex-row gap-2 justify-between items-center h-[4rem] bg-red-300">
				<div className="w-[90%] m-auto h-full flex items-center justify-between">
					<Link href={DASHBOARD_ROUTES.MESAS}>Mesas</Link>
					<Link href={'/dashboard/ventas'}>Ventas</Link>
					<Link href={'/dashboard/productos'}>Productos</Link>
					<span
						onClick={() => {
							logoutUser();
							router.push(WEBSITE_ROUTES.HOME);
						}}
					>
						Salir
					</span>
				</div>
			</nav>
			<VerticalContainer escape={'all'}>
				<Container>{children}</Container>
			</VerticalContainer>
		</div>
	);
}
