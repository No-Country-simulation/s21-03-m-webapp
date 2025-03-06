import { Input } from '../../../../../../components/ui/input';
import { campos } from '../../../types/schema';
import { Category } from '../../../../../../types/category';

interface Props {
	campo: campos;
	field: any;
	handleClick?: (change: 'kitchen' | 'bar') => void;
	changeSelected?: 'kitchen' | 'bar' | string;
}

export const InputCustom = ({ field, campo, handleClick, changeSelected }: Props) => {
	if (campo.name === 'id') return <input className="hidden" {...field} type="text" required={false} />;
	if (campo.name === 'price') return <Input className="!my-0 p-0 h-8" {...field} type="number" required={false} />;
	if (!(campo.name === 'target' || campo.name === 'categoryId'))
		return <Input className="!my-0 p-0 h-8" {...field} type={campo.type} required={false} />;
	// console.log(categories);
	return {
		target: (
			<div className="flex gap-2">
				<Input className="!my-0 p-0 h-8" {...field} type="" required={false} />
			</div>
		),
		categoryId: (
			<div className="flex gap-2 hidden">
				<Input className="!my-0 p-0 h-8" {...field} type="text" required={false} />
			</div>
		),
	}[campo.name];
};
