import { HTMLInputTypeAttribute } from 'react';
import {
	CreateProductRequest,
	CreateProductResponse,
	EditProductRequest,
	EditProductResponse,
	Product,
} from '../../../../types/products';
import { FieldPath } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { EditCategoryRequest } from '../../../../types/category';
import {
	fetchCreateCategory,
	fetchDeleteCategory,
	fetchDeleteProduct,
	fetchEditCategory,
	fetchEditProduct,
} from '../api/fetching';
import { UseMutationResult } from '@tanstack/react-query';

type typeForm = 'category' | 'products';
type requestFormTypes =
	| (() => UseMutationResult<EditProductResponse, Error, EditProductRequest, unknown>)
	| (() => UseMutationResult<CreateProductResponse, Error, CreateProductRequest, unknown>)
	| typeof fetchCreateCategory
	| typeof fetchEditCategory
	| typeof fetchDeleteCategory;

type name = FieldPath<EditProductRequest>;
export type campos = {
	name: 'id' | 'categoryId' | 'name' | 'description' | 'price' | 'target';
	label: string;
	type: HTMLInputTypeAttribute;
};

export interface schemaComponentForm {
	
	type?: typeForm;
	title?: string;
	funtionForm: 'create' | 'update' | 'delete';
	schema: ZodSchema;
	campos: campos[];
	request?: requestFormTypes;
	defaultValues?: EditProductRequest | CreateProductRequest | EditCategoryRequest;
}
export interface SchemaModal {
	typeModal: 'create' | 'update' | 'delete';
	title: string | React.ReactNode;
	description: React.ReactNode | string;
	buttonModal: React.ReactNode;
	schemaForm?: schemaComponentForm;
}
