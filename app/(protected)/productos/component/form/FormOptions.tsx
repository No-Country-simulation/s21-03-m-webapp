'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createCategory, createProduct, formSchemaData } from './schema/schema';
import { CreateProductRequest } from '../../types/products';
import { InputCustom } from './input/InputCustom';
import { useState } from 'react';
import { CarouselNext } from '../../../../../components/ui/carousel';

// Define una interfaz genérica para formSchemaData

interface Props {
	formSchemaData: typeof createCategory | typeof createProduct;
	children?: React.ReactNode;
}
// z.infer<typeof formSchemaData.schema>;
export function FormOptions({ formSchemaData, children }: Props) {
	const [categorySelected, setCategorySelected] = useState<string>('');
	const [targetSelected, setTargetSelected] = useState<'kitchen' | 'bar' | string>('kitchen');

	const form = useForm<z.infer<typeof formSchemaData.schema>>({
		resolver: zodResolver(formSchemaData.schema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof formSchemaData.schema>> = (data) => {
		formSchemaData.request(data);
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
										></InputCustom>
										{/* <Input className="!my-0  p-0" {...field} type={campo.type}/> */}
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
					);
				})}
				
				<Button className="mt-3" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
