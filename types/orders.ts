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
	productId: {
		_id: string;
		name: string;
	};
	price: number;
	quantity: number;
}

export interface OrderRequest {
	id?: string;
	tableNumber: string;
	people: number;
	items: Array<OrderRequestItem>;
	discount?: number;
	discountPercentage?: number;
}

export interface OrderRequestItem {
	productId: string;
	quantity: number;
}

export interface OrderResponse {
	msg: string;
	order: Order;
}
