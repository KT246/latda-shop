"use client";
import React, { useState } from "react";
import HeaderLinks from "../HeaderLinks";
import useSWR from "swr";
import { Doughnut, Line } from "react-chartjs-2";

/// interface
import { ReportProduct } from "@/app/lib/interface";

/// api
import { FetchReport } from "@/app/api/admin.product";

/// table
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
  Select,
  SelectItem,
  Button,
} from "@heroui/react";

/// chart.js
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import Link from "next/link";
import { formattedNumber } from "@/app/helpers/funtions";

ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const data_pie = {
  labels: ["ອາທິດ", "ເດືອນ", "ທັງຫມົດ"],
  datasets: [
    {
      label: "Tỷ lệ phần trăm",
      data: [40, 10, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      borderWidth: 1,
    },
  ],
};

const options_pie = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 10,
        padding: 10,
      },
    },
  },
};

const data_line = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
  datasets: [
    {
      label: "Doanh thu",
      data: [120, 190, 300, 250, 400],
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options_line = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Biểu đồ Doanh thu theo tháng",
    },
  },
};

function Home() {
  /// useState
  const [resportProduct, setReportProduct] = useState<ReportProduct | null>(
    null
  );

  /// useSWR
  const { data: dataRP, error: errorRP } = useSWR(
    `/api/admin/report-product`,
    FetchReport
  );
  const { data: dataRS, error: errorRS } = useSWR(
    `/api/admin/report-sale?date_start=2025-07-01&date_end=2025-07-01`,
    FetchReport
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /// useEffect
  React.useEffect(() => {
    if (dataRP) {
      setReportProduct(dataRP);
    }
  }, [dataRP]);

  // React.useEffect(() => {
  //   if (dataRP) {
  //     setReportSale(dataRP);
  //   }
  // }, [dataRP]);

  // console.log("dataRS", resportProduct?.products);

  const cards = [
    { label: "ຕົ້ນທືນ", value: 2 },
    { label: "ກຳໄລ", value: 2 },
    { label: "ພະນັກງານ", value: 2 },
  ];

  return (
    <>
      <HeaderLinks
        name="ພາບລວມ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div className="shadow-2xl rounded">
        <div className="flex flex-col ">
          <div className="  p-2 rounded ">
            <form
            // onSubmit={handleSubmit}
            >
              <div className="flex items-center gap-4">
                <label>ເລີ່ມຕົ້ນ</label>
                <div className="border-gray-300 border-2 px-3 py-1 rounded-md">
                  <input
                    type="date"
                    // value={dateStart}
                    // onChange={(e) => setDateStart(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
                <label>ສີ້ນສຸດ</label>
                <div className="border-gray-300 border-2 px-3 py-1 rounded-md">
                  <input
                    type="date"
                    // value={dateEnd}
                    // onChange={(e) => setDateEnd(e.target.value)}
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
            <h3 className="border-l-4 border-red-500 font-semibold leading-none ps-2 my-3 text-blue-500">
              ລາຍງານການຂາຍ
            </h3>

            <div className="flex gap-3 px-2">
              <div className="w-2/6 flex flex-col gap-3 border-gray-950">
                <div className="h-32 shadow-md border-2 border-blue-400 rounded-lg p-2 ">
                  <p> ຕົ້ນທືນທັງຫມົດ (ກີບ)</p>
                  <p className="text-center font-semibold pt-5">
                    {formattedNumber(
                      resportProduct?.warehouse.total_cost_lak || 0
                    )}
                  </p>
                </div>
                <div className="h-32 shadow-md border-2 border-blue-400 rounded-lg p-2 ">
                  <p> ຕົ້ນທືນທັງຫມົດ (ບາດ)</p>
                  <p className="text-center font-semibold pt-5">
                    {formattedNumber(
                      resportProduct?.warehouse.total_cost_thb || 0
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3 ">
                  <div className="h-32 shadow-md flex-1 border-2 border-blue-400 rounded-lg p-2">
                    <p>ສິນຄ້າທັງຫມົດ</p>
                    <p className="text-center font-semibold pt-5">
                      {resportProduct?.warehouse.total_qty_balance}
                    </p>
                  </div>
                  <div className="h-32 shadow-md flex-1 border-2 border-blue-400 rounded-lg p-2">
                    <p>ສິນຄ້າເຄື່ອນໄຫວ</p>
                    <p className="text-center font-semibold pt-5">
                      {resportProduct?.warehouse.active_products_count}
                    </p>
                  </div>
                  <div className="h-32 shadow-md flex-1 border-2 border-blue-400 rounded-lg p-2">
                    <p>ສິນຄ້າບລັອກ</p>
                    <p className="text-center font-semibold pt-5">
                      {resportProduct?.warehouse.blocked_products_count}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-2/3">
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
                    <TableColumn>ຈໍານວນ</TableColumn>
                    <TableColumn>ຕົ້ນທືນ(ກີບ)</TableColumn>
                    <TableColumn>ຕົ້ນທືນ(ບາດ)</TableColumn>
                    <TableColumn className="text-center">ລາຍລະອຽດ</TableColumn>
                  </TableHeader>
                  <TableBody items={resportProduct?.productalert ?? []}>
                    {(item) => (
                      <TableRow key={item.barcode}>
                        <TableCell>{item.barcode}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.qty_balance}</TableCell>
                        <TableCell>{item.cost_lak}</TableCell>
                        <TableCell>{item.cost_thb}</TableCell>
                        <TableCell>
                          <Tooltip content="ລາຍລະອຽດ" color="primary">
                            <Link
                              href={`/admin/products/detail/${item.barcode}`}
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
          <div className=" shadow-sm  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 my-3 text-blue-500">
              ຍອດບິນ
            </h3>
            <div className="flex gap-3 px-2">
              <div className="w-2/3">
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
                    <TableColumn>Bracode</TableColumn>
                    <TableColumn>ຊື່</TableColumn>
                    <TableColumn>ຈໍານວນ</TableColumn>
                    <TableColumn>ຕົ້ນທືນ(ກີບ)</TableColumn>
                    <TableColumn>ຕົ້ນທືນ(ບາດ)</TableColumn>
                    <TableColumn className="text-center">ລາຍລະອຽດ</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>001</TableCell>
                      <TableCell>ສິນຄ້າ 1</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>100.00</TableCell>
                      <TableCell>100.00</TableCell>
                      <TableCell>
                        <Tooltip content="ລາຍລະອຽດ" color="success">
                          <Link
                            href={`/admin/products/detail/1076795421996`}
                            className="text-lg hover:text-green-400 flex justify-center "
                          >
                            <EyeIcon />
                          </Link>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="w-2/6 flex flex-col gap-3 border-gray-950">
                <div className="h-32 flex flex-col justify-between shadow-md border-2 border-green-400 rounded-lg p-2 ">
                  <p className="text-end">ຂາຍສຳເລັດ</p>
                  <p className="text-center font-semibold">2</p>
                  <p>ຈຳນວນ: 2</p>
                </div>
                <div className="h-32 flex flex-col justify-between shadow-md border-2 border-green-400 rounded-lg p-2">
                  <p className="text-end">ກຳລັງດຳເນີນການ</p>
                  <p className="text-center font-semibold">2</p>
                  <p>ຈຳນວນ: 2</p>
                </div>
                <div className="h-32 flex flex-col justify-between shadow-md border-2 border-green-400 rounded-lg p-2 ">
                  <p className="text-end">ຖືກຍົກເລີກ</p>
                  <p className="text-center font-semibold">2</p>
                  <p>ຈຳນວນ: 2</p>
                </div>
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
