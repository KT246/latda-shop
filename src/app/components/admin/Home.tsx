"use client";
import React, { useState } from "react";
import HeaderLinks from "../HeaderLinks";
import useSWR from "swr";
import { Doughnut, Line } from "react-chartjs-2";

/// api start

import { FetchReport } from "@/app/api/admin.product";

/// api end
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
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
  const { data: dataRP, error: errorRP } = useSWR(
    `/api/admin/report-product`,
    FetchReport
  );
  const { data: dataRS, error: errorRS } = useSWR(
    `/api/admin/report-sale?date_start=2025-07-01&date_end=2025-07-01`,
    FetchReport
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  console.log("dataRP", dataRP);
  console.log("dataRS", dataRS);

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
      <div className="grid grid-cols-2 gap-3 h-[81vh] shadow-2xl rounded">
        <div className="flex flex-col ">
          <div className="  p-2 rounded ">
            <h3 className="border-l-4 border-red-500 font-semibold leading-none ps-2  text-blue-500">
              ຕົ້ນທືນ - ກຳໄລ
            </h3>

            <div className="flex justify-center w-full">
              <div
                style={{
                  width: "200px",
                  height: "250px",
                }}
              >
                <Doughnut data={data_pie} options={options_pie} />
              </div>
            </div>
          </div>
          <div className=" shadow-sm  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 text-blue-500">
              ຍອດບິນ
            </h3>
            {/* <div className="flex items-center gap-3 pt-5 h-[20vh]">
              <Crads
                type_crad={1}
                title="ອາທິດ"
                invest={0}
                profit={0}
                qyt={1}
              />
              <Crads
                type_crad={1}
                title="ເດືອນ"
                invest={0}
                profit={0}
                qyt={5}
              />
              <Crads
                type_crad={1}
                title="ທັງຫມົດ"
                invest={0}
                profit={0}
                qyt={20}
              />
            </div> */}

            <div className="flex justify-center w-full">
              <div className="h-[250px]">
                <Line data={data_line} options={options_line} />
              </div>
            </div>
          </div>
          {/* <div className=" shadow-sm  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 text-blue-500">
              ອື່ນໆ
            </h3>
            <div className="flex items-center gap-3 pt-5 h-[20vh]">
              <Crads
                type_crad={1}
                title="ພະນັກງານ"
                invest={0}
                profit={0}
                qyt={1}
              />
              <button className="hover:bg-green-500 bg-blue-700 text-gray-50  px-6 py-2 rounded duration-500 ">
                ປ່ຽນເປັນ PDF
              </button>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col gap-2 ">
          <div className=" shadow-sm  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 text-blue-500 uppercase">
              top ສິນຄ້າ
            </h3>
            <div className="flex gap-2 h-full p-5 ">
              <Crads
                type_crad={0}
                title="ຂາຍດີ"
                invest={0}
                profit={0}
                qyt={1}
              />
              <Crads
                type_crad={0}
                title="ຂາຍຍາກ"
                invest={0}
                profit={0}
                qyt={1}
              />
            </div>
          </div>
          <div className=" shadow-sm text-whit  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 text-blue-500 uppercase">
              top ລາຄາ
            </h3>
            <div className="flex gap-2 h-full p-5 ">
              <Crads type_crad={0} title="ແພງ" invest={0} profit={0} qyt={1} />
              <Crads type_crad={0} title="ຖືກ" invest={0} profit={0} qyt={1} />
            </div>
          </div>
        </div>
        fsdfsdf Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
        accusamus eligendi fugiat distinctio corrupti! Officiis sint, ullam
        fugit nihil repellendus vel cumque cupiditate dolore doloremque magni.
        Perspiciatis beatae rerum ea.
      </div>
    </>
  );
}

export default Home;

interface CradsProp {
  title: string;
  invest: number;
  profit: number;
  qyt: number;
  type_crad: number;
}

const Crads = ({ title, invest, profit, qyt, type_crad }: CradsProp) => {
  if (type_crad === 1) {
    return (
      <div className=" bg-opacity-50 grid grid-rows-3 shadow-blue-400 shadow-inner w-52 h-full rounded py-1 px-3 text-left border-1 border-blue-400">
        <p className="font-semibold text-xl text-gray-500 ">{title}</p>

        {qyt && qyt > 0 ? (
          <p className=" row-span-2 flex flex-col text-blue-400 text-center">
            <span>ຈຳນວນ</span>
            <span className="font-bold px-1 text-2xl text-red-400">{qyt}</span>
          </p>
        ) : (
          <>
            <p className=" flex text-red-400">
              <span>-</span>
              <span className="font-semibold px-1">{invest}</span>
              <span>.ກີບ</span>
            </p>
            <p className=" flex text-green-400">
              <span>+</span>
              <span className=" font-semibold px-1">{profit}</span>
              <span>.ກີບ</span>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-opacity-50 shadow-blue-400 shadow-inner w-full rounded py-1 px-3 text-left border-1 border-blue-400">
      <div className="grid grid-rows-6 h-full">
        <p className="font-semibold text-xl text-gray-500 text-center">
          {title}
        </p>
        <p className="flex items-center">
          <span className="px-2 rounded-full bg-green-600 text-white">1</span>
          <span className="ps-3">ຜະລິດຕະພັນຕົວຢ່າງ</span>
        </p>
        <p className="flex items-center">
          <span className="px-2 rounded-full bg-green-600 text-white">2</span>
          <span className="ps-3">ຜະລິດຕະພັນຕົວຢ່າງ</span>
        </p>
        <p className="flex items-center">
          <span className="px-2 rounded-full bg-green-600 text-white">3</span>
          <span className="ps-3">ຜະລິດຕະພັນຕົວຢ່າງ</span>
        </p>
        <p className="flex items-center">
          <span className="px-2 rounded-full bg-green-600 text-white">4</span>
          <span className="ps-3">ຜະລິດຕະພັນຕົວຢ່າງ</span>
        </p>
        <p className="flex items-center">
          <span className="px-2 rounded-full bg-green-600 text-white">5</span>
          <span className="ps-3">ຜະລິດຕະພັນຕົວຢ່າງ</span>
        </p>
      </div>
    </div>
  );
};
