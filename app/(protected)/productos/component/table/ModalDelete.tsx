import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { DeleteProductResponse, Product } from '../../types/products';
import { customFetch } from '../../api/customFetch';
import { DELETE_PRODUCT } from '../../../../../constants/app_constants';

interface Props {
	product: Product;
	button: ReactNode;
	setProductsData: Dispatch<SetStateAction<Product[]>>;
}

export function ModalDelete({ product, button, setProductsData }: Props) {
	const deleteProduct = async (id: string) => {
		const res = await customFetch<DeleteProductResponse>({
			url: `${DELETE_PRODUCT}/${id}`,
			requestType: 'protected_api',
			peticion: 'DELETE',
		}).then((res) => {
			setProductsData((prev: Product[]) => {
				return prev.filter((product: Product) => product._id !== id);
			});
		});
		return res;
	};
	return (
		<Dialog>
			<DialogTrigger asChild>{button}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						¿Estas seguro que quieres eliminar <b className="text-red-500">{product.name}</b>?
					</DialogTitle>
					<DialogDescription>{product.description}</DialogDescription>
				</DialogHeader>
				<Button
					onClick={() => {
						deleteProduct(product._id!);
					}}
				>
					delete
				</Button>
			</DialogContent>
		</Dialog>
	);
}
