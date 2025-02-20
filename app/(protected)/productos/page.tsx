'use client';

import { TableDemo } from './component/table/Table';
import { NavFilter } from './component/filter/NavFilter';
import { customFetch } from './api/customFetch';
import { useState } from 'react';

const ProductosPage = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	// dataNavFilter = customFetch();
	return (
		<div>
			<NavFilter></NavFilter>
			<TableDemo></TableDemo>
		</div>
	);
};

export default ProductosPage;
