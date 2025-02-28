import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Product } from '../../../types/products';
import { schemasModal } from '../schema/schemaModal';
import { Category } from '../../../types/category';

interface Props {
	category: Category;
	button?: React.ReactNode;
	setProductsData?: Dispatch<SetStateAction<Product[]>>;
}

export function ModalNavOptionsCategory({ category, button, setProductsData }: Props) {
	return (
		<div className="flex justify-center gap-5">
			{schemasModal.map((schema) => {
				const schemaCategoryModal = schema(category);
				return (
					<Dialog>
						<DialogTrigger asChild>{schemaCategoryModal.buttonModal}</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>
									{schemaCategoryModal.title}
									{/* ¿Estas seguro que quieres eliminar <b className="text-red-500">{category.name}</b>? */}
								</DialogTitle>
								<DialogDescription>{schemaCategoryModal.description}</DialogDescription>
							</DialogHeader>
							{/* formulario */}
							{schemaCategoryModal.buttonModal}
						</DialogContent>
					</Dialog>
				);
			})}
		</div>
	);
}
