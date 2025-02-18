export interface LoginRequest {
	username: string;
	password: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	role: Role;
}

export interface Role {
	role: 'Owner' | 'Member' | 'Cashier' | 'Waiter';
}

export interface Token {
	token: string;
}

export interface AuthenticationResponse {
	user: User;
	token: Token;
}
