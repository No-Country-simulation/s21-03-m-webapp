export interface LoginRequest {
	username: string;
	password: string;
}

export interface User {
	id: string;
	email: string;
	role: 'Owner' | 'Member' | 'Cashier' | 'Waiter';
}

export interface AuthenticationResponse {
	user: User;
	token: string;
}

export interface AuthenticationContextType {
	user: User | null;
	token: string | null;
	loading: boolean;
	updateUser: (user: User) => void;
	updateToken: (token: string) => void;
	logoutUser: () => void;
}
