"use client";
import React, { useState } from "react";
import HeaderLinks from "../HeaderLinks";
import useSWR from "swr";
import { Doughnut, Line } from "react-chartjs-2";

/// interface
import { ReportProduct, ReportSaleResponse } from "@/app/lib/interface";

/// api
import {
  FetchReport,
  GetReportSale,
  PutExChange,
  GetExChange,
} from "@/app/api/admin.product";

/// table
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Skeleton,
  Tooltip,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";

import Link from "next/link";
import {
  formatDate,
  formattedNumber,
  getTodayDate,
} from "@/app/helpers/funtions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { apiResetQty } from "@/app/api/products";

function Home() {
  /// useState
  const [resportProduct, setReportProduct] = useState<ReportProduct | null>(
    null
  );
  const [resportSale, setReportSale] = useState<ReportSaleResponse | null>(
    null
  );
  const [dateStart, setDateStart] = React.useState(getTodayDate());
  const [dateEnd, setDateEnd] = React.useState(getTodayDate());

  const [exchange, setExchange] = useState<number | 0>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /// useSWR
  const { data: dataRP, error: errorRP } = useSWR(
    `/api/admin/report-product`,
    FetchReport
  );
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /// funtions
  const fetchData = async () => {
    try {
      const res: any = await GetReportSale(dateStart, dateEnd);
      setReportSale(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getExchange = async () => {
    try {
      const res: any = await GetExChange();
      if (res.status === 200) {
        setExchange(res.data.rate);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message;
        toast.error(errorMessage);
      } else {
        toast.error("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dateEnd < dateStart) {
      toast.warning("ວັນທີສີ້ນສຸດ ຕ້ອງໃຫຍ່ກວ່າ ວັນທີເລີ່ມ");
      return;
    } else {
      fetchData();
    }
  };

  const handleUpdateEchange = async () => {
    const { value: rate } = await Swal.fire({
      title: "ອັບເດດ Exchange",
      input: "text",
      inputPlaceholder: "ພິມຈຳນວນ...",
      showCancelButton: true,
      confirmButtonText: "ບັນທຶກ",
      cancelButtonText: "ຍົກເລີກ",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "ກະລຸນາປ້ອນຈຳນວນ Exchange!";
        }
        return null;
      },
      didOpen: () => {
        Swal.getInput()?.focus();
      },
    });

    if (rate) {
      try {
        const res: any = await PutExChange({ newRate: rate });
        if (res.status === 200) {
          toast.success("ອັບເດດອັຕາແລປ່ຽນສຳເລັດ");
          setExchange(res.data.newRate);
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          const errorMessage = e.response.data?.message;
          toast.error(errorMessage);
        } else {
          toast.error("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ");
        }
      }
    }
  };

  const handleResetQty = async () => {
    Swal.fire({
      title: "Reset Stock",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "reset",
      cancelButtonText: "cancel",
      focusCancel: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const res = await apiResetQty();
          if (res?.status === 200) {
            toast.success("ສຳເລັດ");
            fetchData();
          } else {
            console.error("Failed to reset stock:", res?.data?.message);
          }
        } catch (error) {
          console.error("Error reset stock:", error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  /// useEffect
  React.useEffect(() => {
    if (dataRP) {
      setReportProduct(dataRP);
    }
  }, [dataRP]);

  React.useEffect(() => {
    fetchData();
    getExchange();
  }, []);

  return (
    <>
      <HeaderLinks
        name="ພາບລວມ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div className="">
        <div className="">
          <div className="flex flex-col gap-5">
            <form
              onSubmit={handleSubmit}
              className="mt-5 bg-white shadow-lg p-5 flex justify-between items-center rounded-lg"
            >
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

                <Button type="submit" color="primary" radius="sm">
                  ຄົ້ນຫາ
                </Button>
              </div>
              <div className="flex items-center gap-5">
                <p className=" capitalize flex items-center gap-2 bg-gradient-to-br from-yellow-700 to-yellow-400 text-white px-2 rounded-lg">
                  <span className="">Exchange rate:</span>
                  <span className="text-xl font-bold">{exchange}</span>
                </p>
                <Button
                  color="warning"
                  radius="sm"
                  onPress={handleUpdateEchange}
                >
                  {isLoading ? "..." : " ອັບເດດ Rate"}
                </Button>{" "}
                <Button
                  onPress={handleResetQty}
                  color="success"
                  radius="sm"
                  className="text-medium text-white"
                >
                  {isLoading ? "..." : " ອັບເດດສະຕັອກ"}
                </Button>
              </div>
            </form>
            <div className="flex gap-10">
              <div className="w-2/6 flex flex-col gap-3 bg-white p-5 shadow-lg rounded-lg text-white  ">
                <h3 className="border-l-4 border-red-600 text-medium font-semibold leading-none ps-2 text-blue-500">
                  ລາຍງານໃບບິນ
                </h3>
                <div className="h-32 flex flex-col justify-between shadow-lg bg-gradient-to-tr to-blue-400 from-blue-600 rounded-lg p-2 ">
                  <p className="text-end">ຂາຍໄດ້ທັງໝົດ(ບໍ່ລວມບິນຕິດໜີ້)</p>
                  <p className="text-center  font-bold py-3">
                    <span className=" text-3xl me-1">
                      {formattedNumber(
                        resportSale?.detail.saleCompleted.total ?? 0
                      )}
                    </span>
                    <span>ກີບ</span>
                  </p>
                  <p>ຈຳນວນ: {resportSale?.detail.saleCompleted.bill_count}</p>
                </div>
                <div className="h-32 flex justify-between items-center gap-3 text-white ">
                  <div className="flex-1 bg-gradient-to-tr  to-green-400 from-green-600 shadow-lg  rounded-lg p-2">
                    <p className="text-center border-b-2">ກຳໄລ</p>
                    <p className="text-center  font-bold py-3">
                      <span className=" text-3xl me-1">
                        {formattedNumber(
                          resportSale?.detail.profit.total_profit_lak ?? 0
                        )}
                      </span>
                      <span>ກີບ</span>
                    </p>

                    <p className="text-[13px]">ຫລັງຫັກຈາກສ່ວນຫລຸດ!</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-tr to-red-400 from-red-600 shadow-lg  rounded-lg p-2 pb-7">
                    <p className="text-center border-b-2">ສ່ວນຫຼຸດທັງໜົດ</p>
                    <p className="text-center  font-bold py-3">
                      <span className=" text-3xl me-1">
                        {formattedNumber(
                          resportSale?.detail.profit.total_discount_lak ?? 0
                        )}
                      </span>
                      <span>ກີບ</span>
                    </p>
                  </div>
                </div>
                <div className="h-32 flex justify-betwee items-center gap-3 text-white ">
                  <div className="flex-1 bg-gradient-to-tr  to-warning-400 from-warning-600 shadow-lg  rounded-lg p-2">
                    <p className="text-center border-b-2">ຕິດໜີ້</p>
                    <p className="text-center  font-bold py-3">
                      <span className=" text-3xl me-1">
                        {formattedNumber(
                          resportSale?.detail.saleDebt.total ?? 0
                        )}
                      </span>
                      <span>ກີບ</span>
                    </p>

                    <p>ຈຳນວນ: {resportSale?.detail.saleDebt.bill_count}</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-tr to-danger-400 from-danger-600 shadow-lg  rounded-lg p-2">
                    <p className="text-center border-b-2">ຖືກຍົກເລີກ</p>
                    <p className="text-center  font-bold py-3">
                      <span className=" text-3xl me-1">
                        {formattedNumber(
                          resportSale?.detail.saleCancle.total ?? 0
                        )}
                      </span>
                      <span>ກີບ</span>
                    </p>
                    <p>ຈຳນວນ: {resportSale?.detail.saleCancle.bill_count}</p>
                  </div>
                </div>
              </div>
              <div className="w-2/3 flex flex-col gap-3 bg-white p-5 shadow-lg rounded-lg">
                <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 text-blue-500">
                  ບິນຕິດຫນີ້
                </h3>
                <Table
                  selectionMode="single"
                  color="success"
                  isHeaderSticky
                  classNames={{
                    th: "bg-green-500 text-black font-semibold text-sm ",
                    wrapper:
                      " max-h-[25.5rem] overflow-y-auto p-0 rounded-lg shadow-lg scroll-thin border-b-2 border-r-2 border-l-2 border-green-400",
                  }}
                >
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>ວັນທີ</TableColumn>
                    <TableColumn>ຊື່ລູກຄ້າ</TableColumn>
                    <TableColumn className="text-right">
                      ລາຄາລວມທັງຫມົດ(ກີບ)
                    </TableColumn>
                    <TableColumn className="text-center">ລາຍລະອຽດ</TableColumn>
                  </TableHeader>
                  <TableBody
                    items={resportSale?.invoice_debt ?? []}
                    emptyContent="ບໍ່ພົບບິນ"
                  >
                    {(item) => (
                      <TableRow>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{formatDate(item.date_create)}</TableCell>
                        <TableCell>{item.member_id}</TableCell>
                        <TableCell className="text-right">
                          {formattedNumber(item.total_checkout_lak ?? 0)}
                        </TableCell>

                        <TableCell>
                          <Tooltip content="ລາຍລະອຽດ" color="success">
                            <Link
                              href={`/admin/history/detail/` + item.id}
                              className="text-lg hover:text-green-400 flex justify-center "
                            >
                              <EyeIcon />
                            </Link>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex gap-10">
              <div className="w-2/6 flex flex-col gap-3 bg-white p-5 shadow-lg rounded-lg">
                <h3 className="border-l-4 border-red-500 font-semibold leading-none ps-2 text-blue-500">
                  ລາຍງານສິນຄ້າ
                </h3>
                <div className="h-32 shadow-md  bg-gradient-to-tl to-cyan-300 from-cyan-600 rounded-lg p-2 ">
                  <p> ຕົ້ນທືນທັງຫມົດ (ກີບ)</p>

                  <p className="text-center  font-bold py-3">
                    <span className=" text-3xl me-1">
                      {formattedNumber(
                        resportProduct?.warehouse.total_cost_lak || 0
                      )}
                    </span>
                    <span>ກີບ</span>
                  </p>
                </div>
                <div className="h-32 shadow-md  bg-gradient-to-tl to-yellow-300 from-yellow-600 rounded-lg p-2 ">
                  <span>ຕົ້ນທືນທັງຫມົດ (ບາດ)</span>
                  <p className="text-center  font-bold py-3 text-white">
                    <span className=" text-3xl me-1">
                      {formattedNumber(
                        resportProduct?.warehouse.total_cost_thb || 0
                      )}
                    </span>
                    <span>ກີບ</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 text-white ">
                  <div className="h-32 shadow-lg flex-1 bg-gradient-to-tl to-blue-400 from-blue-700 rounded-lg p-2">
                    <p className="text-center border-b-2">ສິນຄ້າທັງຫມົດ</p>
                    <p className="text-center text-3xl font-semibold pt-5">
                      {resportProduct?.warehouse.total_qty_balance}
                    </p>
                  </div>
                  <div className="h-32 shadow-lg text-sm flex-1 bg-gradient-to-bl to-success-400 from-success-700 rounded-lg p-2">
                    <p className="text-center border-b-2 pb-1">
                      ສິນຄ້າເຄື່ອນໄຫວ
                    </p>
                    <p className="text-center text-3xl font-semibold pt-5">
                      {resportProduct?.warehouse.active_products_count}
                    </p>
                  </div>
                  <div className="h-32 shadow-lg bg-gradient-to-tr to-red-400 from-red-700 flex-1 rounded-lg p-2">
                    <p className="text-center border-b-2">ສິນຄ້າບລັອກ</p>
                    <p className="text-center text-3xl font-semibold pt-5">
                      {resportProduct?.warehouse.blocked_products_count}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-2/3 flex flex-col gap-3 bg-white p-5 shadow-lg rounded-lg">
                <h3 className="border-l-4 border-red-500 font-semibold leading-none ps-2  text-blue-500">
                  ສິນຄ້າໃກ້ຫມົດ
                </h3>
                <Table
                  selectionMode="single"
                  color="primary"
                  isHeaderSticky
                  classNames={{
                    th: "bg-blue-500 text-white font-semibold text-sm ",
                    thead: "bg-none rounded-l-0",
                    wrapper:
                      "max-h-[25.5rem] overflow-y-auto p-0 rounded-lg shadow-lg scroll-thin border-b-2 border-r-2 border-l-2 border-blue-400",
                  }}
                >
                  <TableHeader>
                    <TableColumn>Bracode</TableColumn>
                    <TableColumn>ຊື່</TableColumn>
                    <TableColumn className="text-right">ຈໍານວນ</TableColumn>
                    <TableColumn className="text-right">
                      ຕົ້ນທືນ(ກີບ)
                    </TableColumn>
                    <TableColumn className="text-right">
                      ຕົ້ນທືນ(ບາດ)
                    </TableColumn>
                    <TableColumn className="text-center">ລາຍລະອຽດ</TableColumn>
                  </TableHeader>
                  <TableBody
                    items={resportProduct?.productalert ?? []}
                    emptyContent="ບໍ່ພົບສິນຄ້າ"
                  >
                    {(item) => (
                      <TableRow key={item.barcode}>
                        <TableCell>{item.barcode}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell className="text-right">
                          {item.qty_balance}
                        </TableCell>
                        <TableCell className="text-right">
                          {formattedNumber(item.cost_lak ?? 0)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formattedNumber(item.cost_thb ?? 0)}
                        </TableCell>
                        <TableCell>
                          <Tooltip content="ລາຍລະອຽດ" color="primary">
                            <Link
                              href={`/admin/products/edit/${item.barcode}`}
                              className="text-lg hover:text-blue-400 flex justify-center "
                            >
                              <EyeIcon />
                            </Link>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

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

export const LaoCurrentCy = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 66.068 66.068"
      fill="currentColor" // kế thừa từ className bên ngoài
      {...props}
    >
      <g>
        <path
          fill="currentColor"
          d="M63.371,63.627L38.658,36.545h19.539c1.939,0,3.512-1.57,3.512-3.512c0-1.939-1.572-3.512-3.512-3.512H39.559L61.272,2.367
          c0.361-0.452,0.419-1.073,0.15-1.576C61.164,0.301,60.656,0,60.094,0H49.349c-0.461,0-0.904,0.214-1.184,0.569L26.941,27.511V1.465
          C26.941,0.656,26.27,0,25.445,0h-8.656c-0.825,0-1.497,0.656-1.497,1.465v28.057H5.828c-1.94,0-3.512,1.572-3.512,3.512
          c0,1.94,1.572,3.513,3.512,3.513h9.464v28.057c0,0.809,0.672,1.465,1.497,1.465h8.656c0.824,0,1.496-0.656,1.496-1.465V41.965
          l1.262-0.021l22.716,23.663c0.283,0.292,0.678,0.46,1.088,0.46h10.248c0.57,0,1.1-0.324,1.352-0.834
          C63.865,64.701,63.775,64.073,63.371,63.627z"
        />
      </g>
    </svg>
  );
};
