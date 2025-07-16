"use client";
import React, { useState } from "react";
import { InvoiceResponse } from "@/app/lib/interface";
import Link from "next/link";

import {
  formatDate,
  formattedNumber,
  getOneMonthAgo,
} from "@/app/helpers/funtions";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";

import {
  GetAllInvoices,
  GetInvoicesId,
  _cancleInvoices,
} from "@/app/api/admin.product";
import { getTodayDate } from "@/app/helpers/funtions";
import { toast } from "react-toastify";

function ListsHistorys() {
  /// useState
  const [idInvoice, setIdInvoice] = React.useState<number | null>(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [invoices, setInvoices] = useState<InvoiceResponse | null>(null);
  const [payType, setPayType] = React.useState("");
  const [dateStart, setDateStart] = React.useState(getOneMonthAgo());
  const [dateEnd, setDateEnd] = React.useState(getTodayDate());

  /// paramiter

  const fetchData = async () => {
    const res: any = await GetAllInvoices(
      15,
      page,
      dateStart,
      dateEnd,
      payType
    );
    console.log(payType);
    console.log(res);
    const data = res.data;
    setInvoices(data);
    setTotalPages(data.totalPages);
  };

  /// useEffect

  React.useEffect(() => {
    fetchData();
  }, [payType]);

  React.useEffect(() => {
    fetchData();
  }, [page]);

  /// handle Button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dateEnd < dateStart) {
      toast.warning("ວັນທີສີ້ນສຸດ ຕ້ອງໃຫຍ່ກວ່າ ວັນທີເລີ່ມ");
      return;
    } else {
      fetchData();
    }
  };
  const handleFilter = async (e: any) => {
    if (!idInvoice) {
      toast.warning("ປ້ອນ ID ບິນ", {
        position: "top-center",
      });
      setPayType("");
      fetchData();
      return;
    }

    try {
      const res: any = await GetInvoicesId(idInvoice);

      const data = res.data;
      if (data.status !== "error") {
        const data = res.data;
        setInvoices(data);
        setTotalPages(1);
      }
    } catch (error: any) {
      toast.warning(error.response.data.message, { position: "top-center" });
      setPayType("");
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-5 border-b-2 py-3">
        <h3 className="w-[150px] font-semibold text-xl">ປະຫວັດການຂາຍ</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4">
            <label>ເລີ່ມຕົ້ນ</label>
            <div className="border-gray-300 border-2 px-3 py-1 rounded-md">
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <label>ສີ້ນສຸດ</label>
            <div className="border-gray-300 border-2 px-3 py-1 rounded-md">
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 rounded text-white"
            >
              ຄົ້ນຫາ
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          <span>ປະເພດການຈ່າຍ</span>
          <select
            name="pay_type"
            onChange={(e) => setPayType(e.target.value)}
            className=" cursor-pointer py-1 rounded border-gray-400 border-2"
            defaultValue=""
          >
            <option value="">ທັງໝົດ</option>
            <option className=" cursor-pointer" value="cash">
              ເງິນສົດ
            </option>
            <option className=" cursor-pointer" value="transfer">
              ເງິນໂອນ
            </option>
            <option className=" cursor-pointer" value="debt">
              ຕິດໜີ້
            </option>
          </select>
        </div>
        <div className="flex items-center gap-2 pe-10">
          <div className="border-2 border-gray-300 hover:border-gray-400 rounded overflow-hidden">
            <input
              type="text"
              className="w-full  px-2 py-1 outline-none "
              placeholder="ປ້ອນ ID ບິນ...."
              value={idInvoice !== null ? idInvoice : ""}
              onChange={(e: any) =>
                setIdInvoice(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
          </div>
          <Button
            color="primary"
            onPress={handleFilter}
            radius="sm"
            size="sm"
            className="text-medium"
          >
            ຄົ້ນຫາ
          </Button>
        </div>
      </div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 my-3">
        ລາຍການສິນຄ້າ
      </h1>
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
          <TableColumn className="text-right">ອັດຕາແລກປ່ຽນ</TableColumn>
          <TableColumn className="text-right">ຈໍານວນສິນຄ້າ</TableColumn>
          <TableColumn className="text-right">ສ່ວນຫຼຸດ</TableColumn>
          <TableColumn className="text-right">ລາຄາລວມ (LAK)</TableColumn>
          <TableColumn>ປະເພດການຈ່າຍ</TableColumn>
          <TableColumn>status</TableColumn>
          <TableColumn className="text-center">action</TableColumn>
        </TableHeader>
        <TableBody
          items={invoices?.invoices ?? []}
          emptyContent={"ບໍ່ພົບໃບບິນ"}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{formatDate(item.date_create)}</TableCell>
              <TableCell>{item.cashier_id}</TableCell>
              <TableCell className="text-right">{item.rate}</TableCell>
              <TableCell className="text-right">
                {item.details.length}
              </TableCell>
              <TableCell className="text-right">{item.m_discount}</TableCell>
              <TableCell className="text-right">
                {formattedNumber(item.total_checkout_lak)}
              </TableCell>
              <TableCell>
                {item.pay_type === "cash"
                  ? "ເງິນສົດ"
                  : item.pay_type === "transfer"
                  ? "ເງິນໂອນ"
                  : "ຕິດໜີ້"}
              </TableCell>
              <TableCell className="text-white">
                {item.status === "cancel" ? (
                  <span className="bg-red-600 cursor-not-allowed rounded-lg px-2">
                    ຍົກເລີກ
                  </span>
                ) : item.status === "padding" ? (
                  <span className="bg-yellow-600 rounded-lg px-2">ຕິດໜີ້</span>
                ) : (
                  <span className="bg-green-600 rounded-lg px-2">ສຳເລັດ</span>
                )}
              </TableCell>
              <TableCell className="flex justify-center">
                <Tooltip content="ແກ້ໄຂ">
                  <Link href={`/admin/history/detail/${item.id}`}>
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Link>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
