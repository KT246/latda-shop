"use client";
import { Input, Spinner } from "@heroui/react";
import React, { useEffect } from "react";
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
import { PlaySound } from "@/app/helpers/funtions";
import useAuthStore from "@/app/store/authStores";

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
  const { token, user } = useAuthStore();
  React.useEffect(() => {
    if (token) {
      if (searchType === "code") FindProductByCode();
      if (searchType === "title") FindProductByTitle();
      if (searchType === "page") FindProductByPage();
      if (searchType === "no") FindProductByNo();
    }
  }, [key]);

  React.useEffect(() => {
    if (token) FindProductByCode();
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
      setProductsTemp((await apiProductByCode(key)).data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByTitle = async () => {
    try {
      setProductsTemp((await apiProductByTitle(key)).data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByPage = async () => {
    try {
      setProductsTemp((await apiProductByPage(key)).data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByNo = async () => {
    try {
      setProductsTemp((await apiProductByNo(key)).data);
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
            className={`${
              searchType === "code"
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
            className={`${
              searchType === "title"
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
            className={`${
              searchType === "page"
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
            className={`${
              searchType === "no"
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
          />
        </div>
        <div className="w-full mt-2 h-[55vh] overflow-auto border scroll-hide">
          <table className="w-full table-auto min-w-[800px]">
            <thead className="sticky top-0 bg-white shadow text-sm z-10">
              <tr>
                <th className="border border-gray-300 w-12"></th>
                <th className="border border-gray-300 min-w-[120px]">
                  barcode
                </th>
                <th className="border border-gray-300 min-w-[250px]">
                  ຊື່ສິນຄ້າ
                </th>
                <th className="border border-gray-300 min-w-[120px]">code</th>
                <th className="border border-gray-300 w-[70px]">page</th>
                <th className="border border-gray-300 w-[70px]">No.</th>
              </tr>
            </thead>
            <tbody>
              {productsTemp.length > 0 ? (
                productsTemp.map((product: any, index: number) => (
                  <tr
                    key={product.id || index}
                    onDoubleClick={() => {}}
                    className="hover:bg-blue-100 transition duration-200"
                  >
                    <td className="border border-gray-300 p-1 text-center ">
                      {product.qty_balance > 0 && (
                        <button
                          onClick={() => handleAddToCart(product.barcode)}
                          className="bg-green-600 hover:bg-green-500 text-white w-full py-1 rounded"
                        >
                          +
                        </button>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1  text-start">
                      <Highlighter
                        highlightClassName="bg-yellow-300"
                        searchWords={[barcode]}
                        autoEscape
                        textToHighlight={product.barcode}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1  whitespace-pre-line break-words">
                      {searchType === "title" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape
                          textToHighlight={product.title}
                        />
                      ) : (
                        product.title
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1  text-start">
                      {searchType === "code" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape
                          textToHighlight={product.code}
                        />
                      ) : (
                        product.code
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1  text-center">
                      {searchType === "page" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape
                          textToHighlight={product.page}
                        />
                      ) : (
                        product.page
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1  text-center">
                      {searchType === "no" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape
                          textToHighlight={product.No}
                        />
                      ) : (
                        product.No
                      )}
                    </td>
                  </tr>
                ))
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
