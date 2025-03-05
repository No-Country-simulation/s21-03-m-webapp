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
	categories: Category[];
}

export const InputCustom = ({ field, campo, handleClick, changeSelected, categories }: Props) => {


	if (campo.name === 'price') 
		return <Input className="!my-0 p-0 h-8" {...field} type="number" required={false} />
	if (!(campo.name === 'target' || campo.name === 'categoryId'))
		return <Input className="!my-0 p-0 h-8" {...field} type={campo.type} required={false} />;
	// console.log(categories);
	return {
		target: (
			<div className="flex gap-2">
				<Input className="!my-0 p-0 h-8" {...field} type="text" required={false} />
			</div>
		),
		categoryId: (
			<div className="flex gap-2 hidden">
				<Input className="!my-0 p-0 h-8" {...field} type="text" required={false} />
			</div>
		),
	}[campo.name];
};
