"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import HeaderLinks from "../HeaderLinks";
import { useInvoiceStore } from "@/app/store/Invoice";
import { apiGetInvoiceById } from "@/app/api/products";
import { formatDate, formattedNumber } from "@/app/helpers/funtions";
export default function Detail() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { invoice, updateInvoice } = useInvoiceStore();

  const getInvoice = async () => {
    if (!id) {
      console.error("Invalid invoice ID");
      return;
    }
    const res = await apiGetInvoiceById(id);
    if (res.status === 200) {
      updateInvoice(res.data);
    } else {
      console.log("Error fetching invoice data");
    }
  };

  useEffect(() => {
    getInvoice();
  }, [id]);

  return (
    <>
      <HeaderLinks
        name="ລາຍລະອຽດໃບບິນ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div>
        <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
          ລາຍລະອຽດໃບບິນ
        </h1>

        {/* detail bills */}
        <div className="p-6">
          <div className="grid grid-cols-9 gap-3 border-1 p-3  rounded text-center">
            <div className="space-y-1 ">
              <p className="font-semibold">ລະຫັດບິນ</p>
              <p className="text-gray-500 uppercase">{invoice?.id}</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ວັນທີສ້າງ</p>
              <p className="text-gray-500 uppercase">
                {formatDate(invoice?.date_create ?? "")}
              </p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ລະຫັດຜູ້ຂາຍ</p>
              <p className="text-gray-500 uppercase">{invoice?.cashier_id}</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ຊື່ກະຕ່າ</p>
              <p className="text-gray-500 uppercase">{invoice?.cart_type}</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ອັດຕາແລກປ່ຽນ</p>
              <p className="text-gray-500 uppercase">{invoice?.rate}</p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ຈໍານວນສິນຄ້າ</p>
              <p className="text-gray-500 uppercase">
                {invoice?.details?.length}
              </p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ສ່ວນຫຼຸດ</p>
              <p className="text-gray-500 uppercase">
                {formattedNumber(invoice?.m_discount ?? 0)} ກີບ
              </p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ລາຄາລວມ (LAK)</p>
              <p className="text-gray-500 uppercase">
                {formattedNumber(invoice?.total_checkout_lak ?? 0)} ກີບ
              </p>
            </div>
            <div className="space-y-1 ">
              <p className="font-semibold">ປະເພດການຈ່າຍ</p>
              <p className="text-gray-500 uppercase">
                {invoice?.pay_type === "cash" ? "ເງິນສົດ" : "ເງິນໂອນ"}
              </p>
            </div>
          </div>
        </div>

        {/* detail product */}
        <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
          ລາຍລະອຽດສິນຄ້າ
        </h1>
        <div className="p-6 space-y-6">
          <div className="border-1 rounded h-[40vh] overflow-hidden">
            <p className="font-semibold flex bg-blue-500 text-gray-100 sticky top-0 z-10 text-sm">
              <span className="py-1 px-2  w-12">ລຳດັບ</span>
              <span className="py-1 px-2 border-l-1 w-1/12 text-center">
                ບາໂຄດ
              </span>
              <span className="py-1 px-2 border-l-1 w-1/3 text-center">
                ຫົວຂໍ້
              </span>
              <span className="py-1 px-2 border-l-1 w-1/12 text-center">
                ຫົວໜ່ວຍ
              </span>
              <span className="py-1 px-2 border-l-1 w-1/12 text-center">
                ໝວດຫມູ່
              </span>
              <span className="py-1 px-2 border-l-1 w-1/12 text-center">
                ຈໍານວນ
              </span>
              <span className="py-1 px-2 border-l-1 w-1/12 text-center ">
                ລາຄາ (LAK)
              </span>
              <span className="py-1 px-2 border-l-1 w-1/6 text-center">
                ລາຄາລວມ (LAK)
              </span>
            </p>
            <div className="overflow-y-auto h-[35vh] scroll-smooth pb-5">
              {invoice &&
                invoice?.details.map((it, i) => (
                  <p className="flex border-b-1" key={i}>
                    <span className="py-1 px-2  w-12 ">{i + 1}</span>
                    <span className="text-center py-1 px-2 border-l-1 w-1/12 uppercase">
                      {it?.barcode}
                    </span>
                    <span className="text-center py-1 px-2 border-l-1 w-1/3 ">
                      {it?.title}
                    </span>
                    <span className="text-center py-1 px-2 border-l-1 w-1/12">
                      {it?.unit}
                    </span>
                    <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
                      {it?.category}
                    </span>
                    <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
                      {it?.qty}
                    </span>
                    <span className="text-center py-1 px-2 border-l-1 w-1/12 ">
                      {formattedNumber(it?.retail_lak ?? 0)} ກີບ
                    </span>
                    <span className="text-center py-1 px-2 border-l-1 w-1/6 ">
                      {formattedNumber(it?.total_lak ?? 0)} ກີບ
                    </span>
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
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
    </>
  );
}
