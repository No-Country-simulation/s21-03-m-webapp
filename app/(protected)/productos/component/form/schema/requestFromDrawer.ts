import { z } from 'zod';
import { CREATE_CATEGORY, CREATE_PRODUCT } from '../../../../../../constants/app_constants';
import { customFetch } from '../../../api/customFetch';
import { CreateProductRequest } from '../../../types/products';
import { createProduct } from './schema';
import { CreateCategoryRequest } from '../../../types/category';

export const fetchCreateCategory = (dataForm: CreateCategoryRequest) =>
	customFetch({
		url: CREATE_CATEGORY,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'POST',
	});
export const fetchCreateProduct = (dataForm: CreateProductRequest) =>
	customFetch({
		url: CREATE_PRODUCT,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'POST',
	});

// <T extends z.ZodTypeAny>
