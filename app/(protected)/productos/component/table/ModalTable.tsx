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
import { products } from './data';
import React, { JSX, ReactNode} from 'react';

interface Props {
	data: (typeof products)[0] /* |ProductData | CategoryData ; */;
	button: ReactNode;
	type: 'edit' | 'add';
}

export function ModalTable({ data, button, type }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>{button}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar {data.nombre}</DialogTitle>
					<DialogDescription>{data.descripcion}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{Object.entries(data).map(([key, value]) => (
						<div key={key} className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor={data.nombre} className="text-right">
								{key}
							</Label>
							<Input id={data.nombre} value={
								{"edit": value, "add": ""}[type] 
							} className="col-span-3" />
						</div>
					))}
				</div>
				<DialogFooter>
					<Button type="submit">Guardar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
