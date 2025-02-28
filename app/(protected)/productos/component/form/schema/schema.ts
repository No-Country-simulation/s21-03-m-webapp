import { z, ZodSchema } from 'zod';
import { fetchCreateCategory, fetchCreateProduct } from './requestFromDrawer';
import { request } from 'http';
import { CreateCategoryRequest } from '../../../types/category';
import { CreateProductRequest } from '../../../types/products';
import { FieldPath } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

/* tipos que no se infieren facilmente */
type typeForm = 'A' | 'B';
type requestForm = (data: CreateCategoryRequest | CreateProductRequest) => Promise<any>;
type name = FieldPath<CreateProductRequest> | FieldPath<CreateCategoryRequest>;
export type campos = { name: name; label: string; type: HTMLInputTypeAttribute };

interface schemaCategory {
	type: typeForm;
	title: string;
	campos: campos[];
	schema: ZodSchema;
	request: requestForm;
}
const schemaCategory = z.object({
	name: z.string().min(1, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
});
const schemaProduct = z.object({
	name: z.string().min(1, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
	price: z.number().min(1, {
		message: 'Precio requerido',
	}),
	target: z.string().min(1, {
		message: 'Objetivo requerido',
	}),
	categoryId: z.string().min(1, {
		message: 'Categoria requerida',
	}),
});
export const createProduct: schemaCategory = {
	type: 'A' as typeForm,
	title: 'Crear producto',
	campos: [
		{
			name: 'name',
			label: 'Nombre',
			type: 'text',
		},
		{
			name: 'description',
			label: 'Descripcion',
			type: 'text',
		},
		{
			name: 'price',
			label: 'Precio',
			type: 'number',
		},
		{
			name: 'target',
			label: 'Objetivo',
			type: 'button',
		},
		{
			name: 'categoryId',
			label: 'Categoria',
			type: 'text',
		},
	],
	schema: schemaProduct,
	/* 	defaultValues: {
		name: '',
		description: '',
		price: 0,
		categoryId: '',
		target: '',
	}, */
	request: fetchCreateProduct as requestForm,
};
export const createCategory: schemaCategory = {
	type: 'B' as typeForm,
	title: 'Crear categoria',
	campos: [
		{
			name: 'name',
			label: 'Nombre',
			type: 'text',
		},
		{
			name: 'description',
			label: 'Descripcion',
			type: 'text',
		},
	],
	schema: schemaCategory,
	/* 	defaultValues: {
		name: '',
		description: '',
	}, */
	request: fetchCreateProduct as requestForm,
};
export const formSchemaData: schemaCategory[] = [createCategory, createProduct];
