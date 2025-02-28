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
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../../../../../constants/app_constants';
import { CInput } from '../form/input/CustomInput';
import { Category } from '../../types/category';
import { ItemNav } from '../filter/ItemNav';

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

export function ModalEditAdd({ product, button, setProductsData, categories }: Props) {
	const [categorySelected, setCategorySelected] = useState<string>(product?.categoryId ?? categories[0]._id);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductRequest>({
		defaultValues: {
			name: product?.name ?? '',
			description: product?.description ?? '',
			price: product?.price ?? 0,
		},
	});

	const onSubmit: SubmitHandler<CreateProductRequest> = (dataForm) => {
		console.log('dataForm :', dataForm);
		dataForm.categoryId = categorySelected;
		if (!product?._id) {
			createProduct(dataForm).then((res) => {
				setProductsData((prev: Product[]) => {
					return [...prev, res.product];
				});
			});
		} else {
			editProduct(dataForm, product._id).then((res) => {
				setProductsData((prev: Product[]) => {
					return prev.map((prod: Product) => {
						// el endpoin de tolo no me regresa producto al editar producto
						/* if (product._id === res.product._id) {
							return res.product;
						} */
						// eliminar if caundo edit me regrese producito
						if (prod._id === product._id) {
							product.categoryId = dataForm.categoryId;
							product.name = dataForm.name;
							product.description = dataForm.description;
							product.price = dataForm.price;
							return product;
						}
						return prod;
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
							<ItemNav
								handleClick={setCategorySelected}
								key={category._id}
								category={category}
								isSelected={categorySelected === category._id}
							></ItemNav>
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
/* {
	<RInput
		key={category._id}
		name={'categoryId'}
		control={control}
		label={category.name}
		error={errors.name}
		defaultValue={category._id}
		checked={category._id === product?.categoryId}
	/>;
} */
