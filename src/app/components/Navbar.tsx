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
        <h1 className=" text-white text-xl font-bold p-0 m-0">
          POS ລັດດາ ອາໄຫຼ່
        </h1>
        <p className="  text-[10px] font-semibold text-gray-100  p-0 m-0">
          Power by SKV-GROUP
        </p>
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

      <div className=" text-gray-50 font-semibold uppercase">
        <p className="bg-gray-100 bg-opacity-50 px-2 rounded-sm">{idName}</p>
        <p className="text-[12px] mt-1">ID: {user_name}</p>
      </div>
    </div>
  );
};

export default Navbar;
