'use client';

import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthenticationContext';
import { useRouter } from 'next/navigation';
import { WEBSITE_ROUTES } from '@/constants/routes';

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			console.log('⏩ Protected Route: Redirecting to HOME...');
			router.push(WEBSITE_ROUTES.HOME);
		}
	}, [loading, user, router]);

	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<div className="animate-spin w-14 h-14 border-[3px] border-primary border-t-transparent rounded-full"></div>
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
