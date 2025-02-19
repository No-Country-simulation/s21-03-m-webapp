import axios from 'axios';
import { AuthenticationResponse } from '../types/authentication';
import { LoginFormData, RegisterFormData } from '../schemas/authenticationSchema';
import { CURRENT_USER, LOGIN_URL, REGISTER_URL, SERVER_ERROR } from '../constants/app_constants';
import public_api from './api/public_api';
import protectedApi from './api/protected_api';

export async function loginUser(body: LoginFormData): Promise<AuthenticationResponse> {
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

export async function registerUser(body: RegisterFormData): Promise<AuthenticationResponse> {
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
		const response = await protectedApi.get<AuthenticationResponse>(`${CURRENT_USER}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}
