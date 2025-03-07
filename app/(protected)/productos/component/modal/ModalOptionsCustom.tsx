import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../../../types/products';
import { Category } from '../../../../../types/category';
import { FormOptions } from '../form/FormOptions';
import { SchemaModal } from '../../types/schema';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
} from '../../../../../components/ui/carousel';
import { Card, CardContent } from '../../../../../components/ui/card';
import { useCategories } from '../../../../../actions/hooks/categories/useCategories';
import { ItemNav } from '../filter/ItemNav';

interface Props {
	schemaModal: SchemaModal;
	item: Product | Category;
}

export function ModalOptionsCustom({ schemaModal, item }: Props) {
	const { data: categories } = useCategories();
	const [categorySelected, setCategorySelected] = useState<string>(item && 'categoryId' in item ? item.categoryId : '');

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
	return (
		<Dialog>
			<DialogTrigger className="" asChild>
				{schemaModal.buttonModal}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{schemaModal.title}</DialogTitle>
					<DialogDescription>{schemaModal.description}</DialogDescription>
				</DialogHeader>
				{schemaModal.schemaForm.funtionForm === 'update' ? (
					<Carousel setApi={setApi}>
						<CarouselContent>
							<CarouselItem className="self-center">
								<FormOptions
									formSchemaData={schemaModal.schemaForm}
									buttonsCarousel={api?.scrollNext}
									item={item}
									categorySelected={categorySelected}
								></FormOptions>
							</CarouselItem>
							<CarouselItem>
								<p className="text-sm text-muted-foreground">seleccione una de las categorias</p>
								<CardContent>
									<div className="relative mb-4">
										<CarouselPrevious className="translate-0 static " />
									</div>
									<div className="flex gap-2">
										{categories?.map((category) => (
											<div
												key={category._id}
												onClick={() => {
													setCategorySelected(category._id), api?.scrollPrev();
												}}
											>
												<ItemNav category={category} isSelected={category._id === categorySelected}></ItemNav>
											</div>
										))}
									</div>
								</CardContent>
							</CarouselItem>
						</CarouselContent>
					</Carousel>
				) : (
					<FormOptions formSchemaData={schemaModal.schemaForm} item={item} />
				)}
			</DialogContent>
		</Dialog>
	);
}
