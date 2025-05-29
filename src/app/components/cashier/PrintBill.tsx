import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import { Invoice } from "@/app/lib/interface";

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
    <div className="hidden">
      <div
        ref={contentRef}
        className="w-[80mm] h-auto px-4 py-2 text-[14px] border border-gray-700"
      >
        {/* {header} */}
        <h1 className="text-center font-bold uppercase text-medium mb-2">
          ຮ້ານ latda-shop
        </h1>
        <p>ສະຖານທີ່: ຫລັກ 12 ບ.ຕວຍ ມ.ໄຊເສດຖາ ຂ.ອັດຕະປື</p>
        <p>ເບີໂທ: 02055154824</p>
        <p>Whatapp: 02055154824</p>
        <p>Facebook: Latda-shop</p>

        {/* {content} */}
        <p className="text-center font-bold my-3">ບິນໄລ່ເງິນ</p>
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <p className="flex font-semibold">
          <span className="w-1/2 pe-3">ຊີ່ສິນຄ້າ</span>
          <span className="w-1/4">ຈຳນວນ</span>
          <span className="w-1/2 text-center">ລາຄາ</span>
        </p>

        {data?.details?.map((it, index) => (
          <p key={index} className="flex">
            <span className="w-1/2 break-all pe-3">{it?.title}</span>
            <span className="w-1/4">x{it?.qty}</span>
            <span className="w-1/2">{it?.retail_lak}</span>
          </p>
        ))}
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="flex">
          <p className="flex-1 font-semibold">ເງິນລູກຄ້າ:</p>
          <p className="flex-1 text-right">{"122121"} ກີບ</p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ສ່ວນຫລຸດ:</p>
          <p className="flex-1 text-right">{data?.m_discount || 0} ກີບ</p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ເງິນທອນ:</p>
          <p className="flex-1 text-right">{"-122121"} ກີບ</p>
        </div>
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="flex">
          <p className="flex-1 font-semibold">ລວມ:</p>
          <p className="flex-1 text-right">
            {data?.total_checkout_lak || 0} ກີບ
          </p>
        </div>

        {/* {bottom} */}
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="text-left pt-2">
          <p>ເລກບິນ: LD000155465465</p>
          <p>ລະຫັດຜູ້ຂາຍ: LD0001</p>
          <p>ປະເພດຈ່າຍ: ເງິນສົດ</p>
          <p>ວັນເວລາ: 12/07/2025 10:10:10</p>
          <p className="text-center pt-2">ຂອບໃຈລູກຄ້າ</p>
          <p className="text-center">ແລ້ວພົບກັນໃຫມ່!</p>
        </div>
      </div>
    </div>
  );
}

export default PrintBill;
