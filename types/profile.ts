export interface Profile {
	_id: string;
	ownerId: string;
	image: string;
	name: string;
	address: string;
	logo: string;
	phone: string;
	email: string;
	__v: number;
}

export interface ProfileResponse {
	msg: string;
	profile: Profile;
}
