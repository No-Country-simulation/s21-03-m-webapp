import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ModalProduct } from './ModalProduct';
import { Product } from '../../../../../types/products';
import { buttonEdit } from '../button/Button';
import { DrawerOptions } from '../drawer/DrawerOptions';
import { ContextList } from '../../types/list';

interface Props {
	context: ContextList;
}

export function TableDemo({ context }: Props) {
	return (
		<Table>
			<TableCaption>
				<DrawerOptions></DrawerOptions>
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead>Objetivo</TableHead>
					<TableHead>
						{/* <ModalEditAdd button={buttonAdd} setProductsData={setProductsData} categories={categories} /> */}
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{context.products &&
					context.products.map((product: Product) => (
						<TableRow key={product._id}>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.description}</TableCell>
							<TableCell>{product.price}</TableCell>
							<TableCell>{product.target}</TableCell>

							<TableCell className="flex gap-3">
								<ModalProduct product={product} button={buttonEdit} categories={context.categories} />
								{/* <ModalDelete product={productData} button={buttonDelete} setProductsData={setProductsData} /> */}
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
}
