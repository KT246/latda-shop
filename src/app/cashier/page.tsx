"use client";
import React from "react";
import SelectCart from "../components/cashier/SelectCart";
import Invoice from "../components/cashier/Invoice";
import FindProduct from "../components/cashier/FindProduct";

const page = () => {
  return (
    <div className="w-full flex gap-5">
      <div className=" w-[50%] inline-block">
        <Invoice />
      </div>
      <div className=" w-[50%] inline-block">
        <SelectCart />
        <FindProduct />
      </div>
    </div>
  );
};

export default page;
