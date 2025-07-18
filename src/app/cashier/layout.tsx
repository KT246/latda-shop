"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Sidebar from "../components/cashier/Sidebar";
import useAuthStore from "../store/authStores";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore();
  const router = useRouter();
  if (!token || user?.path !== 2) router.push("/login");

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 h-[7%]">
        <Navbar />
      </div>
      <div className="w-full h-[93%] flex">
        <div className=" bg-blue-950 ">
          <Sidebar />
        </div>
        <div className="bg-white w-full h-full p-3">{children}</div>
      </div>
    </div>
  );
}
