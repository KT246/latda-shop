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
  // Lấy thông tin từ cookie khi ứng dụng khởi động
  token: Cookies.get("token") || null,
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,

  login: (token, user) => {
    set({ token, user });
    // Lưu token và user vào cookie
    Cookies.set("token", token, { expires: 1 }); // Thời gian hết hạn 1 ngày
    Cookies.set("user", JSON.stringify(user), { expires: 1 }); // Thời gian hết hạn 1 ngày
  },

  logout: () => {
    set({ token: null, user: null });
    // Xóa cookie khi đăng xuất
    Cookies.remove("token");
    Cookies.remove("user");
  },
}));

export default useAuthStore;
