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
import { CreateProductRequest, CreateProductResponse, Product } from '../../types/products';
import { useForm, SubmitHandler } from 'react-hook-form';
import { customFetch } from '../../api/customFetch';
import { ALL_CATEGORIES, CREATE_PRODUCT } from '../../../../../constants/app_constants';
import { CInput } from '../form/input/CustomInput';
import { RInput } from '../form/input/CustomRadioInput';
import { Category, GetCategoriesResponse } from '../../types/category';

interface Props {
	product?: Product;
	button: ReactNode;
	setProductsData: Dispatch<SetStateAction<Product[]>>;
}

const getCategories = async (): Promise<GetCategoriesResponse> => {
	const res = await customFetch<GetCategoriesResponse>({
		url: ALL_CATEGORIES,
		requestType: 'protected_api',
		peticion: 'GET',
	});
	return res;
};
const createProduct = async (dataForm: CreateProductRequest) => {
	const res = await customFetch<CreateProductResponse>({
		url: CREATE_PRODUCT,
		requestType: 'protected_api',
		body: dataForm,
		peticion: 'POST',
	});
	return res;
};
export function ModalTable({ product, button, setProductsData }: Props) {
	const [categories, setCategories] = useState<Category[]>([]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductRequest>();

	const onSubmit: SubmitHandler<CreateProductRequest> = (dataForm) => {
		console.log('dataForm :', dataForm);
		createProduct(dataForm).then((res) => {
			setProductsData((prev: Product[]) => {
				return [...prev, res.product];
			});
		});
	};
	useEffect(() => {
		getCategories().then((res) => setCategories(res.categories));
	}, []);
	return (
		<Dialog>
			<DialogTrigger asChild>{button}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{!product ? 'Crear Producto' : `Editar ${product.name}`}</DialogTitle>
					<DialogDescription>{!product?.description ? '' : `${product.description}`}</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CInput
						name="name"
						control={control}
						label="Nombre"
						type="text"
						error={errors.name}
						defaultValue={product?.name}
					/>
					<CInput
						name="description"
						control={control}
						label="Descripción"
						type="text"
						error={errors.name}
						defaultValue={product?.name}
					/>
					<CInput
						name="price"
						control={control}
						label="Precio"
						type="number"
						error={errors.name}
						defaultValue={product?.name}
					/>
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
								defaultValue={category._id}
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
