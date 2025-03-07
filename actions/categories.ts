import axios from 'axios';
import { ALL_CATEGORIES, CREATE_CATEGORY, SERVER_ERROR } from '../constants/app_constants';
import {
	AllCategoriesResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
	DeleteCategoryResponse,
	EditCategoryRequest,
	EditCategoryResponse,
	Category,
} from '../types/category';
import protected_api from './api/protected_api';

export async function getCategories(): Promise<Array<Category>> {
	try {
		const response = await protected_api.get<AllCategoriesResponse>(`${ALL_CATEGORIES}`);
		return response.data.categories;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function createCategory(body: CreateCategoryRequest): Promise<CreateCategoryResponse> {
	try {
		const response = await protected_api.post<CreateCategoryResponse>(`${CREATE_CATEGORY}`, body);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function editCategory(body: EditCategoryRequest): Promise<EditCategoryResponse> {
	try {
		const response = await protected_api.put<EditCategoryResponse>(`${CREATE_CATEGORY}/${body.id}`, body);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function deleteCategory(id: string): Promise<DeleteCategoryResponse> {
	try {
		const response = await protected_api.delete<DeleteCategoryResponse>(`${CREATE_CATEGORY}/${id}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}
