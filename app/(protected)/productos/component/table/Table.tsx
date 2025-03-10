import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ModalProduct } from './ModalProduct';
import { Product } from '../../../../../types/products';
import { DrawerOptions } from '../drawer/DrawerOptions';
import { ContextList } from '../../types/list';

interface Props {
	context: ContextList;
}

export function TableDemo({ context }: Props) {
	return (
		<Table>
			<TableHeader className="!text-center">
				<TableRow >
					<TableHead className="">Nombre</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead>Objetivo</TableHead>
					<TableHead>observación</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{context.products &&
					context.products.map((product: Product) => (
						<TableRow key={product._id}>
							<TableCell >{product.name}</TableCell>
							<TableCell>{product.description}</TableCell>
							<TableCell>${product.price}</TableCell>
							<TableCell>{product.target}</TableCell>
							<TableCell>
								{!context.categories?.find((category) => category._id === product.categoryId) && (
									<p className="text-red-500">Sin categoria</p>
								)}
							</TableCell>
							<TableCell className="flex gap-3">
								<ModalProduct product={product} categories={context.categories} />
							</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableCaption>
				<DrawerOptions></DrawerOptions>
			</TableCaption>
		</Table>
	);
}
