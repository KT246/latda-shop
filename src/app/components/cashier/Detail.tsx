import React from "react";
import ContainerLinkC from "./ContainerLinkC";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <ContainerLinkC>
      <div className="py-3 px-4">
        <div className="text-lg font-semibold mb-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center hover:text-gray-500 text-gray-700 w-20"
          >
            <IoChevronBackOutline />
            ກັບຄືນ
          </button>
          <h3 className="text-center w-full  relative">
            ລາຍລະອຽດໃບບິນ
            <span className=" absolute text-gray-500 text-sm ml-1">
              [<span className="text-red-500">{id}</span>]
            </span>
          </h3>
        </div>
        <div className=" h-[75vh] overflow-auto px-3">
          <table className="w-full relative text-left">
            <thead className=" sticky -top-1 bg-gray-50 z-10">
              <tr className="bg-gray-300">
                <th className="pt-3 pb-2                                                                                                                                                                                                                                                          px-2 text-left ">
                  ຈຳນວນສິນຄ້າ
                </th>
                <th className="pt-3 pb-2 px-2 text-left ">ຊື່ກະຕ່າ</th>
                <th className="pt-3 pb-2 px-2 text-left ">ຊື່ສິນຄ້າ</th>
                <th className="pt-3 pb-2 px-2 text-left">ຈຳນວນ</th>
                <th className="pt-3 pb-2 px-2 text-left">ໜ່ວຍ</th>
                <th className="pt-3 pb-2 px-2 text-left">ລາຄາ</th>
                <th className="pt-3 pb-2 px-2 text-left">ລວມ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2">1</td>
                <td className="py-1 px-2">1</td>
                <td className="py-1 px-2">ສິນຄ້າ 1</td>
                <td className="py-1 px-2">1</td>
                <td className="py-1 px-2">ຊິໂດ</td>
                <td className="py-1 px-2">100,000 ກີບ</td>
                <td className="py-1 px-2">100,000 ກີບ</td>
              </tr>

              <tr className=" sticky bottom-0 bg-gray-50 z-10">
                <td colSpan={8}>
                  <div className="border-t-2 border-gray-300 h-20 grid grid-cols-5 pb-2 pt-3 mt-2">
                    <p className="flex flex-col gap-2">
                      <span className="text-lg font-semibold">ວັນທີ</span>
                      <span className="text-gray-500">20/07/2025</span>
                    </p>
                    <p className="flex flex-col gap-2">
                      <span className="text-lg font-semibold">ວັນທີ</span>
                      <span className="text-gray-500">20/07/2025</span>
                    </p>
                    <p className="flex flex-col gap-2">
                      <span className="text-lg font-semibold">ວັນທີ</span>
                      <span className="text-gray-500">20/07/2025</span>
                    </p>
                    <p className="flex flex-col gap-2">
                      <span className="text-lg font-semibold">ສ່ວນລົດ</span>
                      <span className="text-gray-500">20/07/2025</span>
                    </p>
                    <p className="flex flex-col gap-2">
                      <span className="text-lg font-semibold">
                        ລວມເງິນທີ່ຈ່າຍ
                      </span>
                      <span className="text-gray-500">20000000 kip</span>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ContainerLinkC>
  );
}
