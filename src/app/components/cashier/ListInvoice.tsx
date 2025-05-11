"use client";
import React, { useState, useEffect } from "react";
import { Details, Cart, InvoiceResponse, Invoice } from "@/app/lib/interface";
import Link from "next/link";
import { formattedNumber, formatDate } from "@/app/helpers/funtions";
import { Pagination } from "@heroui/react";
import { apiPostInvoice } from "@/app/api/products";

import { useInvoiceStore } from "@/app/store/Invoice";

export default function ListInvoice() {
  const [page, setPage] = useState(1);
  const { updateInvoices, invoices } = useInvoiceStore();

  const pageSize = 6;
  const date_start = "2025-05-06";
  const date_end = "2025-05-08";

  const fetchInvoices = async (pageNum: number) => {
    try {
      const res = await apiPostInvoice({
        page: pageNum,
        size: pageSize,
        date_start: date_start,
        date_end: date_end,
      });
      if (res.status === 200) {
        updateInvoices(res.data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  console.log("invoices", invoices);
  useEffect(() => {
    fetchInvoices(page);
  }, []);

  const handleFilter = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      {/* header */}
      <div className="flex items-center justify-between gap-5 border-b-2 mb-3 pb-2">
        <h3 className="w-[150px] font-semibold text-xl">ໃບບິນ</h3>
        <form onSubmit={handleFilter} className="flex items-center gap-2 pe-10">
          <div className="border-1 border-gray-500 rounded overflow-hidden">
            <input
              type="text"
              className="w-full  px-2 py-1 "
              placeholder="ປ້ອນ ID ບິນເພື່ອຊອກຫາ...."
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 px-2 py-1 rounded text-white"
          >
            ຄົ້ນຫາ
          </button>
        </form>
      </div>
      {/* table */}
      <p className="font-semibold flex bg-blue-500 text-gray-100  rounded-t-md sticky top-0 z-10 mt-5 text-sm">
        <span className="py-1 px-2  w-12">ລຳດັບ</span>
        <span className="py-1 px-2 border-l-1 w-20 text-center">ລະຫັດບິນ</span>
        <span className="py-1 px-2 border-l-1 w-48 text-center">ວັນທີສ້າງ</span>
        <span className="py-1 px-2 border-l-1 w-40 text-center">
          ລະຫັດຜູ້ຂາຍ
        </span>

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
        <span className="py-1 px-2 border-l-1 w-28 text-center">
          ປະເພດການຈ່າຍ
        </span>
        <span className="py-1 px-2 border-l-1 w-72 text-center">ດຳເນີນການ</span>
      </p>
      <div className="overflow-y-auto h-[71vh] scroll-smooth pb-5">
        {invoices ? (
          <>
            {invoices?.invoices.map((invoice: Invoice, index: number) => (
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">{index + 1}</span>
                <span className="text-center py-1 px-2 border-l-1 w-20 uppercase">
                  {invoice?.id}
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  {formatDate(invoice?.date_create)}
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40">
                  {invoice?.cashier_id}
                </span>

                <span className="text-center py-1 px-2 border-l-1 w-32 ">
                  {invoice?.rate}
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-24 ">
                  {invoice?.details?.length + 1}
                </span>
                <span className="text-right py-1 px-2 border-l-1 w-24 text-red-500">
                  {formattedNumber(invoice?.m_discount)}. ກີບ
                </span>
                <span className="text-right py-1 px-2 border-l-1 w-48 ">
                  {formattedNumber(invoice?.total_checkout_lak)}. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  {invoice.pay_type === "cash" ? "ເງິນສົດ" : "ເງິນໂອນ"}
                </span>
                <span className="flex justify-center gap-3 p-1 border-l-1 w-72 text-center text-sm">
                  <Link
                    href={`/cashier/invoice/detail/${invoice.id}`}
                    className="flex-1 bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                  >
                    ລາຍລະອຽດ
                  </Link>
                  <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white  font-bold  px-2 rounded">
                    copy
                  </button>
                  <button className="flex-1 bg-red-500 hover:bg-red-700 text-white  font-bold  px-2 rounded">
                    ຍົກເລີກ
                  </button>
                </span>
              </p>
            ))}
          </>
        ) : (
          <div className="h-[400px] flex justify-center items-center">
            <p>ບໍ່ທັນມີລາຍຊື່</p>
          </div>
        )}
        <div className="flex justify-center items-center mt-10 w-full">
          <Pagination
            showControls
            initialPage={page}
            total={invoices?.totalPages ?? 0}
            onChange={(page) => setPage(page)}
          />
          {/* <p className="bg-red-500">{invoices?.</p> */}
        </div>
      </div>
    </>
  );
}
