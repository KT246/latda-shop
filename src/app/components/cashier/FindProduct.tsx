"use client";
import { Input, Spinner } from "@heroui/react";
import React from "react";
import Highlighter from "react-highlight-words";
import { useCartStore } from "@/app/store/cartStore";
import Swal, { SweetAlertOptions } from "sweetalert2";
import {
  apiProductByCode,
  apiProductByNo,
  apiProductByPage,
  apiProductByTitle,
  apiAddToCart,
} from "@/app/api/products";
import { SwalNotification } from "@/app/helpers/alers";
import { toast } from "react-toastify";
import axios from "axios";
import { PlaySound } from "@/app/helpers/funtions";

const FindProduct = () => {
  const { cartName, updateCart, searchType, updateSearchType, maxMinqty } =
    useCartStore();
  const [key, setKey] = React.useState("");
  const [barcode, setBarcode] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [productsTemp, setProductsTemp] = React.useState<any>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  /////////////////////////////// Alert /////////////////////
  const alertAddToCart = async (barCode: string, value: number) => {
    try {
      const res = await apiAddToCart({
        barcode: barCode.trim(),
        qty: value,
        cart_name: cartName,
      });
      if (res.data.status !== "error") {
        updateCart(res.data);
        setBarcode("");
        PlaySound("success");
      } else {
        PlaySound("warning");
        setBarcode("");
        SwalNotification(res.data.message, "warning");
      }
    } catch (error) {
      SwalNotification("ເກີດຂໍ້ຜິດພາດ", "error");
      throw error;
    }
  };

  const addMaxQty = async (barCode: string) => {
    const options: SweetAlertOptions = {
      title: "ປ້ອນຈຳນວນ",
      input: "number",
      inputAttributes: {
        min: "0",
        max: "1000",
        step: "1",
      },
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: async (value) => {
        if (!value || isNaN(value)) {
          Swal.showValidationMessage("ກະລຸນາປ້ອນຈຳນວນ");
        }

        return Number(value);
      },
    };
    Swal.fire(options).then(async (result) => {
      if (result.isConfirmed) {
        const qty = result.value;
        alertAddToCart(barCode, qty);
      }
    });
  };
  /////////////////////////////// End Alert /////////////////////
  React.useEffect(() => {
    if (key.length > 0) {
      if (searchType === "code") {
        FindProductByCode();
      }
      if (searchType === "title") {
        FindProductByTitle();
      }
      if (searchType === "page") {
        FindProductByPage();
      }
      if (searchType === "no") {
        FindProductByNo();
      }
    } else {
      setProductsTemp([]);
    }
  }, [key]);

  React.useEffect(() => {
    FindProductByCode();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (barcode !== "") {
      if (maxMinqty === 1) {
        return addMaxQty(barcode);
      }
      try {
        const res = await apiAddToCart({
          barcode: barcode,
          qty: 1,
          cart_name: cartName,
        });
        if (res.data.status !== "error") {
          updateCart(res.data);
          setBarcode("");
          PlaySound("success");
        } else {
          PlaySound("warning");
          setBarcode("");
          SwalNotification(res.data.message, "warning");
        }
      } catch (error) {
        SwalNotification("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ", "error");
        throw error;
      }
    } else {
      setProductsTemp([]);
    }
  };

  const handleAddToCart = async (barcodet: string) => {
    if (maxMinqty === 1) {
      return addMaxQty(barcodet);
    }
    try {
      const res = await apiAddToCart({
        barcode: barcodet,
        qty: 1,
        cart_name: cartName,
      });
      if (res.data.status !== "error") {
        updateCart(res.data);
        setBarcode("");
        PlaySound("success");
      } else {
        PlaySound("warning");
        SwalNotification(res.data.message, "warning");
      }
    } catch (e) {
      SwalNotification("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ", "error");
      console.error(e);
    }
  };

  const FindProductByCode = async () => {
    try {
      const res = await apiProductByCode(key);
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByTitle = async () => {
    try {
      const res = await apiProductByTitle(key);
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByPage = async () => {
    try {
      const res = await apiProductByPage(key);
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByNo = async () => {
    try {
      const res = await apiProductByNo(key);
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className=" w-full p-2  rounded-lg shadow-lg bg-white uppercase border ">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            color="primary"
            size="md"
            variant="bordered"
          // classNames={{
          //   label: "text-#000 font-semibold",
          // }}
          />
          {message && (
            <span className="ps-2 text-sm mt-2 text-red-500">{message}</span>
          )}
        </form>
      </div>
      <div className=" w-full mt-2 p-2  rounded-lg shadow-lg bg-white">
        <div className=" flex justify-start gap-2 my-2">
          <span
            onClick={() => {
              updateSearchType("code");
              localStorage.setItem("searchType", "code");
              FindProductByCode();
            }}
            className={`${searchType === "code"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
              }  rounded-lg p-1 text-sm ease-in-out duration-300 cursor-pointer`}
          >
            code
          </span>
          <span
            onClick={() => {
              updateSearchType("title");
              localStorage.setItem("searchType", "title");
              FindProductByTitle();
            }}
            className={`${searchType === "title"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
              }  rounded-lg p-1 text-sm ease-in-out duration-300 cursor-pointer`}
          >
            title
          </span>
          <span
            onClick={() => {
              updateSearchType("page");
              localStorage.setItem("searchType", "page");
              FindProductByPage();
            }}
            className={`${searchType === "page"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
              }  rounded-lg p-1 text-sm ease-in-out duration-300 cursor-pointer`}
          >
            page
          </span>
          <span
            onClick={() => {
              updateSearchType("no");
              localStorage.setItem("searchType", "no");
              FindProductByNo();
            }}
            className={`${searchType === "no"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
              }  rounded-lg p-1 text-sm ease-in-out duration-300 cursor-pointer`}
          >
            No.
          </span>
        </div>
        <div>
          <Input
            onChange={(e) => setKey(e.target.value)}
            defaultValue={key}
            ref={inputRef}
            type="text"
            label={
              searchType === "code"
                ? "code"
                : searchType === "page"
                  ? "page"
                  : searchType === "no"
                    ? "no"
                    : "title"
            }
            color="primary"
            size="md"
            variant="bordered"
            classNames={{
              label: "text-#000",
            }}
          />
        </div>
        <div className=" w-full mt-2 h-[55vh] overflow-auto border">
          <table className="w-full">
            <thead className=" sticky top-0 bg-white shadow-lg  text-sm">
              <tr>
                <th className="border  border-gray-300 ">
                </th>
                <th className="border  border-gray-300">barcode</th>
                <th className="border  border-gray-300">ຊື່ສິນຄ້າ</th>
                <th className="border  border-gray-300">code</th>
                <th className="border  border-gray-300">page</th>
                <th className="border  border-gray-300">No.</th>
              </tr>
            </thead>
            <tbody>
              {productsTemp.length > 0 ? (
                productsTemp.map((product: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      onDoubleClick={() => { }}
                      className=" hover:bg-blue-100 ease-in-out duration-300"
                    >
                      <td className="border border-gray-300 px-2">
                        {product.qty_balance > 0 &&
                          <button
                            onClick={() => handleAddToCart(product.barcode)}
                            className="hover:bg-green-500 bg-green-600 text-white w-full p-1 rounded-md"
                          >
                            +
                          </button>}

                      </td>
                      <td className="py-2 border  border-gray-300 text-start">
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[barcode]}
                          autoEscape={true}
                          textToHighlight={product.barcode}
                        />
                      </td>
                      <td className="py-2 border  border-gray-300  break-all whitespace-normal">
                        {searchType === "title" ? (
                          <Highlighter
                            highlightClassName="bg-yellow-300"
                            searchWords={[key]}
                            autoEscape={true}
                            textToHighlight={product.title}
                          />
                        ) : (
                          product.title
                        )}
                      </td>
                      <td className="py-2 border  border-gray-300">
                        {searchType === "code" ? (
                          <Highlighter
                            highlightClassName="bg-yellow-300"
                            searchWords={[key]}
                            autoEscape={true}
                            textToHighlight={product.code}
                          />
                        ) : (
                          product.code
                        )}
                      </td>
                      <td className="py-2 border  border-gray-300 text-center">
                        {searchType === "page" ? (
                          <Highlighter
                            highlightClassName="bg-yellow-300"
                            searchWords={[key]}
                            autoEscape={true}
                            textToHighlight={product.page}
                          />
                        ) : (
                          product.page
                        )}
                      </td>
                      <td className="py-2 border  border-gray-300 text-center">
                        {searchType === "no" ? (
                          <Highlighter
                            highlightClassName="bg-yellow-300"
                            searchWords={[key]}
                            autoEscape={true}
                            textToHighlight={product.No}
                          />
                        ) : (
                          product.No
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="flex justify-center items-center h-52 w-full">
                      <p className="text-center">ບໍ່ມີຂໍ້ມູນ</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FindProduct;
