"use client";
import React from "react";
import { Details, Cart } from "@/app/lib/interface";
import Link from "next/link";
import { formattedNumber } from "@/app/helpers/funtions";
import HeaderLinks from "../HeaderLinks";

export default function ListInvoice() {
  let products: Cart | null = null; // Replace with actual data fetching logic
  products = {
    id: 1,
    cashier_id: "LD0001",
    cart_type: 0,
    cart_name: 1,
    total_lak: 0,
    total_thb: 0,
    total_unit_lak: 0,
    total_unit_thb: 0,
    rate: 660,
    m_discount: 0,
    status: "",
    details: [],
  };
  //  { "id": 1,
  //     "cashier_id": "LD0001",
  //     "cart_type": 0,
  //     "cart_name": 1,
  //     "total_lak": 0,
  //     "total_thb": 0,
  //     "total_unit_lak": 0,
  //     "total_unit_thb": 0,
  //     "rate": 660,
  //     "m_discount": 0,
  //     "status": "",}

  return (
    <>
      <HeaderLinks
        name="ໃບບິນ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <p className="font-semibold flex bg-blue-500 text-gray-100  rounded-t-md sticky top-0 z-10 mt-5 text-sm">
        <span className="py-1 px-2  w-12">ລຳດັບ</span>
        <span className="py-1 px-2 border-l-1 w-48 text-center">ລະຫັດບິນ</span>
        <span className="py-1 px-2 border-l-1 w-40 text-center">ວັນທີສ້າງ</span>
        <span className="py-1 px-2 border-l-1 w-40 text-center">
          ລະຫັດຜູ້ຂາຍ
        </span>
        <span className="py-1 px-2 border-l-1 w-24 text-center">ຊື່ກະຕ່າ</span>
        <span className="py-1 px-2 border-l-1 w-32 text-center">
          ອັດຕາແລກປ່ຽນ
        </span>
        <span className="py-1 px-2 border-l-1 w-24 text-center ">
          ຈໍານວນສິນຄ້າ
        </span>
        <span className="py-1 px-2 border-l-1 w-24 text-center ">ສ່ວນຫຼຸດ</span>
        <span className="py-1 px-2 border-l-1 w-48 text-center">
          ລາຄາລວມ (LAK)
        </span>
        <span className="py-1 px-2 border-l-1 w-24 text-center">ສະຖານະ</span>
        <span className="py-1 px-2 border-l-1 w-32 text-center">ດຳເນີນການ</span>
      </p>
      <div className="overflow-y-auto h-[71vh] scroll-smooth pb-5">
        {products ? (
          <>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-48 uppercase">
                ດກຫັ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40 ">
                15/02/2025
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-40">
                LD001
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">1</span>
              <span className="text-center py-1 px-2 border-l-1 w-32 ">
                650
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">20</span>
              <span className="text-center py-1 px-2 border-l-1 w-24 text-red-500">
                10%
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-48 ">
                {formattedNumber(520100000)}. ກີບ
              </span>
              <span className="text-center py-1 px-2 border-l-1 w-24 ">
                ເງິນສົດ
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-32 text-center text-sm">
                <Link
                  href={`/cashier/invoice/detail/${products.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
          </>
        ) : (
          <div className="h-[400px] flex justify-center items-center">
            <p>ບໍ່ທັນມີລາຍຊື່</p>
          </div>
        )}
      </div>
    </>
  );
}
