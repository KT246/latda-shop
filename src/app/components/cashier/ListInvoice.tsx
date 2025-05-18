"use client";
import React, { useState, useEffect } from "react";
import {
  Details,
  Cart,
  InvoiceResponse,
  Invoice,
  currenDate,
} from "@/app/lib/interface";
import Link from "next/link";
import { formattedNumber, formatDate } from "@/app/helpers/funtions";
import { Pagination, DatePicker, Tooltip } from "@heroui/react";
import {
  apiPostInvoice,
  apiPostInvoiceCancle,
  apiGetInvoiceById,
} from "@/app/api/products";

import { useInvoiceStore } from "@/app/store/Invoice";
import { SwalNotification } from "@/app/helpers/alers";
import { toast } from "react-toastify";
import { GrPowerReset } from "react-icons/gr";

export default function ListInvoice() {
  const [change, setChange] = useState(false);
  const [idVoice, setIdVoice] = useState("");

  const {
    updateInvoices,
    updateInvoice,
    updateCurrentPage,
    updateSize,
    updateDateEnd,
    updateDateStart,
    invoices,
    invoice,
    currentPage,
    size,
    date_end,
    date_start,
  } = useInvoiceStore();

  const fetchInvoices = async (page: number) => {
    try {
      const res = await apiPostInvoice({
        page: currentPage,
        size: size,
        date_start: date_start,
        date_end: date_end,
      });
      if (res.status === 200) {
        updateInvoices(res.data);
        updateCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices(currentPage);
  }, [currentPage]);
  useEffect(() => {
    if (size === 10) {
      fetchInvoices(currentPage);
    }
  }, [size]);

  const handleChangePage = (page: number) => {
    // console.log("page", page);
    fetchInvoices(page);
  };

  const handleFilter = async (e: any) => {
    e.preventDefault();

    if (!idVoice) {
      toast.error("ປ້ອນ ID ບິນເພື່ອຊອກຫາ....", {
        position: "top-center",
      });
      return;
    }
    try {
      const res = await apiGetInvoiceById(idVoice);
      if (res.data === null) {
        setChange(false);
        toast.error("ບໍ່ມີບິນນີ້", {
          position: "top-center",
        });
        return;
      }
      updateInvoice(res.data);
      setChange(true);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleCanle = (id: number) => async () => {
    try {
      const res = await apiPostInvoiceCancle(id);
      if (res.data.status !== "error") {
        // console.log("res", res.data.status);
        // fetchInvoices(currentPage);
        // SwalNotification(`${res.data.message}`, "success");
      } else {
        SwalNotification(`${res.data.message}`, "error");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleAll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (date_end && new Date(date_start) > new Date(date_end)) {
      toast.error("ວັນເລີ່ມຕົ້ນຕ້ອງນ້ອຍກວ່າ ຫຼື ເທົ່າກັບວັນສິ້ນສຸດ!", {
        position: "top-center",
      });
      return;
    }
    if (date_start && new Date(date_end) < new Date(date_start)) {
      toast.error("ວັນສິ້ນສຸດຕ້ອງຫຼາຍກວ່າ ຫຼື ເທົ່າກັບວັນເລີ່ມຕົ້ນ!", {
        position: "top-center",
      });
      return;
    }
    try {
      const res = await apiPostInvoice({
        page: currentPage,
        size: size,
        date_start: date_start,
        date_end: date_end,
      });
      if (res.status === 200) {
        updateInvoices(res.data);
        updateCurrentPage(currentPage);
        setChange(false);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleReset = () => {
    setIdVoice("");
    setChange(false);
    updateInvoice(null);
    updateDateStart("2025-05-06");
    updateDateEnd(currenDate);
    updateSize(10);
    updateCurrentPage(1);
  };
  console.log(invoices);
  return (
    <>
      {/* header */}
      <div className="flex items-center justify-between gap-5 border-b-2 mb-3 pb-2">
        <h3 className="w-[150px] font-semibold text-xl">ໃບບິນ</h3>
        <form className="w-full" onSubmit={handleAll}>
          <div className="flex w-full items-center gap-4">
            <label>ເລີ່ມຕົ້ນ</label>
            <div
              className="border-gray-300 border-2 px-3 py-1 rounded-md
            "
            >
              <input
                type="date"
                value={date_start}
                onChange={(e) => updateDateStart(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <label>ສີ້ນສຸດ</label>
            <div
              className="border-gray-300 border-2 px-3 py-1 rounded-md
            "
            >
              <input
                type="date"
                value={date_end}
                onChange={(e) => updateDateEnd(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <label htmlFor="sizePage">ຈໍານວນລາຍການ</label>
            <input
              type="number"
              className="w-1/12 py-1 px-2 border-2 border-gray-300 hover:border-gray-400 rounded outline-none"
              name="sizePage"
              value={size}
              onChange={(e) => updateSize(Number(e.target.value))}
              min={0}
              max={12}
            />

            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 rounded text-white"
            >
              ຄົ້ນຫາ
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-blue-500 px-2 py-1 rounded text-white"
            >
              ຄ່າເລີ່ມຕົ້ນ
            </button>
          </div>
        </form>
        <form onSubmit={handleFilter} className="flex items-center gap-2 pe-10">
          <div className="border-2 border-gray-300 hover:border-gray-400 rounded overflow-hidden">
            <input
              type="text"
              className="w-full  px-2 py-1 outline-none "
              placeholder="ປ້ອນ ID ບິນ...."
              value={idVoice}
              onChange={(e) => setIdVoice(e.target.value)}
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
        <span className="py-1 px-2  w-14">ລຳດັບ</span>
        <span className="py-1 px-2 border-l-1 w-1/12 text-center">
          ລະຫັດບິນ
        </span>
        <span className="py-1 px-2 border-l-1 w-1/6 text-center">
          ວັນທີສ້າງ
        </span>
        <span className="py-1 px-2 border-l-1 w-1/12 text-center">
          ລະຫັດຜູ້ຂາຍ
        </span>

        <span className="py-1 px-2 border-l-1 w-1/12 text-center">
          ອັດຕາແລກປ່ຽນ
        </span>
        <span className="py-1 px-2 border-l-1 w-1/12 text-center ">
          ຈໍານວນສິນຄ້າ
        </span>
        <span className="py-1 px-2 border-l-1 w-1/12 text-center ">
          ສ່ວນຫຼຸດ
        </span>
        <span className="py-1 px-2 border-l-1 w-1/6 text-center">
          ລາຄາລວມ (LAK)
        </span>
        <span className="py-1 px-2 border-l-1 w-1/12 text-center">
          ປະເພດການຈ່າຍ
        </span>
        <span className="py-1 px-2 border-l-1 w-1/4 text-center">
          ດຳເນີນການ
        </span>
      </p>
      <div className="overflow-y-auto h-[71vh] scroll-smooth pb-5">
        {change ? (
          <p className="flex border-b-1">
            <span className="py-1 px-2  w-14 ">{1}</span>
            <span className="text-center py-1 px-2 border-l-1 w-1/12 uppercase">
              {invoice?.id}
            </span>
            <span className="text-center py-1 px-2 border-l-1 w-1/6">
              {formatDate(invoice?.date_create ?? "")}
            </span>
            <span className="text-center py-1 px-2 border-l-1 w-1/12">
              {invoice?.cashier_id}
            </span>

            <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
              {invoice?.rate}
            </span>
            <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
              {(invoice?.details?.length ?? 0) + 1}
            </span>
            <span className="text-right py-1 px-2 border-l-1 w-1/12 text-red-500">
              {formattedNumber(invoice?.m_discount ?? 0)}. ກີບ
            </span>
            <span className="text-right py-1 px-2 border-l-1 w-1/6 ">
              {formattedNumber(invoice?.total_checkout_lak ?? 0)}. ກີບ
            </span>
            <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
              {invoice?.pay_type === "cash" ? "ເງິນສົດ" : "ເງິນໂອນ"}
            </span>
            <span className="flex justify-center gap-3 p-1 border-l-1 w-1/4 text-center text-sm">
              <Link
                href={`/cashier/invoice/detail/${invoice?.id}`}
                className="flex-1 bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
              >
                ລາຍລະອຽດ
              </Link>
              <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white  font-bold  px-2 rounded">
                Print
              </button>
              <button
                onClick={handleCanle(invoice?.id ?? 0)}
                className="flex-1 bg-red-500 hover:bg-red-700 text-white  font-bold  px-2 rounded"
              >
                ຍົກເລີກ
              </button>
            </span>
          </p>
        ) : invoices ? (
          <>
            {invoices?.invoices.map((invoice: Invoice, index: number) => (
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-14 ">{index + 1}</span>
                <span className="text-center py-1 px-2 border-l-1 w-1/12 uppercase">
                  {invoice?.id}
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-1/6">
                  {formatDate(invoice?.date_create)}
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-1/12">
                  {invoice?.cashier_id}
                </span>

                <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
                  {invoice?.rate}
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
                  {invoice?.details?.length + 1}
                </span>
                <span className="text-right py-1 px-2 border-l-1 w-1/12 text-red-500">
                  {formattedNumber(invoice?.m_discount)}. ກີບ
                </span>
                <span className="text-right py-1 px-2 border-l-1 w-1/6 ">
                  {formattedNumber(invoice?.total_checkout_lak)}. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
                  {invoice.pay_type === "cash" ? "ເງິນສົດ" : "ເງິນໂອນ"}
                </span>
                <span className="flex justify-center gap-3 p-1 border-l-1 w-1/4 text-center text-sm">
                  <Link
                    href={`/cashier/invoice/detail/${invoice.id}`}
                    className="flex-1 bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                  >
                    ລາຍລະອຽດ
                  </Link>
                  <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white  font-bold  px-2 rounded">
                    Print
                  </button>
                  <button
                    onClick={handleCanle(invoice?.id)}
                    className="flex-1 bg-red-500 hover:bg-red-700 text-white  font-bold  px-2 rounded"
                  >
                    ຍົກເລີກ
                  </button>
                </span>
              </p>
            ))}
            <div className="flex justify-center items-center mt-10 w-full">
              <Pagination
                showControls
                page={currentPage}
                total={invoices?.totalPages ?? 0}
                onChange={handleChangePage}
              />
            </div>
          </>
        ) : (
          <div className="h-[400px] flex justify-center items-center">
            <p>ບໍ່ທັນມີລາຍການບີນ</p>
          </div>
        )}
      </div>
    </>
  );
}
