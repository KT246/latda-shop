"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, form, Input, Tooltip } from "@heroui/react";

import { useCartStore } from "@/app/store/cartStore";
import { formattedNumber, PlaySound } from "@/app/helpers/funtions";
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
import PrintBill from "./PrintBill";
const Invoice = () => {
  const [dialog, setDialog] = useState(false);
  const [bill, setBill] = useState<any>(null);
  const [check, setCheck] = useState<boolean>(false);
  const [memberId, setMemberId] = useState<string | null>("");

  const [formData, setFormData] = React.useState({
    d_mount: 0,
    check_out: 0,
    money_cutom: 0,
    customer_change: 0,
  });

  const { updateCart, cart, cartName } = useCartStore();
  const cartEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lng = cart?.details.length ?? 0;
    if (lng > 0) {
      cartEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [cart?.details.length]);

  React.useEffect(() => {
    const realTotal = cart?.total_lak || 0;

    setFormData((prev) => ({
      ...prev,
      check_out: realTotal,
    }));
  }, [cart?.total_lak]);

  /// hanndle

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const rawValue = value.replace(/,/g, "");
    const numberValue = Number(rawValue);
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: numberValue,
      };
      const realTotal = cart?.total_lak || 0;

      updated.check_out = Math.max(realTotal - updated.d_mount, 0);
      updated.customer_change = Math.max(
        updated.money_cutom - updated.check_out,
        0
      );

      return updated;
    });
  };

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
          PlaySound("warning");
          SwalNotification(res.data.message, "warning");
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
        } else {
          PlaySound("warning");
          SwalNotification(res.data.message, "warning");
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
      icon: "question",
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

  /// Sale
  const Sale = async (pay: string, name: string) => {
    try {
      const res: any = await apiRetail({
        cart_name: cartName,
        m_discount: formData.d_mount,
        member_id: "",
        pay_type: pay,
        money_received: formData.money_cutom,
      });

      const data = res.data;
      if (data.status !== "error") {
        updateCart(null);
        setDialog(!dialog);
        setBill(data);
        setFormData({
          d_mount: 0,
          check_out: 0,
          money_cutom: 0,
          customer_change: 0,
        });
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
  const Transfer = (pay: string) => {
    Sale(pay, "");
  };
  const Cash = async (pay: string) => {
    Sale(pay, "");
  };
  const Debt = async (pay: string) => {
    Swal.fire({
      title: "ປ້ອນຊື່ຂອງທ່ານ",
      input: "text",
      inputPlaceholder: "ພິມຊື່...",
      showCancelButton: true,
      confirmButtonText: "ຂາຍ",
      cancelButtonText: "ຍົກເລີກ",
      icon: "question",
      focusConfirm: true,
      didOpen: () => {
        const input = Swal.getInput();
        if (input) input.focus();
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const name = result.value;
        if (!name) {
          Swal.fire("ຜິດພາດ", "ກະລຸນາປ້ອນຊື່", "error");
        } else {
          Sale(pay, name);
        }
      }
    });
  };

  /// onSubmit
  const handleSubmit = async (key: number) => {
    if (key === 0) {
      Debt("debt");
    } else if (key === 1) {
      Cash("cash");
    } else if (key === 2) {
      Transfer("transfer");
    }
  };

  const handleDeleteProduct = async (
    cashier_id: string,
    barcode: string,
    cart_name: number
  ) => {
    Swal.fire({
      title: "!ລົບສິນຄ້າ",
      text: "ຢຶນຢັນລົບສິນຄ້າ: " + barcode + " ບໍ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "ລົບສິນຄ້າ",
      focusCancel: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiDeleteProduct(cashier_id, barcode, cart_name);
          if (res.data.status !== "error") {
            updateCart(res.data.details.length > 0 ? res.data : null);
            SwalNotification(res.data.message, "success");
          } else {
            SwalNotification(res.data.message, "warning");
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data?.message;
            toast.error(errorMessage);
          }
        }
      }
    });
  };

  /// logic

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
                      <p className=" w-[20%]">{item.title + item.size}</p>
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
                      <p className="w-[10%]">{item.unit}</p>
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
                : SwalNotification("ກະຕ່າບໍ່ມີສິນຄ້າ", "error");
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
        <div className=" fixed z-30 bg-black bg-opacity-80   left-0 right-0 top-0 bottom-0 flex items-center justify-center h-screen ">
          <div className="bg-gray-100 w-[600px] h-[500px] flex flex-col justify-between rounded-lg overflow-hidden">
            <div className="p-5">
              <div className="pb-10 space-y-3">
                <p className="text-lg text-danger">ສ່ວນຫຼຸດຫນ້າຮ້ານ</p>
                <div className="overflow-hidden border-gray-300 hover:border-gray-500 border-2 h-12">
                  <input
                    type="text"
                    name="d_mount"
                    value={formattedNumber(formData.d_mount)}
                    className="w-full h-full outline-none p-1"
                    onChange={handleChange}
                  />
                </div>

                <p className="text-lg">ເງິນຮັບມາ</p>
                <div className="flex h-12 rounded">
                  <div className="flex-1 overflow-hidden border-gray-300 hover:border-gray-500 border-2 border-r-0">
                    <input
                      type="text"
                      name="money_cutom"
                      value={formattedNumber(formData.money_cutom)}
                      className="w-full h-full outline-none p-1"
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    onPress={() =>
                      setFormData((prev) => ({
                        ...prev,
                        money_cutom: formData.check_out,
                      }))
                    }
                    color="primary"
                    radius="none"
                    className="h-full"
                  >
                    ພໍດີ
                  </Button>
                </div>
              </div>

              {/* Tính tiền phải trả và tiền thối */}
              <div className="pt-10 space-y-3 border-t-2 border-dashed border-primary">
                <div className="flex items-center">
                  <p className="flex-1 text-xl font-semibold">
                    ເງິນທີ່ລູກຄັາຕ້ອງຈ່າຍ:
                  </p>
                  <p className="text-3xl font-bold">
                    {formattedNumber(formData.check_out)} ກີບ
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="flex-1 text-xl font-semibold">ເງິນທອນ:</p>
                  <p className="text-3xl font-bold">
                    {formattedNumber(formData.customer_change)} ກີບ
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className=" flex items-center text-white">
              <Button
                onPress={() => handleSubmit(0)}
                color="warning"
                className="w-[20%] p-10 text-xl font-bold text-white"
                radius="none"
              >
                ຕິດໜີ້
              </Button>
              <Button
                onPress={() => handleSubmit(1)}
                color="success"
                className="w-[30%] p-10 text-xl font-bold text-white"
                radius="none"
              >
                ເງິນສົດ
              </Button>
              <Button
                onPress={() => handleSubmit(2)}
                color="primary"
                className="w-[30%] p-10 text-xl font-bold text-white"
                radius="none"
              >
                ເງິນໂອນ
              </Button>
              <Button
                color="danger"
                className="w-[20%] p-10 text-xl font-bold text-white"
                radius="none"
                onPress={() => {
                  setDialog(!dialog);
                  setFormData({
                    d_mount: 0,
                    check_out: 0,
                    money_cutom: 0,
                    customer_change: 0,
                  });
                }}
              >
                ຍົກເລີກ
              </Button>
            </div>
          </div>
        </div>
      )}
      <PrintBill data={bill} clearData={() => setBill(null)} />
    </>
  );
};
export default Invoice;
