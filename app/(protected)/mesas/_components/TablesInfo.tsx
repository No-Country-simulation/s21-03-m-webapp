'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { CancelOrderDialog, EditProductDialog, ImprimirTicketDialog } from './dialogs';
import { useUpdateOrderStatus } from '../../../../actions/hooks/orders/useUpdateOrderStatus';

const TablesInfo = ({ currentTable }: { currentTable: Table }) => {
	const { data: tableOrder, isPending, refetch: refetchOrderByTableId } = useOrderByTableId(currentTable._id);
	const { data: products } = useProducts();
	const { data: categories } = useCategories();
	const { data: members } = useMembers();
	const { mutate: createOrder } = useCreateOrder();
	const { mutate: updateOrder } = useUpdateOrder();
	const { mutate: updateOrderStatus } = useUpdateOrderStatus();
	const { mutate: updateTableStatus } = useUpdateTables();

	const [date, setDate] = useState(new Date());
	const [people, setPeople] = useState(1);
	const [orderItems, setOrderItems] = useState<Item[]>([]);
	const [removedItems, setRemovedItems] = useState<Item[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
	const [initialItems, setInitialItems] = useState<Item[]>([]);

	const [editProduct, setEditProduct] = useState<Item | null>(null);
	const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
	const [cancelOrderDialogOpen, setCancelOrderDialogOpen] = useState(false);
	const [imprimirTicketDialogOpen, setImprimirTicketDialogOpen] = useState(false);

	useEffect(() => {
		if (!isPending && tableOrder) {
			setDate(tableOrder.createdAt ? new Date(Date.parse(tableOrder.createdAt)) : new Date());
			setSelectedMemberId(tableOrder.serviceBy ? tableOrder.serviceBy?._id : null);
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
		setRemovedItems((prev) => [...prev, ...orderItems.filter((item) => item.productId === productId)]);
		setOrderItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
	};

	const itemOrderChanged = (item: Item) => {
		const original = initialItems.find((orig) => orig.productId === item.productId);
		if (!original) return true;
		return original.quantity !== item.quantity || original.commentaries !== item.commentaries;
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
			serviceBy: selectedMemberId,
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
			serviceBy: selectedMemberId,
		};
		updateOrder(order, { onSuccess: () => setRemovedItems([]) });
	};

	const handleUpdateOrderStatus = (status: string) => {
		const order: OrderRequest = {
			id: tableOrder?._id,
			status: status,
		};
		updateOrderStatus(order, {
			onSuccess: () => {
				setRemovedItems([]);
				refetchOrderByTableId();
				updateTableStatus({ ...currentTable, id: currentTable._id, status: 'Free' });
			},
		});
	};

	const handleDate = () => {
		const weekday = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		return `${weekday[date.getUTCDay()]} ${date.getDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
	};

	const formatPrice = (value: number | undefined) => {
		if (!value) return Number(0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
		return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
	};

	const hasChanges = useMemo(() => {
		return JSON.stringify(orderItems) !== JSON.stringify(initialItems);
	}, [orderItems, initialItems]);

	const virtualSubtotal = useMemo(() => {
		return orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
	}, [orderItems]);

	const virtualTotal = useMemo(() => {
		return virtualSubtotal;
	}, [virtualSubtotal]);

	const displayedSubtotal = hasChanges ? virtualSubtotal : tableOrder?.subtotal;
	const displayedTotal = hasChanges ? virtualTotal : tableOrder?.total;
	const backgroundColor = hasChanges ? 'bg-green-100' : 'bg-background';

	if (isPending) return <ComponentLoader></ComponentLoader>;

	return (
		<article className="w-full h-full relative">
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
			{imprimirTicketDialogOpen && (
				<ImprimirTicketDialog
					isOpen={imprimirTicketDialogOpen}
					onOpenChange={setImprimirTicketDialogOpen}
					currentTable={currentTable}
					currentOrder={tableOrder}
				></ImprimirTicketDialog>
			)}

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
							<Select
								value={selectedMemberId || 'Encargado'}
								onValueChange={(value) => {
									setSelectedMemberId(value);
								}}
							>
								<SelectTrigger className="bg-white text-foreground h-7">
									<SelectValue placeholder="Quien esta atendiendo?" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value={'Encargado'}>Encargado</SelectItem>
										{members?.map((i) => {
											return (
												<SelectItem key={i._id} value={i._id}>
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
			<section className="flex flex-col w-full px-4">
				<h2 className="text-xl font-bold text-white">Orden</h2>
				<div className="flex flex-col bg-white relative grow">
					<article className="p-3 py-5 min-h-[460px]">
						{orderItems.length === 0 ? (
							<div className="flex flex-col items-center justify-center text-black">No hay elementos en la orden.</div>
						) : (
							<div className="flex flex-col">
								{[...orderItems, ...removedItems].map((item, index) => {
									const isRemoved = removedItems.some((removed) => removed.productId === item.productId);
									const changed = itemOrderChanged(item);
									return (
										<article
											key={index}
											className={`px-1 py-2 cursor-pointer ${
												isRemoved
													? 'line-through opacity-20 cursor-auto'
													: changed
														? 'bg-green-100 font-semibold'
														: 'bg-white font-normal'
											} hover:bg-gray-100`}
											onClick={() => {
												if (!isRemoved) {
													setEditProductDialogOpen(true);
													setEditProduct(item);
												}
											}}
										>
											<div className="px-4 border-l-chart-1 border-l-2">
												<div className="flex flex-row items-center justify-between">
													<div className="flex flex-row gap-2 items-center">
														<p className="text-xs text-gray-600">{item.quantity} x</p>
														<p className="font-normal text-sm">{item.name}</p>
													</div>
													{!isRemoved && (
														<Pencil
															size={'15px'}
															className=" text-chart-2 cursor-pointer hover:text-green-600 transition-all"
														/>
													)}
												</div>
												{item.commentaries && <p className="text-gray-400 text-xs">* Incluye comentarios</p>}
											</div>
										</article>
									);
								})}
							</div>
						)}
					</article>
					<div className={`${backgroundColor} py-2 px-3 flex flex-col gap-2`}>
						<div className="flex items-center justify-between text-sm">
							<h2>Subtotal</h2>
							<span>{formatPrice(displayedSubtotal)}</span>
						</div>
						<div className="flex items-center justify-between text-sm">
							<h2 className="font-extrabold">TOTAL</h2>
							<span>{formatPrice(displayedTotal)}</span>
						</div>
					</div>
				</div>
			</section>

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
						<DropdownMenuLabel>Orden</DropdownMenuLabel>
						<DropdownMenuItem className="cursor-pointer" onClick={() => setImprimirTicketDialogOpen(true)}>
							<PrinterCheck className="text-chart-1" />
							Imprimir Ticket
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<CirclePercent className="text-chart-1" />
							Descuento
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" onClick={() => setCancelOrderDialogOpen(true)}>
							<CircleX className="text-destructive" />
							Cancelar Orden
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Mesa</DropdownMenuLabel>
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => updateTableStatus({ ...currentTable, id: currentTable._id, status: 'Billing' })}
						>
							<CircleCheckBig className="text-chart-4" />
							Cuenta Solicitada
						</DropdownMenuItem>
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => {
								handleUpdateOrderStatus('completed');
							}}
						>
							<CircleCheckBig className="text-chart-2" />
							Cerrar Mesa
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</article>
	);
};

export default TablesInfo;
