"use client";
import React, { useEffect, useRef } from "react";
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
  const [dialog, setDialog] = React.useState(true);
  const [bill, setBill] = React.useState<any>(null);
  const [check, setCheck] = React.useState<boolean>(false);
  const [memberId, setMemberId] = React.useState<string | null>("");

  const [formData, setFormData] = React.useState({
    d_mount: 0,
    check_out_lak: 0,
    check_out_thb: 0,
    money_cutom: 0,
    customer_change: 0,
    pay_currency: "LAK",
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
    const { name, value, type } = e.target;
    const rawValue = value.replace(/,/g, "");
    const numberValue = Number(rawValue);
    const realTotalLAK = cart?.total_lak || 0;
    const realTotaTHB = cart?.total_thb || 0;

    // Nếu là radio → giữ nguyên string
    if (type === "radio") {
      setFormData((prev) => {
        const updated = {
          ...prev,
          [name]: value,
        };
        updated.d_mount = 0;
        updated.money_cutom = 0;
        updated.customer_change = 0;
        updated.check_out_lak = realTotalLAK;
        updated.check_out_thb = realTotaTHB;
        return updated;
      });
      return;
    }

    const isTotal =
      name === "d_mount" &&
      ((formData.pay_currency === "LAK" && numberValue > realTotalLAK) ||
        (formData.pay_currency === "THB" && numberValue > realTotaTHB));

    if (isTotal) {
      const overValue =
        formData.pay_currency === "LAK" ? realTotalLAK : realTotaTHB;
      Swal.fire({
        icon: "warning",
        title: "ສ່ວນຫຼຸດຫນ້າຮ້ານ",
        text: `ສ່ວນຫຼຸດ (${numberValue.toLocaleString()}) ເກີນເງິນລວມ (${overValue.toLocaleString()} ${
          formData.pay_currency
        })`,
      });
      return;
    }

    // Trường hợp còn lại (số)
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: numberValue,
      };

      const payCurrency = updated.pay_currency;

      if (payCurrency === "LAK") {
        updated.check_out_lak = Math.max(
          realTotalLAK - (updated.d_mount || 0),
          0
        );
        updated.customer_change = Math.max(
          (updated.money_cutom || 0) - updated.check_out_lak,
          0
        );
        // updated.money_cutom = updated.check_out_lak;
      } else {
        updated.check_out_thb = Math.max(
          realTotaTHB - (updated.d_mount || 0),
          0
        );
        updated.customer_change = Math.max(
          (updated.money_cutom || 0) - updated.check_out_thb,
          0
        );
        // updated.money_cutom = updated.check_out_thb;
      }

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
    if (pay === "debt") {
      if (!name) {
        await Swal.fire("ຜິດພາດ", "ກະລຸນາປ້ອນຊື່", "error");
        return null;
      }
    }
    try {
      const res: any = await apiRetail({
        cart_name: cartName,
        m_discount: formData.d_mount,
        member_id: name,
        pay_type: pay,
        money_received: formData.money_cutom,
        pay_currency: formData.pay_currency,
      });

      const data = res.data;
      console.log(data);
      if (data.status !== "error") {
        updateCart(null);
        setDialog(!dialog);
        setBill(data);
        setFormData({
          d_mount: 0,
          check_out_lak: 0,
          check_out_thb: 0,
          money_cutom: 0,
          customer_change: 0,
          pay_currency: "LAK",
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
  const promptCustomerName = async (): Promise<string | null> => {
    const result = await Swal.fire({
      title: "ປ້ອນຊື່ລູກຄ້າ",
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
    });

    if (result.isConfirmed) {
      const value = result.value?.trim() ?? "";
      return value;
    }

    return null;
  };
  const Debt = async (pay: string) => {
    const name = await promptCustomerName();
    if (name !== null) {
      Sale(pay, name);
    }
  };
  const Transfer = async (pay: string) => {
    const name = await promptCustomerName();

    Sale(pay, name ?? "");
  };
  const Cash = async (pay: string) => {
    const name = await promptCustomerName();

    Sale(pay, name ?? "");
  };

  // const Transfer = (pay: string) => {
  //   Sale(pay, "");
  // };
  // const Cash = async (pay: string) => {
  //   Sale(pay, "");
  // };
  // const Debt = async (pay: string) => {
  //   Swal.fire({
  //     title: "ປ້ອນຊື່ລູກຄ້າ",
  //     input: "text",
  //     inputPlaceholder: "ພິມຊື່...",
  //     showCancelButton: true,
  //     confirmButtonText: "ຂາຍ",
  //     cancelButtonText: "ຍົກເລີກ",
  //     icon: "question",
  //     focusConfirm: true,
  //     didOpen: () => {
  //       const input = Swal.getInput();
  //       if (input) input.focus();
  //     },
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const name = result.value;
  //       if (!name) {
  //         Swal.fire("ຜິດພາດ", "ກະລຸນາປ້ອນຊື່", "error");
  //       } else {
  //         Sale(pay, name);
  //       }
  //     }
  //   });
  // };

  /// onSubmit
  const handleSubmit = async (key: number) => {
    if (key === 0) {
      setFormData((prev) => ({ ...prev, money_cutom: 0 }));
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
    <div>
      <div className=" w-full h-[100%] p-2 border border-black rounded-lg shadow-lg bg-white shadow-gray-400">
        <div className="w-full overflow-hidden border bg-white">
          {/* Header Table */}
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="bg-green-200">
                <th className="w-[3%] py-1">#</th>
                <th className="w-[30%] py-1">ຊື່ສິນຄ້າ</th>
                <th className="w-[15%] py-1">ຈຳນວນ</th>
                <th className="w-[10%] py-1">ຫນ່ວຍ</th>
                <th className="w-[10%] py-1">LAK</th>
                <th className="w-[10%] py-1">THB</th>
                <th className="w-[10%] py-1 ">ລວມ LAK</th>
                <th className="w-[10%] py-1">ລວມ THB</th>
                <th className="w-[5%] py-1"></th>
              </tr>
            </thead>
          </table>

          {/* Body Table Scroll */}
          <div className="overflow-y-scroll h-[57vh] mb-5 scroll-thin">
            <table className="w-full text-sm table-fixed">
              <tbody>
                {cart !== null && cart.details?.length > 0 ? (
                  cart.details.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="w-[3%] text-center text-sm">
                        {index + 1}
                      </td>
                      <td className="w-[30%] text-left text-sm">
                        {item.title + item.size}
                      </td>
                      <td className="w-[15%] text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="hover:text-green-500 hover:bg-green-100 rounded-full p-1 duration-300"
                            onClick={() => handleAddToCart(item.barcode, 1)}
                          >
                            <IoAddCircle size={20} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            className="hover:text-red-500 hover:bg-red-100 rounded-full p-1 duration-300"
                            onClick={() => handleAddToCart(item.barcode, 0)}
                          >
                            <RiSubtractLine size={20} />
                          </button>
                        </div>
                      </td>
                      <td className="w-[10%] text-center">{item.unit}</td>
                      <td className="w-[10%] text-center">
                        {formattedNumber(item.retail_lak)}
                      </td>
                      <td className="w-[10%] text-center">
                        {formattedNumber(item.retail_thb)}
                      </td>
                      <td className="w-[10%] text-center border-l-2 border-collapse ">
                        {formattedNumber(item.total_lak)}
                      </td>
                      <td className="w-[10%] text-center">
                        {formattedNumber(item.total_thb)}
                      </td>

                      <td className="w-[5%] text-right pr-2">
                        <button
                          onClick={() =>
                            handleDeleteProduct(
                              cart?.cashier_id,
                              item?.barcode,
                              cart?.cart_name
                            )
                          }
                          className="hover:text-red-500 hover:bg-red-100 rounded-full p-1 duration-300"
                        >
                          <MdDeleteForever size={24} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>
                      <div className="h-[45vh] flex items-center justify-center text-gray-400">
                        ກະຕ່າຍັງທັນມີສີນຄ້າ
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <p ref={cartEndRef} />
          </div>
        </div>

        <div className="w-full rounded-md shadow-md border border-gray-200 bg-white">
          {/* <div className="grid grid-cols-3 px-4 py-3 bg-blue-50 border-b border-gray-200">
            <p className="text-sm text-gray-700">ລວມ</p>
            <p className="text-right space-x-2">
              <span className="text-xl font-bold text-green-700">
                {formattedNumber(cart?.total_lak ?? 0)}
              </span>
              <span className="text-sm text-gray-500">ກີບ</span>
            </p>

            <p className="text-right space-x-2">
              <span className="text-xl font-bold text-orange-600">
                {formattedNumber(cart?.total_thb ?? 0)}
              </span>
              <span className="text-sm text-gray-500">ບາດ</span>
            </p>
          </div> */}

          <div className=" grid grid-cols-3 px-4 py-5 bg-green-200">
            <p className="text-lg font-bold text-green-600">ລວມເງິນຕ້ອງຈ່າຍ</p>
            <p className="text-right space-x-2">
              <span className="text-4xl font-extrabold text-green-700">
                {formattedNumber(cart?.total_lak ?? 0)}
              </span>
              <span className="text-sm text-gray-600">ກີບ</span>
            </p>
            <p className="text-right space-x-2">
              <span className="text-4xl font-extrabold text-orange-600">
                {formattedNumber(cart?.total_thb ?? 0)}
              </span>
              <span className="text-sm text-gray-600 ">ບາດ</span>
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-3 justify-between items-center">
          <Button
            radius="sm"
            onPress={() => handleDeleteCart(cart?.id ?? 0)}
            className="w-[40%] font-bold text-2xl py-8"
            color="warning"
          >
            ເຄຍກະຕ່າ
          </Button>
          <Button
            radius="sm"
            onPress={() => {
              cart !== null
                ? setDialog(!dialog)
                : SwalNotification("ກະຕ່າບໍ່ມີສິນຄ້າ", "error");
            }}
            color="primary"
            className="w-[60%] font-bold text-2xl py-8"
          >
            ຂາຍ
          </Button>
        </div>
      </div>

      {/* Dialog */}

      {!dialog && (
        <div className="fixed inset-0 z-30 bg-black/25 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl h-auto rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
            <div className="p-6 space-y-6">
              {/* Tiêu đề & Chọn tiền tệ */}
              <div className="flex items-center justify-end gap-3">
                <p className="">ສະກຸນເງິນ:</p>
                <div className="flex gap-6">
                  {["LAK", "THB"].map((cur) => (
                    <label
                      key={cur}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="pay_currency"
                        value={cur}
                        checked={formData.pay_currency === cur}
                        onChange={handleChange}
                        className="accent-blue-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium uppercase">
                        {cur}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Input giảm giá */}
              <div className="space-y-1">
                <label className="text-lg font-medium text-gray-700">
                  ສ່ວນຫຼຸດຫນ້າຮ້ານ
                </label>
                <input
                  type="text"
                  name="d_mount"
                  value={formattedNumber(formData.d_mount)}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Nhập tiền khách trả */}
              <div className="space-y-1">
                <label className="text-lg font-medium text-gray-700">
                  ເງິນຮັບມາ
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="money_cutom"
                    value={formattedNumber(formData.money_cutom)}
                    onChange={handleChange}
                    className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <Button
                    onPress={() => {
                      setFormData((prev) => {
                        const updated = { ...prev };
                        const totalLAK = cart?.total_lak || 0;
                        const totalTHB = cart?.total_thb || 0;
                        const payCurrency = formData.pay_currency;

                        if (payCurrency === "LAK") {
                          updated.money_cutom = totalLAK - updated.d_mount;
                          updated.check_out_lak = Math.max(
                            totalLAK - updated.d_mount,
                            0
                          );
                          updated.check_out_thb = 0;
                          updated.customer_change = Math.max(
                            (updated.money_cutom || 0) - updated.check_out_lak,
                            0
                          );
                        } else {
                          updated.money_cutom = totalTHB - updated.d_mount;
                          updated.check_out_thb = Math.max(
                            totalTHB - updated.d_mount,
                            0
                          );
                          updated.check_out_lak = 0;
                          updated.customer_change = Math.max(
                            (updated.money_cutom || 0) - updated.check_out_thb,
                            0
                          );
                        }

                        // if (payCurrency === "LAK") {
                        //   updated.check_out_lak = Math.max(
                        //     total - updated.d_mount,
                        //     0
                        //   );
                        //   updated.check_out_thb = 0;
                        // } else {
                        //   updated.check_out_thb = Math.max(
                        //     total - updated.d_mount,
                        //     0
                        //   );
                        //   updated.check_out_lak = 0;
                        // }

                        // Cập nhật chính xác customer_change theo loại tiền tệ
                        // if (payCurrency === "LAK") {
                        //   updated.customer_change = Math.max(
                        //     updated.money_cutom - updated.check_out_lak,
                        //     0
                        //   );
                        // } else {
                        //   updated.customer_change = Math.max(
                        //     updated.money_cutom - updated.check_out_thb,
                        //     0
                        //   );
                        // }

                        return updated;
                      });
                    }}
                    color="primary"
                    className="rounded-none rounded-r px-5"
                  >
                    ພໍດີ
                  </Button>
                </div>
              </div>

              {/* Hiển thị kết quả */}
              <div className="border-t-2 border-blue-500 border-dashed pt-4 space-y-3">
                <div className="flex justify-between text-lg">
                  <span>ລາຄາລວມ:</span>
                  <span className="font-bold">
                    {formData.pay_currency === "LAK"
                      ? formattedNumber(cart?.total_lak ?? 0)
                      : formattedNumber(cart?.total_thb ?? 0)}
                    <span className="text-xl ms-2">
                      {formData.pay_currency === "LAK" ? "ກີບ" : "ບາດ"}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>ສ່ວນຫຼຸດຫນ້າຮ້ານ:</span>
                  <span className="font-bold">
                    {formattedNumber(formData.d_mount)}
                    <span className="text-xl ms-2">
                      {formData.pay_currency === "LAK" ? "ກີບ" : "ບາດ"}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-semibold border-t-2 border-blue-500 border-dashed  pt-3">
                  <span>ຕ້ອງຈ່າຍ:</span>
                  <span>
                    {formData.pay_currency === "LAK"
                      ? formattedNumber(formData.check_out_lak ?? 0)
                      : formattedNumber(formData.check_out_thb ?? 0)}

                    <span className="text-3xl ms-2">
                      {formData.pay_currency === "LAK" ? "ກີບ" : "ບາດ"}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>ເງິນທອນ:</span>
                  <span className="font-bold">
                    {formattedNumber(formData.customer_change)}
                    <span className="text-xl ms-2">
                      {formData.pay_currency === "LAK" ? "ກີບ" : "ບາດ"}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Button hành động */}
            <div className="grid grid-cols-4 bg-gray-200">
              <Button
                onPress={() => handleSubmit(0)}
                color="warning"
                className="text-xl py-10 rounded-none"
              >
                ຕິດໜີ້
              </Button>
              <Button
                onPress={() => handleSubmit(1)}
                color="success"
                className="text-xl py-10 rounded-none"
              >
                ເງິນສົດ
              </Button>
              <Button
                onPress={() => handleSubmit(2)}
                color="primary"
                className="text-xl py-10 rounded-none"
              >
                ເງິນໂອນ
              </Button>
              <Button
                onPress={() => {
                  setDialog(true);
                  setFormData({
                    d_mount: 0,
                    check_out_lak: 0,
                    check_out_thb: 0,
                    money_cutom: 0,
                    customer_change: 0,
                    pay_currency: "LAK",
                  });
                }}
                color="danger"
                className="text-xl py-10 rounded-none"
              >
                ຍົກເລີກ
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur flex items-center justify-center">
        <div className="bg-gradient-to-tr from-cyan-800 to-cyan-600 rounded-lg p-6 w-[90%] max-w-md shadow-lg ">
          <h2 className="text-lg font-bold mb-2 ">
           Xác nhận xoá
          </h2>
          <p className="mb-4 text-sm text-gray-600">
           
            Bạn có chắc chắn muốn xoá mục này?
          </p>
          <div className="flex justify-end gap-2">
            <button
              // onClick={closeAlert}
              className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              // onClick={() => {
              //   if (onConfirm) onConfirm();
              //   closeAlert();
              // }}
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div> */}

      <PrintBill data={bill} clearData={() => setBill(null)} />
    </div>
  );
};
export default Invoice;
