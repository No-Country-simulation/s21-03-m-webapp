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
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { CreateProductRequest, CreateProductResponse, EditProductResponse, Product } from '../../types/products';
import { useForm, SubmitHandler } from 'react-hook-form';
import { customFetch } from '../../api/customFetch';
import {  CREATE_PRODUCT, UPDATE_PRODUCT } from '../../../../../constants/app_constants';
import { CInput } from '../form/input/CustomInput';
import { RInput } from '../form/input/CustomRadioInput';
import { Category} from '../../types/category';

interface Props {
	product?: Product;
	categories: Category[];
	button: ReactNode;
	setProductsData: Dispatch<SetStateAction<Product[]>>;
}

const createProduct = async (dataForm: CreateProductRequest) => {
	const res = await customFetch<CreateProductResponse>({
		url: CREATE_PRODUCT,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'POST',
	});
	return res;
};

const editProduct = async (dataForm: CreateProductRequest, id: string) => {
	const res = await customFetch<EditProductResponse>({
		url: `${UPDATE_PRODUCT}/${id}`,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'PUT',
	});
	return res;
};
export function ModalTable({ product, button, setProductsData, categories }: Props) {
	console.log('product ID:', product?._id);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductRequest>({
		defaultValues: {
			name: product?.name ?? '',
			description: product?.description ?? '',
			// categoryId: product?.categoryId,
			price: product?.price ?? 0,
		},
	});

	const onSubmit: SubmitHandler<CreateProductRequest> = (dataForm) => {
		console.log('product ID:', product?._id);
		console.log('dataForm :', dataForm);
		if (!product?._id) {
			createProduct(dataForm).then((res) => {
				setProductsData((prev: Product[]) => {
					return [...prev, res.product];
				});
			});
		} else {
			editProduct(dataForm, product._id).then((res) => {
				setProductsData((prev: Product[]) => {
					return prev.map((product: Product) => {
						if (product._id === res.product._id) {
							return res.product;
						}
						return product;
					});
				});
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{button}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{!product ? 'Crear Producto' : `Editar ${product.name}`}</DialogTitle>
					<DialogDescription>{!product?.description ? '' : `${product.description}`}</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CInput name="name" control={control} label="Nombre" type="text" error={errors.name} />
					<CInput name="description" control={control} label="Descripción" type="text" error={errors.name} />
					<CInput name="price" control={control} label="Precio" type="number" error={errors.name} />
					<br />
					<h2 className="text-sm">Select Category:</h2>
					<div className="flex">
						{categories.map((category) => (
							<RInput
								key={category._id}
								name={'categoryId'}
								control={control}
								label={category.name}
								error={errors.name}
								defaultValue={category._id} /* se controla con reac hook form */
							/>
						))}
					</div>

					<DialogFooter>
						<Button type="submit">Guardar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
