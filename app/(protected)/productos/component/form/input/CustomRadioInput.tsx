/* import { cn } from '@/lib/utils';
import React, { HTMLInputTypeAttribute } from 'react';
import { Controller, FieldError, Control } from 'react-hook-form';
import { CreateProductRequest } from '../../../types/products';
import { Input } from '../../../../../../components/ui/input';
import { Label } from '../../../../../../components/ui/label';
import { Category } from '../../../types/category';

interface Props {
	id?: string;
	name: keyof CreateProductRequest;
	control: Control<CreateProductRequest>;
	label: string;
	error?: FieldError;
	defaultValue?: string;
	checked?: boolean;
	render?: () => React.ReactNode;
}

export const RInput = ({ name, control, label, error, defaultValue, checked, render }: Props) => {
	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field }) => {render ? (
					render()
				) : (
					<input
						defaultChecked={checked}
						id={defaultValue}
						{...field}
						className={`peer hidden`}
						value={defaultValue}
						type="radio"
						onChange={field.onChange}
					></input>
				);}}
			></Controller>
			<Label
				className={cn(`bg-slate-700 cursor-pointer 
						peer-checked:bg-slate-700 peer-checked:text-white
				 `)}
				htmlFor={defaultValue}
			>
				{label}
			</Label>
		</div>
	);
};

{<input
						defaultChecked={checked}
						id={defaultValue}
						{...field}
						className={`peer hidden`}
						value={defaultValue}
						type="radio"
						onChange={field.onChange}
					></input>} */
