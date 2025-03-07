import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/components/ui/carousel';
import { FormOptions } from '../form/FormOptions';
import { createProductForm } from '../../schemas/product/schemaFromProduct';
import { createCategoryFormSchema } from '../../schemas/category/schemasFromCategory';
import { useCategories } from '../../../../../actions/hooks/categories/useCategories';
import { ItemNav } from '../filter/ItemNav';
import { cn } from '../../../../../lib/utils';
import { useEffect, useState } from 'react';
import { Category } from '../../../../../types/category';

export function CarouselOptions() {
	const { data: categories } = useCategories();
	const [categorySelected, setCategorySelected] = useState<string>();
	console.log('first', categorySelected);

	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const titleCarrousel = (currentP: number, title: string) => (
		<div className="cursor-pointer" onClick={() => api?.scrollTo(currentP - 1)}>
			<p className={cn(current == currentP && 'text-chart-1')}>{title}</p>
			<hr className={cn('border-chart-1 border-[1.5px]', current != currentP && 'hidden')} />
		</div>
	);

	const handledClickCategory = (category: Category) => {
		setCategorySelected(category._id), api?.scrollPrev();
	}
	return (
		<div className="mx-auto max-w-lg">
			{
				<div className={cn('flex py-2 text-center text-sm text-muted-foreground justify-center gap-2', '')}>
					{titleCarrousel(1, 'Crear Categorias')}
					{titleCarrousel(2, 'Crear Productos')}
				</div>
			}
			<Carousel setApi={setApi}>
				<CarouselContent>
					<CarouselItem className="self-center">
						<Card>
							<CardContent className="flex justify-center py-6">
								<FormOptions formSchemaData={createCategoryFormSchema}></FormOptions>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem className="self-center">
						<Card>
							<CardContent className="flex justify-center py-6">
								<FormOptions
									formSchemaData={createProductForm}
									buttonsCarousel={api?.scrollNext}
									categorySelected={categorySelected}
								></FormOptions>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem className="self-center">
						<p className="text-sm text-muted-foreground">seleccione una de las categorias</p>
						<Card className="p-6">
							<CardContent>
								<div className="relative mb-4">
									<CarouselPrevious className="translate-0 static " />
								</div>
								<div className="flex gap-2 flex-wrap">
									{categories?.map((category) => (
										<div
											key={category._id}
											onClick={() => handledClickCategory(category)}
										>
											<ItemNav category={category} isSelected={category._id === categorySelected}></ItemNav>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className={cn(current === 3 && 'hidden')} />
				<CarouselNext className={cn(current >= 2 && 'hidden')} disabled={current === count} />
			</Carousel>
		</div>
	);
}
