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
import { CircleCheckBig, CirclePercent, CircleX, Pencil, PrinterCheck } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { CancelOrderDialog, EditProductDialog } from './dialogs';

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
	const [initialItems, setInitialItems] = useState<Item[]>([]);

	const [editProduct, setEditProduct] = useState<Item | null>(null);
	const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
	const [cancelOrderDialogOpen, setCancelOrderDialogOpen] = useState(false);

	useEffect(() => {
		if (!isPending && tableOrder) {
			setDate(tableOrder.createdAt ? new Date(Date.parse(tableOrder.createdAt)) : new Date());
			setPeople(tableOrder.people ? tableOrder.people : 1);
			setOrderItems(tableOrder.items);
			setInitialItems(tableOrder.items);
		}
	}, [tableOrder, isPending]);

	const filteredProducts = selectedCategory
		? products?.filter((product) => product.categoryId === selectedCategory._id)
		: [];

	const addToOrder = (productId: string, name: string, price: number, newQuantity?: number) => {
		setOrderItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.productId === productId);
			if (existingItem) {
				return prevItems.map((item) =>
					item.productId === productId ? { ...item, quantity: newQuantity ?? item.quantity + 1 } : item,
				);
			}
			return [...prevItems, { productId, name, price, quantity: newQuantity ?? 1 }];
		});
	};

	const removeFromOrder = (productId: string) => {
		setOrderItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
	};

	const itemOrderChanged = (item: Item) => {
		const original = initialItems.find((orig) => orig.productId === item.productId);
		if (!original) return true;
		return original.quantity !== item.quantity;
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
							<div className="flex flex-col">
								{orderItems.map((item) => {
									const changed = itemOrderChanged(item);
									return (
										<article
											key={item.productId}
											className={`px-1 py-2 cursor-pointer ${
												changed ? 'bg-green-100 font-semibold' : 'bg-white font-normal'
											} hover:bg-gray-100`}
											onClick={() => {
												setEditProductDialogOpen(true);
												setEditProduct(item);
											}}
										>
											<div className="px-4 border-l-chart-1 border-l-2">
												<div className="w-full h-full flex flex-row items-center justify-between">
													<div className="flex flex-row gap-2 items-center">
														<p className="text-xs text-gray-600">{item.quantity} x</p>
														<p className="font-normal text-sm">{item.name}</p>
													</div>
													<Pencil
														size={'15px'}
														className=" text-chart-2 cursor-pointer hover:text-green-600 transition-all"
													></Pencil>
												</div>
											</div>
										</article>
									);
								})}
							</div>
						)}
					</article>
				</div>
			</section>
			{/* === Dialogs === */}
			{editProduct && (
				<EditProductDialog
					isOpen={editProductDialogOpen}
					onOpenChange={setEditProductDialogOpen}
					editProduct={editProduct}
					setEditProduct={setEditProduct}
					removeFromOrder={removeFromOrder}
					setOrderItems={setOrderItems}
					currentTableNumber={currentTable.number}
				></EditProductDialog>
			)}
			{cancelOrderDialogOpen && (
				<CancelOrderDialog
					isOpen={cancelOrderDialogOpen}
					onOpenChange={setCancelOrderDialogOpen}
					currentTable={currentTable}
					currentOrder={tableOrder}
				></CancelOrderDialog>
			)}
			{/* Sección 4: Botón para enviar orden */}
			<div className="w-full flex flex-row items-center absolute bottom-0 left-0">
				<Button
					className="rounded-none w-full py-6 font-bold text-md bg-green-500 hover:bg-green-400"
					onClick={tableOrder?._id ? handleUpdateOrder : handleCreateOrder}
				>
					{tableOrder?._id ? 'Actualizar Orden' : 'Agregar a la cuenta'}
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="rounded-none py-6 font-extrabold text-md bg-yellow-400 hover:bg-yellow-300">+</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-44">
						<DropdownMenuLabel>Opciones</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer">
							<PrinterCheck className="text-chart-1" />
							Imprimir Ticket
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<CirclePercent className="text-chart-1" />
							Descuento
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<CircleCheckBig className="text-chart-2" />
							Mesa Cobrada
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" onClick={() => setCancelOrderDialogOpen(true)}>
							<CircleX className="text-destructive" />
							Cancelar Orden
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</article>
	);
};

export default TablesInfo;
