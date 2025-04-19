"use client";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { formattedNumber } from "@/app/helpers/funtions";

function DetailProduct() {
  const router = useRouter();
  const productData = {
    barcode: "1C01073032F2",
    page: "20",
    No: "010",
    code: "1C010-73032",
    size: "10ml",
    title: "ຊຸດປ້ຳນ້ຳ M95.85.108.90.82.CRR.BL JJFGHUKHKUGUTGYTIIUY8IYI",
    use_for: "FSDAGFAGFADGAGGGGGDGFDAGAAAAAAAAAAFDAGGGGGGGGGGG",
    unit: "ອັນ",
    category: "category",
    cost_thb: 1690,
    cost_lak: 1233700,
    wholesale_thb: 0,
    wholesale_lak: 0,
    retail_thb: 2700,
    retail_lak: 0,
    discount: 0,
    num_of_discount: 0,
    qty_start: 0,
    qty_in: 0,
    qty_out: 0,
    qty_balance: 100,
    status: "have girlfriend",
  };
  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ລາຍລະອຽດສິນຄ້າ
      </h1>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-3 border-1 p-3  rounded">
          <p className=" col-span-2">
            <span className="font-semibold">ຫົວຂໍ້: </span>
            <span className="text-gray-500">{productData.title}</span>
          </p>
          <p className=" col-span-2">
            <span className="font-semibold">ໃຊ້ສໍາລັບ: </span>
            <span className="text-gray-500">{productData.use_for}</span>
          </p>
        </div>
        <div className=" grid grid-cols-4 gap-3 border-1 p-3  rounded">
          <p>
            <span className="font-semibold">ບາໂຄດ: </span>
            <span className="text-gray-500">{productData.barcode}</span>
          </p>
          <p>
            <span className="font-semibold">ຫນ້າ: </span>
            <span className="text-gray-500">{productData.page}</span>
          </p>
          <p>
            <span className="font-semibold">No: </span>
            <span className="text-gray-500">{productData.No}</span>
          </p>
          <p>
            <span className="font-semibold">ຂະຫນາດ: </span>
            <span className="text-gray-500">{productData.size}</span>
          </p>
          <p>
            <span className="font-semibold">ລະຫັດ: </span>
            <span className="text-gray-500">{productData.code}</span>
          </p>
          <p>
            <span className="font-semibold">ຫົວໜ່ວຍ: </span>
            <span className="text-gray-500">{productData.unit}</span>
          </p>
          <p>
            <span className="font-semibold">ໝວດຫມູ່: </span>
            <span className="text-gray-500">{productData.category}</span>
          </p>
          <p>
            <span className="font-semibold">ສະຖານະ: </span>
            <span className="text-gray-500">{productData.status}</span>
          </p>
          <p>
            <span className="font-semibold">ສ່ວນຫຼຸດ: </span>
            <span className="text-gray-500">{productData.discount}</span>
          </p>
          <p>
            <span className="font-semibold">ຈໍານວນສ່ວນຫຼຸດ: </span>
            <span className="text-gray-500">{productData.num_of_discount}</span>
          </p>
          <p>
            <span className="font-semibold">ລາຄາ (THB): </span>
            <span className="text-gray-500">{productData.cost_thb}</span>
          </p>
          <p>
            <span className="font-semibold">ລາຄາ (LAK): </span>
            <span className="text-gray-500">{productData.cost_lak}</span>
          </p>
          <p>
            <span className="font-semibold">ລາຄາຂາຍ​ສົ່ງ (THB)​ : </span>
            <span className="text-gray-500">{productData.wholesale_thb}</span>
          </p>
          <p>
            <span className="font-semibold">ລາຄາຂາຍ​ສົ່ງ (LAK): </span>
            <span className="text-gray-500">{productData.wholesale_lak}</span>
          </p>
          <p>
            <span className="font-semibold">ຂາຍຍ່ອຍ (THB): </span>
            <span className="text-gray-500">{productData.retail_thb}</span>
          </p>
          <p>
            <span className="font-semibold">ຂາຍຍ່ອຍ (LAK): </span>
            <span className="text-gray-500">{productData.retail_lak}</span>
          </p>
          <p>
            <span className="font-semibold">ຈໍານວນເລີ່ມຕົ້ນ: </span>
            <span className="text-gray-500">{productData.qty_start}</span>
          </p>
          <p>
            <span className="font-semibold">ຈໍານວນເຂັົ້າ: </span>
            <span className="text-gray-500">{productData.qty_in}</span>
          </p>
          <p>
            <span className="font-semibold">ຈໍານວນອອກ: </span>
            <span className="text-gray-500">{productData.qty_out}</span>
          </p>
          <p>
            <span className="font-semibold">ຍອດຄົງເຫຼືອ: </span>
            <span className="text-gray-500">{productData.qty_balance}</span>
          </p>
        </div>

        <div className="mt-6">
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
    </div>
  );
}

export default DetailProduct;
