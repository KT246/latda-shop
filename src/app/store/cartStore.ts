import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart } from "../lib/interface";

interface CartStoreState {
  cart: Cart | null;
  cartName: string;
  searchType: string;
  maxMinqty: number;
  dis_muont: number;
  mn_customer: number;
  mn_check_out: number;
  mn_back: number;

  updateCart: (cart: Cart | null) => void;
  updateCartName: (cartName: string) => void;
  updateSearchType: (searchType: string) => void;
  updateMaxMinqty: (maxMinqty: number) => void;
  updateDisMuont: (dis_muont: number) => void;
  updateMnCustomer: (mn_customer: number) => void;
  updateMnCheckOut: (mn_check_out: number) => void;
  updateMnBack: (mn_back: number) => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      cart: null,
      cartName: "1",
      searchType: "code",
      maxMinqty: 0,
      dis_muont: 0,
      mn_customer: 0,
      mn_check_out: 0,
      mn_back: 0,

      updateCart: (cart) => set({ cart }),
      updateCartName: (cartName) => set({ cartName }),
      updateSearchType: (searchType) => set({ searchType }),
      updateMaxMinqty: (maxMinqty) => set({ maxMinqty }),
      updateDisMuont: (dis_muont) => set({ dis_muont }),
      updateMnCustomer: (mn_customer) => set({ mn_customer }),
      updateMnCheckOut: (mn_check_out) => set({ mn_check_out }),
      updateMnBack: (mn_back) => set({ mn_back }),
    }),
    {
      name: "cart-latda",
    }
  )
);
