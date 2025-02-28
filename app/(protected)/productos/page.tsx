'use client';

import { TableDemo } from './component/table/Table';
import { NavFilter } from './component/filter/NavFilter';
import { customFetch } from './api/customFetch';
import { useEffect, useState } from 'react';
import { ALL_CATEGORIES, CREATE_PRODUCT } from '../../../constants/app_constants';
import { Category, GetCategoriesResponse } from './types/category';

const getCategories = async (): Promise<GetCategoriesResponse> => {
	const res = await customFetch<GetCategoriesResponse>({
		url: ALL_CATEGORIES,
		requestType: 'protected_api',
		peticion: 'GET',
	});
	return res;
};

const ProductosPage = () => {
	const [categories, setCategories] = useState<Category[]>();

	useEffect(() => {
		getCategories().then((res) => setCategories(res.categories));
	}, []);

	if (!categories) {
		return <div>Loading...</div>;
	}
	// dataNavFilter = customFetch();
	return (
		<div className="flex flex-col gap-6">
			<NavFilter categories={categories}></NavFilter>
			<TableDemo categories={categories}></TableDemo>
		</div>
	);
};

export default ProductosPage;
