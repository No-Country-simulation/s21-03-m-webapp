import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Category } from '../../types/category';
import { ItemNav } from './ItemNav';
import { cn } from '../../../../../lib/utils';
import { ModalNavOptionsCategory } from './modal/ModalNavFilter';
import { Button } from '../../../../../components/ui/button';
interface Props {
	categories: Category[];
}

export const NavFilter = ({ categories }: Props) => {
	const [selectedCategory, setSelectedCategory] = React.useState<string | null>();
	return (
		<div className="mx-auto">
			<Carousel
				opts={{
					align: 'center',
				}}
				className={cn('w-full flex items-center')}
			>
				<CarouselPrevious className={cn('sticky aspect-square translate-0 top-auto')} />
				<CarouselContent className="">
					<CarouselItem className="basis-auto my-1">
						<ItemNav handleClick={setSelectedCategory} isSelected={!selectedCategory}></ItemNav>
					</CarouselItem>
					{categories.map((category) => (
						<CarouselItem key={category._id} className="basis-auto my-1">
							<ItemNav
								category={category}
								handleClick={setSelectedCategory}
								isSelected={selectedCategory === category._id}
							></ItemNav>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselNext className={cn('sticky aspect-square translate-0 top-auto ')} />
			</Carousel>
			<ModalNavOptionsCategory
				category={categories.find((category) => category._id === selectedCategory)!}

				/* button={<Button>asd</Button>} */
			></ModalNavOptionsCategory>
		</div>
	);
};
