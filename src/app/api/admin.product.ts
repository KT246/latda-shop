import api from "../lib/constants";

export const GetAllProduct = async (size: number, page: number) => {
  try {
    return await api.get(`/api/admin/products?size=${size}&page=${page}`);
  } catch (error) {
    return error;
  }
};
export const GetProductById = async (bracode: string) => {
  try {
    return await api.get(`/api/admin/productid?barcode=${bracode}`);
  } catch (error) {
    return error;
  }
};
export const CreateProducts = async (data: FormData) => {
  try {
    return await api.post("/api/admin/product/add", data);
  } catch (error) {
    return error;
  }
};

export const _updateIMG = async (bracode: string, data: FormData) => {
  try {
    return await api.put(
      `/api/admin/product/updateimg?barcode=${bracode}`,
      data
    );
  } catch (error) {
    return error;
  }
};

export const _updateProduct = async (bracode: string, data: object) => {
  try {
    return await api.patch(
      `/api/admin//product/update?barcode=${bracode}`,
      data
    );
  } catch (error) {
    return error;
  }
};
