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
export interface DeleteProductResponse {
	msg: string;
}
export interface EditProductResponse {
	msg: string;
	product: Product;
}
export interface CreateProductRequest {
	categoryId: string;
	name: string;
	description: string;
	price: number;
	target: 'kitchen' | 'bar';
}

export interface AllProductsResponse {
	products: Product[];
}
