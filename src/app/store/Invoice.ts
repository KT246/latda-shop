import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceResponse, Invoice } from "../lib/interface";

interface InvoiceStoreState {
  invoices: InvoiceResponse | null;
  invoice: Invoice | null;
  size: number;
  currentPage: number;
  totalPages: number;
  updateInvoices: (invoices: InvoiceResponse | null) => void;
  updateInvoice: (invoice: Invoice | null) => void;
  updateSize: (size: number) => void;
  updateCurrentPage: (currentPage: number) => void;
  updateTotalPages: (totalPages: number) => void;
}

export const useInvoiceStore = create<InvoiceStoreState>()(
  persist(
    (set) => ({
      invoices: null,
      invoice: null,
      size: 0,
      currentPage: 1,
      totalPages: 0,
      updateInvoices: (invoices: InvoiceResponse | null) => set({ invoices }),
      updateInvoice: (invoice: Invoice | null) => set({ invoice }),
      updateSize: (size: number) => set({ size }),
      updateCurrentPage: (currentPage: number) => set({ currentPage }),
      updateTotalPages: (totalPages: number) => set({ totalPages }),
    }),
    {
      name: "invoice-store",
    }
  )
);
