import axios from 'axios';
import { ALL_PRODUCTS, CREATE_PRODUCT, PRODUCT_BY_CATEGORY, SALONES, SERVER_ERROR } from '../constants/app_constants';
import {
	AllProductsResponse,
	CreateProductRequest,
	CreateProductResponse,
	DeleteProductResponse,
	EditProductRequest,
	EditProductResponse,
	Product,
} from '../types/products';
import protected_api from './api/protected_api';

export async function getProducts(): Promise<Array<Product>> {
	try {
		const response = await protected_api.get<AllProductsResponse>(`${ALL_PRODUCTS}`);
		return response.data.products;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function getProductsByCategory(categoryId: string): Promise<Array<Product>> {
	try {
		const response = await protected_api.get<AllProductsResponse>(`${PRODUCT_BY_CATEGORY}/${categoryId}`);
		return response.data.products;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function createProduct(body: CreateProductRequest): Promise<CreateProductResponse> {
	try {
		const response = await protected_api.post<CreateProductResponse>(`${CREATE_PRODUCT}`, body);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function editProduct(body: EditProductRequest): Promise<EditProductResponse> {
	try {
		const response = await protected_api.put<EditProductResponse>(`${CREATE_PRODUCT}/${body.id}`, body);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}

export async function deleteProduct(id: string): Promise<DeleteProductResponse> {
	try {
		const response = await protected_api.delete<DeleteProductResponse>(`${CREATE_PRODUCT}/${id}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		}
		throw new Error(SERVER_ERROR);
	}
}
