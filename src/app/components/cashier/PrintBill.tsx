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

function PrintBill() {
  // { data, clearData }: PrintBillProps
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
        className=" w-[148mm] h-[210mm] mx-auto border p-5 "
      >
        <div className=" flex justify-between">
          <Image alt="" src={"/logolatda.webp"} width={100} height={100} />
          <div className=" w-full text-center text-[14px]">
            <p className="font-custom font-bold text-[16px]">
              ຮ້ານລັດດາຮຸ່ງຊັບອໍໂຕ
            </p>
            <p className=" font-custom">
              ສາຂາ I ບ້ານ ຂາມງອຍ, ໄຊເສດຖາ, ນະຄອນຫລວງວຽງຈັນ
            </p>
            <p className=" font-custom ">
              ສອບຖາມໂທ: 02055448822, 28888728, 0305656856
            </p>
          </div>
          <div>
            <Image alt="" src={"/logolatda.webp"} width={100} height={100} />
          </div>
        </div>
        <div>
          <p className=" font-custom text-[18px] font-bold my-3 text-center">
            ໃບສົ່ງເຄື່ອງ
          </p>
        </div>
        <div className="w-full text-[14px] flex justify-between">
          <div>
            <table>
              <tbody>
                <tr>
                  <td className=" font-custom">ລະຫັດລູກຄ້າ:</td>
                  <td className=" font-custom">{"64565654645"}</td>
                </tr>
                <tr>
                  <td className=" font-custom">ຊື່ລູກຄ້າ:</td>
                  <td className=" font-custom">{"fsfsdfs"}</td>
                </tr>
                <tr>
                  <td className=" font-custom">ທີ່ຢູ່:</td>
                  <td className=" font-custom">{"54546565"}</td>
                </tr>
                <tr>
                  <td className=" font-custom">ເບີໂທ:</td>
                  <td className=" font-custom">{"55446556"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className=" font-custom">ເລກທີບິນ:</td>
                  <td className=" font-custom">{141414}</td>
                </tr>
                <tr>
                  <td className=" font-custom" colSpan={2}>
                    140101
                  </td>
                </tr>
                <tr>
                  <td className=" font-custom">ການຊຳລະ:</td>
                  <td className=" font-custom">{"1414"}</td>
                </tr>
                <tr>
                  <td className=" font-custom">ອັດຕາແລກປ່ຽນ (ບາດ-ກີບ):</td>
                  <td className=" font-custom">{"45"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full mt-3">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="">
                <th className="font-custom border border-black">NO</th>
                <th className="font-custom border border-black py-2">ລາຍການ</th>
                <th className="font-custom border border-black">ຈຳນວນ</th>
                <th className="font-custom border border-black">ຫໜ</th>
                <th className="font-custom border border-black">ລາຄາ</th>
                <th className="font-custom border border-black">ສ່ວນຫຼຸດ</th>
                <th className="font-custom border border-black">ລວມເງິນ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-custom border border-black text-center">
                  1
                </td>
                <td className="font-custom border border-black px-1">tay</td>
                <td className="font-custom text-center border border-black">
                  20
                </td>
                <td className="font-custom text-center border border-black">
                  cai
                </td>
                <td className="font-custom border border-black text-right px-1">
                  {"64544545"}
                </td>
                <td className="font-custom border border-black text-center px-1">
                  {"444544"}
                </td>
                <td className="font-custom border border-black text-right px-1">
                  {"544411"}
                </td>
              </tr>

              {/* fhsdgfsjhkdfhjkfdhjbfdshjdfshjfsd */}
              <tr>
                <td rowSpan={6} colSpan={3} className="font-custom  p-2">
                  <p className="font-custom">ໝາຍເຫດ:</p>
                  <p className="font-custom">
                    * ກະລຸນາກວດສິນຄ້າໃຫ້ ລະອຽດ ແລະ ຄົບຖ້ວນຕາມບິນ
                  </p>
                  <p className="font-custom">
                    * ຖ້າກວດພົບເຄື່ອງແຕກ ຫຼື ບໍ່ຄົບ ໃຫ້ແຈ້ງບໍລິສັດທັນທີ/ຂຽນໃສ່
                    ບິນສົົ່ງ
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center font-custom border border-black"
                >
                  ລວມເງິນ(LAK)
                </td>
                <td
                  colSpan={2}
                  className="text-end font-custom border border-black px-1"
                >
                  {"44564545"}
                  {" LAK"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center font-custom border border-black"
                >
                  ລວມເງິນ(THB)
                </td>
                <td
                  colSpan={2}
                  className="text-end font-custom border border-black px-1"
                >
                  {"655656"}
                  {" THB"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center font-custom border border-black"
                >
                  ລວມມູນຄ່າທັງໝົດ
                </td>
                <td
                  colSpan={2}
                  className="text-end font-custom border border-black px-1"
                >
                  {"64654564"}
                  {" LAK"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center font-custom border border-black"
                >
                  ສ່ວນຫຼຸດ
                </td>
                <td
                  colSpan={2}
                  className="text-end font-custom border border-black px-1"
                >
                  {"3555445446"}
                  {" LAK"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center font-bold font-custom border border-black py-3"
                >
                  ຈຳນວນເງິນຕ້ອງຈ່າຍ(LAK)
                </td>
                <td
                  colSpan={2}
                  className="text-end font-bold font-custom border border-black px-1"
                >
                  {"8844845451"}
                  {" LAK"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className=" flex justify-start mt-10">
          <p className=" w-full font-custom text-[12px] ">
            ວັນທີ......./......./.......
          </p>
          <p className=" w-full font-custom text-[12px] ">
            ວັນທີ......./......./.......
          </p>
        </div>
        <div className=" w-full mt-2 flex justify-between gap-2">
          <div className="w-full">
            <p className="font-custom text-[14px] text-center font-bold pb-10 border-b border-black">
              ຜູ້ຈ່າຍເງິນ
            </p>
          </div>
          <div className="w-full">
            <p className="font-custom text-[14px] text-center font-bold pb-10 border-b border-black">
              ຜູ້ຮັບເງິນ
            </p>
          </div>
          <div className="w-full">
            <p className="font-custom text-[14px] text-center font-bold pb-10 border-b border-black">
              ຜູ້ຮັບເຄື່ອງ
            </p>
          </div>
          <div className="w-full">
            <p className="font-custom text-[14px] text-center font-bold pb-10 border-b border-black">
              ຜູ້ສົ່ງເຄື່ອງ
            </p>
          </div>
          <div className="w-full">
            <p className="font-custom text-[14px] text-center font-bold pb-10 border-b border-black">
              ຜູ້ກວດເຄື່ອງ
            </p>
          </div>
          <div className="w-full">
            <p className="font-custom text-[14px] text-center font-bold pb-10 border-b border-black">
              ຜູ້ອະນຸມັດ
            </p>
          </div>
        </div>
        <div className="mt-10">
          <table className="w-full">
            <tbody className="">
              <tr className=" border">
                <td className="font-custom text-[12px] text-center py-2">
                  ບັນຊີ(LAK /ກີບ)
                </td>
                <td className="font-custom text-[16px] text-center font-bold">
                  200-1200-00016217-001
                </td>
                <td className="font-custom text-[16px] text-center font-bold">
                  ນາງ ທອງມາ ຫອມສົມບັດ
                </td>
              </tr>
              <tr className=" border">
                <td className="font-custom text-[12px] text-center py-2">
                  ບັນຊີ(THB/ບາດ)
                </td>
                <td className="font-custom text-[16px] text-center font-bold">
                  0-98-12-09-49-74-18
                </td>
                <td className="font-custom text-[16px] text-center font-bold">
                  MISS Thongma HOMSOMBATH
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PrintBill;
