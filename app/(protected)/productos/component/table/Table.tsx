import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ModalTable } from './ModalTable';
import { AllProductsResponse, Product } from '../../types/products';
import { useEffect, useState } from 'react';
import { customFetch } from '../../api/customFetch';
import { ALL_PRODUCTS } from '../../../../../constants/app_constants';
import { Category} from '../../types/category';
import { buttonAdd, buttonEdit } from '../button/Button';

interface Props {
	categories: Category[];
}

const getProducts = async (): Promise<AllProductsResponse> => {
	return await customFetch<AllProductsResponse>({
		url: ALL_PRODUCTS,
		requestType: 'protected_api',
		peticion: 'GET',
	});
};

export function TableDemo({ categories }: Props) {
	const [productsData, setProductsData] = useState<Product[]>([]);

	useEffect(() => {
		getProducts().then((res) => setProductsData(res.products));
	}, []);
	
	return (
		<Table>
			<TableCaption>Lista de productos</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead>
						<ModalTable button={buttonAdd} setProductsData={setProductsData} categories={categories} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{productsData.map((productData: Product) => (
					<TableRow key={productData._id}>
						<TableCell className="font-medium">{productData.name}</TableCell>
						<TableCell>{productData.description}</TableCell>
						<TableCell>{productData.price}</TableCell>
						<TableCell>
							<ModalTable
								product={productData}
								button={buttonEdit}
								setProductsData={setProductsData}
								categories={categories}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
