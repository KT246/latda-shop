"use client";
import React, { useState } from "react";
import HeaderLinks from "./HeaderLinks";

function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cards = [
    { label: "ຕົ້ນທືນ", value: 2 },
    { label: "ກຳໄລ", value: 2 },
    { label: "ພະນັກງານ", value: 2 },
  ];

  const getRandomColor = () => {
    const colors = [
      // "bg-red-500 text-white bg-opacity-90 border-white",
      // "bg-green-500 text-white bg-opacity-90 border-white",
      // "bg-blue-500 text-white bg-opacity-90 border-white",
      "",
      "",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <>
      <HeaderLinks
        name="ພາບລວມ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div className="grid grid-cols-2 gap-3 h-[81vh] ">
        <div className="grid grid-rows-3 gap-2 ">
          <div className="bg-blue-500 bg-opacity-60 shadow-sm  p-2 rounded ">
            <h3 className="border-l-4 border-red-500 font-semibold leading-none ps-2 text-white">
              ລາຍຮັບ - ຈ່າຍ
            </h3>
            <div className="flex justify-center items-center gap-3 pt-5 h-[20vh]">
              <div className="bg-white bg-opacity-70 grid grid-rows-3 shadow-sm w-52 h-full rounded py-1 px-3 ">
                <p className="text-center font-semibold text-xl text-blue-700">
                  ອາທິດ
                </p>
                <p className="text-left flex text-green-500">
                  <span className=" font-semibold">+</span>
                  <span className="text-xl text-center font-semibold px-1">
                    500.000.000
                  </span>
                  <span className="">.ກີບ</span>
                </p>
                <p className="text-left flex text-red-500">
                  <span className=" font-semibold">+</span>
                  <span className="text-xl text-center font-semibold px-1">
                    500.000
                  </span>
                  <span className="">.ກີບ</span>
                </p>
              </div>
              <div className="bg-white bg-opacity-70 grid grid-rows-3 shadow-sm w-52 h-full rounded py-1 px-3 ">
                <p className="text-center font-semibold text-xl text-blue-700">
                  ອາທິດ
                </p>
                <p className="text-left flex text-green-500">
                  <span className=" font-semibold">+</span>
                  <span className="text-xl text-center font-semibold px-1">
                    500.000.000
                  </span>
                  <span className="">.ກີບ</span>
                </p>
                <p className="text-left flex text-red-500">
                  <span className=" font-semibold">+</span>
                  <span className="text-xl text-center font-semibold px-1">
                    500.000
                  </span>
                  <span className="">.ກີບ</span>
                </p>
              </div>
              <div className="bg-white bg-opacity-70 grid grid-rows-3 shadow-sm w-52 h-full rounded py-1 px-3 ">
                <p className="text-center font-semibold text-xl text-blue-700">
                  ອາທິດ
                </p>
                <p className="text-left flex text-green-500">
                  <span className=" font-semibold">+</span>
                  <span className="text-xl text-center font-semibold px-1">
                    500.000.000
                  </span>
                  <span className="">.ກີບ</span>
                </p>
                <p className="text-left flex text-red-500">
                  <span className=" font-semibold">+</span>
                  <span className="text-xl text-center font-semibold px-1">
                    500.000
                  </span>
                  <span className="">.ກີບ</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-300  shadow-sm  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2">
              ຍອດບິນ
            </h3>
          </div>
          <div className="bg-blue-300  shadow-sm  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2">
              ອື່ນໆ
            </h3>
          </div>
        </div>

        <div className=" grid grid-rows-2 gap-2 ">
          <div className="bg-blue-300  shadow-sm  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 uppercase">
              top ສິນຄ້າ
            </h3>
            <div className="grid grid-cols-2 place-items-start h-full p-5 ">
              <p>fd</p>
              <p>ffdduyiuyuyuyyd</p>
              <p>fd</p>
              <p>fd</p>
              <p>fd</p>
              <p>fd</p>
              <p>fd</p>
              <p>fd</p>
              <p>fd</p>
              <p>fd</p>
            </div>
          </div>
          <div className="bg-blue-300  shadow-sm text-whit  p-2 rounded">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 uppercase">
              top ລາຄາ
            </h3>
          </div>
        </div>

        {/* order
          <div className="flex-1 gap-1">
            <div className="flex border-blue-500 border-b-5 border-r-5 rounded-sm overflow-hidden">
              <div className="bg-blue-700 h-[15vh] w-14 flex items-center justify-center font-semibold ">
                <p className="-rotate-90 text-white">ໃບບິນ</p>
              </div>
              <div className="w-full grid grid-cols-3 font-semibold">
                <div className="flex flex-col ">
                  <p className="bg-blue-500 text-white text-center">ອາທິດ</p>
                  <div className="h-full px-1 grid grid-rows-3 text-sm">
                    <p className=" pt-1">ຈຳນວນ</p>
                    <p className="text-green-500 text-center ">65</p>
                    <p className=" place-self-end">
                      ອາທິດທີ: <span className="text-gray-500">2</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col border-blue-500 border-l-5">
                  <p className="bg-blue-500 text-white text-center">ເດືອນ</p>
                  <div className="h-full px-1 grid grid-rows-3 text-sm">
                    <p className=" pt-1">ຈຳນວນ</p>
                    <p className="text-green-500 text-center ">625</p>
                    <p className=" place-self-end">
                      ເດືອນ: <span className="text-gray-500">2</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col border-blue-500 border-l-5">
                  <p className="bg-blue-500 text-white text-center">ທັງຫມົດ</p>
                  <div className="h-full px-1 grid grid-rows-3 text-sm">
                    <p className=" pt-1">ຈຳນວນ</p>
                    <p className="text-green-500 text-center ">6565</p>
                    <p className=" place-self-end">
                      ວັນທີ:
                      <span className="text-gray-500 ">12/12/2025</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* thu nhap */}
        {/* <div className="flex-1 gap-1">
            <div className="flex border-green-600 border-b-5 border-r-5 rounded-sm overflow-hidden">
              <div className="bg-green-600 h-[15vh] w-14 flex items-center justify-center font-semibold ">
                <p className="-rotate-90 text-white">ລາຍຮັບ</p>
              </div>
              <div className="w-full grid grid-cols-3 font-semibold">
                <div className="flex flex-col ">
                  <p className="bg-green-500 text-white text-center">ອາທິດ</p>
                  <div className="h-full px-1 grid grid-rows-3 text-sm">
                    <p className=" pt-1">ຈຳນວນ</p>
                    <p className="text-blue-500 text-center ">65</p>
                    <p className=" place-self-end">
                      ອາທິດທີ: <span className="text-gray-500">2</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col border-green-500 border-l-5">
                  <p className="bg-green-500 text-white text-center">ເດືອນ</p>
                  <div className="h-full px-1 grid grid-rows-3 text-sm">
                    <p className=" pt-1">ຈຳນວນ</p>
                    <p className="text-blue-500 text-center ">625</p>
                    <p className=" place-self-end">
                      ເດືອນ: <span className="text-gray-500">2</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col border-green-500 border-l-5">
                  <p className="bg-green-500 text-white text-center">ທັງຫມົດ</p>
                  <div className="h-full px-1 grid grid-rows-3 text-sm">
                    <p className=" pt-1">ຈຳນວນ</p>
                    <p className="text-blue-500 text-center ">6565</p>
                    <p className=" place-self-end">
                      ວັນທີ:
                      <span className="text-gray-500 ">12/12/2025</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        {/* <div className=" flex gap-2">
          <div className=" flex-1 p-2">
            <div className="grid grid-cols-4 place-items-center gap-5 h-full">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`w-40 h-40 grid grid-rows-3 border-1 rounded border-gray-500 overflow-hidden p-2 duration-500 ${
                    hoveredIndex === index ? getRandomColor() : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <p>
                    <span className="border-l-4 border-green-500 leading-none ps-2">
                      {card.label}
                    </span>
                  </p>
                  <p className="text-center text-2xl font-semibold">
                    {card.value}
                  </p>
                </div>
              ))}

              <button className="font-semibold col-span-2 w-32 h-20 flex justify-center items-center bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-green-500">
                ສ້າງໄຟຣ໌ PDF
              </button>
            </div>
          </div>
          <div className="bg-green-400 flex-1 p-2">chart</div>
        </div> */}
      </div>
    </>
  );
}

export default Home;
