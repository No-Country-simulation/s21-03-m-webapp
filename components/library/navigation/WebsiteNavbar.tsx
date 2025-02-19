import Link from 'next/link';
import { Logo } from '../logo';
import { Container } from '../structure';
import { WEBSITE_ROUTES } from '../../../constants/routes';

const WebsiteNavbar = () => {
	return (
		<nav className="w-full h-[4.6rem] bg-white fixed top-0 drop-shadow-md sm:flex flex-row items-center justify-center z-30">
			<Container className="h-full nav-max-w-1600 flex flex-row justify-between items-center">
				<Logo></Logo>
				<div className="flex flex-row gap-5">
					<Link href={WEBSITE_ROUTES.LOGIN} className="text-lg font-thin">
						Entrar
					</Link>
				</div>
			</Container>
		</nav>
	);
};

export default WebsiteNavbar;
