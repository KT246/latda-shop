"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Tooltip } from "@heroui/react";

import { useCartStore } from "@/app/store/cartStore";
import { formattedNumber } from "@/app/helpers/funtions";
import {
  apiRetail,
  apiDecrease,
  apiIncrease,
  apiDeleteCart,
  apiDeleteProduct,
} from "@/app/api/products";
import axios from "axios";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import { SwalNotification } from "@/app/helpers/alers";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import { div } from "framer-motion/client";
import { useReactToPrint } from "react-to-print";
import PrintBill from "./PrintBill";
const Invoice = () => {
  const [dialog, setDialog] = useState(false);
  const [bill, setBill] = useState<any>(null);
  const [disMount, setDisMount] = useState<number>(0);
  const [moneyCustomer, setMoneyCustomer] = useState<number>(0);
  const [checkout, setCheckout] = useState<number>(0);
  const [moneyChange, setMoneyChange] = useState<number>(0);
  const [check, setCheck] = useState<boolean>(false);

  const { updateCart, cart, cartName } = useCartStore();
  const cartEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lng = cart?.details.length ?? 0;
    if (lng > 0) {
      cartEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [cart?.details.length]);

  const handleAddToCart = async (barcode: string, id: number) => {
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

  const handleDeleteCart = async (id: number) => {
    if (id === 0) {
      SwalNotification("ກະຕ່າບໍ່ມີສິນຄ້າ", "error");
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
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const reTail = async (pay: string) => {
    try {
      const res = await apiRetail({
        cart_name: cartName,
        // m_discount: dis_muont ?? 0,
        member_id: "",
        pay_type: pay,
      });

      const data = res.data;
      if (data.status !== "error") {
        updateCart(null);
        setDialog(!dialog);
        setBill(data);
        toast.success(data.message);
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message;
        toast.error(errorMessage);
      }
    }
  };

  const handleSubmit = async (key: number) => {
    if (cart === null) {
      toast.error("ກະຕ່າບໍ່ມີສິນຄ້າ");
      return;
    }
    if (key === 1) {
      await reTail("transfer");
    } else if (key === 2) {
      await reTail("cash");
    } else if (key === 3) {
      await reTail("cash");
    } else {
      await reTail("cash");
    }
  };

  const handleDeleteProduct = async (
    cashier_id: string,
    barcode: string,
    cart_name: number
  ) => {
    try {
      const res = await apiDeleteProduct(cashier_id, barcode, cart_name);
      if (res.data.status !== "error") {
        updateCart(res.data.details.length > 0 ? res.data : null);
        toast.success("ລົບສິນຄ້າແລ້ວ");
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message;
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <div className=" w-full h-full p-2 border border-black rounded-lg shadow-lg bg-white shadow-gray-400">
        <div className="w-full h-[60%]">
          <div className=" w-full flex justify-center items-center bg-green-200 font-semibold text-sm">
            <p className="py-1 w-[20%] text-center ">ຊື່ສິນຄ້າ</p>
            <p className="py-1 w-[20%] text-center ">ຈຳນວນ</p>
            <p className="py-1 w-[10%] text-center ">ຫນ່ວຍ</p>
            <p className="py-1 w-[20%] text-center ">ລາຄາ</p>
            <p className="py-1 w-[20%] text-center ">ລວມ</p>
            <p className="py-1 w-[] text-center ">ລຶບ</p>
          </div>
          <div className="overflow-y-auto h-full pb-10">
            {cart !== null ? (
              cart.details?.map((item, index) => {
                return (
                  <>
                    <div
                      className="w-full flex justify-center items-center text-sm border-b border-slate-200"
                      key={index}
                    >
                      <p className=" w-[20%]">
                        {item.title + item.size}
                      </p>
                      <p className=" w-[20%] flex justify-center items-center gap-2">
                        <Tooltip content="ເພີ່ມ" placement="top">
                          <button
                            className="hover:text-green-500 duration-300 hover:bg-green-100 rounded-full p-1"
                            onClick={() => handleAddToCart(item.barcode, 1)}
                          >
                            <IoAddCircle size={20} />
                          </button>
                        </Tooltip>
                        <span className="text-center">{item.qty}</span>
                        <Tooltip content="ລົດ" placement="top">
                          <button
                            className="hover:text-red-500 duration-300 hover:bg-red-100 rounded-full p-1"
                            onClick={() => handleAddToCart(item.barcode, 0)}
                          >
                            <RiSubtractLine size={20} />
                          </button>
                        </Tooltip>
                      </p>
                      <p className="w-[10%]">
                        {item.unit}
                      </p>
                      <p className="w-[20%]">
                        {formattedNumber(item.retail_lak)} ກີບ
                      </p>
                      <p className="w-[20%]">
                        {formattedNumber(item.total_lak)} ກີບ
                      </p>
                      <div className="w-[10%]">
                        <button
                          onClick={() =>
                            handleDeleteProduct(
                              cart?.cashier_id,
                              item?.barcode,
                              cart?.cart_name
                            )
                          }
                          className=" hover:text-red-500 duration-300 hover:bg-red-100 rounded-full p-1"
                        >
                          <MdDeleteForever size={24} />
                        </button>
                      </div>
                    </div>
                    <p ref={cartEndRef} />
                  </>
                );
              })
            ) : (
              <p className="h-[45vh] flex items-center justify-center">
                <span className="text-gray-400">ກະຕ່າຍັງທັນມີສີນຄ້າ</span>
              </p>
            )}
          </div>
        </div>
        <div className="h-[20%]  flex items-center">
          <div className="w-full">
            <div className="w-full flex justify-between px-2 bg-blue-100 border-b border-gray-300">
              <p>ລວມ</p>
              <p className=" text-[20px] font-bold">
                {formattedNumber(cart?.total_lak ?? 0)} ກີບ
              </p>
            </div>
            <div className="w-full flex justify-between px-2 bg-blue-100">
              <p>ສ່ວນຫຼຸດ</p>
              <p className="text-[20px] font-bold text-red-600">
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
        </div>
        <div className="h-[20%] flex gap-3 justify-between items-center">
          <Button
            radius="sm"
            onPress={() => handleDeleteCart(cart?.id ?? 0)}
            className="flex-1  h-[80px] text-gray-100 text-[40px] font-bold"
            color="warning"
          >
            <p className="">ເຄຍກະຕ່າ</p>
          </Button>
          <Button
            radius="sm"
            onPress={() => {
              cart !== null
                ? setDialog(!dialog)
                : toast.error("ກະຕ່າບໍ່ມີສິນຄ້າ", {
                  position: "top-center",
                });
              // updateMnCheckOut(cart?.total_lak ?? 0);
            }}
            color="primary"
            className="flex-1 h-[80px] text-[40px] font-bold"
          >
            ຂາຍ
          </Button>
        </div>
      </div>

      {/* Dialog */}

      {dialog && (
        <div className=" fixed z-30 bg-gray-900 bg-opacity-70  left-0 right-0 top-0 bottom-0 flex items-center justify-center h-screen ">
          <div className="bg-gray-100 w-[600px] h-[500px] flex flex-col justify-between rounded-lg shadow-sm px-5 py-10">
            <div className="grid grid-cols-1 gap-5">
              <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                ເງິນລູກຄ້າ
              </label>
              <div className="flex">
                <div className="rounded overflow-hidden border-gray-300 hover:border-gray-500 border-2 h-12">
                  <input
                    type="number"
                    min={0}
                    className="w-full h-full outline-none p-1"
                  />
                </div>
                <button
                  type="button"
                  disabled
                  onClick={() => handleSubmit(2)}
                  className="px-3 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400 duration-300"
                >
                  ພໍດີ
                </button>
              </div>
              <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                ເງິນທອນ
              </label>
              <div className="rounded overflow-hidden border-gray-300 hover:border-gray-500 border-2 h-12">
                {formattedNumber(cart?.total_lak || 0)} ກີບ
              </div>
              <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                ສ່ວນຫຼຸດ
              </label>
              <div className="rounded overflow-hidden border-gray-300 hover:border-gray-500 border-2 h-12">
                <input
                  type="number"
                  min={0}
                  className="w-full h-full outline-none p-1"
                />
              </div>
              <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                ເງິນທີ່ລູກຄັາຕ້ອງຈ່າຍ
              </label>
              <div className="rounded overflow-hidden border-gray-300 hover:border-gray-500 border-2 h-12">
                {formattedNumber(cart?.total_lak || 0)} ກີບ
              </div>
              <div className=" flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={() => handleSubmit(3)}
                  className="px-3 py-2 bg-yellow-600 rounded-lg text-white hover:bg-yellow-600 duration-300"
                >
                  ຕິດໜີ້
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(0)}
                  className="px-3 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400 duration-300"
                >
                  ເງິນສົດ
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(1)}
                  className="px-3 py-2 bg-green-500 rounded-lg text-white hover:bg-green-400 duration-300"
                >
                  ເງິນໂອນ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDialog(!dialog);
                  }}
                  className="px-3 py-2 bg-red-500 rounded-lg text-white hover:bg-red-400 duration-300"
                >
                  ຍົກເລີກ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <PrintBill data={bill} clearData={() => setBill(null)} />
    </>
  );
};
export default Invoice;
