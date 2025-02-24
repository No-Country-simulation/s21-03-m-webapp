import axios from 'axios';
import protected_api from './api/protected_api';
import { SALONES, SERVER_ERROR, TABLES } from '@/constants/app_constants';
import { Table, TableRequest, TableResponse } from '../types/tables';

export async function getTables(salonId: string): Promise<Array<Table>> {
	try {
		const response = await protected_api.get<Array<Table>>(`${SALONES}/${salonId}${TABLES}`);
		// TODO - Remove after test
		console.log(response.data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function createTable(body: TableRequest): Promise<TableResponse> {
	try {
		console.log(body);
		const response = await protected_api.post<TableResponse>(`${SALONES}/${body.salonId}${TABLES}`, body);
		// TODO - Remove after test
		console.log(response.data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}
