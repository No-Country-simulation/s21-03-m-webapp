import { Category } from './category';
import { Product } from './products';

export interface ContextList {
	categories: Category[];
	products: Product[] | undefined;
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	setCategories: React.Dispatch<React.SetStateAction<Category[] >>;
}
