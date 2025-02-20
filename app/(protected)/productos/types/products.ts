export interface ProductData {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	target: ['kitchen', 'bar'];
	// category: string | null;
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
	// products: ProductData[] | [] | null;
}
