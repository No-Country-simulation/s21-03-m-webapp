import { FieldPath } from 'react-hook-form';
import { Category, EditCategoryRequest } from '@/app/(protected)/productos/types/category';
import { HTMLInputTypeAttribute } from 'react';
import { z, ZodSchema } from 'zod';
import { fetchDeleteCategory, fetchEditCategory } from '@/app/(protected)/productos/api/fetching';
import { schemaComponentForm } from '../../types/schema';

const schemaZodEdit = z.object({
	name: z.string().min(1, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
});
export const editCategory = (category: Category): schemaComponentForm => {
	return {
		type: 'B',
		title: 'Editar categoria',
		schema: schemaZodEdit,
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
		request: fetchEditCategory,
		defaultValues: {
			name: category?.name,
			description: category?.description,
		},
	};
};
export const deleteCategory = (category: Category): schemaComponentForm => {
	return {
		title: '',
		schema: z.object({}),
		campos: [],
		request: fetchDeleteCategory,
	};
};
