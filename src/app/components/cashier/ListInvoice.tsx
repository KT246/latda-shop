"use client";
import React, { useState, useEffect } from "react";
import {
  Details,
  Cart,
  InvoiceResponse,
  Invoice,
  currenDate,
  ReportSaleSummary,
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
  Button,
} from "@heroui/react";
import {
  apiGetAllInvoice,
  apiInvoiceCancle,
  apiGetInvoiceById,
  apiReportSale,
} from "@/app/api/products";

import { useInvoiceStore } from "@/app/store/Invoice";
import { SwalNotification } from "@/app/helpers/alers";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

export default function ListInvoice() {
  const [idVoice, setIdVoice] = useState("");
  const [report, setReport] = useState<ReportSaleSummary | null>(null);

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

  const fetchInvoices = async () => {
    try {
      const res: any = await apiGetAllInvoice(size, currentPage, date_end);
      if (res.status === 200) {
        updateInvoices(res.data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetcReportSale = async () => {
    try {
      const res: any = await apiReportSale(currenDate);
      if (res.status === 200) {
        setReport(res.data);
      }
    } catch (error) {
      console.error;
    }
  };

  /// useEefect
  useEffect(() => {
    fetchInvoices();
  }, [currentPage]);

  useEffect(() => {
    fetcReportSale();
    fetchInvoices();
  }, []);

  const handleChangePage = async (page: number) => {
    const res: any = await apiGetAllInvoice(size, page, date_end);
    updateInvoices(res.data);
  };
  const handleChangeSize = async () => {
    const res: any = await apiGetAllInvoice(size, currentPage, date_end);
    updateInvoices(res.data);
  };

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!idVoice) {
      toast.error("ປ້ອນ ID ບິນເພື່ອຊອກຫາ....", {
        position: "top-center",
      });
      return;
    }
    try {
      const res: any = await apiGetInvoiceById(idVoice);
      console.log(res.data);
      if (res.data.status === "error") {
        toast.error(res.data.message, {
          position: "top-center",
        });
        return;
      }
      updateInvoices(res.data);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message;
        toast.error(errorMessage, {
          position: "top-center",
        });
      } else {
        toast.error("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ");
      }
    }
  };

  const handleCanle = (id: number) => async () => {
    Swal.fire({
      title: "!ຍົກເລີກບິນ",
      text: "ຢຶນຢັນຍົກເລີກບິນ: " + id + " ບໍ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "ຍົກເລີກບິນ",
      focusCancel: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res: any = await apiInvoiceCancle(id);
          if (res?.status === 200) {
            toast.success("ຍົກເລີກສຳເລັດ");
            fetchInvoices();
            fetcReportSale();
          } else {
            console.error("Failed to delete product:", res?.data?.message);
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  const handleReset = () => {
    const reset_start_date = date_end;
    const reset_size = 10;
    const reset_page = 1;
    setIdVoice("");
    updateInvoice(null);
    updateDateStart(reset_start_date);
    updateDateEnd(currenDate);
    updateSize(reset_size);
    updateCurrentPage(reset_page);
    fetchInvoices();
  };
  return (
    <div className="px-10">
      {/* header */}
      <div className="flex items-center justify-between gap-5 border-b-2 mb-3 pb-2">
        <h3 className="w-[150px] font-semibold text-xl">ໃບບິນ</h3>
        <div className="flex w-full items-center gap-4">
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

          <Button onPress={handleChangeSize} color="primary" radius="sm">
            ຄົ້ນຫາ
          </Button>
          <Button onPress={handleReset} color="primary" radius="sm">
            ຄ່າເລີ່ມຕົ້ນ
          </Button>
        </div>

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
          <Button
            type="submit"
            color="warning"
            className="text-white"
            radius="sm"
          >
            ຄົ້ນຫາ ID
          </Button>
        </form>
      </div>

      {/* report */}
      <div className="mb-3">
        <p className="border-l-3 border-blue-500 leading-none ps-1 my-5">
          ລາຍງານການຂາຍ
        </p>
        <div className="flex items-center gap-3 shadow-lg p-2 rounded-lg text-center">
          <div className="font-bold flex-1 bg-gradient-to-tr from-neutral-700 to-neutral-400 p-3 rounded-lg text-white">
            <p className="text-center text-lg font-semibold border-b-2 ">
              ຂາຍໄດ້ທັງໝົດ
            </p>
            <p className="text-2xl">
              <span>{formattedNumber(report?.totalSale.total ?? 0)}</span> ກີບ
            </p>
            <p className="text-xl">
              <span>{report?.totalSale.bill_count ?? 0}</span> ບິນ
            </p>
          </div>
          <div className="font-bold flex-1 bg-gradient-to-tr from-green-700 to-green-400 p-3 rounded-lg text-white">
            <p className="text-center text-lg font-semibold border-b-2">
              ເງິນສົດ
            </p>
            <p className="text-2xl">
              <span>{formattedNumber(report?.saleCash.total ?? 0)}</span> ກີບ
            </p>
            <p className="text-xl">{report?.saleCash.bill_count ?? 0} ບິນ</p>
          </div>
          <div className="font-bold flex-1 bg-gradient-to-tr from-blue-700 to-blue-400 p-3 rounded-lg text-white">
            <p className="text-center text-lg font-semibold border-b-2">
              ເງິນໂອນ
            </p>
            <p className="text-2xl">
              {formattedNumber(report?.saleTransfer.total ?? 0)} ກີບ
            </p>
            <p className="text-xl">
              {report?.saleTransfer.bill_count ?? 0} ບິນ
            </p>
          </div>
          <div className="font-bold flex-1 bg-gradient-to-tr from-warning-700 to-warning-400 p-3 rounded-lg text-white">
            <p className="text-center text-lg font-semibold border-b-2">
              ຕິດໜີ້
            </p>
            <p className="text-2xl">
              {formattedNumber(report?.saleDebt.total ?? 0)} ກີບ
            </p>
            <p className="text-xl">{report?.saleDebt.bill_count ?? 0} ບິນ</p>
          </div>
          <div className="font-bold flex-1 bg-gradient-to-tr from-danger-700 to-danger-400 p-3 rounded-lg text-white">
            <p className="text-center text-lg font-semibold border-b-2">
              ຍົກເລີກ
            </p>
            <p className="text-2xl">
              {formattedNumber(report?.saleCancle.total ?? 0)} ກີບ
            </p>
            <p className="text-xl">{report?.saleCancle.bill_count ?? 0} ບິນ</p>
          </div>
        </div>
      </div>
      {/* table */}
      <p className="border-l-3 border-blue-500 leading-none ps-1 my-5">
        ລາຍການບິນ
      </p>
      <Table
        selectionMode="single"
        color="primary"
        classNames={{
          th: "bg-blue-500 text-white font-semibold text-sm",
        }}
        bottomContent={
          (invoices?.totalPages ?? 0) > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={currentPage}
                total={invoices?.totalPages ?? 0}
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
                      {item.status === "cancel" ? (
                        ""
                      ) : (
                        <Tooltip content="ຍົກເລີກ" color="danger">
                          <button onClick={handleCanle(item.id)}>
                            <span className="text-lg text-red-400 cursor-pointer active:opacity-50 ">
                              <DeleteIcon />
                            </span>
                          </button>
                        </Tooltip>
                      )}
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
    </div>
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
