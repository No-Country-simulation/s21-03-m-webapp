'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthenticationContextType } from '../types/authentication';

const MyAuthContext = createContext<AuthenticationContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const cookieToken = Cookies.get('Mesa360-Token');
		if (cookieToken) {
			setToken(cookieToken);
		}
		setLoading(false);
	}, []);

	// =========================
	//  Functions
	// =========================
	const updateToken = (newToken: string) => {
		if (newToken) {
			Cookies.set('Mesa360-Token', newToken, {
				expires: 7,
				secure: false,
			});
		} else {
			Cookies.remove('Mesa360-Token');
		}
		setLoading(false);
	};

	const logoutUser = () => {
		setToken(null);
		Cookies.remove('Mesa360-Token');
		setLoading(false);
	};

	return (
		<MyAuthContext.Provider value={{ token, loading, updateToken, logoutUser }}>{children}</MyAuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(MyAuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
