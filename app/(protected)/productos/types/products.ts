export interface Msg{
	msg: string;
}
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
	msg: Msg;
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

export interface SubCategoryData {
	id: number;
	name: string;
	icon: string;
}
export interface CategoryData {
	id: number;
	name: string;
	description: string;
	icon: string;
	subcategories: SubCategoryData[];
}
