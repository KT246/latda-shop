import React from "react";
import { Tooltip } from "@heroui/react";
import ContainerLink from "../ContainerLinkC";
import { LuEye } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";

export default function ListInvoice() {
  const duLieuHoaDon = [
    ["1", "2023-10-01", "1", "100,000"],
    ["2", "2023-10-02", "1", "200,000"],
    ["3", "2023-10-03", "1", "150,000"],
    ["4", "2023-10-04", "1", "300,000"],
    ["5", "2023-10-05", "1", "250,000"],
    ["6", "2023-10-06", "1", "120,000"],
    ["7", "2023-10-07", "1", "180,000"],
    ["8", "2023-10-08", "1", "220,000"],
    ["9", "2023-10-09", "1", "270,000"],
    ["10", "2023-10-10", "1", "130,000"],
    ["11", "2023-10-11", "1", "160,000"],
    ["12", "2023-10-12", "1", "140,000"],
    ["13", "2023-10-13", "1", "190,000"],
    ["14", "2023-10-14", "1", "210,000"],
    ["15", "2023-10-15", "1", "175,000"],
    ["16", "2023-10-16", "1", "230,000"],
    ["17", "2023-10-17", "1", "260,000"],
    ["18", "2023-10-18", "1", "240,000"],
    ["19", "2023-10-19", "1", "170,000"],
    ["20", "2023-10-20", "1", "110,000"],
  ];

  return (
    <ContainerLink>
      <div className="py-3 px-4">
        <div className="border-b-2 border-gray-300 flex items-center justify-between px-3 py-2">
          <h3 className="text-lg font-semibold">ໃບບິນ</h3>
        </div>

        <div className=" h-[75vh] overflow-auto px-3 mt-3">
          <table className="w-full relative text-left">
            <thead className="sticky -top-1  z-10">
              <tr className="bg-gray-300">
                <th className="pt-3 pb-2 px-3">ລະຫັດ</th>
                <th className="pt-3 pb-2 px-3">ວັນທີ</th>
                <th className="pt-3 pb-2 px-3">ຊື່ກະຕ່າ</th>
                <th className="pt-3 pb-2 px-3 ">ລາຄາ</th>
                <th className="pt-3 pb-2 px-3 text-center">ດຳເນີນການ</th>
              </tr>
            </thead>
            <tbody>
              {duLieuHoaDon.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`border-b-2 border-gray-200 hover:bg-gray-100 `}
                  >
                    <td className="py-2 px-3">{item[0]}</td>
                    <td className="py-2 px-3">{item[1]}</td>
                    <td className="py-2 px-3">{item[2]}</td>
                    <td className="py-2 px-3">{item[3]}</td>
                    <td
                      className="py-2 px-3  cursor-pointer flex gap-3 text-lg justify-center items-center"
                      colSpan={2}
                    >
                      <Tooltip content="ເບິ່ງລາຍລະອຽດ">
                        <Link href={`list-invoice/${item[0]}`}>
                          <LuEye />
                        </Link>
                      </Tooltip>
                      <Tooltip content="ລຶບ">
                        <MdDeleteForever className="text-red-500" />
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ContainerLink>
  );
}
