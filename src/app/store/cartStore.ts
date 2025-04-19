import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart } from "../lib/interface";

interface CartStoreState {
  cart: Cart | null;
  cartName: string;
  searchType: string;
  maxMinqty: number;

  updateCart: (cart: Cart | null) => void;
  updateCartName: (cartName: string) => void;
  updateSearchType: (searchType: string) => void;
  updateMaxMinqty: (maxMinqty: number) => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      cart: null,
      cartName: "1",
      searchType: "code",
      maxMinqty: 0,
      updateCart: (cart: Cart | null) => set({ cart: cart }),
      updateCartName: (cartName: string) => set({ cartName: cartName }),
      updateSearchType: (searchType: string) => set({ searchType: searchType }),
      updateMaxMinqty: (maxMinqty: number) => set({ maxMinqty: maxMinqty }),
    }),
    {
      name: "cart-latda",
    }
  )
);
