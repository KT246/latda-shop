"use client";
import React, { useEffect, useRef } from "react";
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
import Image from "next/image";
import Swal from "sweetalert2";
import { SwalNotification } from "@/app/helpers/alers";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
const Invoice = () => {
  const { cartName, updateCart, cart } = useCartStore();
  const cartEndRef = useRef<HTMLDivElement>(null);
  console.log(cart, "cart");

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

  const handleSell = async () => {
    if (cart === null) return SwalNotification("ກະຕ່າບໍ່ມີສິນຄ້າ", "error");
    const totalAmount = cart.total_lak; // Ví dụ tổng tiền

    Swal.fire({
      title: "ຂາຍ",
      text: `ຢືນຢັນການຂາຍສິນຄ້າກະຕ່າ ${cartName} ບໍ່?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ຍົກເລີກ",
      confirmButtonText: "ຂາຍ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ເລືອກວິທີຈ່າຍເງິນ",
          input: "radio",
          inputOptions: {
            cash: "ຈ່າຍເງິນສົດ",
            transfer: "ໂອນເງິນ",
          },
          inputValidator: (value) => {
            if (!value) {
              return "ກະລຸນາເລືອກວິທີຈ່າຍເງິນ";
            }
          },
          showCancelButton: true,
          cancelButtonText: "ຍົກເລີກ",
          confirmButtonText: "ຢືນຢັນ",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const pay_type = result.value;
            if (result.value === "cash") {
              Swal.fire({
                title: "ເງິນທີ່ຈ່າຍລູກຄ້າຈ່າຍ",
                html: `
                <input id="swal-input" type="number" class="swal2-input" placeholder="ຈໍານວນເງິນ">
                <div style="margin-top: 5px;">ເງິນທີຕ້ອງຈ່າຍ: ${totalAmount.toLocaleString()} ₭</div>
                <div id="swal-amount" style="margin-top: 10px; ;">ເງິນລູກຄ້າ: 0 ₭</div>
                <div id="swal-change" style="margin-top: 10px; ;">ເງິນທອນ: 0 ₭</div>
              `,
                showCancelButton: true,
                showDenyButton: true,
                cancelButtonText: "ຍົກເລີກ",
                confirmButtonText: "transfer",
                denyButtonText: "cash",
                didOpen: () => {
                  const input = document.getElementById("swal-input");
                  const amount = document.getElementById("swal-amount");
                  const change = document.getElementById("swal-change");
                  if (input) {
                    input.addEventListener("input", () => {
                      const value =
                        parseFloat((input as HTMLInputElement).value) || 0;
                      if (amount) {
                        amount.textContent = `ຈໍານວນທີ່ທ່ານໃສ່: ${value.toLocaleString()} ₭`;
                      }
                      if (change) {
                        const changeValue = value - totalAmount;
                        change.textContent = `ເງິນທອນ: ${changeValue.toLocaleString()} ₭`;
                      }
                    });
                  }
                },
                preConfirm: () => {
                  const inputValue = (
                    document.getElementById("swal-input") as HTMLInputElement
                  ).value;
                  if (!inputValue) {
                    Swal.showValidationMessage("ກະລຸນາໃສ່ຈໍານວນເງິນ");
                  }
                  return inputValue;
                },
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const change = result.value;
                  try {
                    const res = await apiRetail({
                      cart_name: cartName,
                      m_discount: cart.m_discount,
                      pay_type: pay_type,
                    });
                    console.log(res, "res");
                    if (res.data.status !== "error") {
                      updateCart(null);
                      SwalNotification(`ສຳເລັດ ${pay_type}`, "success");
                    } else {
                      toast.error(res.data?.message);
                    }
                  } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                      const errorMessage = error.response.data?.message;
                      toast.error(errorMessage);
                    }
                  }
                }
              });
            } else {
              try {
                const res = await apiRetail({
                  cart_name: cartName,
                  m_discount: cart.m_discount,
                  pay_type: pay_type,
                });

                if (res.data.status !== "error") {
                  updateCart(null);
                  SwalNotification(`ສຳເລັດ ${pay_type}`, "success");
                } else {
                  toast.error(res.data?.message);
                }
              } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                  const errorMessage = error.response.data?.message;
                  toast.error(errorMessage);
                }
              }
            }
          }
        });
      }
    });
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
      <div className=" w-full p-2 border border-black rounded-lg shadow-lg h-[74vh] bg-white shadow-gray-400">
        <div className="w-full  mb-2 overflow-y-auto h-[53vh]">
          <p className=" flex bg-green-200 w-full font-semibold text-sm">
            <span className="py-1 px-2 text-left w-40">ຊື່ສິນຄ້າ</span>
            <span className="py-1 px-2  text-center w-40">ຈຳນວນ</span>
            <span className="py-1 px-2 text-center w-28">ຫົວຫນ່ວຍ</span>
            <span className="py-1 px-2 text-left w-40">ລາຄາ</span>
            <span className="py-1 px-2 text-left w-40">ລວມ</span>
            <span className="py-1 px-2 text-center w-20">ລຶບ</span>
          </p>
          <div className="overflow-y-auto h-[48vh] pb-5">
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
          onPress={() => handleDeleteCart(cart?.id ?? 0)}
          className="w-[300px] h-[80px] bg-red-500 text-gray-100"
        >
          <p className="text-[40px] font-bold">ເຄຍກະຕ່າ</p>
        </Button>
        <Button
          onPress={handleSell}
          color="primary"
          className="w-[300px] h-[80px]"
        >
          <p className=" text-[40px] font-bold text-gray-100">ຂາຍ</p>
        </Button>
      </div>
    </>
  );
};
export default Invoice;
