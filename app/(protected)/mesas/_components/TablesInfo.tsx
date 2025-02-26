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
		categoryId: '3',
		name: 'Birra',
		description: 'La mejor',
		price: 2500,
		target: 'Kitchen',
	},
	{
		id: 'f',
		categoryId: '3',
		name: 'Coquita',
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

	// Agregar producto a la orden
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

	// Eliminar producto de la orden
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
				<div className="flex flex-col gap-6">
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
							{/* Breadcrumbs */}
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

						{/* Categorías o Productos */}
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

					{/* Sección 3: Orden de Items */}
					<section className="flex flex-col gap-4 text-white">
						<h2 className="text-xl font-bold">Orden</h2>
						{orderItems.length === 0 ? (
							<p>No hay productos en la orden</p>
						) : (
							<ul className="flex flex-col gap-2">
								{orderItems.map((item) => (
									<Card key={item.productId} className="text-black bg-white">
										<CardContent className="p-4">
											<div className="w-full h-full flex flex-row items-center justify-between">
												<div className="flex flex-col">
													<p className="font-medium text-sm">{item.name}</p>
													<p className="text-xs text-gray-500">
														{item.quantity} x ${item.price} = ${item.quantity * item.price}
													</p>
												</div>
												<div className="flex flex-row gap-1">
													{/* Inser QUantity handler */}
													<Button size="sm" variant="destructive" onClick={() => removeFromOrder(item.productId)}>
														✕
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</ul>
						)}
					</section>

					{/* Sección 4: Botón para enviar orden */}
					<section>
						<Button className="w-full bg-green-500 hover:bg-green-400">Agregar a la cuenta</Button>
					</section>
				</div>
			</div>
		</article>
	);
};

export default TablesInfo;
