export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	target: ['kitchen', 'bar'];
}

interface Category {
    id: number; 
    name: string;
    description: string;
    icon: string;   
    products: Product[] | [] | null;
}