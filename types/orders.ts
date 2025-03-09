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
}

export interface Item {
	productId: string;
	name: string;
	price: number;
	quantity: number;
}

export interface OrderRequest {
	id?: string;
	tableNumber?: string;
	people?: number;
	items?: Array<OrderRequestItem>;
	discount?: number;
	discountPercentage?: number;
	status?: string;
}

export interface OrderRequestItem {
	productId: string;
	quantity: number;
}

export interface OrderResponse {
	msg: string;
	order: Order;
}
