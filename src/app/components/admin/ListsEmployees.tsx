"use client";
import { div } from "framer-motion/client";
import React from "react";
import Link from "next/link";

function ListsEmployees() {
  interface Employee {
    id: number;
    name: string;
    dob: string;
    fame: string;
    phone: string;
    workDate: string;
    position: string;
    salary: string;
    address: string;
  }

  const employees: Employee[] = [
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
    {
      id: 1,
      name: "ສຸກສົມ ແລະ ສຸກທຸມ",
      dob: "01/01/1990",
      fame: "ຊາຍ",
      phone: "54564878797",
      workDate: "01/01/2015",
      position: "ຫົົວໜ້າງານ",
      salary: "10,000,000 ກີບ",
      address: "ຫົົວໜ້າເມືອງ ວຽງຈັນ",
    },
  ];

  const handleDelete = async (id: number) => {
    console.log(id);
  };

  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ລາຍຊື່ພະນັກງານ
      </h1>
      <p className="font-semibold flex bg-blue-500 text-gray-100  rounded-t-md sticky top-0 z-10 mt-5">
        <span className="py-1 px-2  w-12">ລຳດັບ</span>
        <span className="py-1 px-2 border-l-1 w-48">ຊື່ແລະນາມສະກຸນ</span>
        <span className="py-1 px-2 border-l-1 w-28">ວັນເດືອນປີເກີດ</span>
        <span className="py-1 px-2 border-l-1 w-12">ເພດ</span>
        <span className="py-1 px-2 border-l-1 w-32">ເບີໂທ</span>
        <span className="py-1 px-2 border-l-1 w-32">ວັນທີເຂົົ້າເຮັດວຽກ</span>
        <span className="py-1 px-2 border-l-1 w-32">ຕຳແຫນ່ງ</span>
        <span className="py-1 px-2 border-l-1 w-32">ເງິນເດືອນ</span>
        <span className="py-1 px-2 border-l-1 w-[290px] ">ທີ່ຢູ່</span>
        <span className="py-1 px-2 border-l-1 w-36 text-center">ດຳເນີນການ</span>
      </p>
      <div className="overflow-auto h-[71vh] pb-5">
        {employees.length > 0 ? (
          employees.map((it, index) => (
            <p className="flex border-b-1" key={index}>
              <span className="py-1 px-2  w-12 text-center">{it.id}</span>
              <span className="py-1 px-2 border-l-1 w-48">{it.name}</span>
              <span className="py-1 px-2 border-l-1 w-28">{it.dob}</span>
              <span className="py-1 px-2 border-l-1 w-12">{it.fame}</span>
              <span className="py-1 px-2 border-l-1 w-32">{it.phone}</span>
              <span className="py-1 px-2 border-l-1 w-32">{it.workDate}</span>
              <span className="py-1 px-2 border-l-1 w-32">{it.position}</span>
              <span className="py-1 px-2 border-l-1 w-32">{it.salary}</span>
              <span className="py-1 px-2 border-l-1 w-[290px] truncate overflow-hidden whitespace-nowrap">
                {it.address}
              </span>
              <span className="w-36 flex justify-center gap-3 py-1 px-2">
                <Link
                  href={`/admin/employees/${it.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded"
                >
                  ແກ້ໄຂ
                </Link>
                <button
                  onClick={() => handleDelete(it.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold  px-4 rounded"
                >
                  ລົບ
                </button>
              </span>
            </p>
          ))
        ) : (
          <div className="h-[400px] flex justify-center items-center">
            <p>ບໍ່ທັນມີລາຍຊື່</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListsEmployees;
