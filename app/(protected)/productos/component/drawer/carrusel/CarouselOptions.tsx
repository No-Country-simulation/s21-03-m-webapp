import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/components/ui/carousel';
import { FormOptions } from '../../form/FormOptions';
import { createProductForm } from '../../../schemas/product/schemaFromProduct';
import { createCategoryFormSchema } from '../../../schemas/category/schemasFromCategory';
import { useCategories } from '../../../../../../actions/hooks/categories/useCategories';
import { ItemNav } from '../../filter/ItemNav';

export function CarouselOptions() {
	const { data: categories } = useCategories();

	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="mx-auto max-w-lg">
			{
				<div className="py-2 text-center text-sm text-muted-foreground">
					Slide {current} of {count}
				</div>
			}
			<Carousel setApi={setApi}>
				<CarouselContent>
					<CarouselItem className="self-center">
						<Card>
							<CardContent className="flex justify-center py-6">
								<FormOptions formSchemaData={createCategoryFormSchema} buttonsCarousel={api?.scrollNext}></FormOptions>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem className="self-center">
						<Card>
							<CardContent className="flex justify-center py-6">
								<FormOptions formSchemaData={createProductForm} buttonsCarousel={api?.scrollNext}></FormOptions>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem className="self-center">
						<CardContent>
							<div onClick={() => api?.scrollPrev()}>asd</div>
							{categories?.map((category) => <ItemNav key={category._id} category={category}></ItemNav>)}
						</CardContent>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<div onClick={() => api?.scrollNext()}>asdasd</div>
				<CarouselNext disabled={current === count} />
			</Carousel>
		</div>
	);
}
