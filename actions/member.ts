import { MEMBER, SERVER_ERROR } from '@/constants/app_constants';
import protected_api from './api/protected_api';
import { isAxiosError } from 'axios';
import { MemberFormData } from '@/schemas/memberSchema';
import { Member } from '@/types/member';

export async function deleteMember(id: string) {
	try {
		const response = await protected_api.delete(`${MEMBER}/${id}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function getMembers(): Promise<Member[]> {
	try {
		const response = await protected_api<Member[]>(MEMBER);
		return response.data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function getMemberById(memberId: string): Promise<Member> {
	try {
		const response = await protected_api<Member>(`${MEMBER}/${memberId}`);
		return response.data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function createMember(body: MemberFormData) {
	try {
		const response = await protected_api.post(MEMBER, body);
		return response.data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function updateMember({ body, id }: { body: MemberFormData; id: string }) {
	console.log(body, id);
	try {
		const response = await protected_api.put(`${MEMBER}/${id}`, body);
		return response.data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}
