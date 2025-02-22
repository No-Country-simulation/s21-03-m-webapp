export interface Product {
	ownerId: string;
	categoryId: string;
	name: string;
	description: string;
	price: number;
	image: string;
	target: ['kitchen', 'bar'];
	_id: string;
	__v: number;
}

export interface CreateProductResponse {
	msg: string;
	product: Product;
}
export interface CreateProductRequest {
	categoryId: string;
	name: string;
	description: string;
	price: number;
}

export interface AllProductsResponse {
	products: Product[];
}
