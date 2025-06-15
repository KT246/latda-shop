import api from "../lib/constants";

export const GetAllProduct = async (size: number, page: number) => {
    try {
        return await api.get(`/api/admin/products?size=${size}&page=${page}`)
    } catch (error) {
        return error
    }
}