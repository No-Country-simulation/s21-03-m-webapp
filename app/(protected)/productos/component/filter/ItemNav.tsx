import { Button } from '../../../../../components/ui/button';
import { Card, CardContent } from '../../../../../components/ui/card';
import { CarouselItem } from '../../../../../components/ui/carousel';
import { cn } from '../../../../../lib/utils';
import { fetchProductByCategory } from '../../api/fetching';
import { Category } from '../../types/category';
import { ContextList } from '../../types/list';

interface Props {
	category?: Category;
	target?: 'kitchen' | 'bar';
	handleClick?: (category: string) => void;
	isSelected?: boolean;
	classNameB?: string;
	classNameC?: string;
	context: ContextList;
}

export const ItemNav = ({ category, handleClick, isSelected, target, classNameB, classNameC,context }: Props) => {
	return (
		<Card className={cn('rounded-full overflow-hidden', classNameB)}>
			<Button
				type="button"
				onClick={() => {
					if (category) {
						handleClick?.(category._id);
						fetchProductByCategory(category._id).then((res) => context.setProducts(res.products));
					}
					if (target) handleClick?.(target);
					if (!category && !target) handleClick?.('');
				}}
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
