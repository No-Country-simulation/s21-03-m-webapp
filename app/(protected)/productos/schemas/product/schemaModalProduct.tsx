import { Button } from '../../../../../components/ui/button';
import { ReactNode } from 'react';
import { cn } from '../../../../../lib/utils';

import { Product } from '../../../../../types/products';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteProduct, editProduct } from './schemaFromProduct';
import { SchemaModal } from '../../types/schema';

interface PropsButton {
	product?: Product;
	children?: ReactNode;
	className?: string;
}
const ButtonOpenModal = ({ children, product, className }: PropsButton) => (
	<Button
		className={cn('rounded-full aspect-square w-8 h-auto text-white hover:text-white', className)}
		variant={'outline'}
		disabled={!product}
	>
		{children}
	</Button>
);

const schemaModalDelete = (product: Product): SchemaModal => {
	return {
		typeModal: 'Eliminar',
		buttonModal: ButtonOpenModal({ product, children: <Trash2 />, className: 'bg-red-500 hover:bg-red-600' }),
		title: 'Eliminar Producto',
		description: (
			<>
				¿Esta seguro que desea eliminar el producto <b className="text-red-500">{product?.name}</b>?
			</>
		),
		schemaForm: deleteProduct(),
	};
};
export const schemaModalEdit = (product: Product): SchemaModal => {
	return {
		typeModal: 'Editar',
		buttonModal: ButtonOpenModal({ product, children: <Pencil />, className: 'bg-blue-500 hover:bg-blue-600' }),
		title: (
			<>
				Editar Producto <b className="text-blue-500">{product?.name}</b>{' '}
			</>
		),
		description: `${product?.description}`,
		schemaForm: editProduct(product),
	};
};

export const schemaModalProduct = [schemaModalEdit, schemaModalDelete];
