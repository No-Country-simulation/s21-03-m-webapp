'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CreateProductRequest, Product } from '../../types/products';
import { InputCustom } from './input/InputCustom';
import { useEffect, useState } from 'react';
import { schemaComponentForm } from '../../types/schema';
import {
	fetchAllCategories,
	fetchCreateCategory,
	fetchCreateProduct,
	fetchDeleteCategory,
	fetchDeleteProduct,
	fetchEditCategory,
	fetchEditProduct,
} from '../../api/fetching';
import { Category, GetCategoriesResponse } from '../../types/category';
import { ItemNav } from '../filter/ItemNav';

// Define una interfaz genérica para formSchemaData

interface Props {
	formSchemaData: schemaComponentForm;
	children?: React.ReactNode;
	item?: Product | Category;
}
export function FormOptions({ formSchemaData, children, item }: Props) {
	const [categorySelected, setCategorySelected] = useState<string>('');
	const [targetSelected, setTargetSelected] = useState<'kitchen' | 'bar' | string>('kitchen');
	const [categories, setCategories] = useState<Category[]>([]);
	/* a modificar */
	useEffect(() => {
		if (formSchemaData.request === fetchCreateProduct || formSchemaData.request === fetchEditProduct)
			fetchAllCategories().then((res) => setCategories(res.categories));
	}, []);

	const form = useForm<z.infer<typeof formSchemaData.schema>>({
		resolver: zodResolver(formSchemaData.schema),
		defaultValues: formSchemaData.defaultValues,
	});
	const onSubmit: SubmitHandler<z.infer<typeof formSchemaData.schema>> = (data) => {
		console.log('data', data);
		/* refactorizar */
		if (item) {
			if (formSchemaData.request === fetchEditCategory) return formSchemaData.request(item?._id, data);
			if (formSchemaData.request === fetchDeleteCategory) return formSchemaData.request(item?._id);
			if (formSchemaData.request === fetchDeleteProduct) return formSchemaData.request(item?._id, data);
			if (formSchemaData.request === fetchEditProduct) return formSchemaData.request(item?._id, data);
		}

		if (formSchemaData.request === fetchCreateCategory) return formSchemaData.request(data);

		if (formSchemaData.request === fetchCreateProduct) {
			console.log('categorySelected', categorySelected);
			data.categoryId = categorySelected;
			return formSchemaData.request(data);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 ">
				<h2>
					<b>{formSchemaData.title}</b>
				</h2>
				{formSchemaData.campos.map((campo) => {
					return (
						<FormField
							key={campo.name}
							control={form.control}
							name={campo.name as FieldPath<CreateProductRequest>}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs">{campo.label}</FormLabel>
									<FormControl>
										<InputCustom
											field={field}
											campo={campo}
											handleClick={setTargetSelected}
											changeSelected={targetSelected}
											categories={categories}
										></InputCustom>
										{/* <Input className="!my-0  p-0" {...field} type={campo.type}/> */}
									</FormControl>
									<FormMessage className="text-xs !my-0 " />
								</FormItem>
							)}
						/>
					);
				})}
				{/* refactorizar */}
				<div className="flex gap-2 overflow-x-auto">
					{(formSchemaData.request === fetchCreateProduct ||
						formSchemaData.request === fetchEditProduct) &&
							categories.map((category) => (
								<ItemNav
									key={category._id}
									category={category}
									handleClick={setCategorySelected}
									isSelected={categorySelected === category._id}
								></ItemNav>
							))}
					{children}
				</div>

				<Button className="mt-3" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
