import { create } from 'zustand';
import { Token, User } from '../types/authentication';

export interface InitialState {
	user: User | null;
	token: Token | null;
	updateUser: (user: User) => void;
	updateToken: (token: Token) => void;
}

const useAuthenticationStore = create<InitialState>((set) => ({
	user: null,
	token: null,
	updateUser: (user: User) => set(() => ({ user: user })),
	updateToken: (token: Token) => set(() => ({ token: token })),
}));

export default useAuthenticationStore;
