import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from '../../constants/app_constants';

const protectedApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_REMOTE_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

protectedApi.interceptors.request.use(
	(config) => {
		const token = Cookies.get(COOKIE_NAME);
		if (token) {
			config.headers.token = `${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export default protectedApi;
