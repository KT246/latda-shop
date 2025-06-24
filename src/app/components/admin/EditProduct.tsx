"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { SwalNotification } from "@/app/helpers/alers";
import { formattedNumber } from "@/app/helpers/funtions";
import Image from "next/image";
import {
  GetProductById,
  _updateIMG,
  _updateProduct,
} from "@/app/api/admin.product";
import { toast } from "react-toastify";

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
function EditProduct() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [IMG, setIMG] = useState<string | null>(null);
  const [fileImg, setFileImg] = useState<File | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const params = useParams();
  const id = params?.id;
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
    status: "",
  });

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

  useEffect(() => {
    if (product) {
      setFormData({
        barcode: product.barcode,
        page: product.page || "",
        No: product.No || "",
        code: product.code || "",
        size: product.size || "",
        title: product.title || "",
        use_for: product.use_for || "",
        brand: product.brand || "",
        unit: product.unit || "",
        category: product.category || "",
        cost_thb: product.cost_thb || 0,
        cost_lak: product.cost_lak || 0,
        wholesale_thb: product.wholesale_thb || 0,
        wholesale_lak: product.wholesale_lak || 0,
        retail_thb: product.retail_thb || 0,
        retail_lak: product.retail_lak || 0,
        discount: product.discount || 0,
        num_of_discount: product.num_of_discount || 0,
        qty_start: product.qty_start || 0,
        qty_in: product.qty_in || 0,
        qty_out: product.qty_out || 0,
        qty_balance: product.qty_balance || 0,
        qty_alert: product.qty_alert || 0,
        supplier: product.supplier || "",
        status: product.status || "",
      });
    }
  }, [product]);

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

    // if (formData.qty < 0) {
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
    const barcode = product?.barcode;
    if (!barcode) {
      toast.warning("Not bracode");
      return;
    }
    if (validateForm()) {
      try {
        const res: any = await _updateProduct(barcode, formData);
        if (res.status === 200) {
          const data = res.data;
          router.push("/admin/products");
          toast.success(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdatIMG = async () => {
    const barcode = product?.barcode;
    if (!barcode) {
      toast.warning("Not bracode");
      return;
    }

    const form = new FormData();
    if (!fileImg) {
      toast.warning("pleass select img");
      return;
    }
    form.append("image", fileImg);

    try {
      const res: any = await _updateIMG(barcode, form);
      if (res.status === 200) {
        const data = res.data;
        router.push("/admin/products");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ແກ້ໄຂສິນຄ້າ
      </h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="flex gap-4">
          <div
            className="border-2 border-dotted border-blue-500 relative w-[200px] h-[270px] cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            {IMG && product?.img_name ? (
              <Image src={IMG} alt="Preview" fill />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product?.img_name}`}
                alt="Preview"
                fill
              />
            )}
            {/* {IMG ? (
              <Image src={IMG} alt="Preview" fill />
            ) : (
              <div className="flex items-center justify-center h-full text-3xl text-gray-400">
                +
              </div>
            )} */}

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
            <label className="block font-semibold">ຈໍານວນສິນຄ້າ</label>
            <input
              type="number"
              name="qty"
              // value={formData.qty}
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
            onClick={handleUpdatIMG}
            type="button"
            className="bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-green-500"
          >
            ແກ້ໄຂ img
          </button>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-green-500"
          >
            ແກ້ໄຂ
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
