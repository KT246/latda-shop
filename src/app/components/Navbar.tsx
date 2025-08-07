"use client";
import React from "react";
import useAuthStore from "@/app/store/authStores";
import { useCartStore } from "../store/cartStore";
import { useInvoiceStore } from "../store/Invoice";
import axios from "axios";
import { toast } from "react-toastify";
import { GetExChange } from "../api/admin.product";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const [user_name, setUserName] = React.useState<string>("");
  const [idName, setIdName] = React.useState<string>("");

  const [exchange, setExchange] = React.useState<number>(0);

  //// get exchange rate

  const getExchange = async () => {
    try {
      const res: any = await GetExChange();
      if (res.status === 200) {
        setExchange(res.data.rate);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message;
        toast.error(errorMessage);
      } else {
        toast.error("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ");
      }
    }
  };

  React.useEffect(() => {
    getExchange();
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

      <div className=" text-gray-50 font-semibold flex items-center gap-20">
        <p className="bg-gradient-to-tr from-amber-400 to-orange-500 py-1 px-3 rounded-full">
          Exange Rate: {exchange}
        </p>
        <p className="bg-amber-500 py-1 px-3 rounded-full flex items-center gap-2">
          <IoPersonCircleSharp />
          {idName}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
