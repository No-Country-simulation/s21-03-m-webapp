export interface Profile {
	ownerId: string;
	name: string;
	address: string;
	logo: string;
	phone: string;
	email: string;
	_id: string;
	__v: number;
}

export interface ProfileResponse {
	msg: string;
	profile: Profile;
}
