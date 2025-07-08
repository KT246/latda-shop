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
import {
  Pagination,
  DatePicker,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
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

  const handleChangePage = (page: number) => {
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
    const reset_start_date = "2025-05-06";
    const reset_size = 10;
    const reset_page = 1;
    setIdVoice("");
    setChange(false);
    updateInvoice(null);
    updateDateStart(reset_start_date);
    updateDateEnd(currenDate);
    updateSize(reset_size);
    updateCurrentPage(reset_page);
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

      <Table
        aria-label="Example table with client async pagination"
        bottomContent={
          (invoices?.totalPages ?? 0) > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={currentPage}
                total={(invoices?.totalPages ?? 0) - 1}
                onChange={handleChangePage}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>ລະຫັດບິນ</TableColumn>
          <TableColumn> ວັນທີສ້າງ</TableColumn>
          <TableColumn> ລະຫັດຜູ້ຂາຍ</TableColumn>
          <TableColumn> ອັດຕາແລກປ່ຽນ</TableColumn>
          <TableColumn> ຈໍານວນສິນຄ້າ</TableColumn>
          <TableColumn> ສ່ວນຫຼຸດ</TableColumn>
          <TableColumn> ລາຄາລວມ (LAK)</TableColumn>
          <TableColumn> ປະເພດການຈ່າຍ</TableColumn>
          <TableColumn> ດຳເນີນການ</TableColumn>
        </TableHeader>
        <TableBody
          loadingContent={<Spinner />}
          // loadingState={loadingState}
          items={invoices?.invoices ?? []}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{formatDate(item.date_create ?? "")}</TableCell>
              <TableCell>{item.cashier_id}</TableCell>
              <TableCell>{item.rate}</TableCell>
              <TableCell className="text-right">
                {(item.details?.length ?? 0) + 1}
              </TableCell>
              <TableCell className="text-right">
                {formattedNumber(item.m_discount ?? 0)}
              </TableCell>
              <TableCell className="text-right">
                {formattedNumber(item.total_checkout_lak ?? 0)}
              </TableCell>
              <TableCell className="text-center">
                {item.pay_type === "cash" ? "ເງິນສົດ" : "ເງິນໂອນ"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip color="default" content="ເບິ່ງລາຍລະອຽດ">
                    <Link href={`/cashier/invoice/detail/${item.id}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  {item.status !== "" ? (
                    <>
                      <Tooltip color="default" content="coppy ບິນ">
                        <button onClick={handleCanle(item.id)}>
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <PrintIcon />
                          </span>
                        </button>
                      </Tooltip>
                      <Tooltip content="ລົບ" color="danger">
                        <button onClick={handleCanle(item.id)}>
                          <span className="text-lg text-red-400 cursor-pointer active:opacity-50 ">
                            <DeleteIcon />
                          </span>
                        </button>
                      </Tooltip>
                    </>
                  ) : (
                    <div className=" ">
                      <span className="bg-red-300 text-white  font-bold  px-2 rounded">
                        ບິນຖືກຍົກເລີກ
                      </span>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export const PrintIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      width="1em"
      fill="none"
      viewBox="0 0 20 24"
    >
      <path
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"
      />
    </svg>
  );
};

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
