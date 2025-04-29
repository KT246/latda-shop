"use client";
import React, { useState } from "react";
import { formattedNumber } from "@/app/helpers/funtions";
import HeaderLinks from "../HeaderLinks";
import Swal from "sweetalert2";
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

  const handleAlert = () => {
    Swal.fire({
      title: "ສ້າງຜູ້ໃຊ້ລະບົບ",
      showConfirmButton: true,
      confirmButtonText: "ສ້າງ",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonText: "ຍົກເລີກ",
      cancelButtonColor: "#d33",
      html: `
      <input id="name" class="swal2-input" placeholder="ຊື່ໃຊ້ລະບົບ" />
      <input id="pass" class="swal2-input" placeholder="ລະຫັດ" />
   `,

      preConfirm: () => {
        const name = document.getElementById("name") as HTMLInputElement;
        const pass = document.getElementById("pass") as HTMLInputElement;

        if (pass && pass.value === "") {
          Swal.showValidationMessage("ກະລຸນາໃສ່ລະຫັດ");
        }
        if (name && name.value === "") {
          Swal.showValidationMessage("ກະລຸນາໃສ່ຊື່ໃຊ້ລະບົບ");
        }

        return {
          name: name?.value,
          pass: pass?.value,
        };
      },
    }).then((res) => {
      if (res.isConfirmed) {
        const { name, pass } = res.value as { name: string; pass: string };
        if (name && pass) {
          Swal.fire({
            title: "ສໍາເລັດ",
            text: "ສ້າງໃຊ້ລະບົບໃຫມ່ສໍາເລັດ",
            icon: "success",
            iconColor: "#3085d6",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };
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
          </h1>
          <p className="w-[60vw] font-semibold flex bg-blue-500 text-gray-100  rounded-t-md sticky top-0 z-10 mt-5 text-sm">
            <span className="py-1 px-2  w-12">ລຳດັບ</span>
            <span className="py-1 px-2 border-l-1 w-40">ຊື່ໃຊ້ລະບົບ</span>
            <span className="py-1 px-2 border-l-1 w-48">ລະຫັດ</span>
            <span className="py-1 px-2 border-l-1 w-48">ສະຖານະ</span>
            <span className="py-1 px-2 border-l-1 w-72 text-center">
              ດຳເນີນການ
            </span>
          </p>
          <div className="overflow-y-auto w-[60vw] h-[40vh] scroll-smooth pb-5">
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="py-1 px-2 border-l-1 w-40 ">john doe</span>
              <span className="py-1 px-2 border-l-1 w-48 ">544564FFGY</span>
              <span className="py-1 px-2 border-l-1 w-48 ">
                <span className="bg-green-300 text-gray-700 py-px px-5 leading-5 rounded-xl">
                  ເປີດການໃຊ້ງານ
                </span>
              </span>
              <span className="py-1 px-2 border-l-1 w-72 text-white flex gap-2 justify-center items-center">
                <button className="bg-yellow-600 hover:bg-yellow-500 px-5 leading-5 rounded-xl">
                  ປິດ
                </button>
                <button className="bg-green-600 hover:bg-green-500 px-5 leading-5 rounded-xl">
                  ເປີດ
                </button>
                <button className="bg-red-600 px-5 hover:bg-red-500 leading-5 rounded-xl">
                  ລົບ
                </button>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="py-1 px-2 border-l-1 w-40 ">john doe</span>
              <span className="py-1 px-2 border-l-1 w-48 ">544564FFGY</span>
              <span className="py-1 px-2 border-l-1 w-48 ">
                <span className="bg-green-300 text-gray-700 py-px px-5 leading-5 rounded-xl">
                  ເປີດການໃຊ້ງານ
                </span>
              </span>
              <span className="py-1 px-2 border-l-1 w-72 text-white flex gap-2 justify-center items-center">
                <button className="bg-yellow-600 hover:bg-yellow-500 px-5 leading-5 rounded-xl">
                  ປິດ
                </button>
                <button className="bg-green-600 hover:bg-green-500 px-5 leading-5 rounded-xl">
                  ເປີດ
                </button>
                <button className="bg-red-600 px-5 hover:bg-red-500 leading-5 rounded-xl">
                  ລົບ
                </button>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="py-1 px-2 border-l-1 w-40 ">john doe</span>
              <span className="py-1 px-2 border-l-1 w-48 ">544564FFGY</span>
              <span className="py-1 px-2 border-l-1 w-48 ">
                <span className="bg-green-300 text-gray-700 py-px px-5 leading-5 rounded-xl">
                  ເປີດການໃຊ້ງານ
                </span>
              </span>
              <span className="py-1 px-2 border-l-1 w-72 text-white flex gap-2 justify-center items-center">
                <button className="bg-yellow-600 hover:bg-yellow-500 px-5 leading-5 rounded-xl">
                  ປິດ
                </button>
                <button className="bg-green-600 hover:bg-green-500 px-5 leading-5 rounded-xl">
                  ເປີດ
                </button>
                <button className="bg-red-600 px-5 hover:bg-red-500 leading-5 rounded-xl">
                  ລົບ
                </button>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="py-1 px-2 border-l-1 w-40 ">john doe</span>
              <span className="py-1 px-2 border-l-1 w-48 ">544564FFGY</span>
              <span className="py-1 px-2 border-l-1 w-48 ">
                <span className="bg-green-300 text-gray-700 py-px px-5 leading-5 rounded-xl">
                  ເປີດການໃຊ້ງານ
                </span>
              </span>
              <span className="py-1 px-2 border-l-1 w-72 text-white flex gap-2 justify-center items-center">
                <button className="bg-yellow-600 hover:bg-yellow-500 px-5 leading-5 rounded-xl">
                  ປິດ
                </button>
                <button className="bg-green-600 hover:bg-green-500 px-5 leading-5 rounded-xl">
                  ເປີດ
                </button>
                <button className="bg-red-600 px-5 hover:bg-red-500 leading-5 rounded-xl">
                  ລົບ
                </button>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="py-1 px-2 border-l-1 w-40 ">john doe</span>
              <span className="py-1 px-2 border-l-1 w-48 ">544564FFGY</span>
              <span className="py-1 px-2 border-l-1 w-48 ">
                <span className="bg-green-300 text-gray-700 py-px px-5 leading-5 rounded-xl">
                  ເປີດການໃຊ້ງານ
                </span>
              </span>
              <span className="py-1 px-2 border-l-1 w-72 text-white flex gap-2 justify-center items-center">
                <button className="bg-yellow-600 hover:bg-yellow-500 px-5 leading-5 rounded-xl">
                  ປິດ
                </button>
                <button className="bg-green-600 hover:bg-green-500 px-5 leading-5 rounded-xl">
                  ເປີດ
                </button>
                <button className="bg-red-600 px-5 hover:bg-red-500 leading-5 rounded-xl">
                  ລົບ
                </button>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="py-1 px-2 border-l-1 w-40 ">john doe</span>
              <span className="py-1 px-2 border-l-1 w-48 ">544564FFGY</span>
              <span className="py-1 px-2 border-l-1 w-48 ">
                <span className="bg-green-300 text-gray-700 py-px px-5 leading-5 rounded-xl">
                  ເປີດການໃຊ້ງານ
                </span>
              </span>
              <span className="py-1 px-2 border-l-1 w-72 text-white flex gap-2 justify-center items-center">
                <button className="bg-yellow-600 hover:bg-yellow-500 px-5 leading-5 rounded-xl">
                  ປິດ
                </button>
                <button className="bg-green-600 hover:bg-green-500 px-5 leading-5 rounded-xl">
                  ເປີດ
                </button>
                <button className="bg-red-600 px-5 hover:bg-red-500 leading-5 rounded-xl">
                  ລົບ
                </button>
              </span>
            </p>
            <p className="flex border-b-1">
              <span className="py-1 px-2  w-12 ">1</span>
              <span className="py-1 px-2 border-l-1 w-40 ">john doe</span>
              <span className="py-1 px-2 border-l-1 w-48 ">544564FFGY</span>
              <span className="py-1 px-2 border-l-1 w-48 ">
                <span className="bg-yellow-300 text-gray-700 py-px px-5 leading-5 rounded-xl">
                  ປິດການໃຊ້ງານ
                </span>
              </span>
              <span className="py-1 px-2 border-l-1 w-72 text-white flex gap-2 justify-center items-center">
                <button className="bg-yellow-600 hover:bg-yellow-500 px-5 leading-5 rounded-xl">
                  ປິດ
                </button>
                <button className="bg-green-600 hover:bg-green-500 px-5 leading-5 rounded-xl">
                  ເປີດ
                </button>
                <button className="bg-red-600 px-5 hover:bg-red-500 leading-5 rounded-xl">
                  ລົບ
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 right-40 bg-blue-500 hover:bg-green-400 w-40 h-40 flex justify-center items-center rounded-full shadow-lg shadow-gray-500 duration-1000">
        <button
          onClick={handleAlert}
          className=" bg-blue-700 hover:bg-green-600 text-white rounded-full w-20 h-20 text-xl font-semibold duration-300"
        >
          ສ້າງ
        </button>
      </div>
    </>
  );
}

export default Profile;
