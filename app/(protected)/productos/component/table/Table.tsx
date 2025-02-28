import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ModalEditAdd } from './ModalEditAdd';
import { AllProductsResponse, Product } from '../../types/products';
import { useEffect, useState } from 'react';
import { customFetch } from '../../api/customFetch';
import { ALL_PRODUCTS } from '../../../../../constants/app_constants';
import { Category } from '../../types/category';
import { buttonAdd, buttonDelete, buttonEdit } from '../button/Button';
import { ModalDelete } from './ModalDelete';
import { Drawer } from '../../../../../components/ui/drawer';
import { DrawerOptions } from '../drawer/DrawerOptions';

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
			<TableCaption>
				<DrawerOptions></DrawerOptions>
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead>
						<ModalEditAdd button={buttonAdd} setProductsData={setProductsData} categories={categories} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{productsData.map((productData: Product) => (
					<TableRow key={productData._id}>
						<TableCell>{productData.name}</TableCell>
						<TableCell>{productData.description}</TableCell>
						<TableCell>{productData.price}</TableCell>
						<TableCell>{productData.target}</TableCell>

						<TableCell className="flex gap-3">
							<ModalEditAdd
								product={productData}
								button={buttonEdit}
								setProductsData={setProductsData}
								categories={categories}
							/>
							<ModalDelete product={productData} button={buttonDelete} setProductsData={setProductsData} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
