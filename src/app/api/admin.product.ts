import api from "../lib/constants";

/// invoices
export const GetAllInvoices = async (
  size: number,
  page: number,
  date_start: string,
  date_end: string,
  pay_type: string
) => {
  try {
    return await api.get(
      `/api/admin/invoices?size=${size}&page=${page}&date_end=${date_end}&date_start=${date_start}&pay_type=${pay_type}`
    );
  } catch (error) {
    return error;
  }
};
export const GetInvoicesId = async (id: number) => {
  return await api.get(`/api/admin/invoice?id=${id}`);
};
export const _cancleInvoices = async (id: number) => {
  try {
    return await api.delete(`/api/admin/invoice?id=${id}`);
  } catch (error) {
    return error;
  }
};
export const updateStatusInvoice = async (id: number, status: string) => {
  try {
    return await api.put(
      `/api/admin/invoice/changestatus?id=${id}&status=${status}`
    );
  } catch (error) {
    return error;
  }
};

/// products
export const GetAllProduct = async (size: number, page: number) => {
  try {
    return await api.get(`/api/admin/products?size=${size}&page=${page}`);
  } catch (error) {
    return error;
  }
};
export const GetProductById = async (bracode: string) => {
  return await api.get(`/api/admin/productid?barcode=${bracode}`);
};
export const GetProductByIds = async (key: string, value: string) => {
  try {
    return await api.get(`/api/admin/findproduct?${key}=${value}`);
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
export const _inCreaseProduct = async (barcode: string, qty: number) => {
  try {
    return await api.post(`/api/admin/product/increase`, { barcode, qty });
  } catch (error) {
    return error;
  }
}

// {users}
export const addUsers = async (data: object) => {
  try {
    return await api.post(`/api/admin/user/add`, data);
  } catch (error) {
    return error;
  }
};
export const GetAllUsers = async () => {
  try {
    return await api.get(`/api/admin/users`);
  } catch (error) {
    return error;
  }
};
export const GetIdUsers = async (id: string) => {
  try {
    return await api.get(`/api/admin/user?id=${id}`);
  } catch (error) {
    return error;
  }
};
export const UpdateUsers = async (id: string, data: object) => {
  try {
    return await api.put(`/api/admin/user/update?id=${id}`, data);
  } catch (error) {
    return error;
  }
};
export const DeleteUsers = async (id: string) => {
  try {
    return await api.delete(`/api/admin/user/delete?id=${id}`);
  } catch (error) {
    return error;
  }
};

/// reports

export const FetchReport = (url: string) =>
  api.get(url).then((res) => res.data);

export const GetReportSale = async (dateStart: string, dateEnd: string) => {
  return await api.get(
    `/api/admin/report-sale?date_start=${dateStart}&date_end=${dateEnd}`
  );
};

/// Exchange

export const PutExChange = async ({ newRate }: { newRate: number }) => {
  return await api.put(`/api/admin/exchange`, { newRate });
};
export const GetExChange = async () => {
  return await api.get(`/api/exchange`);
};
