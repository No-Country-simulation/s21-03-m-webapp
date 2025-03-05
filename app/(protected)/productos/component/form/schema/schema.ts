import { z } from 'zod';
import { CreateCategoryRequest } from '../../../types/category';
import { CreateProductRequest } from '../../../types/products';
import { FieldPath } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';
import { schemaComponentForm } from '../../../types/schema';
import { fetchAllCategories, fetchCreateCategory, fetchCreateProduct } from '../../../api/fetching';

/* tipos que no se infieren facilmente */
type typeForm = 'A' | 'B';
type requestForm = (data: CreateCategoryRequest | CreateProductRequest) => Promise<any>;
type name = FieldPath<CreateProductRequest> | FieldPath<CreateCategoryRequest>;
export type campos = { name: name; label: string; type: HTMLInputTypeAttribute };

const schemaCategory = z.object({
	name: z.string().min(1, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
});

const schemaProduct = z.object({
	name: z.string().min(2, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
	price: z
		.string()
		.transform(Number)
		.refine((value) => !isNaN(value), {
			//validamos que sea un numero
			message: 'Price must be a number',
		}),
	target: z.string().min(1, {
		message: 'Objetivo requerido',
	}),
	categoryId: z.string().min(1, {
		message: 'Categoria requerida',
	}),
});
export const createProduct: schemaComponentForm = {
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
			type: 'button',
		},
	],
	schema: schemaProduct,
	defaultValues: {
		name: '',
		description: '',
		price: 0,
		categoryId: '123',
		target: 'bar',
	},
	request: fetchCreateProduct as requestForm,
};
export const createCategory: schemaComponentForm = {
	type: 'B',
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
	defaultValues: {
		name: '',
		description: '',
	},
	request: fetchCreateCategory as requestForm,
};
export const formSchemaData: schemaComponentForm[] = [createCategory, createProduct];
