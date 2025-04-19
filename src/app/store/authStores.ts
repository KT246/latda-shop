"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  name: string;
  path: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  exchang: string | null;
  login: (token: string, user: User, exchang: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      exchang: null,
      login: (token, user, exchang) => set({ token, user, exchang }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "token", // Lưu vào localStorage
    }
  )
);

export default useAuthStore;
