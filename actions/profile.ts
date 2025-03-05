import axios from 'axios';
import { PROFILE_EDIT, SERVER_ERROR } from '../constants/app_constants';
import { ProfileResponse } from '../types/profile';
import protected_api from './api/protected_api';

export async function updateProfile(body: FormData): Promise<ProfileResponse> {
	try {
		const response = await protected_api.put<ProfileResponse>(`${PROFILE_EDIT}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}
