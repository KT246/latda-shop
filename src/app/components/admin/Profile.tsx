"use client";
import React, { useState } from "react";
import { formattedNumber } from "@/app/helpers/funtions";
import HeaderLinks from "../HeaderLinks";
function Profile() {
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
        name="ຈັດການລະບົບ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div className="flex flex-col">
        <div>
          <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
            ຜູ້ຄວບຄຸມລະບົບ
          </h1>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <div>
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
              <div>
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

              <div>
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
              <div>
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

              <div>
                <label className="block font-semibold">
                  ວັນທີເຂົົ້າເຮັດວຽກ
                </label>
                <input
                  type="date"
                  name="workDate"
                  value={formData.workDate}
                  onChange={handleChange}
                  readOnly={!changes}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div>
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

              <div>
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
              <div className="col-span-2">
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
              <div className="flex justify-center items-center">
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
                    className="bg-blue-700 text-white px-6 py-2 w-full rounded duration-500 hover:bg-red-500"
                    onClick={handleChangeSelect}
                  >
                    ແກ້ໄຂ
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div>
          <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
            ຜູ້ໃຊ້ລະບົບ
          </h1>{" "}
          <p className="font-semibold flex bg-blue-500 text-gray-100  rounded-t-md sticky top-0 z-10 mt-5 text-sm">
            <span className="py-1 px-2  w-12">ລຳດັບ</span>
            <span className="py-1 px-2 border-l-1 w-40">ລະຫັດບິນ</span>
            <span className="py-1 px-2 border-l-1 w-48">ວັນທີສ້າງ</span>
            <span className="py-1 px-2 border-l-1 w-48">ຊື່ກະຕ່າ</span>
            <span className="py-1 px-2 border-l-1 w-20">ຂະຫນາດ</span>
            <span className="py-1 px-2 border-l-1 w-20">ຫົວໜ່ວຍ</span>
            <span className="py-1 px-2 border-l-1 w-32">ລະຫັດຜູ້ຂາຍ</span>
            <span className="py-1 px-2 border-l-1 w-24 ">ຈໍານວນສິນຄ້າ</span>
            <span className="py-1 px-2 border-l-1 w-16 ">ສ່ວນຫຼຸດ</span>
            <span className="py-1 px-2 border-l-1 w-32 ">ລາຄາລວມ (LAK)</span>
            <span className="py-1 px-2 border-l-1 w-32 text-center">
              ດຳເນີນການ
            </span>
          </p>
          <div className="overflow-y-auto h-[71vh] scroll-smooth pb-5">
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">gfdgfd</span>
              <span className="py-1 px-2 border-l-1 w-40 uppercase">
                fdgfdg
              </span>
              <span className="py-1 px-2 border-l-1 w-48 truncate overflow-hidden whitespace-nowrap">
                gfdgdfg
              </span>
              <span className="py-1 px-2 border-l-1 w-48 truncate overflow-hidden whitespace-nowrap">
                gdfgf
              </span>
              <span className="py-1 px-2 border-l-1 w-20">sdfds</span>
              <span className="py-1 px-2 border-l-1 w-20">fsdf</span>
              <span className="py-1 px-2 border-l-1 w-32">fsdds</span>
              <span className="py-1 px-2 border-l-1 w-24 ">fssdfsd</span>
              <span className="py-1 px-2 border-l-1 w-16 text-red-500">
                gfdg
              </span>
              <span className="py-1 px-2 border-l-1 w-32 ">
                {formattedNumber(45645)}. ກີບ
              </span>

              <span className="flex justify-center gap-3 p-1 border-l-1 w-48 text-center text-sm">
                {/* <Link
                      href={`/cashier/invoice/detail/${it.id}`}
                      className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                    >
                      ລາຍລະອຽດ
                    </Link> */}
                dsds
              </span>
            </p>
            {/* {products.length > 0 ? (
              products.map((it, index) => (
                <p className="flex border-b-1" key={index}>
                  <span className="py-1 px-2  w-12 ">{it.id}</span>
                  <span className="py-1 px-2 border-l-1 w-40 uppercase">
                    {it.barcode} fd
                  </span>
                  <span className="py-1 px-2 border-l-1 w-48 truncate overflow-hidden whitespace-nowrap">
                    {it.title}
                  </span>
                  <span className="py-1 px-2 border-l-1 w-48 truncate overflow-hidden whitespace-nowrap">
                    {it.use_for}
                  </span>
                  <span className="py-1 px-2 border-l-1 w-20">{it.size}</span>
                  <span className="py-1 px-2 border-l-1 w-20">{it.unit}</span>
                  <span className="py-1 px-2 border-l-1 w-32">
                    {it.category}
                  </span>
                  <span className="py-1 px-2 border-l-1 w-24 ">{it.qty}</span>
                  <span className="py-1 px-2 border-l-1 w-16 text-red-500">
                    {it.discount}%
                  </span>
                  <span className="py-1 px-2 border-l-1 w-32 ">
                    {formattedNumber(it.cost_lak)}. ກີບ
                  </span>

                  <span className="flex justify-center gap-3 p-1 border-l-1 w-48 text-center text-sm">
                    {/* <Link
                      href={`/cashier/invoice/detail/${it.id}`}
                      className="bg-green-500 hover:bg-green-700 text-white  font-bold  px-2 rounded"
                    >
                      ລາຍລະອຽດ
                    </Link> */}
            {/* </span>
                </p>
              ))
            ) : ( */}
            {/* <div className="h-[400px] flex justify-center items-center">
                <p>ບໍ່ທັນມີລາຍຊື່</p>
              </div> */}
            {/* )} */}
            {/* } */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
