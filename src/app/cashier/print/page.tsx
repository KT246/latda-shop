"use client";
// import PrintBill from "@/app/components/cashier/PrintBill";
// import React from "react";

// function page() {
//   return (
//     <div>
//       <PrintBill />
//     </div>
//   );
// }

// export default page;
import React, { useState } from "react";
import { Pagination, Input } from "@heroui/react";

// --- Interface types ---
interface InvoiceDetail {
  id: number;
  invoice_id: number;
  barcode: string;
  size: string;
  title: string;
  use_for: string;
  unit: string;
  cost_thb: number;
  cost_lak: number;
  wholesale_thb: number;
  wholesale_lak: number;
  retail_thb: number;
  retail_lak: number;
  discount: number | null;
  qty: number;
  total_unit_lak: number;
  total_lak: number;
}

interface Invoice {
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
  details: InvoiceDetail[];
}

interface InvoiceResponse {
  invoices: Invoice[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// --- Mock dữ liệu ---
const mockData: InvoiceResponse = {
  total: 13,
  totalPages: 3,
  currentPage: 1,
  invoices: [
    {
      id: 11,
      cashier_id: "LD0001",
      member_id: "",
      cart_type: 0,
      total_lak: 23760000,
      total_thb: 23760000,
      total_unit_lak: 23760000,
      total_unit_thb: 0,
      total_checkout_lak: 23750000,
      total_checkout_thb: 0,
      rate: 660,
      m_discount: 10000,
      pay_type: "transfer",
      date_create: "2025-05-06T23:47:42.000Z",
      status: "",
      details: [
        {
          id: 9,
          invoice_id: 11,
          barcode: "00027",
          size: "",
          title: "ຢາງນອກໜ້າM9540 12.4-24.PR8.ລາຍມານຳລົດF-33.OTANI",
          use_for: "",
          unit: "ເສັ້ນ",
          cost_thb: 7900,
          cost_lak: 0,
          wholesale_thb: 0,
          wholesale_lak: 0,
          retail_thb: 9000,
          retail_lak: 5940000,
          discount: null,
          qty: 4,
          total_unit_lak: 23760000,
          total_lak: 23760000,
        },
      ],
    },
  ],
};

// --- Component ---
export default function App() {
  const [page, setPage] = useState(mockData.currentPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Gọi API mới tại đây nếu dùng real API
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Danh sách hóa đơn</h2>
      <div className="space-y-2">
        {mockData.invoices.map((invoice) => (
          <div key={invoice.id} className="border p-3 rounded">
            <p>
              <span>ID:</span> {invoice.id}
            </p>
            <p>
              <span>Cashier:</span> {invoice.cashier_id}
            </p>
            <p>
              <span>Tổng tiền LAK:</span> {invoice.total_lak.toLocaleString()}
            </p>
            <p>
              <span>Ngày tạo:</span>{" "}
              {new Date(invoice.date_create).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <Pagination
        showControls
        total={mockData.totalPages}
        initialPage={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
