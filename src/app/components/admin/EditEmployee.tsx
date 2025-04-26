"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { formattedNumber } from "@/app/helpers/funtions";
function EditEmployee() {
  const [formData, setFormData] = useState({
    name: "ສຸກສົມ ແລະ ສຸກທຸມ",
    dob: "1990-01-01",
    gender: "ຊາຍ",
    phone: "54564878797",
    workDate: "2015-01-01",
    position: "ຫົົວໜ້າງານ",
    salary: 10000000,
    address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
  });
  const param = useParams();
  const id = param.id;
  const router = useRouter();
  console.log(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., save data or call API)
    console.log("Form submitted", formData);
  };
  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ແກ້ໄຂພະນັກງານ
      </h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ຊື່ແລະນາມສະກຸນ</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none "
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ວັນເດືອນປີເກີດ</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ເພດ</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={() => handleChange}
              className="w-full p-2 border border-gray-300 cursor-pointer rounded focus:border-blue-900 focus:outline-none"
            >
              <option className="cursor-pointer" value="ຊາຍ">
                ຊາຍ
              </option>
              <option className="cursor-pointer" value="ຍິງ">
                ຍິງ
              </option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ເບີໂທ</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ວັນທີເຂົົ້າເຮັດວຽກ</label>
            <input
              type="date"
              name="workDate"
              value={formData.workDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">ຕຳແຫນ່ງ</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">ເງິນເດືອນ</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            />
            <span className=" block">
              {formattedNumber(formData.salary)}. ກີບ
            </span>
          </div>
          <div className="flex-1">
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
