import { cn } from '@/lib/utils';
import { HTMLInputTypeAttribute } from 'react';
import { Controller, FieldError, Control } from 'react-hook-form';
import { CreateProductRequest } from '../../../types/products';
import { Input } from '../../../../../../components/ui/input';
import { Label } from '../../../../../../components/ui/label';

interface Props {
	name: keyof CreateProductRequest;
	control: Control<CreateProductRequest>;
	label?: string;
	type?: HTMLInputTypeAttribute;
	error?: FieldError;
	defaultValue?: string;
}

export const CInput = ({ name, control, label, type, error, defaultValue }: Props) => {
	return (
		<div>
			<Label htmlFor={name}>{label}</Label>

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Input
						id={name}
						type={type}
						{...field}
						className={`${error ? 'border-red-500' : ''}`}
						defaultValue={defaultValue}
					></Input>
				)}
			></Controller>

			<p className={cn('text-xs', error ? 'hidden' : 'text-gray-500/0')}>a</p>
			{error && <p className="text-red-600 text-xs">{error.message}</p>}
		</div>
	);
};
