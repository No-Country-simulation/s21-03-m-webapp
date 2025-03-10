import { Category } from '@/types/category';
import { z } from 'zod';
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
		funtionForm: 'Editar',
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
	funtionForm: 'Crear',
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
		funtionForm: 'Eliminar',
		title: '',
		schema: z.object({}),
		campos: [],
	};
};
