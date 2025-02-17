'use client';

import Link from 'next/link';
import { VerticalContainer, Container } from '../../components/library/structure';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<nav className="fixed w-full z-50 flex flex-row gap-2 justify-between items-center h-[4rem] bg-red-300">
				<div className="w-[90%] m-auto h-full flex items-center justify-between">
					<Link href={'/register'}>Registrarse</Link>
					<Link href={'/login'}>Login</Link>
					<Link href={'/dashboard'}>Dashboard</Link>
				</div>
			</nav>
			<VerticalContainer escape={'all'}>
				<Container className="bg-background text-foreground">{children}</Container>
			</VerticalContainer>
		</>
	);
}
