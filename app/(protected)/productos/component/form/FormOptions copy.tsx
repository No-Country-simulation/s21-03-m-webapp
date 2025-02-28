// 'use client';

/* -------------Problemas------------
 * Al inferir los useForm<z.infer<T>> no sabe los tipos de campos posibles
 *
 */

// import { zodResolver } from '@hookform/resolvers/zod';
// import { Field, FieldPath, Path, SubmitHandler, useForm } from 'react-hook-form';
// import { z } from 'zod';

// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { createCategory, createProduct } from './schema/schema';

// // Define una interfaz genérica para formSchemaData

// interface FormSchemaData<T extends z.ZodSchema> {
// 	schema: T;
// 	title: string;
// 	campos: { name: string; label: string; type: string }[];
// 	request: (data: z.infer<T>) => Promise<any>; // Ajusta el tipo de retorno de request si es necesario
// }

// interface Props<T extends z.ZodSchema> {
// 	formSchemaData: FormSchemaData<T>;
// }
// // z.infer<typeof formSchemaData.schema>;
// export function FormOptions<T extends z.ZodSchema>({ formSchemaData }: Props<T>) {
// 	const form = useForm<z.infer<T>>({
// 		resolver: zodResolver(formSchemaData.schema),
// 	});

// 	const onSubmit: SubmitHandler<z.infer<T>> = (data) => {
// 		/* 		toast({
// 			title: 'You submitted the following values:',
// 			description: (
// 				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
// 					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
// 				</pre>
// 			),
// 		}); */
// 		/* if (typeof formSchemaData === typeof createCategory) {
// 			const data1= data as z.infer<typeof createCategory.schema>;
// 			formSchemaData.request(data1);
// 		} else if (typeof formSchemaData === typeof createProduct) {
// 			const data1= data as z.infer<typeof createProduct.schema>;
// 			formSchemaData.request(data1);
// 		} */

// 		formSchemaData.request(data);
// 	};

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 ">
// 				<h2>
// 					<b>{formSchemaData.title}</b>
// 				</h2>
// 				{formSchemaData.campos.map((campo) => {
// 					return (
// 						<FormField
// 							key={campo.name}
// 							control={form.control}
// 							name={campo.name}
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel className="text-xs">{campo.label}</FormLabel>
// 									<FormControl>
// 										<Input className="!my-0  p-0" {...field} type={campo.type} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 					);
// 				})}

// 				<Button className="mt-3" type="submit">
// 					Submit
// 				</Button>
// 			</form>
// 		</Form>
// 	);
// }
