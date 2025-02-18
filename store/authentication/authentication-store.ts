import { createStore } from 'zustand/vanilla';
import Cookies from 'js-cookie';
import { Role, Token, User } from '../../types/authentication';

export type AuthenticationState = {
	user: User | null;
	role: Role | null;
	token: Token | null;
};

export type AuthenticationActions = {
	updateUser: (user: User) => void;
	updateRole: (role: Role) => void;
	updateToken: (token: Token) => void;
	logout: () => void;
};

export type AuthenticationStore = AuthenticationState & AuthenticationActions;

export const defaultInitialState: AuthenticationState = {
	user: null,
	role: null,
	token: null,
};

export const createAuthenticationStore = (initState: AuthenticationState = defaultInitialState) => {
	return createStore<AuthenticationStore>()((set) => ({
		...initState,
		updateUser: (user: User) => set(() => ({ user: user })),
		updateRole: (role: Role) => set(() => ({ role: role })),
		updateToken: (token: Token) => {
			Cookies.set('Mesa360-Token', String(token), { expires: 7 });
			set(() => ({ token: token }));
		},
		logout: () => {
			Cookies.remove('Mesa360-Token');
			set(() => ({ user: null, role: null, token: null }));
		},
	}));
};
