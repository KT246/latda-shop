import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InvoiceResponse, Invoice, currenDate } from "../lib/interface";

interface InvoiceStoreState {
  invoices: InvoiceResponse | null;
  invoice: Invoice | null;
  size: number;
  date_start: string;
  date_end: string;
  choose: number;
  updateChoose: (choose: number) => void;
  currentPage: number;
  totalPages: number;
  exchange: number;
  updateExchange: (exchange: number) => void;
  updateInvoices: (invoices: InvoiceResponse | null) => void;
  updateInvoice: (invoice: Invoice | null) => void;
  updateSize: (size: number) => void;
  updateDateStart: (date_start: string) => void;
  updateDateEnd: (date_end: string) => void;
  updateCurrentPage: (currentPage: number) => void;
  updateTotalPages: (totalPages: number) => void;
}

export const useInvoiceStore = create<InvoiceStoreState>()(
  persist(
    (set) => ({
      choose: 0,
      updateChoose: (choose: number) => set({ choose }),
      exchange: 0,
      invoices: null,
      invoice: null,
      size: 5,
      date_start: "2025-05-06",
      date_end: currenDate,
      currentPage: 1,
      totalPages: 0,
      updateInvoices: (invoices: InvoiceResponse | null) => set({ invoices }),
      updateInvoice: (invoice: Invoice | null) => set({ invoice }),
      updateSize: (size: number) => set({ size }),
      updateDateStart: (date_start: string) => set({ date_start }),
      updateDateEnd: (date_end: string) => set({ date_end }),
      updateCurrentPage: (currentPage: number) => set({ currentPage }),
      updateTotalPages: (totalPages: number) => set({ totalPages }),
      updateExchange: (exchange: number) => set({ exchange }),
    }),
    {
      name: "invoice-store",
    }
  )
);
