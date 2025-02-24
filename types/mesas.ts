export interface Salon {
	_id: string;
	name: string;
	tables: Array<Table>;
}

export interface Table {
	_id: string;
	number: number;
	x: number;
	y: number;
	status: 'Free' | 'Occupied' | 'Billing';
}

export interface SalonRequest {
	name: string;
}

export interface SalonUpdateRequest {
	id: string;
	name: string;
}

export interface SalonResponse {
	msg: string;
	salon: Salon;
}
