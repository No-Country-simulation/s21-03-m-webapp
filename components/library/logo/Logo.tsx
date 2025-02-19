import Link from 'next/link';
import { WEBSITE_ROUTES } from '../../../constants/routes';

const Logo = () => {
	return (
		<Link href={WEBSITE_ROUTES.HOME} className="flex flex-row gap-1">
			<h2 className="text-2xl text-primary font-thin">Mesa</h2>
			<span className="text-destructive text-lg font-bold">360</span>
		</Link>
	);
};

export default Logo;
