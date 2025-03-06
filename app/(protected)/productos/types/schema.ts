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
import { UseMutationResult } from '@tanstack/react-query';

type typeForm = 'category' | 'products';
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
	defaultValues?: EditProductRequest | CreateProductRequest | EditCategoryRequest;
}
export interface SchemaModal {
	typeModal: 'create' | 'update' | 'delete';
	title: string | React.ReactNode;
	description: React.ReactNode | string;
	buttonModal: React.ReactNode;
	schemaForm?: schemaComponentForm;
}
