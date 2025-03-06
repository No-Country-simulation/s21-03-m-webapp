import { Category } from '../../../../types/category';
import { Product } from '../../../../types/products';

export interface ContextList {
	setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
	selectedCategory: string | null;
	categories: Category[] | undefined;
	products: Product[] | undefined;
}
