'use client';

import { useEffect, useState } from 'react';
import { Table } from '@/types/tables';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOrderByTableId } from '@/actions/hooks/orders/useOrderByTableId';
import { useCreateOrder } from '@/actions/hooks/orders/useCreateOrder';
import { Item, OrderRequest } from '../../../../types/orders';
import { useProducts } from '../../../../actions/hooks/products/useProducts';
import { useCategories } from '../../../../actions/hooks/categories/useCategories';
import { Category } from '../../../../types/category';
import { useUpdateTables } from '../../../../actions/hooks/tables/useUpdateTables';
import { useUpdateOrder } from '../../../../actions/hooks/orders/useUpdateOrder';
import { useMembers } from '../../../../actions/hooks/members/useMembers';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select';
import { ComponentLoader } from '../../../../components/library/loading';
import { Pencil } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../../../components/ui/dialog';
import { Label } from '../../../../components/ui/label';

const TablesInfo = ({ currentTable }: { currentTable: Table }) => {
	const { data: tableOrder, isPending } = useOrderByTableId(currentTable._id);
	const { data: products } = useProducts();
	const { data: categories } = useCategories();
	const { data: members } = useMembers();
	const { mutate: createOrder } = useCreateOrder();
	const { mutate: updateOrder } = useUpdateOrder();
	const { mutate: updateTableStatus } = useUpdateTables();

	const [date, setDate] = useState(new Date());
	const [people, setPeople] = useState(1);
	const [orderItems, setOrderItems] = useState<Item[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [productEditOpen, setProductEditOpen] = useState(false);
	const [editProduct, setEditProduct] = useState<Item | null>(null);

	useEffect(() => {
		if (!isPending && tableOrder) {
			setDate(tableOrder.createdAt ? new Date(Date.parse(tableOrder.createdAt)) : new Date());
			setPeople(tableOrder.people ? tableOrder.people : 1);
			setOrderItems(tableOrder.items);
		}
	}, [tableOrder, isPending]);

	const filteredProducts = selectedCategory
		? products?.filter((product) => product.categoryId === selectedCategory._id)
		: [];

	const addToOrder = (productId: string, name: string, price: number) => {
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
			items: orderItems.map((i) => {
				return {
					productId: i.productId,
					quantity: i.quantity,
				};
			}),
		};
		createOrder(order);
		updateTableStatus({ ...currentTable, id: currentTable._id, status: 'Occupied' });
	};

	const handleUpdateOrder = () => {
		const order: OrderRequest = {
			id: tableOrder?._id,
			tableNumber: currentTable._id,
			people: people,
			items: orderItems.map((i) => {
				return {
					productId: i.productId,
					quantity: i.quantity,
				};
			}),
		};
		updateOrder(order);
	};

	const handleDate = () => {
		const weekday = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		return `${weekday[date.getUTCDay()]} ${date.getDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
	};

	if (isPending) return <ComponentLoader></ComponentLoader>;

	return (
		<article className="w-full h-full relative">
			<div className="w-[90%] m-auto py-3 text-white">
				<h2 className="text-lg font-bold text-center mb-3">Mesa {currentTable.number}</h2>
				<div className="flex flex-col gap-2">
					{/* Sección 1: Fecha, People y Members */}
					<section className="flex flex-col gap-1 text-sm font-thin">
						<div className="flex flex-row gap-2 items-center">
							<h2 className="w-[90px]">Fecha:</h2>
							<span className="font-bold">{handleDate()}</span>
						</div>
						<div className="flex flex-row gap-2 items-center">
							<h2 className="w-[90px]">Personas: </h2>
							<Input
								type="text"
								className="h-7 bg-white text-black border-none outline-none"
								value={people}
								onChange={(e) => setPeople(Number(e.target.value))}
							/>
						</div>
						<div className="flex flex-row gap-2 items-center">
							<h2 className="w-[90px]">Atiende: </h2>
							<Select>
								<SelectTrigger className="bg-white text-foreground h-7">
									<SelectValue placeholder="Quien esta atendiendo?" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value={'Encargado'}>Encargado</SelectItem>
										{members?.map((i) => {
											return (
												<SelectItem key={i._id} value={i.name}>
													{i.name}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
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
										className="h-9 text-black"
										onClick={() => setSelectedCategory(category)}
									>
										{category.name}
									</Button>
								))}
							</div>
						) : (
							<div className="flex flex-wrap gap-1">
								{filteredProducts?.length == 0 && <h2>Para comenzar elige una categoria</h2>}
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
			<section className="flex flex-col w-full px-4 relatuve">
				<h2 className="text-xl font-bold text-white">Orden</h2>
				<div className="flex flex-col bg-white">
					<article className="p-3 py-5 min-h-[528px]">
						{orderItems.length === 0 ? (
							<div className="flex flex-col items-center justify-center text-black">No hay elementos en la orden.</div>
						) : (
							<div className="flex flex-col gap-3">
								{orderItems.map((item) => (
									<article key={item.productId} className="px-1 text-black bg-white">
										<div className="px-3 border-l-chart-1 border-l-2">
											<div className="w-full h-full flex flex-row items-center justify-between">
												<div className="flex flex-row gap-2 items-center">
													<p className="text-xs text-gray-600">{item.quantity} x</p>
													<p className="font-normal text-sm">{item.name}</p>
												</div>
												<Pencil
													size={'18px'}
													className=" text-chart-2 cursor-pointer hover:text-green-600 transition-all"
													onClick={() => {
														setProductEditOpen(true);
														setEditProduct(item);
													}}
												></Pencil>
											</div>
										</div>
									</article>
								))}
							</div>
						)}
					</article>
				</div>
			</section>
			{editProduct && (
				<Dialog open={productEditOpen} onOpenChange={setProductEditOpen}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>{editProduct.name}</DialogTitle>
							<DialogDescription>
								Editando <span className="font-bold">{editProduct.name} </span> de la
								<span className="font-bold"> mesa {currentTable.number} </span>
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Cantidad
								</Label>
								<Input
									id="name"
									type="number"
									defaultValue={editProduct.quantity}
									className="col-span-3"
									onChange={(e) => (editProduct.quantity = Number(e.target.value))}
								/>
							</div>
						</div>
						<DialogFooter className="items-center">
							<Button
								type="submit"
								variant={'destructive'}
								onClick={() => {
									removeFromOrder(editProduct.productId);
									setProductEditOpen(false);
								}}
							>
								Remover
							</Button>
							<Button
								type="submit"
								onClick={() => {
									addToOrder(editProduct.productId, editProduct.name, editProduct.quantity);
									setProductEditOpen(false);
								}}
							>
								Guardar cambios
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
			{/* Sección 4: Botón para enviar orden */}
			<div className="w-full flex flex-row items-center absolute bottom-0 left-0">
				<Button
					className="w-full py-5 font-normal text-md bg-green-500 hover:bg-green-400"
					onClick={tableOrder?._id ? handleUpdateOrder : handleCreateOrder}
				>
					{tableOrder?._id ? 'Actualizar Orden' : 'Agregar a la cuenta'}
				</Button>
				<Button className="py-5 font-bold text-md bg-yellow-500 hover:bg-yellow-400">+</Button>
			</div>
		</article>
	);
};

export default TablesInfo;
