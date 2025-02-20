export interface Salon {
	_id: string;
	name: string;
	tables: Array<Table>;
}

export interface Table {
	_id: number;
	number: number;
	x: number;
	y: number;
	status: 'Free' | 'Occupied' | 'Billing';
}
