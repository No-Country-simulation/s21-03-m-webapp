import {
	ALL_CATEGORIES,
	ALL_PRODUCTS,
	CREATE_CATEGORY,
	CREATE_PRODUCT,
	DELETE_CATEGORY,
	DELETE_PRODUCT,
	PRODUCT_BY_CATEGORY,
	UPDATE_CATEGORY,
	UPDATE_PRODUCT,
} from '../../../../constants/app_constants';
import { customFetch } from './customFetch';
import {
	DeleteCategoryResponse,
	GetCategoriesResponse,
	EditCategoryRequest,
	EditCategoryResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
} from '../../../../types/category';
import {
	AllProductsResponse,
	CreateProductRequest,
	CreateProductResponse,
	DeleteProductResponse,
	EditProductResponse,
} from '../../../../types/products';

export const fetchAllCategories = async () => {
	const res = await customFetch<GetCategoriesResponse>({
		url: ALL_CATEGORIES,
		requestType: 'protected_api',
		peticion: 'GET',
	});
	return res;
};
export const fetchDeleteCategory = async (id: string) => {
	const res = await customFetch<DeleteCategoryResponse>({
		url: `${DELETE_CATEGORY}/${id}`,
		requestType: 'protected_api',
		peticion: 'DELETE',
	});
	return res;
};

export const fetchEditCategory = async (id: string, dataForm?: EditCategoryRequest) => {
	const res = await customFetch<EditCategoryResponse>({
		url: `${UPDATE_CATEGORY}/${id}`,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'PUT',
	});
	return res;
};
export const fetchCreateCategory = async (dataForm: CreateCategoryRequest) => {
	const res = await customFetch<CreateCategoryResponse>({
		url: CREATE_CATEGORY,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'POST',
	});
	return res;
};
/* -----------Products----------- */
export const fetchCreateProduct = async (dataForm: CreateProductRequest) => {
	const res = await customFetch<CreateProductResponse>({
		url: CREATE_PRODUCT,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'POST',
	});
	return res;
};

export const fetchEditProduct = async (id: string, dataForm: CreateProductRequest) => {
	const res = await customFetch<EditProductResponse>({
		url: `${UPDATE_PRODUCT}/${id}`,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'PUT',
	});
	return res;
};

export const fetchDeleteProduct = async (id: string) => {
	const res = await customFetch<DeleteProductResponse>({
		url: `${DELETE_PRODUCT}/${id}`,
		requestType: 'protected_api',
		peticion: 'DELETE',
	});
	return res;
};

export const fetchAllProducts = async () => {
	const res = await customFetch<AllProductsResponse>({
		url: ALL_PRODUCTS,
		requestType: 'protected_api',
		peticion: 'GET',
	});
	return res;
};
export const fetchProductByCategory = async (idCategory: string) => {
	const res = await customFetch<AllProductsResponse>({
		url: `${PRODUCT_BY_CATEGORY}/${idCategory}`,
		requestType: 'protected_api',
		peticion: 'GET',
	});
	return res;
};
