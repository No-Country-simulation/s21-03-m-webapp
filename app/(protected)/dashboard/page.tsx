'use client';

import { useAuth } from '@/context/AuthenticationContext';
import { Button } from '../../../components/ui/button';

const DashboardPage = () => {
	const { user, logoutUser } = useAuth();

	if (user)
		return (
			<>
				<h1>Welcome, {user.email}!</h1>
				<p>Role: {user.role}</p>
				<Button onClick={logoutUser}>Logout</Button>
			</>
		);
};

export default DashboardPage;
