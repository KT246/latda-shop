"use client"
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/admin/Sidebar";
import useAuthStore from "../store/authStores";
import { usePathname, useRouter } from "next/navigation";


export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // console.log(pathname)
  const router = useRouter()
  const { token, user } = useAuthStore();
  if (!token) {
    router.push("/login");
  }
  if (token) {
    if (user?.path === 2) {
      router.push("/cashier");
    }
    if (user?.path === 1) {
      const allowedPaths = [
        "/admin/products",
        "/admin/products/create"
      ];

      const isEditProduct = /^\/admin\/products\/edit\/\w+$/.test(pathname);
      const isdetailProduct = /^\/admin\/products\/detail\/\w+$/.test(pathname);

      const isAllowed = allowedPaths.includes(pathname) || isEditProduct || isdetailProduct;

      if (!isAllowed) {
        // Redirect hoặc chặn quyền truy cập
        router.push("/admin/products");
        return;
      }
    }
  }
  return (
    <div className="flex flex-col">
      <div className="bg-blue-500 h-[8vh]">
        <Navbar />
      </div>
      <div className="h-[92vh] flex gap-5">
        <div className=" bg-blue-950 w-[200px]">
          <Sidebar />
        </div>
        <div className="bg-white w-full">{children}</div>
      </div>
    </div>
  );
  // React.useEffect(() => {


  //   if (!token || role !== 'admin') {
  //     setAuthorized(false)
  //   } else {
  //     setAuthorized(true)
  //   }
  // }, [])

  // if (authorized === null) {
  //   return <div className="p-4">กำลังตรวจสอบสิทธิ์...</div>
  // }

  // if (!token) {
  //   return (
  //     <div className="p-4 text-red-500">
  //       คุณไม่มีสิทธิ์เข้าถึงหน้านี้
  //     </div>
  //   )
  // }

}
