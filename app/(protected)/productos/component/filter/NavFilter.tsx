import * as React from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Category } from '../../../../../types/category';
import { ItemNav } from './ItemNav';
import { cn } from '../../../../../lib/utils';
import { ModalOptionsCustom } from '../modal/ModalOptionsCustom';
import { schemasModalCategory } from '../../schemas/category/schemasModalCategory';
import { SchemaModal } from '../../types/schema';
import { Product } from '../../../../../types/products';
import { ContextList } from '../../types/list';

interface Props {
	context: ContextList;
	schemaModal?: SchemaModal[];
}

export const NavFilter = ({ context }: Props) => {
	if (!context.categories) {
		return <div>Cargando...</div>;
	}
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
					<CarouselItem onClick={() => context.setSelectedCategory(null)} className="basis-auto my-1">
						<ItemNav isSelected={!context.selectedCategory}></ItemNav>
					</CarouselItem>
					{context.categories.map((category) => (
						<CarouselItem
							key={category._id}
							onClick={() => context.setSelectedCategory(category._id)}
							className="basis-auto my-1"
						>
							<ItemNav category={category} isSelected={context.selectedCategory === category._id}></ItemNav>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselNext className={cn('sticky aspect-square translate-0 top-auto ')} />
			</Carousel>
			<div className="flex justify-center gap-5">
				{schemasModalCategory.map((schemasModal) => {
					if (!context.selectedCategory) return null;
					const category = context.categories?.find((category) => category._id === context.selectedCategory);
					if (!category) return null;
					return (
						<ModalOptionsCustom
							key={schemasModal(category).typeModal}
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
