'use client';

import Link from 'next/link';
import { VerticalContainer, Container } from '../../components/library/structure';
import { WEBSITE_ROUTES } from '../../constants/routes';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<nav className="w-full h-[5rem] bg-white fixed top-0 drop-shadow-sm sm:flex flex-row items-center justify-center z-30">
				<div className="w-[90%] m-auto h-full flex items-center justify-between">
					<Link href={WEBSITE_ROUTES.HOME}>Inicio</Link>
					<Link href={WEBSITE_ROUTES.REGISTER}>Registrarse</Link>
					<Link href={WEBSITE_ROUTES.LOGIN}>Login</Link>
				</div>
			</nav>
			<VerticalContainer escape={'all'}>
				<Container className="bg-background text-foreground">{children}</Container>
			</VerticalContainer>
		</>
	);
}
