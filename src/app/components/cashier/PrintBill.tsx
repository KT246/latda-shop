"use client";
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import { Invoice } from "@/app/lib/interface";
import {
  formatDate,
  formatDateNotime,
  formattedNumber,
} from "@/app/helpers/funtions";
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
    // className="hidden"
    >
      <div
        ref={contentRef}
        className=" w-[148mm] h-[210mm] mx-auto border p-5 "
      >
        <div className=" flex justify-between">
          <div>
            <Image alt="" src={"/QRBCELONE_LAK.svg"} width={100} height={100} />
          </div>
          <div className=" w-full text-center text-[16px]">
            <p className=" font-bold text-[20px]">ຮ້ານລັດດາຮຸ່ງຊັບອໍໂຕ</p>
            <p>ບ້ານ ນາໂດນ, ເມືອງ ແລະ, ແຂວງ ສາລະວັນ</p>
            <p>ເສັ້ນທາງເລກທີ 15 (ໃກ້ກັບວິທະຍາໄລຄູສາລະວັນ)</p>
            <p>ສອບຖາມໂທ: 020 98991396</p>
          </div>
          <div>
            <Image alt="" src={"/QRBCELONE_THB.svg"} width={100} height={100} />
          </div>
        </div>
        <p className="  text-[18px] font-bold my-3 text-center">ໃບສົ່ງເຄື່ອງ</p>

        <div className="text-[14px]">
          <p className=" capitalize">ຊື່ສິນຄ້າ: {data?.member_id}</p>
          <p>ເລກບິນ: {data?.id}</p>
          <p>ວັນທີພິມບິນ: {formatDate(data?.date_create)}</p>
          <p>
            ການຊຳລະ:{" "}
            {data?.pay_type === "debt"
              ? "ຕິດໜີ້"
              : data?.pay_type === "cash"
              ? "ເງິນສົດ"
              : "ເງິນໂອນ"}
          </p>
          <p>ອັຕາແລກປ່ຽ່ນ: 660</p>
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
              {data?.details.map((item, index) => (
                <tr key={index}>
                  <td className=" border border-black text-center">
                    {index + 1}
                  </td>
                  <td className=" border border-black px-1">{item?.title}</td>
                  <td className=" text-center border border-black">
                    {item?.qty}
                  </td>
                  <td className=" text-center border border-black">
                    {item?.unit}
                  </td>
                  <td className=" border border-black text-right px-1">
                    {formattedNumber(item?.total_unit_lak ?? 0)}
                  </td>
                  <td className=" border border-black text-center px-1">
                    {item?.discount} %
                  </td>
                  <td className=" border border-black text-right px-1">
                    {formattedNumber(item?.total_lak ?? 0)}
                  </td>
                </tr>
              ))}
              {/* fhsdgfsjhkdfhjkfdhjbfdshjdfshjfsd */}
              <tr>
                <td rowSpan={6} colSpan={3} className="  p-2">
                  <p>ໝາຍເຫດ:</p>
                  <p>* ກະລຸນາກວດສິນຄ້າໃຫ້ ລະອຽດ ແລະ ຄົບຖ້ວນຕາມບິນ</p>
                  <p>
                    * ສາມາດສົ່ງຄືນສິນຄ້າພາຍໃນ 3 ວັນ,ແຕ່ສິນຄ້າຕ້ອງຢູ່ໃນສະພາບເດີມ
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center  border border-black">
                  ລາຄາລວມ
                </td>
                <td colSpan={2} className="text-end  border border-black px-1">
                  {formattedNumber(data?.total_lak ?? 0)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center  border border-black">
                  ສ່ວນຫຼຸດ
                </td>
                <td colSpan={2} className="text-end  border border-black px-1">
                  {formattedNumber(data?.m_discount ?? 0)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center font-bold  border border-black py-3"
                >
                  ຈຳນວນເງິນຕ້ອງຈ່າຍ
                </td>
                <td
                  colSpan={2}
                  className="text-end font-bold  border border-black px-1"
                >
                  {formattedNumber(data?.total_checkout_lak ?? 0)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="text-center  border border-black">
                  ເງິນທອນ
                </td>
                <td colSpan={2} className="text-end  border border-black px-1">
                  {formattedNumber(data?.money_cash ?? 0)}
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

        <p className=" text-center text-[14px] mt-32">ຂອບໃຈລູກຄ້າທີອູດໜູນ</p>
        <p className="text-center text-[10px]">Power by SKV group</p>
      </div>
    </div>
  );
}

export default PrintBill;
