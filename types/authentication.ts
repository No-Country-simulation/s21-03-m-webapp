export interface LoginRequest {
	username: string;
	password: string;
}

export interface User {
	id: string;
	email: string;
	role: Role;
}

export interface Role {
	role: 'Owner' | 'Member' | 'Cashier' | 'Waiter';
}

export interface AuthenticationResponse {
	user: User;
	token: string;
}

export interface AuthenticationContextType {
	token: string | null;
	loading: boolean;
	updateToken: (token: string) => void;
	logoutUser: () => void;
}
