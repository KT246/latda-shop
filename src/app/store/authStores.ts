"use client";
import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
  username: string;
  name: string;
  path: number;
}

interface AuthState {
  token: string | null;
  user: User | null;

  login: (token: string, user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: Cookies.get("token") || null,
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,

  login: (token, user) => {
    set({ token, user });

    Cookies.set("token", token, { expires: 1 });
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
  },

  logout: () => {
    set({ token: null, user: null });

    Cookies.remove("token");
    Cookies.remove("user");
  },
}));

export default useAuthStore;
