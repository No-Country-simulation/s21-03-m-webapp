'use client';

import { useState } from 'react';
import { Table } from '@/types/tables';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

type OrderItem = {
	productId: string;
	name: string;
	price: number;
	quantity: number;
};
export const MOCK_CATEGORIES = [
	{
		id: '1',
		name: 'Entradas',
		description: 'Platos frios',
	},
	{
		id: '2',
		name: 'Platos',
		description: 'Platos principales',
	},
	{
		id: '3',
		name: 'Postres',
		description: 'Desserts',
	},
	{
		id: '4',
		name: 'Bebidas',
		description: 'Bebidas de todo',
	},
];

export const MOCK_PRODUCTS = [
	{
		id: 'a',
		categoryId: '1',
		name: 'Ensalada verde',
		description: 'Lechuga y tomate.',
		price: 1500,
		target: 'Kitchen',
	},
	{
		id: 'b',
		categoryId: '1',
		name: 'Ensalada rusa',
		description: 'La mejor',
		price: 2200,
		target: 'Kitchen',
	},
	{
		id: 'c',
		categoryId: '2',
		name: 'Pizza con jamon',
		description: 'Pizza con jamon cocido.',
		price: 5000,
		target: 'Kitchen',
	},
	{
		id: 'd',
		categoryId: '2',
		name: 'Milanga',
		description: 'La mejor',
		price: 7500,
		target: 'Kitchen',
	},
	{
		id: 'e',
		categoryId: '4',
		name: 'Birra',
		description: 'La mejor',
		price: 2500,
		target: 'Kitchen',
	},
	{
		id: 'f',
		categoryId: '4',
		name: 'Coquita',
		description: 'La mejor',
		price: 2500,
		target: 'Kitchen',
	},
	{
		id: 'g',
		categoryId: '3',
		name: 'Tiramisu',
		description: 'La mejor',
		price: 2500,
		target: 'Kitchen',
	},
	{
		id: 'h',
		categoryId: '3',
		name: 'Helado',
		description: 'La mejor',
		price: 2500,
		target: 'Kitchen',
	},
];

const TablesInfo = ({ currentTable }: { currentTable: Table | null }) => {
	const [people, setPeople] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState<{
		id: string;
		name: string;
		description: string;
	} | null>(null);
	const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

	// Filtrar productos según categoría seleccionada
	const filteredProducts = selectedCategory
		? MOCK_PRODUCTS.filter((product) => product.categoryId === selectedCategory.id)
		: [];

	const addToOrder = (productId: string, name: string, price: number) => {
		setSelectedCategory(null);
		setOrderItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.productId === productId);
			if (existingItem) {
				return prevItems.map((item) =>
					item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
				);
			}
			return [...prevItems, { productId, name, price, quantity: 1 }];
		});
	};

	const removeFromOrder = (productId: string) => {
		setOrderItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
	};

	if (!currentTable) {
		return <h2 className="text-white text-center">Selecciona una mesa para crear una orden!</h2>;
	}
	return (
		<article className="w-full h-full">
			<div className="w-[90%] m-auto py-4 text-white">
				<h2 className="text-lg font-bold text-center mb-4">Mesa {currentTable.number}</h2>
				<div className="flex flex-col gap-8">
					{/* Sección 1: Table Number y People */}
					<section className="flex flex-col gap-2 text-sm font-thin">
						<div className="flex flex-row gap-2">
							<p>Fecha: {'10/10/2020'}</p>
						</div>
						<div className="flex flex-row gap-2 items-center">
							<h2>Personas</h2>
							<Input
								type="text"
								className="bg-white text-black border-none outline-none"
								value={people}
								onChange={(e) => setPeople(Number(e.target.value))}
							/>
						</div>
					</section>

					{/* Sección 2: Categorías y Productos */}
					<section className="flex flex-col gap-2">
						<div className="flex flex-col">
							<h2 className="text-xl font-bold">Adicionar Productos</h2>
							<div className="flex items-center gap-2 text-sm font-thin text-white">
								<span className="cursor-pointer hover:underline" onClick={() => setSelectedCategory(null)}>
									Categorías
								</span>
								{selectedCategory && (
									<>
										<span>/</span>
										<span>{MOCK_CATEGORIES.find((c) => c.id === selectedCategory.id)?.name}</span>
									</>
								)}
							</div>
						</div>
						{!selectedCategory ? (
							<div className="flex flex-wrap gap-1">
								{MOCK_CATEGORIES.map((category) => (
									<Button
										key={category.id}
										variant={'outline'}
										className="text-black"
										onClick={() => setSelectedCategory(category)}
									>
										{category.name}
									</Button>
								))}
							</div>
						) : (
							<div className="flex flex-wrap gap-1">
								{filteredProducts.map((product) => (
									<Button
										key={product.id}
										variant={'outline'}
										className="text-black"
										onClick={() => addToOrder(product.id, product.name, product.price)}
									>
										{product.name}
									</Button>
								))}
							</div>
						)}
					</section>
				</div>
			</div>
			{/* Sección 3: Orden */}
			<section className="flex flex-col w-full px-4">
				<h2 className="text-xl font-bold mb-2 text-white">Orden</h2>
				<Card className="flex flex-col bg-white h-full flex-grow">
					<CardContent className="p-3">
						{orderItems.length === 0 ? (
							<div className="flex flex-col items-center justify-center text-black">No hay elementos en la orden.</div>
						) : (
							<div className="flex flex-col">
								{orderItems.map((item) => (
									<Card key={item.productId} className="text-black bg-white">
										<CardContent className="px-4 py-2">
											<div className="w-full h-full flex flex-row items-center justify-between">
												<div className="flex flex-col">
													<p className="font-medium text-sm">{item.name}</p>
													<p className="text-xs text-gray-600">
														{item.quantity} x ${item.price} = ${item.quantity * item.price}
													</p>
												</div>
												<div className="flex flex-row gap-1">
													<Button size="sm" variant="destructive" onClick={() => removeFromOrder(item.productId)}>
														✕
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</section>
			{/* Sección 4: Botón para enviar orden */}
			<div className="w-full">
				<Button className="w-full bg-green-500 hover:bg-green-400">Agregar a la cuenta</Button>
			</div>
		</article>
	);
};

export default TablesInfo;
