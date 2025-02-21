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
import { products } from './data';
import { ModalTable } from './ModalTable';

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


export function TableDemo() {
	return (
		<Table>
			<TableCaption>Lista de productos</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead>Precio</TableHead>
					<TableHead>
						<ModalTable  data = {fromAdd} button={buttonAdd} type="add"></ModalTable>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.nombre}>
						<TableCell className="font-medium">{product.nombre}</TableCell>
						<TableCell>{product.descripcion}</TableCell>
						<TableCell>{product.precio}</TableCell>
						<TableCell>
							<ModalTable data={product} button={buttonEdit} type="edit"></ModalTable>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2}>Total</TableCell>
					<TableCell className="text-right text-destructive">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
