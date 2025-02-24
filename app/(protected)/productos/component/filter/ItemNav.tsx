import { Card, CardContent } from '../../../../../components/ui/card';
import {
	CarouselItem,
} from '../../../../../components/ui/carousel';
import { Category } from '../../types/category';

interface Props {
    categories: Category[];
}

export const ItemNav = ({ categories }:Props) => {
	return (
		<>
			{categories.map((category: Category, index: number) => (
				<CarouselItem key={index} className="md:basis-4 lg:basis-auto">
					<div className="p-1">
						<Card className="rounded-full">
							<button className="px-2 rounded-full">{category.name}</button>
						</Card>
					</div>
				</CarouselItem>
			))}
		</>
	);
};
