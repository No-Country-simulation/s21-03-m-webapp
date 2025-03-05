'use client';

import { TableDemo } from './component/table/Table';
import { NavFilter } from './component/filter/NavFilter';
import { useEffect, useState } from 'react';
import { Category } from './types/category';
import { fetchAllCategories, fetchAllProducts } from './api/fetching';
import { Product } from './types/products';
import { ContextList } from './types/list';

const ProductosPage = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);

	const context = {
		categories: categories,
		products: products,
		setProducts: setProducts,
		setCategories: setCategories,
	};

	useEffect(() => {
		fetchAllCategories().then((res) => setCategories(res.categories));
		fetchAllProducts().then((res) => setProducts(res.products));
	}, []);

	if (categories.length === 0 || !products) {
		return <div>Cargando...</div>;
	}
	// dataNavFilter = customFetch();

		return (
			<div className="flex flex-col gap-6">
				<NavFilter context={context}></NavFilter>
				<TableDemo context={context}></TableDemo>
				{/* <InputForm></InputForm> */}
			</div>
		);
	
};

export default ProductosPage;
