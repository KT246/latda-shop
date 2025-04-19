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
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const Links = [
    { label: "ພາບລວມ", href: "/admin" },
    { label: "ຈັດການສິນຄ້າ", href: "/admin/products" },
    { label: "ຈັດການພະນັກງານ", href: "/admin/employees" },
    { label: "ປະຫວັດ", href: "/admin/history" },
    { label: "ຜູ້ໃຊ້", href: "/admin/profile" },
  ];
  return (
    <div className="w-full overflow-hidden flex flex-col border-r">
      <div className="flex items-center py-5 px-2  gap-2 border-b border-gray-500 mb-3">
        <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden bg-white">
          <Image
            src="/CV.jpg"
            alt="CV"
            fill
            sizes="(max-width: 50px) 50px, 50px"
            className="object-cover object-center"
          />
        </div>
        <div className="text-left text-white leading-3">
          <p className="text-sm">Khamtay</p>
          <p className="text-gray-300 text-[12px]">admin</p>
        </div>
      </div>
      {Links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${
            pathname === link.href
              ? "bg-gray-100 text-blue-500 border-r-4 border-green-500"
              : "text-white"
          } flex items-center  hover:text-blue-500 gap-2 p-2  transition duration-300`}
        >
          <span className="text-sm">{link.label}</span>
        </Link>
      ))}
      <div className="pt-[250px]">
        <button className="flex items-center bg-red-500 text-white hove:text-gray-100 hover:bg-red-400 py-3  w-full">
          <IoChevronBackOutline />
          ອອກຈາກລະບົບ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
