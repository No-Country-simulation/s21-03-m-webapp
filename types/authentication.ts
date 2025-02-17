export interface LoginRequest {
	username: string;
	password: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	role: string;
}

export interface Token {
	token: string;
}

export interface AuthenticationResponse {
	user: User;
	token: Token;
}
