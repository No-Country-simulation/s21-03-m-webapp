import { HTMLInputTypeAttribute } from 'react';
import { CreateProductRequest, EditProductRequest, Product } from './products';
import { FieldPath } from 'react-hook-form';
import { ZodSchema } from 'zod';
import { Category, EditCategoryRequest } from './category';
import {
	fetchCreateCategory,
	fetchCreateProduct,
	fetchDeleteCategory,
	fetchDeleteProduct,
	fetchEditCategory,
	fetchEditProduct,
} from '../api/fetching';

type typeForm = 'A' | 'B';
type dataForm = EditProductRequest | CreateProductRequest;

/* type requestEdit = (id: string, dataForm: dataForm) => Promise<any>;
type requestCreate = (dataForm: dataForm) => Promise<any>;
type requestDelete = (id: string) => Promise<any>; */
type requestFormTypes =
	| typeof fetchEditCategory
	| typeof fetchDeleteCategory
	| typeof fetchCreateCategory
	/* product */
	| typeof fetchCreateProduct
	| typeof fetchEditProduct
	| typeof fetchDeleteProduct;

/* type requestForm = requestFormTypes; */

type name = FieldPath<EditProductRequest>;
export type campos = { name: name; label: string; type: HTMLInputTypeAttribute };

/* type schemaFormProduct = (product: Product) => schemaComponentForm
type schemaFormCategory = (category: Category) => schemaComponentForm
type schemaForm = schemaFormProduct | schemaFormCategory */

export interface schemaComponentForm {
	type?: typeForm;
	title: string;
	schema: ZodSchema;
	campos: campos[];
	request: requestFormTypes;
	defaultValues?: EditProductRequest | CreateProductRequest | EditCategoryRequest;
}
export interface SchemaModal {
	title: string;
	description: React.ReactNode;
	buttonModal: React.ReactNode;
	schemaForm?: schemaComponentForm;
}
