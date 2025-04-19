import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { SwalNotification } from "@/app/helpers/alers";
import { formattedNumber } from "@/app/helpers/funtions";
function CreateEmployee() {
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
    if (formData.name === "") {
      SwalNotification("ກະລຸນາປ້ອນຊື່ແລະນາມສະກຸນ", "warning");
      return false;
    }
    if (formData.dob === "") {
      SwalNotification("ກະລຸນາປ້ອນວັນເດືອນປີເກີດ", "warning");
      return false;
    }
    if (formData.phone === "") {
      SwalNotification("ກະລຸນາປ້ອນເບີໂທ", "warning");
      return false;
    }
    if (formData.workDate === "") {
      SwalNotification("ກະລຸນາປ້ອນວັນທີເຂົົ້າເຮັດວຽກ", "warning");
      return false;
    }
    if (formData.position === "") {
      SwalNotification("ກະລຸນາປ້ອນຕຳແຫນ່ງ", "warning");
      return false;
    }
    if (formData.salary < 0) {
      SwalNotification("ກະລຸນາປ້ອນເງິນເດືອນ", "warning");
      return false;
    }
    if (formData.address === "") {
      SwalNotification("ກະລຸນາປ້ອນທີ່ຢູ່", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted", formData);
      setFormData({
        name: "",
        dob: "",
        gender: "ຊາຍ",
        phone: "",
        workDate: "",
        position: "",
        salary: 0,
        address: "",
      });
    }
  };

  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ສ້າງພະນັກງານ
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
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-900 focus:outline-none"
            >
              <option value="ຊາຍ">ຊາຍ</option>
              <option value="ຍິງ">ຍິງ</option>
              <option value="ອື່ນ">ອື່ນ (Khác)</option>
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
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
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
            className="bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-green-500"
          >
            ສ້າງ
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployee;
