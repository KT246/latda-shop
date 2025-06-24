"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { formattedNumber } from "@/app/helpers/funtions";
import Image from "next/image";
import { GetProductById } from "@/app/api/admin.product";
import { useParams } from "next/navigation";
import axios from "axios";

interface Product {
  barcode: string;
  page: string | null;
  No: string | null;
  code: string | null;
  size: string | null;
  title: string;
  use_for: string | null;
  brand: string | null;
  unit: string;
  category: string;
  cost_thb: number | 0;
  cost_lak: number | 0;
  wholesale_thb: number | 0;
  wholesale_lak: number | 0;
  retail_thb: number | 0;
  retail_lak: number | 0;
  discount: number | 0;
  num_of_discount: number | 0;
  qty_start: number | 0;
  qty_in: number | 0;
  qty_out: number | 0;
  qty_balance: number | 0;
  qty_alert: number | 0;
  supplier: string | null;
  img_name: string | null;
  status: string;
}

function DetailProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const fetchData = async (id: string) => {
    try {
      const res: any = await GetProductById(id);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id as string);
    }
  }, [id]);

  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ລາຍລະອຽດສິນຄ້າ
      </h1>
      <div className="pt-6 space-y-6">
        <div className="flex gap-3">
          <div className="relative w-[200px] h-[270px] border-dashed border-blue-500 border-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product?.img_name}`}
              alt="No products found"
              fill
            />
          </div>

          <div className="flex-1 pe-5">
            <div className=" grid grid-cols-2 gap-3 border shadow-md p-3  rounded">
              <p className="">
                <span className="font-semibold">ຊື່: </span>
                <span className="text-gray-600">{product?.title}</span>
              </p>
              <p>
                <span className="font-semibold">Brand: </span>
                <span className="text-gray-600">{product?.brand}</span>
              </p>
              <p className=" col-span-2">
                <span className="font-semibold">ໃຊ້ສໍາລັບ: </span>
                <span className="text-gray-600">{product?.use_for}</span>
              </p>
              <p>
                <span className="font-semibold">supplier: </span>
                <span className="text-gray-600">{product?.supplier}</span>
              </p>
              <p>
                <span className="font-semibold">ໝວດຫມູ່: </span>
                <span className="text-gray-600">{product?.category}</span>
              </p>
              <p>
                <span className="font-semibold">ສ່ວນຫຼຸດ: </span>
                <span className="text-gray-600">{product?.discount}</span>
              </p>
              <p>
                <span className="font-semibold">ຈໍານວນສ່ວນຫຼຸດ: </span>
                <span className="text-gray-600">
                  {product?.num_of_discount}
                </span>
              </p>
              <p>
                <span className="font-semibold">ລາຄາ (THB): </span>
                <span className="text-gray-600">{product?.cost_thb}</span>
              </p>
              <p>
                <span className="font-semibold">ລາຄາ (LAK): </span>
                <span className="text-gray-600">{product?.cost_lak}</span>
              </p>
              <p>
                <span className="font-semibold">ສະຖານະ: </span>
                <span className="text-gray-600">{product?.status}</span>
              </p>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-4 gap-3 border p-3  rounded shadow-md">
          <p>
            <span className="font-semibold">ບາໂຄດ: </span>
            <span className="text-gray-600">{product?.barcode}</span>
          </p>
          <p>
            <span className="font-semibold">ຫນ້າ: </span>
            <span className="text-gray-600">{product?.page}</span>
          </p>
          <p>
            <span className="font-semibold">No: </span>
            <span className="text-gray-600">{product?.No}</span>
          </p>
          <p>
            <span className="font-semibold">ຂະຫນາດ: </span>
            <span className="text-gray-600">{product?.size}</span>
          </p>
          <p>
            <span className="font-semibold">ລະຫັດ: </span>
            <span className="text-gray-600">{product?.code}</span>
          </p>
          <p>
            <span className="font-semibold">ຫົວໜ່ວຍ: </span>
            <span className="text-gray-600">{product?.unit}</span>
          </p>

          <p>
            <span className="font-semibold">ລາຄາຂາຍ​ສົ່ງ (THB)​ : </span>
            <span className="text-gray-600">{product?.wholesale_thb}</span>
          </p>
          <p>
            <span className="font-semibold">ລາຄາຂາຍ​ສົ່ງ (LAK): </span>
            <span className="text-gray-600">{product?.wholesale_lak}</span>
          </p>
          <p>
            <span className="font-semibold">ຂາຍຍ່ອຍ (THB): </span>
            <span className="text-gray-600">{product?.retail_thb}</span>
          </p>
          <p>
            <span className="font-semibold">ຂາຍຍ່ອຍ (LAK): </span>
            <span className="text-gray-600">{product?.retail_lak}</span>
          </p>
          <p>
            <span className="font-semibold">ຈໍານວນເລີ່ມຕົ້ນ: </span>
            <span className="text-gray-600">{product?.qty_start}</span>
          </p>
          <p>
            <span className="font-semibold">ຈໍານວນເຂັົ້າ: </span>
            <span className="text-gray-600">{product?.qty_in}</span>
          </p>
          <p>
            <span className="font-semibold">ຈໍານວນອອກ: </span>
            <span className="text-gray-600">{product?.qty_out}</span>
          </p>
          <p>
            <span className="font-semibold">ຍອດຄົງເຫຼືອ: </span>
            <span className="text-gray-600">{product?.qty_balance}</span>
          </p>
          <p>
            <span className="font-semibold">qty_alert: </span>
            <span className="text-gray-600">sadxaisdxia</span>
          </p>
        </div>

        <div className="mt-3">
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
