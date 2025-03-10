'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { CarouselOptions } from '../carrusel/CarouselOptions';

export function DrawerOptions() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>Crear</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerTitle>{/* agregado para evitar errores de shadcn*/}</DrawerTitle>
				<div className="mx-auto">
					<CarouselOptions />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
