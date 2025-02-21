import axios from "axios";
import { CreateProductRequest, Msg } from "../types/products";
import { CREATE_PRODUCT, REGISTER_URL, SERVER_ERROR } from "../../../../constants/app_constants";
import protected_api from "../../../../actions/api/protected_api";

export async function createProducts(body: CreateProductRequest): Promise<Msg> {
	try {
		console.log("BODY :", body);
		const response = await protected_api.post<Msg>(`${CREATE_PRODUCT}`, body);
		console.log("RESPONSE :",response.data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.msg);
		}
		throw new Error(SERVER_ERROR);
	}
}
