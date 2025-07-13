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
  money_received: number;
  money_cash: number;
  date_create: string;
  date_payment: string;
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

export interface Employee {
  id: number;
  username: string;
  password: string;
  name: string;
  phone: string;
  position: string;
  address: string;
  role: number;
}
export interface Products {
  barcode: string;
  page: string | null;
  No: string | null;
  code: string | null;
  size: string | null;
  title: string;
  use_for: string | null;
  brand: string | null;
  unit: string;
  category: string;
  cost_thb: number | 0;
  cost_lak: number | 0;
  wholesale_thb: number | 0;
  wholesale_lak: number | 0;
  retail_thb: number | 0;
  retail_lak: number | 0;
  discount: number | 0;
  num_of_discount: number | 0;
  qty_start: number | 0;
  qty_in: number | 0;
  qty_out: number | 0;
  qty_balance: number | 0;
  qty_alert: number | 0;
  supplier: string | null;
  img_name: string | null;
  status: string;
}

export interface Warehouse {
  total_qty_balance: string;
  total_cost_lak: number;
  total_cost_thb: number;
  active_products_count: string;
  blocked_products_count: string;
}

export interface ReportProduct {
  warehouse: Warehouse;
  productalert: Products[];
}

export interface SaleDetail {
  total: number | null;
  bill_count: number;
}

export interface ReportSaleDetail {
  saleCompleted: SaleDetail;
  saleDebt: SaleDetail;
  saleCancle: SaleDetail;
}

export interface InvoiceDebt {
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
  money_received: number;
  money_cash: number;
  status: string;
}

export interface ReportSaleResponse {
  detail: ReportSaleDetail;
  invoice_debt: InvoiceDebt[];
}
