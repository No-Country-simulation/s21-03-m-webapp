export interface Category {
	ownerId: string;
	name: string;
	description: string;
	image: string;
	_id: string;
	__v: number;
}
export interface CreateCategoryRequest {
	name: string;
	description: string;
}
export interface CreateCategoryResponse {
	msg: string;
	category: Category;
}
export interface GetCategoriesResponse {
	msg: string;
	categories: Category[];
}
export interface DeleteCategoryResponse {
	msg: string;
}
export interface updateCategoryResponse {
	msg: string;
	category: Category;
}
export interface updateCategoryRequest {
	name: string;
	description: string;
}