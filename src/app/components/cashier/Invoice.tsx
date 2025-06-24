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
  const {
    updateCart,
    updateDisMuont,
    updateMnBack,
    updateMnCheckOut,
    updateMnCustomer,
    cart,
    cartName,
    mn_back,
    mn_check_out,
    mn_customer,
    dis_muont,
  } = useCartStore();
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

  const reTail = async (s: string) => {
    try {
      const res = await apiRetail({
        cart_name: cartName,
        m_discount: dis_muont ?? 0,
        member_id: "",
        pay_type: s,
      });
      // console.log(res.data);
      if (res.data.status !== "error") {
        const data = res.data;
        updateCart(null);
        setDialog(!dialog);
        setBill(data);
        toast.success("ຂາຍສຳເລັດ");
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleSubmit = async (key: number) => {
    if (cart === null) {
      toast.error("ກະຕ່າບໍ່ມີສິນຄ້າ");
      return;
    }
    if (key === 1) {
      await reTail("transfer");
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
        <div className="w-full h-[55vh]">
          <p className=" flex bg-green-200 w-full font-semibold text-sm">
            <span className="py-1 px-2 text-left w-40">ຊື່ສິນຄ້າ</span>
            <span className="py-1 px-2  text-center w-40">ຈຳນວນ</span>
            <span className="py-1 px-2 text-center w-28">ຫົວຫນ່ວຍ</span>
            <span className="py-1 px-2 text-left w-40">ລາຄາ</span>
            <span className="py-1 px-2 text-left w-40">ລວມ</span>
            <span className="py-1 px-2 text-center w-20">ລຶບ</span>
          </p>
          <div className="overflow-y-auto h-full pb-10">
            {cart !== null ? (
              cart.details?.map((item, index) => {
                return (
                  <>
                    <p
                      className="flex justify-center items-center text-sm"
                      key={index}
                    >
                      <span className="py-1 px-2 text-left w-40 break-words overflow-auto">
                        {item.title + item.size + item.use_for}
                      </span>
                      <span className="py-1 px-2  text-center w-40 flex items-center justify-center gap-2">
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
                      </span>
                      <span className="py-1 px-2 text-center w-28">
                        {item.unit}
                      </span>
                      <span className="py-1 px-2 text-left w-40">
                        {formattedNumber(item.retail_lak)} ກີບ
                      </span>
                      <span className="py-1 px-2 text-left w-40">
                        {formattedNumber(item.total_lak)} ກີບ
                      </span>
                      <span className="py-1 px-2 text-center w-20">
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
                      </span>
                    </p>
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
        <div className="h-[20vh]  flex items-center">
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
        <div className=" flex gap-3 justify-between items-center">
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
              updateMnCheckOut(cart?.total_lak ?? 0);
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
        <div className=" fixed z-30 bg-gray-900 bg-opacity-70 left-0 right-0 top-0 bottom-0 flex items-center justify-center h-screen ">
          <div className="bg-gray-100 rounded-lg p-2">
            <div className="w-full h-full flex flex-col p-2">
              <div className="flex gap-5">
                <div className="flex flex-col justify-center gap-3">
                  <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                    ເງິນລູກຄ້າ
                  </label>
                  <div className="rounded overflow-hidden border-gray-300 hover:border-gray-500 border-2">
                    <input
                      type="number"
                      min={0}
                      onChange={(e) => {
                        updateMnCustomer(Number(e.target.value));
                        updateMnBack(
                          mn_check_out > Number(e.target.value)
                            ? 0
                            : Number(e.target.value) - mn_check_out
                        );
                      }}
                      className="w-full outline-none p-1"
                    />
                  </div>
                  <p className="text-sm text-right leading-3">
                    {formattedNumber(mn_customer)} ກີບ
                  </p>
                  <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                    ສ່ວນຫຼຸດ
                  </label>
                  <div className="rounded overflow-hidden border-gray-300 hover:border-gray-500 border-2">
                    <input
                      type="number"
                      min={0}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        const newDis = value;
                        const newCheckOut = (cart?.total_lak ?? 0) - newDis;
                        const newBack = mn_customer - newCheckOut;

                        updateDisMuont(newDis);
                        updateMnCheckOut(newCheckOut);
                        updateMnBack(newBack);
                      }}
                      className="w-full outline-none p-1"
                    />
                  </div>
                  <p className="text-sm text-right text-red-400 leading-3">
                    {formattedNumber(dis_muont)} ກີບ
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                    ເງິນທອນ
                  </label>
                  <div className="rounded overflow-hidden border-gray-300 border-2">
                    <input
                      type="number"
                      min={0}
                      value={mn_back}
                      onChange={(e) => updateMnBack(Number(e.target.value))}
                      className="w-full outline-none p-1"
                      readOnly
                    />
                  </div>
                  <p className="text-sm text-right leading-3">
                    {formattedNumber(mn_back)} ກີບ
                  </p>
                  <label className="ont-semibold border-l-4 border-green-500 leading-3 ps-2">
                    ເງິນທີ່ລູກຄັາຕ້ອງຈ່າຍ
                  </label>
                  <div className="rounded overflow-hidden border-gray-300 border-2">
                    <input
                      type="number"
                      min={0}
                      value={mn_check_out}
                      onChange={(e) => updateMnCheckOut(Number(e.target.value))}
                      className="w-full outline-none p-1"
                      readOnly
                    />
                  </div>
                  <p className="text-sm text-right leading-3">
                    {formattedNumber(mn_check_out)} ກີບ
                  </p>
                </div>
              </div>
              <div className=" flex items-center justify-center gap-5 mt-10">
                <button
                  type="button"
                  onClick={() => handleSubmit(0)}
                  className="px-3 py-2 bg-blue-700 rounded-lg text-white hover:bg-blue-500 duration-300"
                >
                  ເງິນສົດ
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(1)}
                  className="px-3 py-2 bg-green-700 rounded-lg text-white hover:bg-green-500 duration-300"
                >
                  ເງິນໂອນ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDialog(!dialog);
                    updateDisMuont(0);
                    updateMnBack(0);
                    updateMnCheckOut(cart?.total_lak ?? 0);
                    updateMnCustomer(0);
                  }}
                  className="px-3 py-2 bg-red-700 rounded-lg text-white hover:bg-red-500 duration-300"
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
