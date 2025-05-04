"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import HeaderLinks from "../HeaderLinks";
export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <>
      <HeaderLinks
        name="ລາຍລະອຽດໃບບິນ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div>
        <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
          ລາຍລະອຽດໃບບິນ
        </h1>

        {/* detail bills */}
        <div className="p-6">
          <div className="grid grid-cols-9 gap-3 border-1 p-3  rounded text-center">
            <div className="space-y-1 ">
              <p className="font-semibold">ລະຫັດບິນ</p>
              <p className="text-gray-500 uppercase">fstrata65</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ວັນທີສ້າງ</p>
              <p className="text-gray-500 uppercase">15/02/2025</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ລະຫັດຜູ້ຂາຍ</p>
              <p className="text-gray-500 uppercase">LD0001</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ຊື່ກະຕ່າ</p>
              <p className="text-gray-500 uppercase">2</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ອັດຕາແລກປ່ຽນ</p>
              <p className="text-gray-500 uppercase">606</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ຈໍານວນສິນຄ້າ</p>
              <p className="text-gray-500 uppercase">5</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ສ່ວນຫຼຸດ</p>
              <p className="text-gray-500 uppercase">10%</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ລາຄາລວມ (LAK)</p>
              <p className="text-gray-500 uppercase">1.250.000 ກີບ</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ສະຖານະ</p>
              <p className="text-gray-500 uppercase">ເງິນສົດ</p>
            </div>
          </div>
        </div>

        {/* detail product */}
        <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
          ລາຍລະອຽດສິນຄ້າ
        </h1>
        <div className="p-6 space-y-6">
          <div className="border-1 rounded h-[40vh] overflow-hidden">
            <p className="font-semibold flex bg-blue-500 text-gray-100 sticky top-0 z-10 text-sm">
              <span className="py-1 px-2  w-12">ລຳດັບ</span>
              <span className="py-1 px-2 border-l-1 w-40 text-center">
                ບາໂຄດ
              </span>
              <span className="py-1 px-2 border-l-1 w-96 text-center">
                ຫົວຂໍ້
              </span>
              <span className="py-1 px-2 border-l-1 w-28 text-center">
                ຫົວໜ່ວຍ
              </span>
              <span className="py-1 px-2 border-l-1 w-40 text-center">
                ໝວດຫມູ່
              </span>
              <span className="py-1 px-2 border-l-1 w-28 text-center">
                ຈໍານວນສິນຄ້າ
              </span>
              <span className="py-1 px-2 border-l-1 w-48 text-center ">
                ລາຄາ (LAK)
              </span>
              <span className="py-1 px-2 border-l-1 w-48 text-center">
                ລາຄາລວມ (LAK)
              </span>
            </p>
            <div className="overflow-y-auto h-[35vh] scroll-smooth pb-5">
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
              <p className="flex border-b-1">
                <span className="py-1 px-2  w-12 ">1</span>
                <span className="text-center py-1 px-2 border-l-1 w-40 uppercase">
                  1234567890123
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-96 ">
                  ຜະລິດຕະພັນຕົວຢ່າງ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28">
                  ຂວດ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-40 ">
                  cataetry
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-28 ">
                  650
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
                <span className="text-center py-1 px-2 border-l-1 w-48 ">
                  655473. ກີບ
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <button
            onClick={() => window.history.back()}
            type="button"
            className="bg-blue-700 text-white px-6 py-2 rounded flex items-center duration-500 hover:bg-red-500"
          >
            <IoChevronBackOutline />
            ກັບຄືນ
          </button>
        </div>
      </div>
    </>
  );
}
