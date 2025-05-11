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
        barcode: barCode,
        qty: value,
        cart_name: cartName,
      });
      if (res.data.status !== "error") {
        SwalNotification("ເພີ່ມສຳເລັດ", "success");
        updateCart(res.data);
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

  const PlaySound = () => {
    const audio = new Audio("/sound/wrong.mp3");
    audio.play();
  };

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
        }
      } catch (error) {
        throw error;
      }
    } else {
      setProductsTemp([]);
    }
  };
  //////////
  const handleAddToCart = async (barcodet: string) => {
    console.log("add: " + barcodet);
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
        SwalNotification("ເພີ່ມສຳເລັດ", "success");
        updateCart(res.data);
      }
    } catch (error) {
      throw error;
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
      <div className=" w-full p-2  rounded-lg shadow-lg bg-white uppercase ">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            color="success"
            size="md"
          />
          {message && (
            <span className="ps-2 text-sm mt-2 text-red-500">{message}</span>
          )}
        </form>
      </div>
      <div className=" w-full mt-5 p-2  rounded-lg shadow-lg bg-white h-[62vh] uppercase">
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
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
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
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
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
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
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
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
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
            color="success"
            size="md"
          />
        </div>
        <div className=" w-full mt-2 h-[70%] overflow-auto border">
          <table className="w-full">
            <thead className=" sticky top-0 bg-white shadow-lg uppercase">
              <tr>
                <th className="border  border-gray-300 w-[85px]">
                  ເພີ່ມເຂົ້າກະຕ່າ
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
                      onDoubleClick={() => {}}
                      className=" hover:bg-blue-100 ease-in-out duration-300"
                    >
                      <td className="border border-gray-300 w-[85px] px-2">
                        <button
                          onClick={() => handleAddToCart(product.barcode)}
                          className="hover:bg-green-500 bg-green-600 text-white w-full py-1 rounded-md"
                        >
                          ເພີ່ມ
                        </button>
                      </td>
                      <td className="py-2 border  border-gray-300">
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[barcode]}
                          autoEscape={true}
                          textToHighlight={product.barcode}
                        />
                      </td>
                      <td className="py-2 border  border-gray-300">
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
                  <td className="fixed bottom-40 right-80">
                    <Spinner
                      classNames={{ label: "text-foreground mt-4" }}
                      label="ກຳລັງໂຫລດ"
                      variant="simple"
                    />
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
