"use client";
import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SwalNotification } from "@/app/helpers/alers";
import { formattedNumber } from "@/app/helpers/funtions";

function CreateProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    barcode: "",
    page: "",
    No: "",
    code: "",
    size: "",
    title: "",
    use_for: "",
    unit: "",
    category: "category",
    cost_thb: 0,
    cost_lak: 0,
    wholesale_thb: 0,
    wholesale_lak: 0,
    retail_thb: 0,
    retail_lak: 0,
    discount: 0,
    num_of_discount: 0,
    qty: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (formData.barcode === "") {
      SwalNotification("ກະລຸນາປ້ອນບາໂຄດ", "warning");
      return false;
    }

    if (formData.page === "") {
      SwalNotification("ກະລຸນາປ້ອນຫນ້າ", "warning");
      return false;
    }

    if (formData.No === "") {
      SwalNotification("ກະລຸນາປ້ອນ No", "warning");
      return false;
    }

    if (formData.code === "") {
      SwalNotification("ກະລຸນາປ້ອນລະຫັດສິນຄ້າ", "warning");
      return false;
    }

    if (formData.size === "") {
      SwalNotification("ກະລຸນາປ້ອນຂະຫນາດ", "warning");
      return false;
    }
    if (formData.unit === "") {
      SwalNotification("ກະລຸນາປ້ອນຫົວໜ່ວຍ", "warning");
      return false;
    }

    if (formData.category === "") {
      SwalNotification("ກະລຸນາປ້ອນໝວດຫມູ່", "warning");
      return false;
    }
    if (formData.discount < 0) {
      SwalNotification("ກະລຸນາປ້ອນສ່ວນຫຼຸດ", "warning");
      return false;
    }

    if (formData.num_of_discount < 0) {
      SwalNotification("ກະລຸນາປ້ອນຈໍານວນສ່ວນຫຼຸດ", "warning");
      return false;
    }

    if (formData.qty < 0) {
      SwalNotification("ກະລຸນາປ້ອນຈໍານວນສິນຄ້າ", "warning");
      return false;
    }
    if (formData.title === "") {
      SwalNotification("ກະລຸນາປ້ອນຫົວຂໍ້", "warning");
      return false;
    }

    if (formData.use_for === "") {
      SwalNotification("ກະລຸນາປ້ອນໃຊ້ສໍາລັບ", "warning");
      return false;
    }

    if (formData.cost_thb < 0) {
      SwalNotification("ກະລຸນາປ້ອນລາຄາ (THB)", "warning");
      return false;
    }

    if (formData.cost_lak < 0) {
      SwalNotification("ກະລຸນາປ້ອນລາຄາ (LAK)", "warning");
      return false;
    }

    if (formData.wholesale_thb < 0) {
      SwalNotification("ກະລຸນາປ້ອນລາຄາຂາຍ​ສົ່ງ (THB)​", "warning");
      return false;
    }

    if (formData.wholesale_lak < 0) {
      SwalNotification("ກະລຸນາປ້ອນລາຄາຂາຍ​ສົ່ງ (LAK)", "warning");
      return false;
    }

    if (formData.retail_thb < 0) {
      SwalNotification("ກະລຸນາປ້ອນຂາຍຍ່ອຍ (THB)", "warning");
      return false;
    }

    if (formData.retail_lak < 0) {
      SwalNotification("ກະລຸນາປ້ອນຂາຍຍ່ອຍ (LAK)", "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted", formData);
    }
  };
  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ສ້າງສິນຄ້າ
      </h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ບາໂຄດ</label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ຫນ້າ</label>
            <input
              type="text"
              name="page"
              value={formData.page}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">No</label>
            <input
              type="text"
              name="No"
              value={formData.No}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ລະຫັດ</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ຂະຫນາດ</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ຫົວໜ່ວຍ</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ໝວດຫມູ່</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ຈໍານວນສິນຄ້າ</label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ສ່ວນຫຼຸດ</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold">ຈໍານວນສ່ວນຫຼຸດ</label>
            <input
              type="number"
              name="num_of_discount"
              value={formData.num_of_discount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ຫົວຂໍ້</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ໃຊ້ສໍາລັບ</label>
            <input
              type="text"
              name="use_for"
              value={formData.use_for}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ລາຄາ (THB)</label>
            <input
              type="number"
              name="cost_thb"
              value={formData.cost_thb}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
            <span className=" block">
              {formattedNumber(formData.cost_thb)}. ບາດ
            </span>
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ລາຄາ (LAK)</label>
            <input
              type="number"
              name="cost_lak"
              value={formData.cost_lak}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
            <span className=" block">
              {formattedNumber(formData.cost_lak)}. ກີບ
            </span>
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ລາຄາຂາຍ​ສົ່ງ (THB)​</label>
            <input
              type="number"
              name="wholesale_thb"
              value={formData.wholesale_thb}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
            <span className=" block">
              {formattedNumber(formData.wholesale_thb)}. ບາດ
            </span>
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ລາຄາຂາຍ​ສົ່ງ (LAK)</label>
            <input
              type="number"
              name="wholesale_lak"
              value={formData.wholesale_lak}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
            <span className=" block">
              {formattedNumber(formData.wholesale_lak)}. ກີບ
            </span>
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ຂາຍຍ່ອຍ (THB)</label>
            <input
              type="number"
              name="retail_thb"
              value={formData.retail_thb}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
            <span className=" block">
              {formattedNumber(formData.retail_thb)}. ບາດ
            </span>
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ຂາຍຍ່ອຍ (LAK)</label>
            <input
              type="number"
              name="retail_lak"
              value={formData.retail_lak}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
            <span className=" block">
              {formattedNumber(formData.retail_lak)}. ກີບ
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => router.back()}
            type="button"
            className="bg-blue-700 text-white px-6 py-2 rounded flex items-center duration-500 hover:bg-red-500"
          >
            <IoChevronBackOutline />
            ກັບຄືນ
          </button>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-green-500"
          >
            ສ້າງ
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
