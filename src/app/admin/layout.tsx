"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/admin/Sidebar";
import useAuthStore from "../store/authStores";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // console.log(pathname)
  const router = useRouter();
  const { token, user } = useAuthStore();
  if (!token) {
    // router.push("/login");
  }
  if (token) {
    if (user?.path === 2) {
      router.push("/cashier");
    }
    if (user?.path === 1) {
      const allowedPaths = ["/admin/products", "/admin/products/create"];

      const isEditProduct = /^\/admin\/products\/edit\/\w+$/.test(pathname);
      const isdetailProduct = /^\/admin\/products\/detail\/\w+$/.test(pathname);

      const isAllowed =
        allowedPaths.includes(pathname) || isEditProduct || isdetailProduct;

      if (!isAllowed) {
        // Redirect hoặc chặn quyền truy cập
        router.push("/admin/products");
        return;
      }
    }
  }
  return (
    <div className="flex gap-5">
      <div className=" bg-blue-950 w-[200px] fixed top-0 left-0 h-full overflow-y-auto z-20">
        <Sidebar />
      </div>
      <div className="w-full ms-[200px]">
        {/* <div className="bg-blue-500 h-[8vh]">
          <Navbar />
        </div> */}
        <div className="  bg-gray-100 px-10 min-h-screen pb-10">{children}</div>
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
