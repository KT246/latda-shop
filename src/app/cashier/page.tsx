"use client";
import React from "react";
import SelectCart from "../components/cashier/SelectCart";
// import dynamic from "next/dynamic";
// import { CartProvider } from "../lib/cartRetailContext";
import Invoice from "../components/cashier/Invoice";
import FindProduct from "../components/cashier/FindProduct";

const page = () => {
  return (
    <div className=" pt-5">
      <div className="  flex gap-5">
        <div className=" w-[730px] inline-block">
          <Invoice />
        </div>
        <div className=" w-[700px] inline-block">
          <SelectCart />
          <FindProduct />
        </div>
      </div>
    </div>
  );
};

export default page;
