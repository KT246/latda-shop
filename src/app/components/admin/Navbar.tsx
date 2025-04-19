"use client";
import React from "react";
import useAuthStore from "@/app/store/authStores";

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <div className=" h-full flex items-center justify-between ps-5 pe-20">
      <div className="">
        <h1 className=" text-white text-[20px] font-bold">POS Latda Shop</h1>
        <h1 className="  text-[12px] font-semibold text-gray-100">
          Power by SKV-GROUP
        </h1>
      </div>

      <div className="flex gap-2 items-center text-gray-50 font-semibold uppercase">
        <p className="text-sm text-gray-200 lowercase">hello! </p>
        <p>{user?.username}</p>
        <p className="bg-gray-100 bg-opacity-50 px-3 py-1 rounded-sm">
          {user?.name}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
