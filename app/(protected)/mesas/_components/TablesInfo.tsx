'use client';

import { useEffect, useState } from 'react';
import { Table } from '@/types/tables';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useOrderByTableId } from '@/actions/hooks/orders/useOrderByTableId';
import { useCreateOrder } from '@/actions/hooks/orders/useCreateOrder';
import { OrderRequest } from '../../../../types/orders';
import { updateOrder } from '../../../../actions/orders';
import { useProducts } from '../../../../actions/hooks/products/useProducts';
import { useCategories } from '../../../../actions/hooks/categories/useCategories';
import { Category } from '../../../../types/category';

type OrderItem = {
	productId: string;
	name: string;
	price: number;
	quantity: number;
};

const TablesInfo = ({ currentTable }: { currentTable: Table }) => {
	const { data: tableOrder, isPending } = useOrderByTableId(currentTable._id);
	const { mutate: createOrder } = useCreateOrder();
	const { data: products } = useProducts();
	const { data: categories } = useCategories();

	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [people, setPeople] = useState(1);

	// TODO - Replace con new Response Type de Order
	const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

	useEffect(() => {
		if (!isPending && tableOrder) {
			setPeople(tableOrder.people);
			setOrderItems((prev) =>
				prev.length === 0 && tableOrder.items
					? tableOrder.items.map((i) => ({
							productId: i.productId._id,
							name: i.productId.name,
							price: i.price,
							quantity: i.quantity,
						}))
					: prev,
			);
		}
	}, [tableOrder, isPending]);

	// TODO - Filter actual prducts
	const filteredProducts = selectedCategory
		? products?.filter((product) => product.categoryId === selectedCategory._id)
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

	const handleCreateOrder = () => {
		const order: OrderRequest = {
			tableNumber: currentTable._id,
			people: people,
			// items: orderItems.map((i) => {
			// 	return {
			// 		productId: i.productId,
			// 		quantity: i.quantity,
			// 	};
			// }),
			items: [
				{
					productId: '67c86168a05f81aefefcbcb6',
					quantity: 2,
				},
			],
		};
		createOrder(order);
	};

	const handleUpdateOrder = () => {
		const order: OrderRequest = {
			id: tableOrder?._id,
			tableNumber: currentTable._id,
			people: people,
			// items: orderItems.map((i) => {
			// 	return {
			// 		productId: i.productId,
			// 		quantity: i.quantity,
			// 	};
			// }),
			items: [
				{
					productId: '67c86168a05f81aefefcbcb6',
					quantity: 8,
				},
			],
		};
		updateOrder(order);
	};

	if (isPending) {
		return (
			<article className="w-full h-full relative">
				<h2>Loading</h2>
			</article>
		);
	}

	return (
		<article className="w-full h-full relative">
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
										<span>{categories?.find((c) => c._id === selectedCategory._id)?.name}</span>
									</>
								)}
							</div>
						</div>
						{!selectedCategory ? (
							<div className="flex flex-wrap gap-1">
								{categories?.map((category) => (
									<Button
										key={category._id}
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
								{filteredProducts?.map((product) => (
									<Button
										key={product._id}
										variant={'outline'}
										className="text-black"
										onClick={() => addToOrder(product._id, product.name, product.price)}
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
				<Button
					className="w-full bg-green-500 hover:bg-green-400"
					onClick={tableOrder ? handleUpdateOrder : handleCreateOrder}
				>
					{tableOrder ? 'Actualizar Orden' : 'Agregar a la cuenta'}
				</Button>
			</div>
		</article>
	);
};

export default TablesInfo;
