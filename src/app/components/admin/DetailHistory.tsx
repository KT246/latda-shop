"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { GetInvoicesId, updateStatusInvoice } from "@/app/api/admin.product";
import { formatDate, formattedNumber } from "@/app/helpers/funtions";
import { Invoice } from "@/app/lib/interface";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Selection,
} from "@heroui/react";
import { toast } from "react-toastify";

export default function DetailHistory() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  /// useState
  const [invoice, setInvoices] = React.useState<Invoice | null>(null);

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set<string>()
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );
  /// funtions

  const getInvoice = async () => {
    if (!id) {
      console.error("Invalid invoice ID");
      return;
    }
    const res = await GetInvoicesId(Number(id));
    if (res.status === 200) {
      const data = res.data.invoices[0];
      setInvoices(data);
      console.log(data);
    } else {
      console.log("Error fetching invoice data");
    }
  };

  const changStatus = async () => {
    const res: any = await updateStatusInvoice(Number(id), selectedValue);
    if (res.status === 200) {
      toast.success("ອັບເດດສຳເລັດ");
      setInvoices(res.data);
    }
  };

  /// useEffect
  React.useEffect(() => {
    getInvoice();
  }, [id]);

  React.useEffect(() => {
    if (selectedKeys && selectedValue) {
      changStatus();
    }
  }, [selectedKeys]);

  return (
    <div className="px-3">
      <div className="py-3 my-3  border-b-2 flex items-center gap-10">
        <h3 className="font-semibold text-xl ">ລາຍລະອຽດປະຫວັດການຂາຍ</h3>
      </div>
      <div>
        <h1 className="border-l-4 border-green-500 leading-3 ps-2 my-5">
          ລາຍລະອຽດໃບບິນ
        </h1>

        {/* HisDetailHistory bills */}

        <div className="grid grid-cols-7 gap-5 px-6 py-3 my-3 border-1 rounded shadow-lg divide-y-2 divide-blue-500">
          <div className="text-center space-y-3 border-t-2 border-blue-500">
            <p>ລະຫັດບິນ</p>
            <p className="text-gray-500 font-semibold">{invoice?.id}</p>
          </div>
          <div className="text-center space-y-3">
            <p>ວັນທີພິມບິນ</p>
            <p className="text-gray-500 font-semibold">
              {formatDate(invoice?.date_create ?? "")}
            </p>
          </div>
          <div className="text-center space-y-3">
            <p>ລະຫັດຜູ້ຂາຍ</p>
            <p className="text-gray-500 font-semibold">{invoice?.cashier_id}</p>
          </div>
          <div className="text-center space-y-3">
            <p>ຊື່ລູກຄ້າ</p>
            <p className="text-gray-500 font-semibold">{invoice?.member_id}</p>
          </div>
          <div className="text-center space-y-3">
            <p>ອັດຕາແລກປ່ຽນ</p>
            <p className="text-gray-500 font-semibold">{invoice?.rate}</p>
          </div>
          <div className="text-center space-y-3">
            <p>ປະເພດການຈ່າຍເງິນ</p>
            <p className="text-gray-500 font-semibold">
              {invoice?.pay_type === "cash"
                ? "ເງິນສົດ"
                : invoice?.pay_type === "transfer"
                ? "ເງິນໂອນ"
                : "ຕິດຫນີ້"}
            </p>
          </div>

          <div className="text-center space-y-3">
            <p>ເງິນຮັບ({invoice?.pay_currency === "LAK" ? "LAK" : "THB"})</p>
            <p className="text-gray-500 text-xl font-semibold">
              {invoice?.pay_currency === "LAK"
                ? formattedNumber(invoice?.money_received_lak ?? 0)
                : formattedNumber(invoice?.money_received_thb ?? 0)}
            </p>
          </div>

          <div className="text-center space-y-3">
            <p>ເງິນທອນ({invoice?.pay_currency === "LAK" ? "LAK" : "THB"})</p>
            <p className="text-gray-500 text-xl font-semibold">
              {invoice?.pay_currency === "LAK"
                ? formattedNumber(invoice?.money_cash_lak ?? 0)
                : formattedNumber(invoice?.m_discount_thb ?? 0)}
            </p>
          </div>
          <div className="text-center space-y-3">
            <p>ລາຄາລວມ({invoice?.pay_currency === "LAK" ? "LAK" : "THB"})</p>
            <p className="text-gray-500 text-xl font-semibold">
              {invoice?.pay_currency === "LAK"
                ? formattedNumber(invoice?.total_lak ?? 0)
                : formattedNumber(invoice?.total_thb ?? 0)}
            </p>
          </div>

          <div className="text-center space-y-3">
            <p>ສ່ວນຫຼຸດ({invoice?.pay_currency === "LAK" ? "LAK" : "THB"})</p>
            <p className="text-gray-500 text-xl font-semibold">
              {invoice?.pay_currency === "LAK"
                ? formattedNumber(invoice?.m_discount_lak ?? 0)
                : formattedNumber(invoice?.m_discount_thb ?? 0)}
            </p>
          </div>
          <div className="text-center space-y-3">
            <p>
              ລວມຈ່າຍທັງຫມົດ({invoice?.pay_currency === "LAK" ? "LAK" : "THB"})
            </p>
            <p className="text-gray-500 text-xl font-semibold">
              {invoice?.pay_currency === "LAK"
                ? formattedNumber(invoice?.total_checkout_lak ?? 0)
                : formattedNumber(invoice?.total_checkout_thb ?? 0)}
            </p>
          </div>
          <div className="text-center space-y-3">
            <p>ສະຖານະ</p>
            <p className="text-white">
              {invoice?.status === "cancel" ? (
                <span className="bg-red-600  rounded-lg px-3">ຍົກເລີກ</span>
              ) : invoice?.status === "padding" ? (
                <span className="bg-yellow-600 rounded-lg px-2">ຕິດໜີ້</span>
              ) : (
                <span className="bg-green-600 rounded-lg px-2">ສຳເລັດ</span>
              )}
            </p>
          </div>
          <div className="text-center space-y-3">
            <p>ວັນທີຊຳລະ</p>
            <p className="text-gray-500 font-semibold">
              {invoice?.status === "completed" ||
              invoice?.status === "cancel" ? (
                formatDate(invoice?.date_payment ?? "")
              ) : (
                <span className="text-red-500">ຍັງທັນຊຳລະ</span>
              )}
            </p>
          </div>
        </div>

        {/* detail product */}

        <h1 className="border-l-4 border-green-500 leading-3 ps-2 mt-10 mb-5">
          ລາຍລະອຽດສິນຄ້າ
        </h1>
        <div className=" mt-4">
          <Table
            classNames={{
              wrapper:
                "max-h-[300px] overflow-hidden p-0 rounded-lg shadow-lg scroll-thin border-b-2 border-r-2 border-l-2 border-blue-400",
              th: "bg-blue-500 text-white font-semibold text-sm",
            }}
          >
            <TableHeader>
              <TableColumn> ບາໂຄດ</TableColumn>
              <TableColumn>ຊື່ສິນຄ້າ</TableColumn>
              <TableColumn>ຫົວໜ່ວຍ</TableColumn>
              <TableColumn className="text-right">ຈໍານວນ</TableColumn>
              <TableColumn className="text-right">ລາຄາ (LAK)</TableColumn>
              <TableColumn className="text-right">ລາຄາ (THB)</TableColumn>
              <TableColumn className="text-right">ລາຄາລວມ (LAK)</TableColumn>
              <TableColumn className="text-right">ລາຄາລວມ (THB)</TableColumn>
            </TableHeader>
            <TableBody items={invoice?.details ?? []}>
              {(item) => (
                <TableRow key={item.barcode}>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.title + item.size}</TableCell>
                  <TableCell className="text-right">{item.unit}</TableCell>
                  <TableCell className="text-right">{item.qty}</TableCell>
                  <TableCell className="text-right">
                    {formattedNumber(item.retail_lak)}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.retail_thb}
                  </TableCell>
                  <TableCell className="text-right">{item.total_lak}</TableCell>
                  <TableCell className="text-right">
                    {formattedNumber(item.total_thb)}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* button back */}
        <div className="my-5 flex items-center justify-between">
          <Button onPress={() => window.history.back()} color="warning">
            <IoChevronBackOutline />
            ກັບຄືນ
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button color="primary">ແກ້ໄຂ ສະຖານະ</Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              variant="flat"
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem key="completed" color="success">
                ສຳເລັດ
              </DropdownItem>
              <DropdownItem key="padding" color="warning">
                ຕິດໜີ້
              </DropdownItem>
              <DropdownItem key="cancel" color="danger">
                ຍົກເລີກ
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
