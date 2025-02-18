export interface LoginRequest {
	username: string;
	password: string;
}

export interface Msg{
	msg: string;
}

interface Profile {
	name: string;
	address: string;
	logo: string;
	phone: string;
	email: string;
}
export interface User {
	id: string;
	email: string;
	role: string;
	profile: Profile;
}

export interface Token {
	token: string;
}

export interface AuthenticationResponse {
	user: User;
	token: Token;
}
