import {
  formatDate,
  formattedNumber,
  getTodayDate,
} from "@/app/helpers/funtions";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import { EyeIcon } from "./Home";
import axios from "axios";
import { toast } from "react-toastify";
import {
  GetExChange,
  GetReportSale,
  PutExChange,
} from "@/app/api/admin.product";
import { ReportSaleResponse } from "@/app/lib/interface";
import Swal from "sweetalert2";
import { apiResetQty } from "@/app/api/products";
import { TbCurrencyKip } from "react-icons/tb";

const ReportInvoice = () => {
  const [resportSale, setReportSale] =
    React.useState<ReportSaleResponse | null>(null);
  const [dateStart, setDateStart] = React.useState(getTodayDate());
  const [dateEnd, setDateEnd] = React.useState(getTodayDate());

  const [exchange, setExchange] = React.useState<number | 0>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  /// funtions
  const fetchData = async () => {
    try {
      const res: any = await GetReportSale(dateStart, dateEnd);
      setReportSale(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getExchange = async () => {
    try {
      const res: any = await GetExChange();
      if (res.status === 200) {
        setExchange(res.data.rate);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message;
        toast.error(errorMessage);
      } else {
        toast.error("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dateEnd < dateStart) {
      toast.warning("ວັນທີສີ້ນສຸດ ຕ້ອງໃຫຍ່ກວ່າ ວັນທີເລີ່ມ");
      return;
    } else {
      fetchData();
    }
  };

  const handleUpdateEchange = async () => {
    const { value: rate } = await Swal.fire({
      title: "ອັບເດດ Exchange",
      input: "text",
      inputPlaceholder: "ພິມຈຳນວນ...",
      showCancelButton: true,
      confirmButtonText: "ບັນທຶກ",
      cancelButtonText: "ຍົກເລີກ",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return "ກະລຸນາປ້ອນຈຳນວນ Exchange!";
        }
        return null;
      },
      didOpen: () => {
        Swal.getInput()?.focus();
      },
    });

    if (rate) {
      try {
        const res: any = await PutExChange({ newRate: rate });
        if (res.status === 200) {
          toast.success("ອັບເດດອັຕາແລປ່ຽນສຳເລັດ");
          setExchange(res.data.newRate);
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          const errorMessage = e.response.data?.message;
          toast.error(errorMessage);
        } else {
          toast.error("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ");
        }
      }
    }
  };

  /// useEffect

  React.useEffect(() => {
    fetchData();
    getExchange();
  }, []);
  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <form
          onSubmit={handleSubmit}
          className="mt-5 bg-white shadow-lg p-5 flex justify-between items-center rounded-lg"
        >
          <div className="flex items-center gap-4">
            <label>ເລີ່ມຕົ້ນ</label>
            <div className="border-gray-300 border-2 px-3 py-1 rounded-md">
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <label>ສີ້ນສຸດ</label>
            <div className="border-gray-300 border-2 px-3 py-1 rounded-md">
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <Button type="submit" color="primary" radius="sm">
              ຄົ້ນຫາ
            </Button>
          </div>
          <div className="flex items-center gap-5">
            <p className=" capitalize flex items-center gap-2 bg-gradient-to-br from-yellow-700 to-yellow-400 text-white px-2 rounded-lg">
              <span className="">Exchange rate:</span>
              <span className="text-xl font-bold">{exchange}</span>
            </p>
            <Button color="warning" radius="sm" onPress={handleUpdateEchange}>
              {isLoading ? "..." : " ອັບເດດ Rate"}
            </Button>{" "}
          </div>
        </form>
        <div className=" bg-white p-5 shadow-lg rounded-lg text-white  ">
          <h3 className="border-l-4 border-red-600 text-medium font-semibold leading-none ps-2 text-blue-500">
            ລາຍງານໃບບິນ
          </h3>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="text-sm flex flex-col justify-between shadow-lg bg-gradient-to-tr to-blue-400 from-blue-600 rounded-lg p-2 ">
              <p className=" border-b-2 text-end">
                ຂາຍໄດ້ທັງໝົດ(ບໍ່ລວມບິນຕິດໜີ້)
              </p>
              <div className="text-center  font-bold py-3 ">
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.saleCompleted.total_sale_complet_lak ??
                      0
                  )}
                  <span className="text-sm ms-1">LAK</span>
                </p>
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.saleCompleted.total_sale_complet_thb ??
                      0
                  )}
                  <span className="text-sm ms-1">THB</span>
                </p>
              </div>
              <p>ຈຳນວນ: {resportSale?.detail.saleCompleted.bill_count}</p>
            </div>
            <div className=" flex flex-col justify-between shadow-lg bg-gradient-to-tr to-green-400 from-green-600 rounded-lg p-2 ">
              <p className="text-end border-b-2 ">ກຳໄລ</p>
              <div className="text-center  font-bold py-3">
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.profit.total_profit_lak ?? 0
                  )}
                  <span className="text-sm ms-1">LAK</span>
                </p>
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.profit.total_profit_thb ?? 0
                  )}
                  <span className="text-sm ms-1">THB</span>
                </p>
              </div>
              <p className="text-[13px]">ຫລັງຫັກຈາກສ່ວນຫລຸດ!</p>
            </div>

            {/* <div className="flex-1 bg-gradient-to-tr to-red-400 from-red-600 shadow-lg  rounded-lg p-2 pb-7">
              <p className=" border-b-2 text-end">ສ່ວນຫຼຸດສິນຄ້າ</p>
              <p className="text-center  font-bold py-3">
                <span className=" text-3xl me-1">
                  {formattedNumber(
                    resportSale?.detail.profit.total_discount_lak ?? 0
                  )}
                </span>
                <span>ກີບ</span>
              </p>
            </div> */}
            <div className="flex-1 bg-gradient-to-tr to-orange-400 from-orange-600 shadow-lg  rounded-lg p-2 pb-7">
              <p className="border-b-2 text-end">ສ່ວນຫຼຸດຫນ້າຮ້ານ</p>
              <div className="text-center  font-bold py-3">
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.discount.total_discount_lak ?? 0
                  )}
                  <span className="text-sm ms-1">LAK</span>
                </p>
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.discount.total_discount_thb ?? 0
                  )}
                  <span className="text-sm ms-1">THB</span>
                </p>
              </div>
            </div>

            <div className="flex-1 bg-gradient-to-tr  to-warning-400 from-warning-600 shadow-lg  rounded-lg p-2">
              <p className="border-b-2 text-end">ຕິດໜີ້</p>
              <div className="text-center  font-bold py-3">
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.saleDebt.total_sale_complet_lak ?? 0
                  )}
                  <span className="text-sm ms-1">LAK</span>
                </p>
                <p className=" text-2xl me-1">
                  {formattedNumber(
                    resportSale?.detail.saleDebt.total_sale_complet_thb ?? 0
                  )}
                  <span className="text-sm ms-1">THB</span>
                </p>
              </div>

              <p>ຈຳນວນ: {resportSale?.detail.saleDebt.bill_count ?? 0}</p>
            </div>
            <div className="flex flex-col justify-between bg-gradient-to-tr to-danger-400 from-danger-600 shadow-lg  rounded-lg p-2">
              <p className="border-b-2 text-end">ຖືກຍົກເລີກ</p>
              <p className="text-center text-2xl font-bold py-3">
                {resportSale?.detail.saleCancle.bill_count ?? 0}
              </p>
              <p>ຈຳນວນ</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col gap-3 bg-white p-5 shadow-lg rounded-lg">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 text-blue-500">
              ບິນຕິດຫນີ້
            </h3>
            <Table
              selectionMode="single"
              color="success"
              isHeaderSticky
              classNames={{
                th: "bg-warning-500 text-black font-semibold text-sm ",
                wrapper:
                  " max-h-[14rem] overflow-y-auto p-0 rounded-lg shadow-lg scroll-thin border-b-2 text-end border-r-2 border-l-2 border-warning-500",
              }}
            >
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>ວັນທີ</TableColumn>
                <TableColumn>ຊື່ລູກຄ້າ</TableColumn>
                <TableColumn className="text-right">
                  ລາຄາລວມທັງຫມົດ(ກີບ)
                </TableColumn>
                <TableColumn className="text-center">ລາຍລະອຽດ</TableColumn>
              </TableHeader>
              <TableBody
                items={resportSale?.invoice_debt ?? []}
                emptyContent="ບໍ່ພົບບິນ"
              >
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{formatDate(item.date_create)}</TableCell>
                    <TableCell>{item.member_id}</TableCell>
                    <TableCell className="text-right">
                      {formattedNumber(item.total_checkout_lak ?? 0)}
                    </TableCell>

                    <TableCell>
                      <Tooltip content="ລາຍລະອຽດ" color="success">
                        <Link
                          href={`/admin/history/detail/` + item.id}
                          className="text-lg hover:text-green-400 flex justify-center "
                        >
                          <EyeIcon />
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="w-1/2 flex flex-col gap-3 bg-white p-5 shadow-lg rounded-lg">
            <h3 className="border-l-4 border-red-600 font-semibold leading-none ps-2 text-blue-500">
              ບິນຍົກເລີກ
            </h3>
            <Table
              selectionMode="single"
              color="danger"
              isHeaderSticky
              classNames={{
                th: "bg-danger text-black font-semibold text-sm ",
                wrapper:
                  " max-h-[14rem] overflow-y-auto p-0 rounded-lg shadow-lg scroll-thin border-b-2 text-end border-r-2 border-l-2 border-danger",
              }}
            >
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>ວັນທີ</TableColumn>
                <TableColumn>ຊື່ລູກຄ້າ</TableColumn>
                <TableColumn className="text-right">
                  ລາຄາລວມທັງຫມົດ(ກີບ)
                </TableColumn>
                <TableColumn className="text-center">ລາຍລະອຽດ</TableColumn>
              </TableHeader>
              <TableBody
                items={resportSale?.invoice_cancel ?? []}
                emptyContent="ບໍ່ພົບບິນ"
              >
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{formatDate(item.date_create)}</TableCell>
                    <TableCell>{item.member_id}</TableCell>
                    <TableCell className="text-right">
                      {formattedNumber(item.total_checkout_lak ?? 0)}
                    </TableCell>

                    <TableCell>
                      <Tooltip content="ລາຍລະອຽດ" color="danger">
                        <Link
                          href={`/admin/history/detail/` + item.id}
                          className="text-lg hover:text-danger-400 flex justify-center "
                        >
                          <EyeIcon />
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportInvoice;
