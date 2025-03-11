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
import { ItemNav } from '../filter/ItemNav';

interface Props {
	formSchemaData: schemaComponentForm;
	children?: React.ReactNode;
	item?: Product | Category;
	buttonsCarousel?: ((jump?: boolean) => void) | undefined;
	categorySelected?: string;
	setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export function FormOptions({ formSchemaData, children, item, buttonsCarousel, categorySelected, setOpenForm }: Props) {
	const target: Array<'bar' | 'kitchen' | undefined> = ['kitchen', 'bar'];
	const [targetSelected, setTargetSelected] = useState<'kitchen' | 'bar' | undefined>(
		item && 'target' in item ? item.target : undefined,
	);
	const { mutate: createProduct } = useCreateProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { mutate: deleteProduct } = useDeleteProduct();

	const { mutate: createCategory } = useCreateCategory();
	const { mutate: updateCategory } = useUpdateCategory();
	const { mutate: deleteCategory } = useDeleteCategory();
	/* a modificar */
	const form = useForm<z.infer<typeof formSchemaData.schema>>({
		resolver: zodResolver(formSchemaData.schema),
		defaultValues: formSchemaData.defaultValues,
	});

	const onSubmit: SubmitHandler<z.infer<typeof formSchemaData.schema>> = (data) => {
		console.log('data', data);
		setOpenForm(false);
		/* refactorizar */
		// CATEGORIES
		if (targetSelected) {
			data.target = targetSelected;
		}
		if (formSchemaData.type === 'category') {
			if (formSchemaData.funtionForm === 'Eliminar') deleteCategory(item!._id);

			if (formSchemaData.funtionForm === 'Crear') {
				createCategory(data);
			}
			if (formSchemaData.funtionForm === 'Editar') {
				data.id = item?._id;
				updateCategory(data);
			}
		}

		// PRODUCTS
		if (formSchemaData.type === 'products') {
			if (formSchemaData.funtionForm === 'Eliminar') deleteProduct(item!._id);

			if (formSchemaData.funtionForm === 'Crear') {
				data.categoryId = categorySelected;
				createProduct(data);
			}
			if (formSchemaData.funtionForm === 'Editar') {
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
				<div className="flex flex-col gap-2 w-4/5">
					{formSchemaData.campos.map((campo) => {
						return (
							<FormField
								key={campo.name}
								control={form.control}
								name={campo.name}
								render={({ field }) => (
									<FormItem>
										<FormLabel className={cn({ Id: 'hidden', Categoria: 'hidden', Objetivo: 'hidden' }[campo.label])}>
											{campo.label}
										</FormLabel>
										<FormControl>
											<InputCustom field={field} campo={campo}></InputCustom>
										</FormControl>
										<FormMessage className={cn('text-xs !my-0 ')} />
									</FormItem>
								)}
							/>
						);
					})}
				</div>

				{formSchemaData.type !== 'category' && formSchemaData.funtionForm !== 'Eliminar' && (
					<FormItem className="w-4/5 space-y-0 text-center">
						<FormLabel className="m-0 p-0 ">Objetivo</FormLabel>
						<div className="flex gap-2 ">
							{target.map((t) => (
								<span className="w-[50%]" key={t} onClick={() => setTargetSelected(t)}>
									<FormControl>
										<ItemNav isSelected={targetSelected === t}>{t}</ItemNav>
									</FormControl>
								</span>
							))}
						</div>
					</FormItem>
				)}

				{formSchemaData.type !== 'category' && formSchemaData.funtionForm !== 'Eliminar' && (
					<>
						<FormItem className="w-4/5 mt-3">
							<FormLabel className="">
								<div onClick={() => buttonsCarousel?.()}>
									<ItemNav isSelected={!!categorySelected}>Seleccionar Categoria </ItemNav>
								</div>
							</FormLabel>
						</FormItem>
					</>
				)}

				{children}
				<Button className="mt-3" type="submit">
					{formSchemaData.funtionForm}
				</Button>
			</form>
		</Form>
	);
}
