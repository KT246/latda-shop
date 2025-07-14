import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import { Invoice } from "@/app/lib/interface";
import { formatDate, formattedNumber } from "@/app/helpers/funtions";

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
        className="w-[148mm] text-[14px] p-2 border border-gray-700"
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
        <p className="grid grid-cols-3">
          <span>ຊີ່ສິນຄ້າ</span>
          <span>ຈຳນວນ</span>
          <span>ລາຄາ</span>
        </p>

        {data?.details?.map((item, index) => (
          <p key={index} className="grid grid-cols-3">
            <span>{item.title}</span>
            <span>x{item?.qty}</span>
            <span>{formattedNumber(item?.retail_lak ?? 0)}</span>
          </p>
        ))}
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="flex">
          <p className="flex-1 font-semibold">ເງິນຮັບມາ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.money_received ?? 0)} ກີບ
          </p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ສ່ວນຫລຸດ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.m_discount ?? 0)} ກີບ
          </p>
        </div>
        <div className="flex">
          <p className="flex-1 font-semibold">ເງິນທອນ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.money_cash ?? 0)} ກີບ
          </p>
        </div>
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="flex">
          <p className="flex-1 font-semibold">ລວມ:</p>
          <p className="flex-1 text-right">
            {formattedNumber(data?.total_checkout_lak ?? 0)} ກີບ
          </p>
        </div>

        {/* {bottom} */}
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
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
        </div>
      </div>
    </div>
  );
}

export default PrintBill;
