export interface Table {
	_id: string;
	salonId: string;
	number: string;
	x: number;
	y: number;
	xRatio: number;
	yRatio: number;
	status: 'Free' | 'Occupied' | 'Billing';
}

export interface TableRequest {
	id?: string;
	salonId: string;
	number: string;
	x: number;
	y: number;
	xRatio: number;
	yRatio: number;
	status: 'Free' | 'Occupied' | 'Billing';
}

export interface TableResponse {
	msg: string;
	table: Table;
}
