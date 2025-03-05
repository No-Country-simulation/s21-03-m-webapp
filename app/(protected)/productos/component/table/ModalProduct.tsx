import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Product } from '../../types/products';

import { Category } from '../../types/category';
import { ModalOptionsCustom } from '../modal/ModalOptionsCustom';
import { schemaModalProduct } from '../../schamas/product/schemaModalProduct';

interface Props {
	product: Product;
	categories: Category[];
	button: ReactNode;
	setProductsData: Dispatch<SetStateAction<Product[]>>;
}

export function ModalProduct({ product, button, setProductsData, categories }: Props) {
	return (
		<>
			{schemaModalProduct.map((schema) => {
				const schemaCustom = schema(product);
				return <ModalOptionsCustom key={schemaCustom.title} schemaModal={schemaCustom} item={product} />;
			})}
		</>
	);
}
