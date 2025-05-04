"use client";
import React from "react";
import { Button, Input, Tooltip } from "@heroui/react";
import { TiDeleteOutline } from "react-icons/ti";
import { useCartStore } from "@/app/store/cartStore";
import { formattedNumber } from "@/app/helpers/funtions";
import { apiDecrease, apiIncrease, apiDeleteCart } from "@/app/api/products";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import Swal from "sweetalert2";
import { SwalNotification } from "@/app/helpers/alers";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

const Invoice = () => {
  const { cartName, updateCart, cart } = useCartStore();

  const handleAddToCart = async (barcode: string, id: number) => {
    // console.log("add: " + barcode);
    if (id === 1) {
      try {
        const res = await apiIncrease({
          barcode: barcode,
          qty: 1,
          cart_name: cartName,
        });
        if (res.data.status !== "error") {
          updateCart(res.data);
        } else {
          toast.error(res.data?.message);
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          const errorMessage = e.response.data?.message;
          toast.error(errorMessage);
        }
      }
    } else {
      try {
        const res = await apiDecrease({
          barcode: barcode,
          qty: 1,
          cart_name: cartName,
        });
        if (res.data.status !== "error") {
          updateCart(res.data);
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (id === 0) {
      SwalNotification("ກະຕ່າບໍ່ມີສິນຄ້າ", "warning");
      return;
    }

    Swal.fire({
      title: "ເຄຍກະຕ່າ",
      text: `ຢືນຢັນການລົບກະຕ່າ ${cartName} ບໍ່?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ຍົກເລີກ",
      confirmButtonText: "ຢືນຢັນ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiDeleteCart(id);
          if (res.data.status !== "error") {
            updateCart(null);
            SwalNotification(`ລົບກະຕ່າ ${cartName} ແລ້ວ`, "success");
          }
        } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
            const errorMessage = e.response.data?.message;
            toast.error(errorMessage);
          }
        }
      }
    });
  };

  return (
    <div>
      <div className=" w-full p-2 border border-black rounded-lg shadow-lg h-[74vh] bg-white shadow-gray-400">
        <div className="w-full  mb-2 overflow-auto h-[53vh]">
          <table className="w-full relative ">
            <thead className=" sticky top-0 left-0 z-10">
              <tr className="bg-green-200  w-full">
                <th className="py-1 px-2 text-left ">ຊື່ສິນຄ້າ</th>
                <th className="py-1 px-2  text-center">ຈຳນວນ</th>
                <th className="py-1 px-2 text-center">ຈຳນວນ</th>

                <th className="py-1 px-2 text-left">ລາຄາ</th>
                <th className="py-1 px-2 text-left">ລວມ</th>
                <th className="py-1 px-2 text-center">ລຶບ</th>
              </tr>
            </thead>
            <tbody>
              {cart !== null ? (
                cart.details?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-1 px-2 ">
                        {item.title + " " + item.size + " " + item.use_for}
                      </td>
                      <td className="py-1 px-2 grid grid-cols-3 place-content-center gap-2 h-14">
                        <Tooltip content="ເພີ່ມ">
                          <span
                            className="flex justify-center items-center cursor-pointer  "
                            onClick={() => handleAddToCart(item.barcode, 1)}
                          >
                            <Image
                              src={"/add-svgrepo-com.svg"}
                              alt="add-icon"
                              width={20}
                              height={20}
                            />
                          </span>
                        </Tooltip>
                        <span className="text-center">{item.qty}</span>
                        <Tooltip content="ລົດ">
                          <span
                            className="flex justify-center items-center cursor-pointer"
                            onClick={() => handleAddToCart(item.barcode, 0)}
                          >
                            <Image
                              src={"/subtract-minus-remove-svgrepo-com.svg"}
                              alt="add-icon"
                              width={15}
                              height={15}
                            />
                          </span>
                        </Tooltip>
                      </td>
                      <td className="py-1 px-2 text-center">{item.unit}</td>
                      <td className="py-1 px-2">
                        {formattedNumber(item.retail_lak)} ກີບ
                      </td>

                      <td className="py-1 px-2">
                        {formattedNumber(item.total_lak)} ກີບ
                      </td>
                      <td className="text-center ">
                        <button className="uppercase bg-red-500 text-gray-100 px-2 py-1 rounded-lg">
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="h-[47vh]">
                  <td colSpan={6} className="text-center text-gray-400">
                    ກະຕ່າຍັງທັນມີສີນຄ້າ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-between px-2 bg-blue-100 border-b border-gray-300">
          <p>ລວມ</p>
          <p className=" text-[20px] font-bold">
            {formattedNumber(cart?.total_lak ?? 0)} ກີບ
          </p>
        </div>
        <div className="w-full flex justify-between px-2 bg-blue-100">
          <p>ສ່ວນຫຼຸດ</p>
          <p className=" text-[20px] font-bold text-red-600">
            {cart?.m_discount ?? 0}%
          </p>
        </div>
        <div className="w-full flex justify-between items-center p-2 bg-green-200">
          <p className=" text-[30px] font-bold">ລວມເງິນຕ້ອງຈ່າຍ</p>
          <p className=" text-[30px] font-bold">
            <span className="text-red-500 pe-2">
              {formattedNumber(cart?.total_lak ?? 0)}
            </span>
            ກີບ
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <Button
          onPress={() => handleDelete(cart?.id ?? 0)}
          className="w-[300px] h-[80px] bg-red-500 text-gray-100"
        >
          <p className="text-[40px] font-bold">ເຄຍກະຕ່າ</p>
        </Button>
        <Button color="primary" className="w-[300px] h-[80px]">
          <p className=" text-[40px] font-bold text-gray-100">ຂາຍ</p>
        </Button>
      </div>
    </div>
  );
};
export default Invoice;
