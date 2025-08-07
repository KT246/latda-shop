"use client";
import React, { useState } from "react";
import HeaderLinks from "../HeaderLinks";
import useSWR from "swr";
import { Doughnut, Line } from "react-chartjs-2";

/// interface
import { ReportProduct, ReportSaleResponse } from "@/app/lib/interface";

/// api
import {
  FetchReport,
  GetReportSale,
  PutExChange,
  GetExChange,
} from "@/app/api/admin.product";

/// table
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Skeleton,
  Tooltip,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";

import Link from "next/link";
import {
  formatDate,
  formattedNumber,
  getTodayDate,
} from "@/app/helpers/funtions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { apiResetQty } from "@/app/api/products";
import { useInvoiceStore } from "@/app/store/Invoice";
import ReportProcuct from "./ReportProcuct";
import Happening from "./Happening";
import ReportInvoice from "./ReportInvoice";

function Home() {
  const choose = useInvoiceStore((state) => state.choose);

  return (
    <>
      {choose === 0 && <ReportInvoice />}
      {choose === 1 && <ReportProcuct />}
      {choose === 2 && <Happening />}
    </>
  );
}

export default Home;

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

export const LaoCurrentCy = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 66.068 66.068"
      fill="currentColor" // kế thừa từ className bên ngoài
      {...props}
    >
      <g>
        <path
          fill="currentColor"
          d="M63.371,63.627L38.658,36.545h19.539c1.939,0,3.512-1.57,3.512-3.512c0-1.939-1.572-3.512-3.512-3.512H39.559L61.272,2.367
          c0.361-0.452,0.419-1.073,0.15-1.576C61.164,0.301,60.656,0,60.094,0H49.349c-0.461,0-0.904,0.214-1.184,0.569L26.941,27.511V1.465
          C26.941,0.656,26.27,0,25.445,0h-8.656c-0.825,0-1.497,0.656-1.497,1.465v28.057H5.828c-1.94,0-3.512,1.572-3.512,3.512
          c0,1.94,1.572,3.513,3.512,3.513h9.464v28.057c0,0.809,0.672,1.465,1.497,1.465h8.656c0.824,0,1.496-0.656,1.496-1.465V41.965
          l1.262-0.021l22.716,23.663c0.283,0.292,0.678,0.46,1.088,0.46h10.248c0.57,0,1.1-0.324,1.352-0.834
          C63.865,64.701,63.775,64.073,63.371,63.627z"
        />
      </g>
    </svg>
  );
};
