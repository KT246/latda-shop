import HeaderLinks from "@/app/components/HeaderLinks";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderLinks
        name="ຈັດການພະນັກງານ"
        linkCreate="/admin/employees/create"
        linkLists="/admin/employees"
        nameCreate="ສ້າງພະນັກງານ"
        nameList="ລາຍຊື່ພະນັກງານ"
      />
      {children}
    </>
  );
}
