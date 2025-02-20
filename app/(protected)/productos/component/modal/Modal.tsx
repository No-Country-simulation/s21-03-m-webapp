import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PencilIcon } from 'lucide-react';
import { CategoryData, ProductData } from '../../types/products';
import { products } from '../table/data';
import { JSX, ReactNode } from 'react';

interface Props {
    data: typeof products[0] ; /* |ProductData | CategoryData ; */
    button: JSX.Element;
}

export function Modal({ data, button }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{button}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit {data.nombre}</DialogTitle>
					<DialogDescription>{data.descripcion}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor={data.nombre} className="text-right">
							Name
						</Label>
						<Input id={data.nombre} value={data.nombre} className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Guardar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
