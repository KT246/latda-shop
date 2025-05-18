export interface Details {
  id: number;
  cart_id: number;
  barcode: string;
  title: string;
  cost_thb: number;
  size: string;
  use_for: string;
  unit: string;
  category: string;
  cost_lak: number;
  wholesale_thb: number;
  wholesale_lak: number;
  retail_thb: number;
  retail_lak: number;
  discount: number;
  qty: number;
  total_unit_lak: number;
  total_lak: number;
}
export interface Cart {
  id: number;
  cashier_id: string;
  cart_type: number;
  cart_name: number;
  total_lak: number;
  total_thb: number;
  total_unit_lak: number;
  total_unit_thb: number;
  rate: number;
  m_discount: number;
  status: string;
  details: Details[];
}
export interface Invoice {
  id: number;
  cashier_id: string;
  member_id: string;
  cart_type: number;
  total_lak: number;
  total_thb: number;
  total_unit_lak: number;
  total_unit_thb: number;
  total_checkout_lak: number;
  total_checkout_thb: number;
  rate: number;
  m_discount: number;
  pay_type: string;
  date_create: string;
  status: string;
  details: Details[];
}
export interface InvoiceResponse {
  invoices: Invoice[];
  total: number;
  totalPages: number;
  currentPage: number;
}
export const currenDate = new Date().toISOString().split("T")[0];
