'use client';

import { TableDemo } from './component/table/Table';
import { NavFilter } from './component/filter/NavFilter';
import { customFetch } from './api/customFetch';
import { useState } from 'react';
import { ProductData } from './types/products';
import { CREATE_PRODUCT } from '../../../constants/app_constants';

const ProductosPage = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openCreateModal, setOpenCreateModal] = useState(false);

	const createProduct = (createProductData: ProductData): any => {
		customFetch<ProductData>({
			url: CREATE_PRODUCT,
			requestType: 'protected_api',
			body: createProductData,
			peticion: 'POST',
		});
	};
	// dataNavFilter = customFetch();
	return (
		<div>
			<NavFilter></NavFilter>
			<TableDemo ></TableDemo>
		</div>
	);
};

export default ProductosPage;
