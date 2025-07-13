"use client";
import React from "react";
import useAuthStore from "@/app/store/authStores";
import { useCartStore } from "../store/cartStore";

const Navbar = () => {
  const [user_name, setUserName] = React.useState<string>("");
  const [idName, setIdName] = React.useState<string>("");

  React.useEffect(() => {
    const user = useAuthStore.getState().user;
    if (user) {
      setUserName(user.username);
      setIdName(user.name);
    }
  }, []);

  return (
    <div className=" h-full flex items-center justify-between px-5">
      <div className="">
        <h1 className=" text-white text-xl font-bold">POS Latda Shop</h1>
        <h1 className="  text-[12px] font-semibold text-gray-100">
          Power by SKV-GROUP
        </h1>
      </div>
      {/* <div className="overflow-hidden whitespace-nowrap">
        <p className="animate-marquee text-medium text-gray-50 pb-1 font-semibold">
          ອັບເດດລ່າສຸດ 20/06/202
          <span className="text-yellow-200 px-2">ອັດຕາແລກປ່ຽນ ລາວ - ໄທ:</span>
          <span className="text-gray-50 text-lg rounded-b-full border-b-2 border-gray-200">
          {cart?.rate}
          </span>
        </p>
      </div> */}

      <div className="flex gap-2 items-center text-gray-50 font-semibold uppercase">
        <p className="text-sm text-gray-200 lowercase">hello! </p>
        <p>{user_name}</p>
        <p className="bg-gray-100 bg-opacity-50 px-3 py-1 rounded-sm">
          <span>{idName}</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
