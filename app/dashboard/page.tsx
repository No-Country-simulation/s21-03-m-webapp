'use client';

import { useAuthenticationStore } from '../../store';

const DashboardPage = () => {
	const { user } = useAuthenticationStore();

	return <div>Dashboard de: {user?.name}</div>;
};

export default DashboardPage;
