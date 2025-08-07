"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlinePointOfSale } from "react-icons/md";
import { CiViewList, CiLogout } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { Tooltip } from "@heroui/react";
import { FaRegUserCircle } from "react-icons/fa";
import useAuthStore from "@/app/store/authStores";
import { useRouter, usePathname } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { IconBase } from "react-icons";
import {
  BiReflectVertical,
  BiSolidDashboard,
  BiSolidReport,
} from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import Image from "next/image";
import { useInvoiceStore } from "@/app/store/Invoice";
import { TbReport, TbReportMoney } from "react-icons/tb";
import { LiaClipboardListSolid } from "react-icons/lia";

const Sidebar = () => {
  /// state
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { token, user } = useAuthStore();
  const { logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const choose = useInvoiceStore((state) => state.choose);
  const updateChoose = useInvoiceStore((state) => state.updateChoose);

  // / router
  const router = useRouter();
  /// use Effect
  useEffect(() => {
    setMounted(true);
  }, []);

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
    {
      label: "ຈັດການສິນຄ້າ",
      href: "/admin/products",
      path: 1,
      icon: LiaClipboardListSolid,
    },
    {
      label: "ປະຫວັດການຂາຍ",
      href: "/admin/history",
      path: 0,
      icon: TbReport,
    },
    {
      label: "ຈັດການພະນັກງານ",
      href: "/admin/employees",
      path: 0,
      icon: FaUsers,
    },
    // { label: "ຈັດການລະບົບ", href: "/admin/profile", path: 0 },
  ];

  const Dropdown = [
    { name: "ລາຍງານບິນ", idx: 0, icon: TbReportMoney },
    { name: "ລາຍງານສິນຄ້າ", idx: 1, icon: BiSolidReport },
    { name: "ຄາດຄະເນສິນຄ້າ", idx: 2, icon: BiReflectVertical },
  ];

  if (!mounted) return null;

  const isActiveDropdown = (idx: number) => {
    if (choose === idx) return true;
    return false;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between border-r">
      <div className="">
        {/* logo section */}
        <div className="flex items-center py-5 px-2  gap-2 border-b border-gray-500 mb-3">
          <div className="w-full text-center uppercase ">
            <p className="text-yellow-400 tracking-widest font-bold text-2xl">
              latda
            </p>
            <p className="text-gray-300 text-xl font-semibold border-b-5 pb-3">
              ອາໄຫຼ່
            </p>
            <p className=" text-sm text-white mt-2">power by SKV gruop</p>
          </div>
        </div>
        {/* links */}
        <div>
          {user?.path === 0 && (
            <>
              <Link
                href={"/admin"}
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  isActive("/admin")
                    ? "bg-gray-100 text-blue-500 border-r-4 border-green-500"
                    : "text-white"
                } w-full flex items-center hover:text-blue-500 gap-2 py-2 px-5 transition duration-300`}
              >
                <BiSolidDashboard />
                ພາບລວມ
              </Link>
              {isOpen && (
                <div className="flex flex-col ps-5 bg-gray-100 border-r-4 border-green-500">
                  {Dropdown.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        updateChoose(item.idx);
                      }}
                      className={` ${
                        isActiveDropdown(index) ? "text-blue-500  " : ""
                      } flex items-center hover:text-blue-500 gap-2 py-2 px-5 transition duration-300 text-black`}
                    >
                      {item.icon && <item.icon className="text-lg" />}
                      <span className="text-sm">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
              {Links.map((link, index) => (
                <Link
                  onClick={() => setIsOpen(false)}
                  key={index}
                  href={link.href}
                  className={` ${
                    isActive(link.href)
                      ? "bg-gray-100 text-blue-500 border-r-4 border-green-500"
                      : "text-white"
                  } flex items-center hover:text-blue-500 gap-2 py-2 px-5 transition duration-300`}
                >
                  <IconBase className="text-lg">
                    <link.icon />
                  </IconBase>
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </>
          )}

          {user?.path === 1 && (
            <Link
              href={"/admin/products"}
              className={` ${
                isActive("/admin/products")
                  ? "bg-gray-100 text-blue-500 border-r-4 border-green-500"
                  : "text-white"
              } flex items-center hover:text-blue-500 gap-2 py-2 px-5 transition duration-300`}
            >
              <span className="text-sm">{"ຈັດການສິນຄ້າ"}</span>
            </Link>
          )}
        </div>
      </div>
      {/* logout */}
      <div className="">
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white hover:text-gray-100 hover:bg-red-400 py-3 px-5 w-full"
        >
          <IoChevronBackOutline />
          ອອກຈາກລະບົບ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
