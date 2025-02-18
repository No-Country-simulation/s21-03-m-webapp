'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthenticationContextType, User } from '../types/authentication';
import { currentUser } from '../actions/authentication';

const MyAuthContext = createContext<AuthenticationContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(Cookies.get('Mesa360-Token') || null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const validateUser = async () => {
			if (token && !user) {
				try {
					const response = await currentUser(token);
					setUser(response.user);
					setToken(response.token);
				} catch (error) {
					console.log('Error al fetchear user: ', error);
					logoutUser();
				}
			}
			setLoading(false);
		};
		validateUser();
	}, [token, user]);

	// =========================
	//  Functions
	// =========================
	const updateUser = (newUser: User) => {
		setUser(newUser);
		setLoading(false);
	};

	const updateToken = (newToken: string) => {
		if (newToken) {
			Cookies.set('Mesa360-Token', newToken, {
				expires: 7,
			});
			setToken(newToken);
		} else {
			Cookies.remove('Mesa360-Token');
			setToken(null);
		}
		setLoading(false);
	};

	const logoutUser = () => {
		setUser(null);
		setToken(null);
		Cookies.remove('Mesa360-Token');
		setLoading(false);
	};

	return (
		<MyAuthContext.Provider value={{ user, token, loading, updateUser, updateToken, logoutUser }}>
			{children}
		</MyAuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(MyAuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
