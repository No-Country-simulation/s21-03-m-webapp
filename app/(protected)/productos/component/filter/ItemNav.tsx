import { Button } from '../../../../../components/ui/button';
import { Card, CardContent } from '../../../../../components/ui/card';
import { CarouselItem } from '../../../../../components/ui/carousel';
import { cn } from '../../../../../lib/utils';
import { fetchProductByCategory } from '../../api/fetching';
import { Category } from '../../../../../types/category';
import { ContextList } from '../../types/list';
import { useProductsByCategory } from '../../../../../actions/hooks/products/useProductsByCategory';

interface Props {
	category?: Category;
	target?: 'kitchen' | 'bar';
	isSelected?: boolean;
	classNameB?: string;
}

export const ItemNav = ({ category, isSelected, target, classNameB }: Props) => {
	return (
		<Card className={cn('rounded-full overflow-hidden', classNameB)}>
			<Button
				type="button"
				className={cn(
					'px-2 rounded-full hover:bg-chart-1 hover:text-white',
					isSelected && 'bg-chart-1 text-white',
					classNameB,
				)}
				variant={'ghost'}
			>
				{category?.name}
				{!category && !target && 'Todos'}
				{target}
			</Button>
			{/* <button className="px-2 rounded-full">{category.name}</button> */}
		</Card>
	);
};
