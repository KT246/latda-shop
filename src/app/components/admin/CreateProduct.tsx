"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SwalNotification } from "@/app/helpers/alers";
import { formattedNumber } from "@/app/helpers/funtions";
import Image from "next/image";
import { _inCreaseProduct, CreateProducts, GetProductById } from "@/app/api/admin.product";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@heroui/react";

function CreateProduct() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const barcodeRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [isNewProduct, setIsnewProduct] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  });

  useEffect(() => {
    barcodeRef?.current?.focus();
  }, [])

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

    if (formData.page === "") {
      SwalNotification("ກະລຸນາປ້ອນຫນ້າ", "warning");
      return false;
    }

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

    // // Gộp dữ liệu khác
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value.toString());
      }
    });

    if (flieImg) {
      form.append("image", flieImg);
    }
    setIsLoading(true);
    const res: any = await CreateProducts(form);
    setIsLoading(false);
    if (res.data.status !== "error") {
      const data = res.data;
      // router.push("/admin/products");
      console.log(res)
      // reset form
      barcodeRef?.current?.focus();
      setFileImg(null);
      setIsnewProduct(false);
      setFormData({
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
      })
      toast.success(data.message);
    } else {
      const data = res.data;
      toast.warning(data.message);

    }
    try {
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    // if (validateForm()) {
    //   setIsLoading(true);
    //   const res: any = await CreateProducts(form);

    //   if (res.data.status !== "error") {
    //     const data = res.data;
    //     router.push("/admin/products");
    //     toast.success(data.message);
    //     setIsLoading(!isLoading);
    //   } else {
    //     const data = res.data;
    //     toast.warning(data.message);
    //     setIsLoading(false);
    //   }
    //   try {
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData?.barcode) {
      try {
        const res: any = await GetProductById(formData?.barcode);
        const isExistProduct: any = res?.data
        // console.log(res)

        if (isExistProduct) {
          Swal.fire({
            title: "!ສິນຄ້າມີຢຸ່ແລ້ວ",
            icon: "warning",
            html: `
          <p>ບາໂຄດ: ${isExistProduct?.barcode}</p>
          <p>ຊື່ສິນຄ້າ: ${isExistProduct?.title}  ${isExistProduct?.size}</p>
          <p>ຈຳນວນ: ${isExistProduct?.qty_balance}</p>

          `,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "ເພີ່ມ",
            denyButtonText: `ແກ້ໄຂ`,
            cancelButtonText: 'ຍົກເລິກ',
            focusCancel: true
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire({
                title: "ເພີ່ມຈຳນວນສິນຄ້າ",
                html: `
                  <p>ບາໂຄດ: ${isExistProduct?.barcode}</p>
                  <p>ຊື່ສິນຄ້າ: ${isExistProduct?.title}  ${isExistProduct?.size}</p>
                  <p>ຈຳນວນ: ${isExistProduct?.qty_balance}</p>
                `,
                allowOutsideClick: false,
                input: "number",
                inputAttributes: {
                  autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "ເພີ່ມ",
                cancelButtonText: "ຍົກເລີກ",
                showLoaderOnConfirm: true,
                preConfirm: async (qty) => {
                  try {
                    if (qty <= 0) {
                      Swal.showValidationMessage(`ຈຳນວນສິນຄ້າບໍ່ຖືກຕ້ອງ`);
                    } else {
                      await _inCreaseProduct(isExistProduct?.barcode, qty);
                      toast.success("ເພີ່ມສຳເລັດ");
                    }
                  } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                  }
                },
              })
            } else if (result.isDenied) {
              router.push("/admin/products/edit/" + isExistProduct?.barcode)
            }
          });
          setFormData({ ...formData, barcode: "" })
        } else {
          titleRef.current?.focus();
          setIsnewProduct(true);
          titleRef.current?.focus();

        }

      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div>
      <form onSubmit={handleCheck} className=" px-4">
        <div className="w-full">
          <label className="block font-semibold">ບາໂຄດ</label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            ref={barcodeRef}
            required
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
                  ref={titleRef}
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={!isNewProduct}
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
                  disabled={!isNewProduct}
                  required
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
                  disabled={!isNewProduct}
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
                  disabled={!isNewProduct}
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
                  disabled={!isNewProduct}
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
                  disabled={!isNewProduct}
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
                  disabled={!isNewProduct}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold">ຍົກມາ</label>
                <input
                  type="number"
                  name="qty_in"
                  value={formData.qty_in}
                  onChange={handleChange}
                  disabled={!isNewProduct}
                  required
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
                    disabled={!isNewProduct}
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
                    disabled={!isNewProduct}
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
                    disabled={!isNewProduct}
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-3 w-full">
                <div className="w-full">
                  <label className="block font-semibold">ຈຳນວນແຈ້ງເຕືອນ ສິນຄ້າເຫຼືອນ້ອຍ</label>
                  <input
                    type="number"
                    name="qty_alert"
                    value={formData.qty_alert}
                    onChange={handleChange}
                    disabled={!isNewProduct}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-full">
              <label className="block font-semibold">ຮູບພາບ</label>
              <div
                className="w-full border-2 border-dotted border-blue-500 cursor-pointer"
                onClick={() => inputRef.current?.click()}
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
                  disabled={!isNewProduct}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex gap-5">
          <div className="w-full bg-white border shadow-lg p-3">
            <div className=" flex gap-3">
              <div className="w-full">
                <label className="block font-semibold">ລາຄາ ຕົ້ນທຶນ (LAK)</label>
                <input
                  type="number"
                  name="cost_lak"
                  value={formData.cost_lak}
                  disabled={!isNewProduct}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"

                />
                <span className=" block">
                  {formattedNumber(formData.cost_lak)}. ກີບ
                </span>
              </div>
              <div className="w-full">
                <label className="block font-semibold">ຂາຍຍ່ອຍ (LAK)</label>
                <input
                  type="number"
                  name="retail_lak"
                  value={formData.retail_lak}
                  onChange={handleChange}
                  disabled={!isNewProduct}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
                <span className=" block">
                  {formattedNumber(formData.retail_lak)}. ກີບ
                </span>
              </div>
              <div className="w-full">
                <label className="block font-semibold">ລາຄາຂາຍ​ສົ່ງ (LAK)</label>
                <input
                  type="number"
                  name="wholesale_lak"
                  value={formData.wholesale_lak}
                  onChange={handleChange}
                  disabled={!isNewProduct}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
                <span className=" block">
                  {formattedNumber(formData.wholesale_lak)}. ກີບ
                </span>
              </div>

            </div>

            <div className="mt-5 flex gap-3">
              <div className="w-full">
                <label className="block font-semibold">ລາຄາ ຕົ້ນທຶນ (THB)</label>
                <input
                  type="number"
                  name="cost_thb"
                  value={formData.cost_thb}
                  onChange={handleChange}
                  disabled={!isNewProduct}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
                <span className=" block">
                  {formattedNumber(formData.cost_thb)}. ບາດ
                </span>
              </div>
              <div className="w-full">
                <label className="block font-semibold">ລາຄາຂາຍຍ່ອຍ (THB)</label>
                <input
                  type="number"
                  name="retail_thb"
                  value={formData.retail_thb}
                  onChange={handleChange}
                  disabled={!isNewProduct}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
                <span className=" block">
                  {formattedNumber(formData.retail_thb)}. ບາດ
                </span>
              </div>
              <div className="w-full">
                <label className="block font-semibold">ລາຄາຂາຍ​ສົ່ງ (THB)​</label>
                <input
                  type="number"
                  name="wholesale_thb"
                  value={formData.wholesale_thb}
                  onChange={handleChange}
                  disabled={!isNewProduct}
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
                disabled={!isNewProduct}
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
                disabled={!isNewProduct}
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
          <Button
            disabled={!isNewProduct}
            type="submit"
            color={isNewProduct ? "primary" : "default"}
            className=" py-2"
          >
            ສ້າງ
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
