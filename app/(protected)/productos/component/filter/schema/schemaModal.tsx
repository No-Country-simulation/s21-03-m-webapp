import { z, ZodType } from 'zod';
import { Category, updateCategoryRequest } from '../../../types/category';
import { Button } from '../../../../../../components/ui/button';
import { JSX, ReactNode } from 'react';
import { cn } from '../../../../../../lib/utils';

interface SchemaModal {
	title: string;
	description: string;
	buttonModal: React.ReactNode;
	schemaZood?: ZodType<updateCategoryRequest>;
	campos?: {
		name: string;
		label: string;
		type: string;
	}[];
}
interface PropsButton {
	category?: Category;
	children: ReactNode;
	className?: string;
}
const ButtonOpenModal = ({ children, category, className }: PropsButton) => (
	<Button className={cn('rounded-full text-white hover:text-white', className)} variant={'outline'} disabled={!category}>
		{children}
	</Button>
);

const schemaModalDelete = (category: Category): SchemaModal => {
	return {
		buttonModal: (
			<ButtonOpenModal className="bg-red-500 hover:bg-red-600" category={category}>
				Eliminar
			</ButtonOpenModal>
		),
		title: 'Eliminar Categoria',
		description: `¿Esta seguro que desea eliminar la categoria ${(<b className="text-red-500">{!category?.name}</b>)}?`,
	};
};
const schemaModalEdit = (category: Category) => {
	return {
		buttonModal: (
			<ButtonOpenModal className="bg-blue-500 hover:bg-blue-600" category={category}>
				Editar
			</ButtonOpenModal>
		),
		title: 'Eliminar Categoria',
		description: `¿Esta seguro que desea eliminar la categoria ${category?.name}?`,
		schemaZood: schemaZodEdit,
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
	};
};
const schemaZodEdit = {
	name: z.string().min(1, {
		message: 'Nombre requerido',
	}),
	description: z.string().min(1, {
		message: 'Descripcion requerida',
	}),
};
export const schemasModal = [schemaModalEdit, schemaModalDelete];
