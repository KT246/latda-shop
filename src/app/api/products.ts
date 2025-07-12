import api from "../lib/constants";

///////////////// get /////////////////////////
export const apiProductByCode = (key: string) => {
  return api.get("/api/cashier/productcode?code=" + key);
};
export const apiProductByTitle = (key: string) => {
  return api.get("/api/cashier/producttitle?title=" + key);
};
export const apiProductByPage = (key: string) => {
  return api.get("/api/cashier/productpage?page=" + key);
};
export const apiProductByNo = (key: string) => {
  return api.get("/api/cashier/productno?No=" + key);
};
export const apiProductByBarcode = (key: string) => {
  return api.get("/api/cashier/findretail?barcode=" + key);
};
export const apiGetCart = (id: string) => {
  return api.get("/api/cashier/cart?cart_name=" + id);
};

/////////////////// post //////////////////
export const apiAddToCart = (product: object) => {
  return api.post("/api/cashier/addtocart", product);
};
export const apiIncrease = (product: object) => {
  return api.post("/api/cashier/cart/increase", product);
};
export const apiDecrease = (product: object) => {
  return api.post("/api/cashier/cart/decrease", product);
};
export const apiRetail = (product: object) => {
  return api.post("/api/cashier/checkout/retail", product);
};

////////////////////////////// delete /////////////////////////////////

export const apiDeleteCart = (id: number) => {
  return api.delete("/api/cashier/cart/clear?id=" + id);
};
export const apiDeleteProduct = (
  cashier_id: string,
  barcode: string,
  cart_name: number
) => {
  return api.delete(
    `/api/cashier/cart/delete?cashier_id=${cashier_id}&barcode=${barcode}&cart_name=${cart_name}`
  );
};

export const apiDlPdruct = (barcode: string) => {
  return api.delete("/api/admin/product/delete?barcode=" + barcode);
};
export const apiResetQty = () => {
  return api.put("/api/admin/product/reset-qty");
};

// {Invoices}

export const apiPostInvoice = (data: object) => {
  return api.post("/api/cashier/invoice", data);
};
export const apiPostInvoiceCancle = (key: number) => {
  return api.post("/api/cashier/invoice/cancel", key);
};
export const apiGetInvoiceById = (key: string) => {
  return api.get("/api/cashier/invoice?id=" + key);
};
