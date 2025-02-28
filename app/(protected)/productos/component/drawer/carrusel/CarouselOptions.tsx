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
import { createCategory, createProduct, formSchemaData } from '../../form/schema/schema';
import { List } from 'lucide-react';
import { ListCategories } from '../categories/ListCategories';
import { cn } from '../../../../../../lib/utils';

export function CarouselOptions() {
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
					{Object.entries(formSchemaData).map(([key, value]) => (
						<CarouselItem key={key} className="self-center">
							<Card>
								<CardContent className="flex justify-center py-6">
									<FormOptions formSchemaData={value}>{value.type === 'A' && <ListCategories />}</FormOptions>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
					<CarouselItem className="self-center">
						<Card>
							<CardContent className="flex justify-center py-6">asd</CardContent>
						</Card>
						<CarouselNext >
							
						</CarouselNext>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext disabled={current === 2} />
			</Carousel>
		</div>
	);
}
