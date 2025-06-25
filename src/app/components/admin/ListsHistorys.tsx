"use client";
import React, { useState } from "react";
import { InvoiceResponse } from "@/app/lib/interface";
import Link from "next/link";

import { formatDate, formattedNumber } from "@/app/helpers/funtions";
import HeaderLinks from "../HeaderLinks";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
} from "@heroui/react";

import { GetAllInvoices } from "@/app/api/admin.product";
import { getTodayDate } from "@/app/helpers/funtions";

function ListsHistorys() {
  /// useState
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = useState(10);
  const [invoices, setInvoices] = useState<InvoiceResponse | null>(null);

  /// paramiter
  const data_start = "2025-06-20";
  const data_end = getTodayDate();

  const fetchData = async () => {
    const res: any = await GetAllInvoices(10, page, data_start, data_end);
    const data = res.data;
    setInvoices(data);
    setTotalPages(data.totalPages);
  };

  /// useEffect

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [page]);

  const handleAll = async (e: React.FormEvent) => {};
  const handleFilter = async (e: any) => {};
  return (
    <div>
      <div className="flex items-center justify-between gap-5 border-b-2 mb-3 pb-2">
        <h3 className="w-[200px] font-semibold text-xl">ປະຫວັດການຂາຍ</h3>
        <form className="w-full" onSubmit={handleAll}>
          <div className="flex w-full items-center gap-4">
            <label>ເລີ່ມຕົ້ນ</label>
            <div
              className="border-gray-300 border-2 px-3 py-1 rounded-md
        "
            >
              <input
                type="date"
                // value={date_start}
                // onChange={(e) => updateDateStart(e.target.value)}
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
                // value={date_end}
                // onChange={(e) => updateDateEnd(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 rounded text-white"
            >
              ຄົ້ນຫາ
            </button>
            <button
              type="button"
              // onClick={handleReset}
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
              // value={idVoice}
              // onChange={(e) => setIdVoice(e.target.value)}
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
      {/* <HeaderLinks
        name="ປະຫວັດການຂາຍ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      /> */}

      <Table
        color={"primary"}
        selectionMode="single"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
          th: "bg-blue-500 text-white font-semibold text-sm",
        }}
      >
        <TableHeader>
          <TableColumn>ລະຫັດບິນ</TableColumn>
          <TableColumn>ວັນທີສ້າງ</TableColumn>

          <TableColumn>ລະຫັດຜູ້ຂາຍ</TableColumn>
          <TableColumn>ອັດຕາແລກປ່ຽນ</TableColumn>
          <TableColumn>ຈໍານວນສິນຄ້າ</TableColumn>
          <TableColumn>ສ່ວນຫຼຸດ</TableColumn>
          <TableColumn>ລາຄາລວມ (LAK)</TableColumn>
          <TableColumn>ປະເພດການຈ່າຍ</TableColumn>
          <TableColumn>status</TableColumn>
          <TableColumn>action</TableColumn>
        </TableHeader>
        <TableBody items={invoices?.invoices ?? []}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{formatDate(item.date_create)}</TableCell>
              <TableCell>{item.cashier_id}</TableCell>
              <TableCell>{item.rate}</TableCell>
              <TableCell>{item.details.length}</TableCell>
              <TableCell>{item.m_discount}</TableCell>
              <TableCell>{formattedNumber(item.total_checkout_lak)}</TableCell>
              <TableCell>
                {item.pay_type === "cash"
                  ? "ເງິນສົດ"
                  : item.pay_type === "transfer"
                  ? "ເງິນໂອນ"
                  : "່ຕິດໜີ້"}
              </TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="ເບິ່ງ">
                    <Link href={`/admin/products/detail/${item.id}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip content="ແກ້ໄຂ">
                    <Link href={`/admin/products/edit/${item.id}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color="danger" content="ລົບ">
                    <button
                      type="button"
                      // onClick={() => handleDelete(item?.barcode)}
                    >
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <span className="py-1 px-2 border-l-1 w-1/12 text-center">ລະຫັດບິນ</span>
      <span className="py-1 px-2 border-l-1 w-1/6 text-center">ວັນທີສ້າງ</span>
      <span className="py-1 px-2 border-l-1 w-1/12 text-center">
        ລະຫັດຜູ້ຂາຍ
      </span>

      <span className="py-1 px-2 border-l-1 w-1/12 text-center">
        ອັດຕາແລກປ່ຽນ
      </span>
      <span className="py-1 px-2 border-l-1 w-1/12 text-center ">
        ຈໍານວນສິນຄ້າ
      </span>
      <span className="py-1 px-2 border-l-1 w-1/12 text-center ">ສ່ວນຫຼຸດ</span>
      <span className="py-1 px-2 border-l-1 w-1/6 text-center">
        ລາຄາລວມ (LAK)
      </span>
      <span className="py-1 px-2 border-l-1 w-1/12 text-center">
        ປະເພດການຈ່າຍ
      </span>
      <span className="py-1 px-2 border-l-1 w-1/4 text-center">ດຳເນີນການ</span> */}
      {/* <p className="font-semibold flex bg-blue-500 text-gray-100  rounded-t-md sticky top-0 z-10 mt-5 text-sm">
        <span className="py-1 px-2  w-12">ລຳດັບ</span>
        <span className="py-1 px-2 border-l-1 w-36">ບາໂຄດ</span>
        <span className="py-1 px-2 border-l-1 w-48">ຫົວຂໍ້</span>
        <span className="py-1 px-2 border-l-1 w-48">ໃຊ້ສໍາລັບ</span>
        <span className="py-1 px-2 border-l-1 w-20">ຂະຫນາດ</span>
        <span className="py-1 px-2 border-l-1 w-20">ຫົວໜ່ວຍ</span>
        <span className="py-1 px-2 border-l-1 w-32">ໝວດຫມູ່</span>
        <span className="py-1 px-2 border-l-1 w-24 ">ຈໍານວນສິນຄ້າ</span>
        <span className="py-1 px-2 border-l-1 w-32 ">ລາຄາ (LAK)</span>
        <span className="py-1 px-2 border-l-1 w-16 ">ສ່ວນຫຼຸດ</span>
        <span className="py-1 px-2 border-l-1 w-32 text-center">ດຳເນີນການ</span>
      </p>
      <div className="overflow-y-auto h-[71vh] scroll-smooth pb-5">
        {products.length > 0 ? (
          products.map((it, index) => (
            <p className="flex border-b-1" key={index}>
              <span className="py-1 px-2  w-12">{it.id}</span>
              <span className="py-1 px-2 border-l-1 w-36">{it.barcode}</span>
              <span className="py-1 px-2 border-l-1 w-48 truncate overflow-hidden whitespace-nowrap">
                {it.title}
              </span>
              <span className="py-1 px-2 border-l-1 w-48 truncate overflow-hidden whitespace-nowrap">
                {it.use_for}
              </span>
              <span className="py-1 px-2 border-l-1 w-20">{it.size}</span>
              <span className="py-1 px-2 border-l-1 w-20">{it.unit}</span>
              <span className="py-1 px-2 border-l-1 w-32">{it.category}</span>
              <span className="py-1 px-2 border-l-1 w-24 ">{it.qty}</span>
              <span className="py-1 px-2 border-l-1 w-32 ">
                {formattedNumber(it.cost_lak)}. ກີບ
              </span>
              <span className="py-1 px-2 border-l-1 w-16 text-red-500">
                {it.discount}%
              </span>
              <span className="flex justify-center gap-3 p-1 border-l-1 w-48 text-center text-sm">
                <Link
                  href={`/admin/products/detail/${it.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                >
                  ລາຍລະອຽດ
                </Link>
              </span>
            </p>
          ))
        ) : (
          <div className="h-[400px] flex justify-center items-center">
            <p>ບໍ່ທັນມີລາຍຊື່</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
export const EyeIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};
export default ListsHistorys;
