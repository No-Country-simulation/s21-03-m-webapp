import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Category } from '../../types/category';
import { ItemNav } from './ItemNav';
interface Props {
	categories: Category[];
}

export const NavFilter = ({ categories }: Props) => {
	return (
		<div >
			<Carousel
				opts={{
					align: 'center',
				}}
				className="w-full "
			>
				<CarouselContent>
					<ItemNav categories={categories} />
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};
