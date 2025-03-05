import * as React from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Category } from '../../types/category';
import { ItemNav } from './ItemNav';
import { cn } from '../../../../../lib/utils';
import { ModalOptionsCustom } from '../modal/ModalOptionsCustom';
import {  schemasModalCategory } from '../../schamas/category/schemasModalCategory';
import { SchemaModal } from '../../types/schema';
import { Product } from '../../types/products';
import { ContextList } from '../../types/list';

interface Props {
	context: ContextList
	schemaModal?: SchemaModal[];
}

export const NavFilter = ({ context }: Props) => {
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
						<ItemNav handleClick={setSelectedCategory} isSelected={!selectedCategory} context={context}></ItemNav>
					</CarouselItem>
					{context.categories.map((category) => (
						<CarouselItem key={category._id} className="basis-auto my-1">
							<ItemNav
								context={context}
								category={category}
								handleClick={setSelectedCategory}
								isSelected={selectedCategory === category._id}
							></ItemNav>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselNext className={cn('sticky aspect-square translate-0 top-auto ')} />
			</Carousel>
			<div className="flex justify-center gap-5">
				{schemasModalCategory.map((schemasModal) => {
					const category = context.categories.find((category) => category._id === selectedCategory)!;
					return (
						<ModalOptionsCustom
							key={schemasModal(category).title}
							schemaModal={schemasModal(category)}
							item={category}
						></ModalOptionsCustom>
					);
				})}
			</div>
			{/* <ModalOptionsCustom item={categories.find((category) => category._id === selectedCategory)!}></ModalOptionsCustom> */}
		</div>
	);
};
