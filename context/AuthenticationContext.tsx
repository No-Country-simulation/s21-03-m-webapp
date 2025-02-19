'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentUserQuery } from '@/actions/hooks/useCurrentUser';
import { AuthenticationContextType, User } from '@/types/authentication';

/**
 * Definimos el shape del contexto: guardamos `token`,
 * exponemos el `user` leyendo la query de React Query,
 * e incluimos `loading`, funciones de logout, etc.
 */
const MyAuthContext = createContext<AuthenticationContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(Cookies.get('Mesa360-Token') || null);

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
		Cookies.set('Mesa360-Token', newToken, { expires: 7 });
		setToken(newToken);
		refetch();
	};

	const logoutUser = () => {
		Cookies.remove('Mesa360-Token');
		setToken(null);
	};
	return (
		<MyAuthContext.Provider
			value={{
				token,
				user: data?.user || null,
				loading: isLoading,
				updateToken,
				updateUser: () => {
					// Si quisieras "forzar" la mutación o un optimistic update, podrías usar:
					// queryClient.setQueryData(['currentUser', token], (old) => ({ ...old, user: newUser }))
					// pero aquí lo dejamos vacío o implementas según necesites.
				},
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
