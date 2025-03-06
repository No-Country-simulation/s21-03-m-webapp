import { Button } from '../../../../../components/ui/button';
import { Card } from '../../../../../components/ui/card';
import { cn } from '../../../../../lib/utils';
import { Category } from '../../../../../types/category';

interface Props {
	category?: Category;
	isSelected?: boolean;
	classNameB?: string;
	children?: React.ReactNode;
}

export const ItemNav = ({ category, isSelected,  classNameB,children }: Props) => {

	return (
		<Card className={cn('rounded-full ', category && 'inline-block', classNameB)}>
			<Button
				type="button"
				className={cn(
					'px-2 rounded-full hover:bg-chart-1 hover:text-white w-full',
					isSelected && 'bg-chart-1 text-white',
					category && 'w-auto',
				)}
				variant={'ghost'}
			>
				{category?.name}
				{!category && !children && 'Todos'}
				{children}
			</Button>
		</Card>
	);
};
