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
import { Button } from "@heroui/react";
import useAuthStore from "@/app/store/authStores";

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
  const { user } = useAuthStore();
  // console.log(user)
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
      setIMG(res?.data?.img_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id as string);
    }
  }, [id]);

  React.useEffect(() => {
    setFormData({
      ...formData,
      qty_balance:
        Number(formData.qty_start) +
        Number(formData.qty_in) -
        Number(formData.qty_out),
    });
  }, [formData.qty_start, formData.qty_in, formData.qty_out]);

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
      setFileImg(file);
    }
  };

  const validateForm = () => {
    if (formData.barcode === "") {
      SwalNotification("ກະລຸນາປ້ອນບາໂຄດ", "warning");
      return false;
    }
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
        console.log(res);
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
      // console.log(res);
      if (res.status === 200) {
        const data = res.data;
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className=" px-4">
        <div className="w-full">
          <label className="block font-semibold">ບາໂຄດ</label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            readOnly
            className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
          />
        </div>
      </form>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className=" flex gap-5">
          <div className="w-full bg-white border shadow-lg p-3">
            <div className="flex gap-3">
              <div className="w-full">
                <label className="block font-semibold">ຊື່ສິນຄ້າ</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
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
            <div className="mt-3 flex gap-3">
              <div className="w-full">
                <label className="block font-semibold">ຫົວໜ່ວຍ</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold">ໝວດຫມູ່</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold"> brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              <div className="w-full">
                <label className="block font-semibold">ໃຊ້ສໍາລັບ</label>
                <input
                  type="text"
                  name="use_for"
                  value={formData.use_for}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold">ຮັບມາຈາກ</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-3 flex gap-3">
              <div className="w-full">
                <label className="block font-semibold">ຍົກມາ</label>
                <input
                  type="number"
                  name="qty_start"
                  value={formData.qty_start}
                  onChange={handleChange}
                  readOnly={user?.path !== 0}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold">ຍອດຊື້</label>
                <input
                  type="number"
                  name="qty_in"
                  value={formData.qty_in}
                  onChange={handleChange}
                  readOnly={user?.path !== 0}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold">ຂາຍອອກ</label>
                <input
                  type="number"
                  name="qty_out"
                  value={formData.qty_out}
                  onChange={handleChange}
                  readOnly={user?.path !== 0}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold">ຍັງເຫຼືອ</label>
                <input
                  type="number"
                  name="qty_balance"
                  value={formData.qty_balance}
                  onChange={handleChange}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-3 bg-white border shadow-lg p-3">
            <div className=" w-full">
              <div className="w-full flex items-center gap-3">
                <div className="w-full">
                  <label className="block font-semibold">ຫນ້າ</label>
                  <input
                    type="text"
                    name="page"
                    value={formData.page}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label className="block font-semibold">No</label>
                  <input
                    type="text"
                    name="No"
                    value={formData.No}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex items-center gap-3">
                <div className="w-full">
                  <label className="block font-semibold">ລະຫັດ</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-3 w-full">
                <div className="w-full">
                  <label className="block font-semibold">
                    ຈຳນວນແຈ້ງເຕືອນ ສິນຄ້າເຫຼືອນ້ອຍ
                  </label>
                  <input
                    type="number"
                    name="qty_alert"
                    value={formData.qty_alert}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-full">
              <label className="block font-semibold">ຮູບພາບ</label>
              <div className="w-full border-2 border-dotted border-blue-500 cursor-pointer">
                {IMG && (
                  <Image
                    loading="lazy"
                    src={`${process.env.NEXT_PUBLIC_LINK_IMG}/latdashop/${IMG}`}
                    alt="Preview"
                    className="w-full h-full"
                    width={100}
                    height={0}
                    unoptimized
                  />
                )}
                {fileImg && (
                  <Image
                    loading="lazy"
                    src={URL.createObjectURL(fileImg)}
                    alt="Preview"
                    className="w-full h-full"
                    width={100}
                    height={0}
                  />
                )}
                <div className=" mt-3 flex justify-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    color="primary"
                    onPress={() => inputRef.current?.click()}
                  >
                    ປ່ຽບຮູບ
                  </Button>
                  <Button color="primary" onPress={handleUpdatIMG}>
                    ອັບເດດຮູບ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex gap-5">
          <div className="w-full bg-white border shadow-lg p-3">
            <div className=" flex gap-3">
              {user?.path === 0 && (
                <div className="w-full">
                  <label className="block font-semibold">
                    ລາຄາ ຕົ້ນທຶນ (LAK)
                  </label>
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
              )}
              <div className="w-full">
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
              <div className="w-full">
                <label className="block font-semibold">
                  ລາຄາຂາຍ​ສົ່ງ (LAK)
                </label>
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
            </div>

            <div className="mt-5 flex gap-3">
              {user?.path === 0 && (
                <div className="w-full">
                  <label className="block font-semibold">
                    ລາຄາ ຕົ້ນທຶນ (THB)
                  </label>
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
              )}
              <div className="w-full">
                <label className="block font-semibold">ລາຄາຂາຍຍ່ອຍ (THB)</label>
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
              <div className="w-full">
                <label className="block font-semibold">
                  ລາຄາຂາຍ​ສົ່ງ (THB)​
                </label>
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
            </div>
          </div>
          <div className="w-full bg-white border shadow-lg p-3">
            <div className="w-full">
              <label className="block font-semibold">ເປີເຊັນຫຼຸດ</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="mt-3 w-full">
              <label className="block font-semibold">ຈໍານວນຂັ້ນຕ່ຳຫຼຸດ</label>
              <input
                type="number"
                name="num_of_discount"
                value={formData.num_of_discount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <Button
            onPress={() => router.back()}
            type="button"
            color="warning"
            className=" py-2"
          >
            <IoChevronBackOutline />
            ກັບຄືນ
          </Button>
          <Button type="submit" color={"primary"} className=" py-2">
            ອັບເດດ
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
