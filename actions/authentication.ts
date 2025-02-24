import axios from 'axios';
import { AuthenticationResponse, AuthenticationRequest } from '../types/authentication';
import { CURRENT_USER, LOGIN_URL, REGISTER_URL, SERVER_ERROR } from '../constants/app_constants';
import public_api from './api/public_api';
import protected_api from './api/protected_api';

export async function loginUser(body: AuthenticationRequest): Promise<AuthenticationResponse> {
	try {
		const response = await public_api.post<AuthenticationResponse>(`${LOGIN_URL}`, body);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function registerUser(body: AuthenticationRequest): Promise<AuthenticationResponse> {
	try {
		const response = await public_api.post<AuthenticationResponse>(`${REGISTER_URL}`, body);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function currentUser(): Promise<AuthenticationResponse> {
	try {
		const response = await protected_api.get<AuthenticationResponse>(`${CURRENT_USER}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}
