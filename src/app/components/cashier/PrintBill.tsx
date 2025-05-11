import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function PrintBill() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <button onClick={reactToPrintFn}>Print</button>
      <div
        ref={contentRef}
        className="w-[80mm] h-auto px-4 py-2 text-[14px]" // 80mm width and appropriate padding
      >
        {/* Nội dung cần in */}
        <h1 className="text-center font-bold uppercase text-medium pb-2">
          latda-shop
        </h1>
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <p className="flex justify-between uppercase font-semibold">
          <span>name</span>
          <span>count</span>
          <span>price</span>
        </p>
        <p>Product 2 - 15,000 ₭</p>
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        <div className="flex">
          <p className="flex-1">ລວມ</p>
          <p className="flex-1 text-right">500 ກີບ</p>
        </div>
        <div className="flex">
          <p className="flex-1">ສ່ວນຫຼຸດ</p>
          <p className="flex-1 text-right">500 ກີບ</p>
        </div>
        <div className="flex">
          <p className="flex-1">ລວມເງິນຕ້ອງຈ່າຍ</p>
          <p className="flex-1 text-right">500 ກີບ</p>
        </div>
        <div className="flex">
          <p className="flex-1">ເງິນລູກຄ້າ</p>
          <p className="flex-1 text-right">500 ກີບ</p>
        </div>
        <div className="flex">
          <p className="flex-1">ເງິນທອນ</p>
          <p className="flex-1 text-right">500 ກີບ</p>
        </div>
        <p className="border-dashed border-b-1 border-gray-500 my-2" />
        {/* footer */}
        <div className="text-left">
          <p className="">ຂອບໃຈທີ່ໃຊບໍລິການນຳ ຮ້ານລັດດາເຮົາ</p>
          <p className="">ຕິດຕໍ່ສອບຖາມ:</p>
          <p className="">* ເບີໂທ: 02055154824</p>
          <p className="">* Whatapp: 02055154824</p>
          <p className="">* Facebook: Latda-shop</p>
        </div>
      </div>
    </>
  );
}

export default PrintBill;
