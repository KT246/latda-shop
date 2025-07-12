"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Employee } from "@/app/lib/interface";
import { GetAllUsers, DeleteUsers } from "@/app/api/admin.product";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
} from "@heroui/react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ListsEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res: any = await GetAllUsers();
    if (res?.status === 200) {
      setEmployees(res.data);
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "!ພະນັກງານ",
      text: "ຢຶນຢັນລົບພະນັກງານລະຫັດ: " + id + " ບໍ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "ລົບ",
      cancelButtonText: "ຍົກເລິກ",
      focusCancel: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res: any = await DeleteUsers(id);
          if (res.data.status !== "error") {
            fetchData();
            toast.success(res.data.message);
          } else {
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 my-3">
        ລາຍຊື່ພະນັກງານ
      </h1>
      <Table
        color={"primary"}
        // selectionMode="single"
        bottomContent={
          <div className="flex w-full justify-center">
            {/* <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            /> */}
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
          th: "bg-blue-500 text-white font-semibold text-sm",
        }}
      >
        <TableHeader>
          <TableColumn key="id">ຊື່ເຂົ້າລະບົບ</TableColumn>
          <TableColumn key="password">ລະຫັດ</TableColumn>
          <TableColumn key="name">ຊື່ຜູ້ໃຊ້</TableColumn>
          <TableColumn key="role">ໜ້າທີ່</TableColumn>
          <TableColumn key="phone">ເບີໂທ</TableColumn>
          <TableColumn key="address">ທີ່ຢູ່</TableColumn>
          <TableColumn key="">actions</TableColumn>
        </TableHeader>
        <TableBody items={employees}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.password}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.role === 1 ? "ຈັດການສິນຄ້າ" : "ຜູ້ຂາຍ"}
              </TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="ແກ້ໄຂ">
                    <Link href={`/admin/employees/edit/${item.id}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color="danger" content="ລົບ">
                    <button
                      type="button"
                      onClick={() => handleDelete(String(item?.id))}
                    >
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const DeleteIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};
export default ListsEmployees;
