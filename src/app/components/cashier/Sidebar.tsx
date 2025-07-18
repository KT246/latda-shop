"use client";
import Link from "next/link";
import React from "react";
import { MdOutlinePointOfSale } from "react-icons/md";
import { CiViewList, CiLogout } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { Tooltip } from "@heroui/react";
import { FaRegUserCircle } from "react-icons/fa";
import useAuthStore from "@/app/store/authStores";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <div className=" h-full flex flex-col justify-between">
      <div>
        <Tooltip content="ຂາຍຍ່ອຍ">
          <Link
            href={"/cashier"}
            className="px-4 py-5 flex hover:bg-blue-800 ease-in-out duration-300"
          >
            <MdOutlinePointOfSale size={20} color="white" />
          </Link>
        </Tooltip>
        <Tooltip content="ໃບບິນ">
          <Link
            href={"/cashier/invoice"}
            className="px-4 py-5 flex hover:bg-blue-800 ease-in-out duration-300"
          >
            <CiViewList size={20} color="white" />
          </Link>
        </Tooltip>
        {/* 
        <Tooltip content="ຂໍ້ມູນສ່ວນຕົວ">
          <Link
            href={"/cashier/account"}
            className="px-4 py-5 flex hover:bg-blue-800 ease-in-out duration-300"
          >
            <FaRegUserCircle size={20} color="white" />
          </Link>
        </Tooltip> */}
      </div>
      <div className="w-full flex justify-center py-5 hover:bg-red-500 duration-300">
        <Tooltip content="ອອກລະບົບ">
          <button onClick={handleLogout} className="text-white font-bold flex ">
            <CiLogout size={20} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
