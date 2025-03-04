'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthenticationContext';
import { useRouter } from 'next/navigation';
import { WEBSITE_ROUTES } from '@/constants/routes';

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, loading, authChecked } = useAuth();
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		let redirectTimer: ReturnType<typeof setTimeout>;

		if (isMounted && authChecked && !loading && user === null) {
			console.log('⏩ Protected Route: Redirecting to HOME...');
			// Introduce a short delay, so if 'user' is about to update, we don't redirect prematurely
			redirectTimer = setTimeout(() => {
				router.replace(WEBSITE_ROUTES.HOME);
			}, 300);
		}

		return () => {
			if (redirectTimer) clearTimeout(redirectTimer);
		};
	}, [isMounted, authChecked, loading, user, router]);

	if (!isMounted) {
		return null;
	}

	if (loading || !authChecked) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<div className="animate-spin w-14 h-14 border-[3px] border-primary border-t-transparent rounded-full"></div>
			</div>
		);
	}

	return user ? <>{children}</> : null;
};

export default ProtectedRoute;
