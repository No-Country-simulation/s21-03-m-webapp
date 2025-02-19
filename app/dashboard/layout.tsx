import Link from 'next/link';
import { VerticalContainer, Container } from '../../components/library/structure';
import { DASHBOARD_ROUTES } from '../../constants/routes';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<nav className="w-full h-[5rem] bg-white fixed top-0 drop-shadow-sm sm:flex flex-row items-center justify-center z-30">
				<div className="w-[90%] m-auto h-full flex items-center justify-between">
					<Link href={DASHBOARD_ROUTES.MESAS}>Mesas</Link>
					<Link href={DASHBOARD_ROUTES.VENTAS}>Ventas</Link>
					<Link href={DASHBOARD_ROUTES.PRODUCTOS}>Productos</Link>
					<Link href={'/'}>Salir</Link>
				</div>
			</nav>
			<VerticalContainer escape={'navbar'}>
				<Container>{children}</Container>
			</VerticalContainer>
		</div>
	);
}
