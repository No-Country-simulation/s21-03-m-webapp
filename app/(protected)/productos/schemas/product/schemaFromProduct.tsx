import { z } from 'zod';
import { Product } from '../../../../../types/products';
import { schemaComponentForm } from '../../types/schema';

const schemaZodEdit = z.object({
	name: z.string().min(2, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
	price: z.coerce.number().min(1, {
		message: 'Precio requerido',
	}),
	target: z.string().min(1, {
		message: 'Objetivo requerido',
	}),
	categoryId: z.string().min(1, {
		message: 'Categoria requerida',
	}),
});

export const createProductForm: schemaComponentForm = {
	funtionForm: 'Crear',
	type: 'products',
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
	schema: schemaZodEdit,
	defaultValues: {
		name: '',
		description: '',
		price: 0,
		categoryId: '123' /* es ensesario que no este vacio */,
		target: 'bar',
	},
};

export const editProduct = (product: Product): schemaComponentForm => {
	return {
		funtionForm: 'Editar',
		type: 'products',
		campos: [
			{
				name: 'id',
				label: 'Id',
				type: 'text',
			},
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
		schema: schemaZodEdit,
		defaultValues: {
			name: product?.name,
			description: product?.description,
			categoryId: product?.categoryId,
			target: product?.target,
			price: product?.price,
		},
	};
};

export const deleteProduct = (): schemaComponentForm => {
	return {
		type: 'products',
		funtionForm: 'Eliminar',
		schema: z.object({}),
		campos: [],
	};
};
