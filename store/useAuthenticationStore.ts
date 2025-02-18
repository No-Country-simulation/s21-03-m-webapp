import { create } from 'zustand';
import { Msg, Token, User } from '../types/authentication';

export interface InitialState {
	msg: Msg | null;
	user: User | null;
	token: Token | null;
	updataMsg: (msg: Msg) => void;
	updateUser: (user: User) => void;
	updateToken: (token: Token) => void;
}

const useAuthenticationStore = create<InitialState>((set) => ({
	msg: null,
	user: null,
	token: null,
	updataMsg: (msg: Msg) => set(() => ({ msg: msg })),
	updateUser: (user: User) => set(() => ({ user: user })),
	updateToken: (token: Token) => set(() => ({ token: token })),
}));

export default useAuthenticationStore;
