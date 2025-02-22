import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { PencilIcon, Plus } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { ModalTable } from './ModalTable';
import { AllProductsResponse, Product } from '../../types/products';
import { useEffect, useState } from 'react';
import { customFetch } from '../../api/customFetch';
import { ALL_PRODUCTS } from '../../../../../constants/app_constants';

const buttonEdit = (
	<Button className="bg-blue-500 hover:bg-blue-600 rounded-full aspect-square size-8">
		<PencilIcon className="text-2xl" />
	</Button>
);
const buttonAdd = (
	<Button className="bg-green-500 hover:bg-green-600 rounded-full aspect-square size-8">
		<Plus className="" />
	</Button>
);

const fromAdd = {
	nombre: '',
	descripcion: '',
	precio: '',
};
const fetchData = async (): Promise<AllProductsResponse | undefined> => {
	return await customFetch<AllProductsResponse>({
		url: ALL_PRODUCTS,
		requestType: 'protected_api',
		peticion: 'GET',
	});
};

export function TableDemo() {
	const [productsData, setProductsData] = useState<Product[]>([]);

	useEffect(() => {
		fetchData().then((res) => {
			if (res) {
				setProductsData(res.products);
			}
		});
	}, []); // Dependencia en 'refresh'
	return (
		<Table>
			<TableCaption>Lista de productos</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead>
						<ModalTable button={buttonAdd} setProductsData={setProductsData} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{productsData.map((productData: Product) => (
					<TableRow key={productData._id}>
						<TableCell className="font-medium">{productData.name}</TableCell>
						<TableCell>{productData.description}</TableCell>
						<TableCell>{productData.price}</TableCell>
						{/* <TableCell>
								<ModalTable
								data={productData}
								button={buttonEdit}
								type="edit"
									onProductUpdate={handleProductUpdate} // Pasa la función de actualización
								/>
						</TableCell> */}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
