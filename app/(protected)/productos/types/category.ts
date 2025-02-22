export interface Category {
	ownerId: string;
	name: string;
	description: string;
	image: string;
	_id: string;
	__v: number;
}
export interface CreateCategoryResponse {
	msg: string;
	category: Category;
}
export interface GetCategoriesResponse {
	msg: string;
	categories: Category[];
}
