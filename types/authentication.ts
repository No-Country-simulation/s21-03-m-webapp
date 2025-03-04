import { Profile } from './profile';

export interface AuthenticationRequest {
	email: string;
	password: string;
}

export interface AuthenticationResponse {
	user: User;
	token: string;
}

export interface User {
	id: string;
	email: string;
	role: 'Owner' | 'Member' | 'Cashier' | 'Waiter';
	profile: Profile;
	ownerId: string;
}

export interface AuthenticationContextType {
	user: User | null;
	token: string | null;
	loading: boolean;
	authChecked: boolean;
	updateToken: (token: string) => void;
	logoutUser: () => void;
}
