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
import React, { JSX, ReactNode } from 'react';
import { Product } from '../../types/products';
import { useForm, SubmitHandler } from 'react-hook-form';
import { customFetch } from '../../api/customFetch';
import { CREATE_PRODUCT } from '../../../../../constants/app_constants';
import { createProducts } from '../../api/createProduct';

interface Props {
	data: (typeof products)[0] |Product /* | CategoryData  */;
	button: ReactNode;
	type: 'edit' | 'add';
	setProductsData: () => void;
}

export function ModalTable({ data, button, type, setProductsData }: Props) {
	const {
		handleSubmit,
		formState: { errors },
	} = useForm<Product>();

	const onSubmit: SubmitHandler<Product> = (dataForm) => {
		console.log(dataForm);
		customFetch<Product>({
			url: CREATE_PRODUCT,
			requestType: 'protected_api',
			body: dataForm,
			peticion: 'POST',
		}).then((res) => console.log(res));
	};
	const test = async () => {
		const data = await createProducts({
			categoryId: '1',
			name: 'Test',
			description: 'Descripcion del Test',
			price: 8000,
		}).then((res) => console.log(res));
		console.log('data desde modal ');
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{button}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Editar {data.nombre}</DialogTitle>
						<DialogDescription>{data.descripcion}</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor={data.nombre} className="text-right"></Label>
							<Input id={data.nombre} defaultValue={{ edit: "", add: '' }[type]} className="col-span-3" />
						</div>
					</div>
					<input type="radio" name="radio" />
					<input type="radio" name="radio" key={1} />
					<DialogFooter>
						<Button type="submit">Guardar</Button>
					</DialogFooter>
				</form>
				<DialogFooter>
					<Button onClick={test}>create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
