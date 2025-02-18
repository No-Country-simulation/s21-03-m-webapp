'use client';

import { useAuth } from '../../context/AuthenticationContext';

const DashboardPage = () => {
	const { token } = useAuth();

	return (
		<>
			<div>token : {token} </div>
		</>
	);
};

export default DashboardPage;
