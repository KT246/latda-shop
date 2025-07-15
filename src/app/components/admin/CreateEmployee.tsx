import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { SwalNotification } from "@/app/helpers/alers";
import { formattedNumber } from "@/app/helpers/funtions";
import { toast } from "react-toastify";
import { addUsers } from "@/app/api/admin.product";
import { Button } from "@heroui/react";
function CreateEmployee() {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    role: 2,
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
    if (formData.id.trim() === "") {
      toast.warning("ກະລຸນາປ້ອນລະຫັດ");
      return false;
    }

    if (formData.password.trim() === "") {
      toast.warning("ກະລຸນາປ້ອນລະຫັດຜ່ານ");
      return false;
    }

    if (formData.name.trim() === "") {
      toast.warning("ກະລຸນາປ້ອນຊື່ແລະນາມສະກຸນ");
      return false;
    }

    if (formData.phone.trim() === "") {
      toast.warning("ກະລຸນາປ້ອນເບີໂທ");
      return false;
    } else if (!/^\d{8,15}$/.test(formData.phone)) {
      toast.warning("ເບີໂທບໍ່ຖືກຕ້ອງ");
      return false;
    }

    if (formData.address.trim() === "") {
      toast.warning("ກະລຸນາປ້ອນທີ່ຢູ່");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res: any = await addUsers(formData);
        if (res.data.status !== "error") {
          toast.success("ສ້າງສຳເລັດ");
          router.push("/admin/employees");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" ">
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 my-3">
        ເພີ່ມພະນັກງານ
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4">
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

        <div className="mt-3 flex justify-between">
          <Button
            onPress={() => router.back()}
            color="warning"
            type="button"
            // className=" text-white px-6 py-2 rounded flex items-center duration-500"
          >
            <IoChevronBackOutline />
            ກັບຄືນ
          </Button>
          <Button
            color="primary"
            type="submit"
            // className="bg-blue-700 text-white px-6 py-2 rounded duration-500 hover:bg-green-500"
          >
            ເພີ່ມ
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployee;
