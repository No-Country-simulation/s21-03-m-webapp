'use client';
export const dynamic = 'force-static';

import Link from 'next/link';
import { VerticalContainer, Container } from '../../components/library/structure';
import { useRouter } from 'next/navigation';
import { DASHBOARD_ROUTES, WEBSITE_ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthenticationContext';
import { ProtectedRoute } from '../../components/library/routing';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { logoutUser } = useAuth();

	return (
		<ProtectedRoute>
			<nav className="flex flex-row gap-2 justify-between items-center h-[4rem] bg-red-300">
				<div className="w-[90%] m-auto h-full flex items-center justify-between">
					<Link href={DASHBOARD_ROUTES.DASHBOARD}>Inicio</Link>
					<Link href={DASHBOARD_ROUTES.MESAS}>Mesas</Link>
					<Link href={DASHBOARD_ROUTES.VENTAS}>Ventas</Link>
					<Link href={DASHBOARD_ROUTES.PRODUCTOS}>Productos</Link>
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
		</ProtectedRoute>
	);
}
