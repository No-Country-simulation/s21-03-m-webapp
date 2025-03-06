import { FieldPath } from 'react-hook-form';
import { Category, EditCategoryRequest } from '@/types/category';
import { HTMLInputTypeAttribute } from 'react';
import { z, ZodSchema } from 'zod';
import { fetchDeleteCategory, fetchEditCategory } from '@/app/(protected)/productos/api/fetching';
import { schemaComponentForm } from '../../types/schema';

const schemaZodCategory = z.object({
	name: z.string().min(1, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
});
export const editCategoryFormSchema = (category: Category): schemaComponentForm => {
	return {
		funtionForm: 'update',
		type: 'category',
		schema: schemaZodCategory,
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
		defaultValues: {
			id: category?._id,
			name: category?.name,
			description: category?.description,
		},
	};
};
export const createCategoryFormSchema: schemaComponentForm = {
	funtionForm: 'create',
	type: 'category',
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
	schema: schemaZodCategory,
	defaultValues: {
		id: '',
		name: '',
		description: '',
	},
};
export const deleteCategoryFormSchema = (): schemaComponentForm => {
	return {
		type: 'category',
		funtionForm: 'delete',
		title: '',
		schema: z.object({}),
		campos: [],
	};
};
