"use client";
import { Button, Select, SelectItem } from "@heroui/react";
import React from "react";
import { useCartStore } from "@/app/store/cartStore";
import { apiGetCart } from "@/app/api/products";

const SelectCart = () => {
  const { cartName, updateCartName, maxMinqty, updateMaxMinqty, updateCart } =
    useCartStore();

  const handleCart = (cartname: string) => {
    updateCartName(cartname);
    handleGetCart(cartname);
  };
  const handleMaxMinqty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMaxMinqty(Number(e.target.value));
  };

  const handleGetCart = async (id: string) => {
    try {
      const res = await apiGetCart(id);
      if (res.data.status === "error") {
        updateCart(null);
        return;
      }
      updateCart(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mb-3 flex justify-start gap-3">
      <Button
        onPress={() => handleCart("1")}
        color={`${cartName === "1" ? "primary" : "default"}`}
      >
        ກະຕ່າ 1
      </Button>
      <Button
        onPress={() => handleCart("2")}
        color={`${cartName === "2" ? "primary" : "default"}`}
      >
        ກະຕ່າ 2
      </Button>
      <Button
        onPress={() => handleCart("3")}
        color={`${cartName === "3" ? "primary" : "default"}`}
      >
        ກະຕ່າ 3
      </Button>
      <div className="w-full flex justify-end ">
        <div className="w-32">
          <select
            value={maxMinqty}
            onChange={handleMaxMinqty}
            className="px-2 py-2 rounded-lg cursor-pointer"
          >
            <option className="cursor-pointer" value={0}>
              ຈຳນວນຫນ້ອຍ
            </option>
            <option className="cursor-pointer" value={1}>
              ຈຳນວນຫລາຍ
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectCart;
