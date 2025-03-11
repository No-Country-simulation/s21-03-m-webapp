import { Member } from './member';
import { Table } from './tables';

export interface Order {
	_id: string;
	ownerId: string;
	tableNumber: string;
	people: number;
	items: Array<Item>;
	subtotal: number;
	discount: number;
	discountPercentage: number;
	total: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	closedAt?:string
	serviceBy?: Member;
	comentaries?: string;
}

export interface Item {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	comentaries?: string;
}

export interface OrderRequest {
	id?: string;
	tableNumber?: string;
	people?: number;
	items?: Array<OrderRequestItem>;
	discount?: number;
	discountPercentage?: number;
	status?: string;
	serviceBy?: string | null;
}

export interface OrderRequestItem {
	productId: string;
	quantity: number;
	comentaries?: string;
}

export interface OrderResponse {
	msg: string;
	order: Order;
}

export interface OrderCompleteResponse {
	_id: string;
	ownerId: string;
	tableNumber: Table;
	people: number;
	items: Array<Item>;
	subtotal: number;
	discount: number;
	discountPercentage: number;
	total: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	closedAt: string;
	serviceBy: Member;
	comentaries?:string
}

export interface OrderResponseComplete {
	msg: string;
	order: OrderCompleteResponse;
}