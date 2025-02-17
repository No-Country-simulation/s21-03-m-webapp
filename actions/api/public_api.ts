import axios from 'axios';

const public_api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_LOCAL_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default public_api;
