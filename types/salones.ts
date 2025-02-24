import { Table } from './tables';

export interface Salon {
	_id: string;
	name: string;
	tables: Array<Table>;
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
