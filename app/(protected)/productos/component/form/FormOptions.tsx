'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Product } from '../../../../../types/products';
import { InputCustom } from './input/InputCustom';
import React, { useState } from 'react';
import { schemaComponentForm } from '../../types/schema';
import { Category } from '../../../../../types/category';
import { useCreateProduct } from '../../../../../actions/hooks/products/useCreateProduct';
import { useUpdateProduct } from '../../../../../actions/hooks/products/useUpdateProduct';
import { cn } from '../../../../../lib/utils';
import { useDeleteProduct } from '../../../../../actions/hooks/products/useDeleteProduct';
import { useCreateCategory } from '../../../../../actions/hooks/categories/useCreateProduct';
import { useUpdateCategory } from '../../../../../actions/hooks/categories/useUpdateProduct';
import { useDeleteCategory } from '../../../../../actions/hooks/categories/useDeleteProduct';
import { useCategories } from '../../../../../actions/hooks/categories/useCategories';
import { ItemNav } from '../filter/ItemNav';

interface Props {
	formSchemaData: schemaComponentForm;
	children?: React.ReactNode;
	item?: Product | Category;
	buttonsCarousel?: ((jump?: boolean) => void) | undefined;
}
export function FormOptions({ formSchemaData, children, item, buttonsCarousel }: Props) {
	const target: Array<'bar' | 'kitchen' | undefined> = ['kitchen', 'bar'];
	const [targetSelected, setTargetSelected] = useState<'kitchen' | 'bar' | undefined>(
		item && 'target' in item ? item.target : undefined,
	);
	const { mutate: createProduct } = useCreateProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { mutate: deleteProduct } = useDeleteProduct();

	const { data: categories } = useCategories();
	const { mutate: createCategory } = useCreateCategory();
	const { mutate: updateCategory } = useUpdateCategory();
	const { mutate: deleteCategory } = useDeleteCategory();

	const [categorySelected, setCategorySelected] = useState<string>(item && 'categoryId' in item ? item.categoryId : '');
	/* a modificar */

	const form = useForm<z.infer<typeof formSchemaData.schema>>({
		resolver: zodResolver(formSchemaData.schema),
		defaultValues: formSchemaData.defaultValues,
	});

	const onSubmit: SubmitHandler<z.infer<typeof formSchemaData.schema>> = (data) => {
		console.log('formSchemaData', formSchemaData);
		/* refactorizar */
		// CATEGORIES
		if (targetSelected) {
			data.target = targetSelected;
		}
		if (formSchemaData.type === 'category') {
			if (formSchemaData.funtionForm === 'delete') deleteCategory(item!._id);

			if (formSchemaData.funtionForm === 'create') {
				createCategory(data);
			}
			if (formSchemaData.funtionForm === 'update') {
				data.id = item?._id;
				updateCategory(data);
			}
		}

		// PRODUCTS
		if (formSchemaData.type === 'products') {
			if (formSchemaData.funtionForm === 'delete') deleteProduct(item!._id);

			if (formSchemaData.funtionForm === 'create') {
				data.categoryId = categorySelected;
				createProduct(data);
			}
			if (formSchemaData.funtionForm === 'update') {
				data.categoryId = categorySelected;
				data.id = item?._id;
				updateProduct(data);
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
				{formSchemaData.title && (
					<h2>
						<b>{formSchemaData.title}</b>
					</h2>
				)}
				{formSchemaData.campos.map((campo) => {
					return (
						<FormField
							key={campo.name}
							control={form.control}
							name={campo.name}
							render={({ field }) => (
								<FormItem className="w-4/5">
									<FormLabel className={cn({ Id: 'hidden', Categoria: 'hidden', Objetivo: 'hidden' }[campo.label])}>
										{campo.label}
									</FormLabel>
									<FormControl>
										<InputCustom field={field} campo={campo}></InputCustom>
									</FormControl>
									<FormMessage className="text-xs !my-0 " />
								</FormItem>
							)}
						/>
					);
				})}
				{formSchemaData.type !== 'category' && (
					<FormItem className="w-4/5 space-y-0 text-center">
						<FormLabel className="m-0 p-0 ">Objetivo</FormLabel>
						<div className="flex gap-2 ">
							{formSchemaData.funtionForm != 'delete' &&
								target.map((t) => (
									<span className="w-[50%]" key={t} onClick={() => setTargetSelected(t)}>
										<FormControl>
											<ItemNav isSelected={targetSelected === t}>{t}</ItemNav>
										</FormControl>
									</span>
								))}
						</div>
					</FormItem>
				)}

				{formSchemaData.type !== 'category' && (
					<FormItem className="w-4/5">
						<FormLabel className="m-0 p-0">
							<div onClick={() => buttonsCarousel?.()}><ItemNav>Categorias</ItemNav></div>
						</FormLabel>
						<FormControl>
							<div className="flex gap-2 overflow-x-auto w-3/4">
								{(formSchemaData.funtionForm === 'create' || formSchemaData.funtionForm === 'update') &&
									categories?.map((category) => (
										<div key={category._id} onClick={() => setCategorySelected(category._id)}>
											<ItemNav category={category} isSelected={categorySelected === category._id}></ItemNav>
										</div>
									))}
							</div>
						</FormControl>
					</FormItem>
				)}

				{children}
				<Button className="mt-3" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
