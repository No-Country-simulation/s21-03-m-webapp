'use client';

import Link from 'next/link';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<nav className="flex flex-row gap-2 justify-between items-center h-[4rem] bg-red-300">
				<div className="w-[90%] m-auto h-full flex items-center justify-between">
					<Link href={'/register'}>Registrarse</Link>
					<Link href={'/login'}>Login</Link>
					<Link href={'/dashboard'}>Dashboard</Link>
				</div>
			</nav>
			{children}
		</div>
	);
}
