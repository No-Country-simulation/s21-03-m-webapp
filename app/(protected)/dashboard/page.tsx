'use client';

import { useAuth } from '@/context/AuthenticationContext';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { WEBSITE_ROUTES } from '../../../constants/routes';

const DashboardPage = () => {
	const router = useRouter();
	const { user, logoutUser } = useAuth();

	if (user)
		return (
			<>
				<h1>Welcome, {user.email}!</h1>
				<p>Role: {user.role}</p>
				<Button
					onClick={() => {
						logoutUser();
						router.push(WEBSITE_ROUTES.HOME);
					}}
				>
					Logout
				</Button>
			</>
		);
};

export default DashboardPage;
