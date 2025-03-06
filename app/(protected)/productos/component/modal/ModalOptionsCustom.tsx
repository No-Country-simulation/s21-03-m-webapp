import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Product } from '../../../../../types/products';
import { Category } from '../../../../../types/category';
import { FormOptions } from '../form/FormOptions';
import { SchemaModal } from '../../types/schema';

interface Props {
	schemaModal: SchemaModal;
	item: Product | Category;
}

export function ModalOptionsCustom({ schemaModal, item }: Props) {
	return (
		<Dialog>
			<DialogTrigger className="" asChild>
				{schemaModal.buttonModal}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{schemaModal.title}</DialogTitle>
					<DialogDescription>{schemaModal.description}</DialogDescription>
				</DialogHeader>
				{schemaModal.schemaForm ? <FormOptions formSchemaData={schemaModal.schemaForm} item={item} /> : <></>}
			</DialogContent>
		</Dialog>
	);
}
