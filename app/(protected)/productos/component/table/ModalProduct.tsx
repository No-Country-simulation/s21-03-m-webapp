import { Product } from '../../../../../types/products';

import { Category } from '../../../../../types/category';
import { ModalOptionsCustom } from '../modal/ModalOptionsCustom';
import { schemaModalProduct } from '../../schemas/product/schemaModalProduct';

interface Props {
	product: Product;
	categories: Category[] | undefined;
}

export function ModalProduct({ product }: Props) {
	return (
		<>
			{schemaModalProduct.map((schema) => {
				const schemaCustom = schema(product);
				return <ModalOptionsCustom key={schemaCustom.typeModal} schemaModal={schemaCustom} item={product} />;
			})}
		</>
	);
}
