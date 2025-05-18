"use client";
import React from "react";
import SelectCart from "../components/cashier/SelectCart";
import Invoice from "../components/cashier/Invoice";
import FindProduct from "../components/cashier/FindProduct";

const page = () => {
  return (
    <div className="h-full flex gap-5">
      <div className="w-full">
        <Invoice />
      </div>
      <div className=" w-full h-full">
        <SelectCart />
        <FindProduct />
      </div>
    </div>
  );
};

export default page;
