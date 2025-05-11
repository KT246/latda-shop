import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceResponse } from "../lib/interface";

interface InvoiceStoreState {
  invoices: InvoiceResponse | null;

  updateInvoices: (invoices: InvoiceResponse | null) => void;
}

export const useInvoiceStore = create<InvoiceStoreState>()(
  persist(
    (set) => ({
      invoices: null,
      total: 0,
      currentPage: 1,
      totalPages: 0,
      updateInvoices: (invoices: InvoiceResponse | null) => set({ invoices }),
    }),
    {
      name: "invoice-store",
    }
  )
);
