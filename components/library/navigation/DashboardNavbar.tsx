'use client';

import Link from 'next/link';
import { dashboard_links, WEBSITE_ROUTES } from '../../../constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthenticationContext';
import { Container } from '../structure';
import { DoorOpen } from 'lucide-react';

const DashboardNavbar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { logoutUser } = useAuth();

	return (
		<nav className="hidden md:block fixed w-full h-[5rem] bg-white top-0 drop-shadow-md sm:flex flex-row items-center justify-center z-30">
			{/* Desktop */}
			<Container className="h-full nav-max-w-1200 flex flex-row justify-between items-center">
				{dashboard_links.map((link) => {
					const { id, name, icon: Icon, url } = link;
					const isActive = pathname === url;
					return (
						<Link
							key={id}
							href={url}
							className={`flex flex-col items-center transition-all delay-75 ${
								isActive ? 'text-chart-1' : 'hover:text-chart-1'
							}`}
						>
							<Icon />
							<p className="font-thin text-sm">{name}</p>
							{isActive && <span className="w-full border-b border-chart-1"></span>}
						</Link>
					);
				})}
				<div
					className="cursor-pointer flex flex-col items-center hover:text-chart-1 transition-all delay-75"
					onClick={() => {
						logoutUser();
						router.push(WEBSITE_ROUTES.HOME);
					}}
				>
					<DoorOpen></DoorOpen>
					<p className="font-thin text-sm">Salir</p>
				</div>
			</Container>
		</nav>
	);
};

export default DashboardNavbar;
