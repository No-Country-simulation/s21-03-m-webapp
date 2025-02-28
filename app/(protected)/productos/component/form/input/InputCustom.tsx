import { useEffect, useState } from 'react';
import { Input } from '../../../../../../components/ui/input';
import { ItemNav } from '../../filter/ItemNav';
import { NavFilter } from '../../filter/NavFilter';
import { campos } from '../schema/schema';
import { Category } from '../../../types/category';
import { customFetch } from '../../../api/customFetch';
import { ALL_CATEGORIES } from '../../../../../../constants/app_constants';

interface Props {
	campo: campos;
	field: any;
	handleClick?: (change: 'kitchen' | 'bar' | string) => void;
	changeSelected?: 'kitchen' | 'bar' | string;
}

export const InputCustom = ({ field, campo, handleClick, changeSelected }: Props) => {
	if (!(campo.name === 'target' || campo.name === 'categoryId')) return <Input className="!my-0 p-0" {...field} type={campo.type} />;
	const [categories, setCategories] = useState<Category[]>();

	useEffect(() => {
		customFetch<Category[]>({
			peticion: 'GET',
			url: ALL_CATEGORIES,
			requestType: 'protected_api',
		}).then((res) => {
			setCategories(res);
		})
	},[]);
	return {
		target: (
			<div className="flex gap-2">
				<ItemNav
					classNameC="w-1/2"
					classNameB="w-full"
					target="kitchen"
					isSelected={changeSelected === 'kitchen'}
					handleClick={handleClick}
				></ItemNav>
				<ItemNav
					classNameC="w-1/2"
					classNameB="w-full"
					target="bar"
					isSelected={changeSelected === 'bar'}
					handleClick={handleClick}
				></ItemNav>
			</div>
		),
		categoryId: (
			<ItemNav
				classNameC="w-1/2"
				classNameB="w-full"
				target="bar"
				isSelected={changeSelected === 'bar'}
				handleClick={handleClick}
			></ItemNav>
		),
	}[campo.name];
};
