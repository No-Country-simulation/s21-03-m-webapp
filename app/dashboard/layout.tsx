import Link from 'next/link';
import { VerticalContainer, Container } from '../../components/library/structure';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<nav className="flex flex-row gap-2 justify-between items-center h-[4rem] bg-red-300">
				<div className="w-[90%] m-auto h-full flex items-center justify-between">
					<Link href={'/dashboard/mesas'}>Mesas</Link>
					<Link href={'/dashboard/ventas'}>Ventas</Link>
					<Link href={'/dashboard/productos'}>Productos</Link>
					<Link href={'/'}>Salir</Link>
				</div>
			</nav>
			<VerticalContainer escape={'all'}>
				<Container>{children}</Container>
			</VerticalContainer>
		</div>
	);
}
