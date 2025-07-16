"use client";
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import { Invoice } from "@/app/lib/interface";
import { formatDate, formattedNumber } from "@/app/helpers/funtions";
import Image from "next/image";

interface PrintBillProps {
  data: Invoice;
  clearData: () => void;
}

function PrintBill({ data, clearData }: PrintBillProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: "Latda Shop Receipt",
    onAfterPrint: () => {
      clearData();
    },
  });

  useEffect(() => {
    if (data) {
      handlePrint();
    }
  }, [data]);

  return (
    <div
    //  className="hidden"
    >
      {/* {header} */}
      {/* <h1 className="text-center font-bold uppercase text-medium mb-2">
          ຮ້ານ latda-shop
        </h1>
        <p>ສະຖານທີ່: ຫລັກ 12 ບ.ຕວຍ ມ.ໄຊເສດຖາ ຂ.ອັດຕະປື</p>
        <p>ເບີໂທ: 02055154824</p>
        <p>Whatapp: 02055154824</p>
        <p>Facebook: Latda-shop</p> */}
      {/* {content} */}
      {/* <p className="text-center font-bold my-3">ບິນໄລ່ເງິນ</p>
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <p className="grid grid-cols-3">
          <span>ຊີ່ສິນຄ້າ</span>
          <span>ຈຳນວນ</span>
          <span>ລາຄາ</span>
        </p> */}
      {/* {data?.details?.map((item, index) => (
          <p key={index} className="grid grid-cols-3">
            <span>{item.title}</span>
            <span>x{item?.qty}</span>
            <span>{formattedNumber(item?.retail_lak ?? 0)}</span>
          </p>
        ))} */}
      {/* <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="flex">
          <p className="flex-1 font-semibold">ລາຄາລວມ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.total_lak ?? 0)} ກີບ
          </p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ສ່ວນຫລຸດ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.m_discount ?? 0)} ກີບ
          </p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ຈຳນວນເງິນຕ້ອງຊຳລະ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.total_checkout_lak ?? 0)} ກີບ
          </p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ເງິນຮັບມາ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.money_received ?? 0)} ກີບ
          </p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ເງິນທອນ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.money_cash ?? 0)} ກີບ
          </p>
        </div>
        <p className="border-dashed border-b-1 border-gray-500 my-2" /> */}
      {/* {bottom} */}
      {/* <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="text-left pt-2">
          <p>ເລກບິນ: {data?.id}</p>
          <p>ລະຫັດຜູ້ຂາຍ: {data?.cashier_id}</p>
          <p>
            ປະເພດຈ່າຍ:{" "}
            {data?.pay_type === "debt"
              ? "ຕິດໜີ້"
              : data?.pay_type === "cash"
              ? "ເງິນສົດ"
              : "ເງິນໂອນ"}
          </p>
          <p>ວັນເວລາ: {formatDate(data?.date_create)}</p>
          <p className="text-center pt-2">ຂອບໃຈລູກຄ້າ</p>
          <p className="text-center">ແລ້ວພົບກັນໃຫມ່!</p>
          </div> */}

      <div
        ref={contentRef}
        className=" w-[148mm] h-[210mm] mx-auto border p-5 hidden"
      >
        <div className=" flex justify-between">
          <div>
            <Image alt="" src={"/QRBCELONE_LAK.svg"} width={100} height={100} />
          </div>
          <div className=" w-full text-center text-[16px]">
            <p className=" font-bold text-[20px]">ຮ້ານລັດດາຮຸ່ງຊັບອໍໂຕ</p>
            <p className=" ">ສາຂາ I ບ້ານ ຂາມງອຍ, ໄຊເສດຖາ, ນະຄອນຫລວງວຽງຈັນ</p>
            <p className="  ">ສອບຖາມໂທ: 02055448822, 28888728, 0305656856</p>
          </div>
          <div>
            <Image alt="" src={"/QRBCELONE_THB.svg"} width={100} height={100} />
          </div>
        </div>
        <div>
          <p className="  text-[18px] font-bold my-3 text-center">
            ໃບສົ່ງເຄື່ອງ
          </p>
        </div>
        <div className="w-full text-[14px] flex justify-between">
          <div>
            <table>
              <tbody>
                <tr>
                  <td className=" ">ຊື່ລູກຄ້າ:</td>
                  <td className=" ">{"fsfsdfs"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className=" ">ເລກທີບິນ:</td>
                  <td className=" ">{141414}</td>
                </tr>
                <tr>
                  <td className=" " colSpan={2}>
                    140101
                  </td>
                </tr>
                <tr>
                  <td className=" ">ການຊຳລະ:</td>
                  <td className=" ">{"1414"}</td>
                </tr>
                <tr>
                  <td className=" ">ອັດຕາແລກປ່ຽນ (ບາດ-ກີບ):</td>
                  <td className=" ">{"45"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full mt-3">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="">
                <th className=" border border-black">NO</th>
                <th className=" border border-black py-2">ລາຍການ</th>
                <th className=" border border-black">ຈຳນວນ</th>
                <th className=" border border-black">ຫໜ</th>
                <th className=" border border-black">ລາຄາ</th>
                <th className=" border border-black">ສ່ວນຫຼຸດ</th>
                <th className=" border border-black">ລວມເງິນ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" border border-black text-center">1</td>
                <td className=" border border-black px-1">tay</td>
                <td className=" text-center border border-black">20</td>
                <td className=" text-center border border-black">cai</td>
                <td className=" border border-black text-right px-1">
                  {"64544545"}
                </td>
                <td className=" border border-black text-center px-1">
                  {"444544"}
                </td>
                <td className=" border border-black text-right px-1">
                  {"544411"}
                </td>
              </tr>

              {/* fhsdgfsjhkdfhjkfdhjbfdshjdfshjfsd */}
              <tr>
                <td rowSpan={6} colSpan={3} className="  p-2">
                  <p className="">ໝາຍເຫດ:</p>
                  <p className="">
                    * ກະລຸນາກວດສິນຄ້າໃຫ້ ລະອຽດ ແລະ ຄົບຖ້ວນຕາມບິນ
                  </p>
                  <p className="">
                    * ຖ້າກວດພົບເຄື່ອງແຕກ ຫຼື ບໍ່ຄົບ ໃຫ້ແຈ້ງບໍລິສັດທັນທີ/ຂຽນໃສ່
                    ບິນສົົ່ງ
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center  border border-black">
                  ລວມເງິນ(LAK)
                </td>
                <td colSpan={2} className="text-end  border border-black px-1">
                  {"44564545"}
                  {" LAK"}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center  border border-black">
                  ລວມເງິນ(THB)
                </td>
                <td colSpan={2} className="text-end  border border-black px-1">
                  {"655656"}
                  {" THB"}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center  border border-black">
                  ລວມມູນຄ່າທັງໝົດ
                </td>
                <td colSpan={2} className="text-end  border border-black px-1">
                  {"64654564"}
                  {" LAK"}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center  border border-black">
                  ສ່ວນຫຼຸດ
                </td>
                <td colSpan={2} className="text-end  border border-black px-1">
                  {"3555445446"}
                  {" LAK"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center font-bold  border border-black py-3"
                >
                  ຈຳນວນເງິນຕ້ອງຈ່າຍ(LAK)
                </td>
                <td
                  colSpan={2}
                  className="text-end font-bold  border border-black px-1"
                >
                  {"8844845451"}
                  {" LAK"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between text-[12px] mt-10">
          <p className="flex-1 text-center">ວັນທີ......./......./.......</p>
          <p className="flex-1 text-center">ວັນທີ......./......./.......</p>
        </div>
        <div className=" mt-2 flex items-center justify-between text-[14px] text-center gap-2">
          <p className="flex-1 font-bold">ຜູ້ຈ່າຍເງິນ</p>
          <p className="flex-1 font-bold">ຜູ້ຮັບເງິນ</p>
        </div>
      </div>
    </div>
  );
}

export default PrintBill;
