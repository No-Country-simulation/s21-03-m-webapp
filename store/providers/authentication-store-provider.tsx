'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type AuthenticationStore, createAuthenticationStore } from '@/store/authentication/authentication-store';

export type AuthenticationStoreApi = ReturnType<typeof createAuthenticationStore>;

export const AuthenticationStoreContext = createContext<AuthenticationStoreApi | undefined>(undefined);

export interface AuthenticationStoreProviderProps {
	children: ReactNode;
}

export const AuthenticationStoreProvider = ({ children }: AuthenticationStoreProviderProps) => {
	const storeRef = useRef<AuthenticationStoreApi>(null);

	if (!storeRef.current) {
		storeRef.current = createAuthenticationStore();
	}

	return <AuthenticationStoreContext.Provider value={storeRef.current}>{children}</AuthenticationStoreContext.Provider>;
};

export const useAuthenticationStore = <T,>(selector: (store: AuthenticationStore) => T): T => {
	const authenticationStoreContext = useContext(AuthenticationStoreContext);

	if (!authenticationStoreContext) {
		throw new Error(`useAuthenticationStore must be used within AuthenticationStoreProvider`);
	}

	return useStore(authenticationStoreContext, selector);
};
