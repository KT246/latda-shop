"use client";
import Link from "next/link";
import React from "react";
import { MdOutlinePointOfSale } from "react-icons/md";
import { CiViewList, CiLogout } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { Tooltip } from "@heroui/react";
import { FaRegUserCircle } from "react-icons/fa";
import useAuthStore from "@/app/store/authStores";
import { useRouter, usePathname } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { IconBase } from "react-icons";
import { BiSolidDashboard } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const { logout } = useAuthStore();
  const router = useRouter();
  const isActive = (path: string) => {
    if (pathname === path) return true;
    if (pathname.startsWith(path) && path !== "/admin") return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const Links = [
    { label: "ພາບລວມ", href: "/admin" },
    { label: "ຈັດການສິນຄ້າ", href: "/admin/products" },
    { label: "ຈັດການພະນັກງານ", href: "/admin/employees" },
    { label: "ປະຫວັດການຂາຍ", href: "/admin/history" },
    { label: "ຈັດການລະບົບ", href: "/admin/profile" },
  ];
  return (
    <div className="w-full overflow-hidden flex flex-col border-r">
      <div className="flex items-center py-5 px-2  gap-2 border-b border-gray-500 mb-3">
        <div className="w-full text-center uppercase ">
          <p className="text-yellow-400 tracking-widest font-bold text-2xl">
            latda
          </p>
          <p className="text-gray-300 text-xl font-semibold border-b-5 pb-3">
            Shop
          </p>
        </div>
      </div>
      {Links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={` ${
            isActive(link.href)
              ? "bg-gray-100 text-blue-500 border-r-4 border-green-500"
              : "text-white"
          } flex items-center  hover:text-blue-500 gap-2 py-2 px-5  transition duration-300`}
        >
          <span className="text-sm">{link.label}</span>
        </Link>
      ))}
      <div className="pt-[250px]">
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white hove:text-gray-100 hover:bg-red-400 py-3 px-5  w-full"
        >
          <IoChevronBackOutline />
          ອອກຈາກລະບົບ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
