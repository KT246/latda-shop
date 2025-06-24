"use client";
import React, { useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SwalNotification } from "@/app/helpers/alers";
import { formattedNumber } from "@/app/helpers/funtions";
import Image from "next/image";
import { CreateProducts } from "@/app/api/admin.product";
import { toast } from "react-toastify";

function CreateProduct() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [IMB, setIMG] = useState<string | null>(null);
  const [flieImg, setFileImg] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    barcode: "",
    page: "",
    No: "",
    code: "",
    size: "",
    title: "",
    use_for: "",
    brand: "",
    unit: "",
    category: "",
    cost_thb: 0,
    cost_lak: 0,
    wholesale_thb: 0,
    wholesale_lak: 0,
    retail_thb: 0,
    retail_lak: 0,
    discount: 0,
    num_of_discount: 0,
    qty_start: 0,
    qty_in: 0,
    qty_out: 0,
    qty_balance: 0,
    qty_alert: 0,
    supplier: "",
    img_name: "",
    status: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log(file);
      setFileImg(file);
      const url = URL.createObjectURL(file);
      setIMG(url);
    }
  };

  const validateForm = () => {
    if (formData.barcode === "") {
      SwalNotification("ກະລຸນາປ້ອນບາໂຄດ", "warning");
      return false;
    }

    // if (formData.page === "") {
    //   SwalNotification("ກະລຸນາປ້ອນຫນ້າ", "warning");
    //   return false;
    // }

    // if (formData.No === "") {
    //   SwalNotification("ກະລຸນາປ້ອນ No", "warning");
    //   return false;
    // }

    // if (formData.code === "") {
    //   SwalNotification("ກະລຸນາປ້ອນລະຫັດສິນຄ້າ", "warning");
    //   return false;
    // }

    // if (formData.size === "") {
    //   SwalNotification("ກະລຸນາປ້ອນຂະຫນາດ", "warning");
    //   return false;
    // }
    // if (formData.unit === "") {
    //   SwalNotification("ກະລຸນາປ້ອນຫົວໜ່ວຍ", "warning");
    //   return false;
    // }

    // if (formData.category === "") {
    //   SwalNotification("ກະລຸນາປ້ອນໝວດຫມູ່", "warning");
    //   return false;
    // }
    // if (formData.discount < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນສ່ວນຫຼຸດ", "warning");
    //   return false;
    // }

    // if (formData.num_of_discount < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນຈໍານວນສ່ວນຫຼຸດ", "warning");
    //   return false;
    // }

    // if (formData.qty_alert < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນຈໍານວນສິນຄ້າ", "warning");
    //   return false;
    // }
    // if (formData.title === "") {
    //   SwalNotification("ກະລຸນາປ້ອນຫົວຂໍ້", "warning");
    //   return false;
    // }

    // if (formData.use_for === "") {
    //   SwalNotification("ກະລຸນາປ້ອນໃຊ້ສໍາລັບ", "warning");
    //   return false;
    // }

    // if (formData.cost_thb < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນລາຄາ (THB)", "warning");
    //   return false;
    // }

    // if (formData.cost_lak < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນລາຄາ (LAK)", "warning");
    //   return false;
    // }

    // if (formData.wholesale_thb < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນລາຄາຂາຍ​ສົ່ງ (THB)​", "warning");
    //   return false;
    // }

    // if (formData.wholesale_lak < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນລາຄາຂາຍ​ສົ່ງ (LAK)", "warning");
    //   return false;
    // }

    // if (formData.retail_thb < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນຂາຍຍ່ອຍ (THB)", "warning");
    //   return false;
    // }

    // if (formData.retail_lak < 0) {
    //   SwalNotification("ກະລຸນາປ້ອນຂາຍຍ່ອຍ (LAK)", "warning");
    //   return false;
    // }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    // Gộp dữ liệu khác
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value.toString());
      }
    });

    if (flieImg) {
      form.append("image", flieImg);
    }

    if (validateForm()) {
      const res: any = await CreateProducts(form);
      if (res.status === 200) {
        const data = res.data;
        router.push("/admin/products");
        toast.success(data.message);
      }
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ສ້າງສິນຄ້າ
      </h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="flex gap-5">
          <div
            className="border-2 border-dotted border-blue-500 w-44 h-56 cursor-pointer"
            onClick={() => inputRef.current?.click()} // ✅ click div để chọn ảnh lại
          >
            {IMB ? (
              <Image
                src={IMB}
                alt="Preview"
                className="w-full h-full object-cover"
                width={0}
                height={0}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-3xl text-gray-400">
                +
              </div>
            )}

            {/* Hidden input file */}
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className=" grid grid-cols-5  gap-4">
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
            {/* {New start} */}
            <div className="flex-1">
              <label className="block font-semibold">ຈໍານວນອອກ</label>
              <input
                type="number"
                name="qty_out"
                value={formData.qty_out}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">ຈໍານວນເຂັົ້າ</label>
              <input
                type="number"
                name="qty_in"
                value={formData.qty_in}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">alert</label>
              <input
                type="number"
                name="qty_alert"
                value={formData.qty_alert}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">ຈໍານວນຍັງເຫລືອ</label>
              <input
                type="number"
                name="qty_balance"
                value={formData.qty_balance}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">ຈໍານວນເລີ່ມຕົ້ນ</label>
              <input
                type="number"
                name="qty_start"
                value={formData.qty_start}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">supplier</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold"> brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            {/* {New end} */}
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
            </div>{" "}
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
