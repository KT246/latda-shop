import HeaderLinks from "@/app/components/HeaderLinks";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderLinks
        name="ຈັດການສິນຄ້າ"
        linkCreate="/admin/products/create"
        linkLists="/admin/products"
        nameCreate="ສ້າງການສິນຄ້າ"
        nameList="ລາຍການສິນຄ້າ"
      />
      {children}
    </>
  );
}
