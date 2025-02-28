import { DELETE_CATEGORY, UPDATE_CATEGORY } from "../../../../../../constants/app_constants";
import { customFetch } from "../../../api/customFetch";
import { DeleteCategoryResponse, updateCategoryRequest, updateCategoryResponse } from "../../../types/category";

export const deleteCategory = async (id: string) => {
    const res = await customFetch<DeleteCategoryResponse>({
        url: `${DELETE_CATEGORY}/${id}`,
        requestType: 'protected_api',
        peticion: 'DELETE',
    });
    return res;
};

export const updateCategory = async (dataForm: updateCategoryRequest, id: string) => {
    const res = await customFetch<updateCategoryResponse>({
        url: `${UPDATE_CATEGORY}/${id}`,
        requestType: 'protected_api',
        body: dataForm,
        peticion: 'PUT',        
    });
    return res;
}