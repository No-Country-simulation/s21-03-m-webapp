'use client';

import { useAuthenticationStore } from '../../store/providers/authentication-store-provider';

const DashboardPage = () => {
	const { user, role, token } = useAuthenticationStore((state) => state);
	return (
		<>
			<div>Dashboard de: {user?.email} </div>
			<div>role : {role} </div>
			<div>token : {token} </div>
		</>
	);
};

export default DashboardPage;
