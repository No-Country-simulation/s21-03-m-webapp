'use client';

import { TableDemo } from './component/table/Table';
import { NavFilter } from './component/filter/NavFilter';

import { useProducts } from '../../../actions/hooks/products/useProducts';
import { useCategories } from '../../../actions/hooks/categories/useCategories';
import { useState } from 'react';

const ProductosPage = () => {
	const { data: products } = useProducts();
	const { data: categories } = useCategories();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const filterProducts = (categoryId: string | null) => {
		if (categoryId) {
			return products?.filter((product) => product.categoryId === categoryId);
		}
		return products;
	};

	const context = {
		categories: categories,
		products: filterProducts(selectedCategory),
		setSelectedCategory: setSelectedCategory,
		selectedCategory: selectedCategory,
	};

	if (!categories || !products) {
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
