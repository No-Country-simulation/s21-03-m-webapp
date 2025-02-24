'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentUserQuery } from '@/actions/hooks/authentication/useCurrentUser';
import { AuthenticationContextType, User } from '@/types/authentication';
import { COOKIE_NAME } from '../constants/app_constants';

const MyAuthContext = createContext<AuthenticationContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(() => Cookies.get(COOKIE_NAME) || null);
	const [user, setUser] = useState<User | null>(null);
	const [authChecked, setAuthChecked] = useState(false);

	const { data, isLoading, isError, refetch } = useCurrentUserQuery(token);

	useEffect(() => {
		if (data?.token) {
			setToken(data.token);
			Cookies.set(COOKIE_NAME, data.token, { expires: 7 });
		}
		if (data?.user) {
			setUser(data.user);
		}
		if (!isLoading) {
			setAuthChecked(true);
		}
	}, [data, isLoading]);

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
		setUser(null);
		setAuthChecked(false);
	};

	return (
		<MyAuthContext.Provider
			value={{
				token,
				user,
				loading: isLoading,
				authChecked,
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
