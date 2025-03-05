export enum MemberRole {
	Waiter = 'Waiter',
	Cashier = 'Cashier',
}

export interface Member {
	_id: string;
	ownerId: string;
	name: string;
	rol: MemberRole;
	email: string;
	password: string;
	__v: number;
}

export interface MemberResponse {
	msg: string;
	member: Member;
}
