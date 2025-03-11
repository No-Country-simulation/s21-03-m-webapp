'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { CarouselOptions } from '../carrusel/CarouselOptions';

export function DrawerOptions() {
	const [open, setOpen] = React.useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Crear</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerTitle>{/* agregado para evitar errores de shadcn*/}</DrawerTitle>
				<div className="mx-auto">
					<CarouselOptions setOpen={setOpen} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
