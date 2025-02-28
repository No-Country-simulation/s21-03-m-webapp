import { useEffect, useState } from 'react';
import { Category, CreateCategoryResponse, GetCategoriesResponse } from '../../../types/category';
import { customFetch } from '../../../api/customFetch';
import { ALL_CATEGORIES } from '../../../../../../constants/app_constants';

export const ListCategories = () => {
	const [categories, setCategories] = useState<Category[]>();
	useEffect(() => {
		customFetch<GetCategoriesResponse>({
			peticion: 'GET',
			url: ALL_CATEGORIES,
			requestType: 'protected_api',
		}).then((res) => {
			setCategories(res.categories);
		});
	}, []);
	if (!categories) {
		return <div>Loading...</div>;
	}
	console.log("categories : ", categories);
	return (
		<div>
			{categories.map((category) => (
				<div key={category._id}>{category.name}</div>
			))}
		</div>
	);
};
