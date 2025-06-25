"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { formattedNumber } from "@/app/helpers/funtions";
import { GetIdUsers, UpdateUsers } from "@/app/api/admin.product";
import { toast } from "react-toastify";

function EditEmployee() {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    role: 2,
  });
  const param = useParams();
  const idUser = param.id;
  const router = useRouter();

  const fetchData = async (id: string) => {
    const res: any = await GetIdUsers(id);
    const data = res?.data;
    setFormData({
      id: data.id || "",
      username: data.username || "",
      password: data.password || "",
      name: data.name || "",
      phone: data.phone || "",
      address: data.address || "",
      role: data.role ?? 2,
    });
  };

  React.useEffect(() => {
    if (typeof idUser === "string") {
      fetchData(idUser);
    } else if (Array.isArray(idUser) && idUser.length > 0) {
      fetchData(idUser[0]);
    }
  }, [idUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId =
        typeof idUser === "string"
          ? idUser
          : Array.isArray(idUser) && idUser.length > 0
          ? idUser[0]
          : "";
      const res: any = await UpdateUsers(userId, formData);

      if (res.data.status !== "error") {
        router.push("/admin/employees");
        toast.success(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ແກ້ໄຂພະນັກງານ
      </h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">ຊື່ເຂົ້າລະບົບ</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold">ລະຫັດ</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold">ຊື່ຜູ້ໃຊ້</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold">ເບີໂທ</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold">ໜ້າທີ່</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            >
              {/* "ຈັດການສິນຄ້າ" : "ຜູ້ຂາຍ" */}
              <option value={1}>ຈັດການສິນຄ້າ </option>
              <option value={2}>ຜູ້ຂາຍ</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">ທີ່ຢູ່</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
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
            className="hover:bg-green-500 bg-blue-700 text-gray-50  px-6 py-2 rounded duration-500"
          >
            ແກ້ໄຂ
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
