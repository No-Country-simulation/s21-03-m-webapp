export interface Table {
	_id: string;
	salonId: string;
	number: number;
	x: number;
	y: number;
	status: 'Free' | 'Occupied' | 'Billing';
}

export interface TableRequest {
	salonId: string;
	number: string;
	x: string;
	y: string;
	status: 'Free' | 'Occupied' | 'Billing';
}

export interface TableResponse {
	msg: string;
	table: Table;
}
