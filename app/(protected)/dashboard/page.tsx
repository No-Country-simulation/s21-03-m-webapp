'use client';

import { useAuth } from '@/context/AuthenticationContext';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { WEBSITE_ROUTES } from '../../../constants/routes';

const DashboardPage = () => {
	const router = useRouter();
	const { user, logoutUser } = useAuth();

	return (
		<div className="flex flex-col gap-3">
			<h1>Welcome, {user?.email}!</h1>
			<p>Nombre Restaurante: {user?.profile?.name}</p>
			<Button
				onClick={() => {
					logoutUser();
					router.push(WEBSITE_ROUTES.HOME);
				}}
			>
				Logout
			</Button>
		</div>
	);
};

export default DashboardPage;
