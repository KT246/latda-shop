import { formattedNumber } from "@/app/helpers/funtions";
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
import { ReportProduct } from "@/app/lib/interface";
import { FetchReport } from "@/app/api/admin.product";
import useSWR from "swr";
import Swal from "sweetalert2";
import { apiResetQty } from "@/app/api/products";
import { toast } from "react-toastify";

const ReportProcuct = () => {
  /// state
  const [resportProduct, setReportProduct] =
    React.useState<ReportProduct | null>(null);

  /// useSWR
  const { data: dataRP, error: errorRP } = useSWR(
    `/api/admin/report-product`,
    FetchReport
  );

  /// use Effect
  React.useEffect(() => {
    if (dataRP) {
      setReportProduct(dataRP);
    }
  }, [dataRP]);

  /// handle reset qty
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleResetQty = async () => {
    Swal.fire({
      title: "Reset Stock",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "reset",
      cancelButtonText: "cancel",
      focusCancel: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const res = await apiResetQty();
          if (res?.status === 200) {
            toast.success("ສຳເລັດ");
          } else {
            console.error("Failed to reset stock:", res?.data?.message);
          }
        } catch (error) {
          console.error("Error reset stock:", error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };
  return (
    <div className="">
      <div className="flex items-center justify-between gap-5 py-5 border-b-2">
        <h1>ລາຍງານສິນຄ້າ</h1>
        <div className="bg-white p-1 shadow-lg rounded-lg">
          <Button
            onPress={handleResetQty}
            color="success"
            radius="sm"
            className="text-medium text-white"
          >
            {isLoading ? "..." : " ອັບເດດສະຕັອກ"}
          </Button>
        </div>
      </div>
      <div className="bg-white p-5 shadow-lg rounded-lg my-5">
        <h3 className="border-l-4 border-red-500 font-semibold leading-none ps-2 text-blue-500">
          ລາຍງານສິນຄ້າ
        </h3>
        <div className="grid grid-cols-4 gap-3 mt-3 text-white">
          <div className=" shadow-md  bg-gradient-to-tl to-cyan-300 from-cyan-600 rounded-lg p-2 ">
            <p className="border-b-2"> ຕົ້ນທືນທັງຫມົດ (ກີບ)</p>
            <p className="text-center font-bold py-3">
              <span className=" text-3xl me-1">
                {formattedNumber(resportProduct?.warehouse.total_cost_lak || 0)}
              </span>
              <span>ກີບ</span>
            </p>
          </div>
          <div className=" shadow-md  bg-gradient-to-tl to-yellow-300 from-yellow-600 rounded-lg p-2 ">
            <p className="border-b-2">ຕົ້ນທືນທັງຫມົດ (ບາດ)</p>
            <p className="text-center  font-bold py-3 text-white">
              <span className=" text-3xl me-1">
                {formattedNumber(resportProduct?.warehouse.total_cost_thb || 0)}
              </span>
              <span>ກີບ</span>
            </p>
          </div>

          <div className=" shadow-lg flex-1 bg-gradient-to-tl to-blue-400 from-blue-700 rounded-lg p-2">
            <p className=" border-b-2">ສິນຄ້າທັງຫມົດ</p>
            <p className=" text-3xl text-center font-semibold pt-5">
              {resportProduct?.warehouse.total_count_product ?? 0}
            </p>
            <p className="mt-2">ລາຍການ</p>
          </div>
          <div className=" shadow-lg flex-1 bg-gradient-to-tl to-purple-400 from-purple-700 rounded-lg p-2">
            <p className=" border-b-2">ຈຳນວນທັງຫມົດ</p>
            <p className=" text-3xl text-center font-semibold pt-5">
              {resportProduct?.warehouse.total_count_qty ?? 0}
            </p>
            <p className="mt-2">ອັນ</p>
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-3 bg-white p-5 shadow-lg rounded-lg">
        <h3 className="border-l-4 border-red-500 font-semibold leading-none ps-2  text-blue-500">
          ສິນຄ້າໃກ້ຫມົດ
        </h3>
        <Table
          selectionMode="single"
          color="primary"
          isHeaderSticky
          classNames={{
            th: "bg-blue-500 text-white font-semibold text-sm ",
            thead: "bg-none rounded-l-0",
            wrapper:
              "max-h-[25.5rem] overflow-y-auto p-0 rounded-lg shadow-lg scroll-thin border-b-2 border-r-2 border-l-2 border-blue-400",
          }}
        >
          <TableHeader>
            <TableColumn>Bracode</TableColumn>
            <TableColumn>ຊື່</TableColumn>
            <TableColumn className="text-right">ຈໍານວນ</TableColumn>
            <TableColumn className="text-right">ຕົ້ນທືນ(ກີບ)</TableColumn>
            <TableColumn className="text-right">ຕົ້ນທືນ(ບາດ)</TableColumn>
            <TableColumn className="text-center">ລາຍລະອຽດ</TableColumn>
          </TableHeader>
          <TableBody
            items={resportProduct?.productalert ?? []}
            emptyContent="ບໍ່ພົບສິນຄ້າ"
          >
            {(item) => (
              <TableRow key={item.barcode}>
                <TableCell>{item.barcode}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="text-right">{item.qty_balance}</TableCell>
                <TableCell className="text-right">
                  {formattedNumber(item.cost_lak ?? 0)}
                </TableCell>
                <TableCell className="text-right">
                  {formattedNumber(item.cost_thb ?? 0)}
                </TableCell>
                <TableCell>
                  <Tooltip content="ລາຍລະອຽດ" color="primary">
                    <Link
                      href={`/admin/products/edit/${item.barcode}`}
                      className="text-lg hover:text-blue-400 flex justify-center "
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
  );
};

export default ReportProcuct;
