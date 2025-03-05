import { Category } from '../../types/category';
import { Button } from '../../../../../components/ui/button';
import { ReactNode } from 'react';
import { cn } from '../../../../../lib/utils';
import { deleteCategory, editCategory} from './schemaModalFromCategory';
import {  SchemaModal } from '../../types/schema';

interface PropsButton {
	category?: Category;
	children: ReactNode;
	className?: string;
}
const ButtonOpenModal = ({ children, category, className }: PropsButton) => (
	<Button
		className={cn('rounded-full text-white hover:text-white min-w-24', className)}
		variant={'outline'}
		disabled={!category}
	>
		{children}
	</Button>
);

const schemaModalDelete = (category: Category): SchemaModal => {
	return {
		buttonModal: ButtonOpenModal({ category, children: 'Eliminar', className: 'bg-red-500 hover:bg-red-600' }),
		title: 'Eliminar Categoria',
		description: (
			<>
				¿Esta seguro que desea eliminar la categoria <b className="text-red-500">{category?.name}</b>?
			</>
		),
		schemaForm: deleteCategory(category),
	};
};
const schemaModalEdit = (category: Category): SchemaModal => {
	return {
		buttonModal: ButtonOpenModal({ category, children: 'Editar', className: 'bg-blue-500 hover:bg-blue-600' }),
		title: 'Editar Categoria',
		description: (
			<>
				<b className="text-blue-500">{category?.name}</b>
			</>
		),
		schemaForm: editCategory(category),
	};
};

export const schemasModalCategory = [schemaModalEdit, schemaModalDelete];
