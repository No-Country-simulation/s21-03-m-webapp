import { cn } from '@/lib/utils';
import { HTMLInputTypeAttribute } from 'react';
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
}

export const RInput = ({ name, control, label, error, defaultValue, checked }: Props) => {
	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<input
						defaultChecked={checked}
						id={defaultValue}
						{...field}
						className={`peer hidden`}
						defaultValue={defaultValue} /* el valor defaul se controla con el contoler de react hook form(ya viene en el field) */
						type="radio"
						onChange={field.onChange}
					></input>
				)}
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
