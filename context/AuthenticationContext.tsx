'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentUserQuery } from '@/actions/hooks/useCurrentUser';
import { AuthenticationContextType } from '@/types/authentication';
import { COOKIE_NAME } from '../constants/app_constants';

const MyAuthContext = createContext<AuthenticationContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(Cookies.get(COOKIE_NAME) || null);

	const { data, isLoading, isError, refetch } = useCurrentUserQuery(token);

	useEffect(() => {
		if (isError && token) {
			console.log('⛔ Token inválido. Cerrando sesión...');
			logoutUser();
		}
	}, [isError, token]);

	const updateToken = (newToken: string | null) => {
		if (!newToken) {
			logoutUser();
			return;
		}
		Cookies.set(COOKIE_NAME, newToken, { expires: 7 });
		setToken(newToken);
		refetch();
	};

	const logoutUser = () => {
		Cookies.remove(COOKIE_NAME);
		setToken(null);
	};
	return (
		<MyAuthContext.Provider
			value={{
				token,
				user: data?.user || null,
				loading: isLoading,
				updateToken,
				logoutUser,
			}}
		>
			{children}
		</MyAuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(MyAuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
