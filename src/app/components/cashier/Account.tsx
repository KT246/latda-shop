"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { formattedNumber } from "@/app/helpers/funtions";

import HeaderLinks from "../HeaderLinks";

export default function Account() {
  const [changes, setChanges] = React.useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "ຊາຍ",
    phone: "",
    workDate: "",
    position: "",
    salary: 0,
    address: "",
  });

  const router = useRouter();
  const handleChangeSelect = () => {
    setChanges(!changes);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <HeaderLinks
        name="ຂໍ້ມູນສ່ວນຕົວ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div>
        <h1 className="border-l-4 border-green-500 leading-3 ps-2 my-3">
          ລາຍລະອຽດຜູ້ໃຊ້
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
                disabled={!changes}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">ວັນເດືອນປີເກີດ</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                disabled={!changes}
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
                onChange={handleChange}
                disabled={!changes}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              >
                <option disabled={!changes} value="ຊາຍ">
                  ຊາຍ
                </option>
                <option disabled={!changes} value="ຍິງ">
                  ຍິງ
                </option>
                <option disabled={!changes} value="ອື່ນ">
                  ອື່ນ (Khác)
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
                readOnly={!changes}
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
                readOnly={!changes}
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
                readOnly={!changes}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-semibold">ເງິນເດືອນ</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                readOnly
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
              />
              <span className=" sticky top-0">
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
                readOnly={!changes}
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

            {changes ? (
              <button
                type="submit"
                onClick={handleChangeSelect}
                className="bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-green-500"
              >
                ບັນທືກ
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-red-500"
                onClick={handleChangeSelect}
              >
                ແກ້ໄຂ
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
