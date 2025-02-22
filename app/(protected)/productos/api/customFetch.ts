import public_api from '../../../../actions/api/public_api';
import protected_api from '../../../../actions/api/protected_api';
import axios from 'axios';
import { SERVER_ERROR } from '../../../../constants/app_constants';

type peticion = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Data<T> = T | null;

interface FetchOptions {
	body?: any;
}
interface Props {
	url: string;
	requestType: 'public_api' | 'protected_api';
	body?: any;
	peticion: peticion;
}
export async function customFetch<T>({ url, requestType, body, peticion }: Props): Promise<T> {
	try {
		console.log('BODY :', body);

		const apiRequest =
			{
				public_api: public_api,
				protected_api: protected_api,
			}[requestType] ??
			(() => {
				console.error(`Tipo de solicitud no válido "requestType": ${requestType}`);
			})();

		const peticionType = {
			GET: apiRequest.get,
			POST: apiRequest.post,
			PUT: apiRequest.put,
			DELETE: apiRequest.delete,
		}[peticion];

		const response = await peticionType(`${url}`, body);
		console.log('RESPONSE :', response.data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}
