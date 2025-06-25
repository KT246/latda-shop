"use client";
import React, { useState } from "react";
import { Details } from "@/app/lib/interface";
import Link from "next/link";
import { formattedNumber } from "@/app/helpers/funtions";
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

import { apiDlPdruct } from "@/app/api/products";
import { GetAllProduct } from "@/app/api/admin.product";
import Image from "next/image";
interface Product {
  barcode: string;
  page: string | null;
  No: string | null;
  code: string | null;
  size: string | null;
  title: string;
  use_for: string | null;
  brand: string | null;
  unit: string;
  category: string;
  cost_thb: number | 0;
  cost_lak: number | 0;
  wholesale_thb: number | 0;
  wholesale_lak: number | 0;
  retail_thb: number | 0;
  retail_lak: number | 0;
  discount: number | 0;
  num_of_discount: number | 0;
  qty_start: number | 0;
  qty_in: number | 0;
  qty_out: number | 0;
  qty_balance: number | 0;
  qty_alert: number | 0;
  supplier: string | null;
  img_name: string | null;
  status: string;
}

function ListsProducts() {
  const [products, setProduct] = useState<Product[]>([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const res: any = await GetAllProduct(rowsPerPage, page);
    console.log(res);
    if (res?.status === 200) {
      setProduct(res.data.products);
      setPages(res.data.totalPages);
    }
  };

  const handleDelete = async (barcode: string) => {
    try {
      const res: any = await apiDlPdruct(barcode);
      if (res?.status === 200) {
        setProduct((prevProducts) =>
          prevProducts.filter((product) => product.barcode !== barcode)
        );
        fetchData();
      } else {
        console.error("Failed to delete product:", res?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  console.log("Products:", products);
  return (
    <div>
      <h1 className="border-l-4 border-green-500 leading-3 ps-2 ">
        ລາຍການສິນຄ້າ
      </h1>

      <Table
        color={"primary"}
        // selectionMode="single"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
          th: "bg-blue-500 text-white font-semibold text-sm",
        }}
      >
        <TableHeader>
          <TableColumn key="img_name">hinh</TableColumn>
          <TableColumn key="barcode">barcode</TableColumn>
          <TableColumn key="title">ຊື່</TableColumn>
          {/* <TableColumn key="size">ຂະຫນາດ</TableColumn>
          <TableColumn key="code">code</TableColumn>
          <TableColumn key="page">page</TableColumn>
          <TableColumn key="brand">ແບນ</TableColumn> */}
          <TableColumn key="unit">ໜ່ວຍ</TableColumn>
          <TableColumn key="category">ປະເພດ</TableColumn>
          <TableColumn key="qty_start">ຍົກມາ</TableColumn>
          <TableColumn key="qty_in">ຍອດຊື້</TableColumn>
          <TableColumn key="qty_out">ຍອດຂາຍ</TableColumn>
          <TableColumn key="qty_balance">balance</TableColumn>
          <TableColumn key="retail_lak">LAK</TableColumn>
          <TableColumn key="retail_thb">THB</TableColumn>
          <TableColumn key="status">status</TableColumn>
          <TableColumn key="">action</TableColumn>
        </TableHeader>
        <TableBody items={products}>
          {(item) => (
            <TableRow key={item.barcode}>
              <TableCell>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.img_name}`}
                  alt="No Name"
                  className=""
                  width={50}
                  height={100}
                />
              </TableCell>
              <TableCell>{item.barcode}</TableCell>
              <TableCell>{item.title}</TableCell>
              {/* <TableCell>{item.size}</TableCell>
              <TableCell>{item.No}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.page}</TableCell>
              <TableCell>{item.brand}</TableCell> */}
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.qty_start}</TableCell>
              <TableCell>{item.qty_in}</TableCell>
              <TableCell>{item.qty_out}</TableCell>
              <TableCell>{item.qty_balance}</TableCell>
              <TableCell>{item.retail_lak.toLocaleString()}</TableCell>
              <TableCell>{item.retail_thb.toLocaleString()}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="ເບິ່ງ">
                    <Link href={`/admin/products/detail/${item.barcode}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip content="ແກ້ໄຂ">
                    <Link href={`/admin/products/edit/${item.barcode}`}>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color="danger" content="ລົບ">
                    <button
                      type="button"
                      onClick={() => handleDelete(item?.barcode)}
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

export const EyeIcon = (props: any) => {
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
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

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
export default ListsProducts;
