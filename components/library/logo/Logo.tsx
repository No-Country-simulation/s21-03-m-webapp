import Link from 'next/link';
import { DASHBOARD_ROUTES, WEBSITE_ROUTES } from '../../../constants/routes';

const Logo = ({ toDashboard }: { toDashboard?: boolean }) => {
	return (
		<Link href={!toDashboard ? WEBSITE_ROUTES.HOME : DASHBOARD_ROUTES.MESAS} className="flex flex-row gap-1">
			<h2 className="text-2xl text-primary font-thin">Mesa</h2>
			<span className="text-chart-1 text-lg font-bold">360</span>
		</Link>
	);
};

export default Logo;
