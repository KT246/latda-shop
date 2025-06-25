"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@heroui/react";
import axios from "axios";
import useAuthStore from "@/app/store/authStores";
import { toast } from "react-toastify";
import { useRouter, redirect } from "next/navigation";

export default function FormLogin() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [colorName, setColorName] = React.useState<"default" | "primary">(
    "default"
  );
  const [colorPassword, setColorPassword] = React.useState<
    "default" | "primary"
  >("default");

  const { token, user } = useAuthStore();
  const Login = useAuthStore((state) => state.login);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (username === "") {
      toast.error("ກະລຸປ້ອນຊື່ຜູ້ໃຊ້");
      console.log("ກະລຸປ້ອນຊື່ຜູ້ໃຊ້");
      setLoading(false);
      return;
    }
    if (password === "") {
      toast.error("ກະລຸປ້ອນລະຫັດ");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/login",
        {
          username,
          password,
        }
      );
      const data = res.data;
      if (data?.token) {
        const token = data?.token;
        const user = {
          username: data?.username,
          name: data?.name,
          path: data?.path,
        };

        Login(token, user);
        toast.success("ສຳເລັດ");
        const path = user?.path;

        if (path === 0 || path === 1) {
          router.push("/admin");
        }
        if (path === 2) {
          router.push("/cashier");
        }
      }
    } catch (e) {
      setLoading(false);
      if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data?.message;
        toast.error(errorMessage);
      } else {
        toast.error("ລະບົບບໍ່ສາມາດໃຊ້ແລ້ວ");
      }
    }
  };

  useEffect(() => {
    if (token) {
      const path = user?.path;

      if (path === 1) {
        return redirect("/admin");
      }
      if (path === 2) {
        return redirect("/cashier");
      }
    }
  }, [token]);

  return (
    <div className="grid grid-cols-1 h-screen bg-slate-300 lg:grid-cols-2">
      <div className="bg-[url('/skv.jpg')] bg-cover lg:block hidden" />
      <div className="flex justify-center items-center px-5 md:px-10 lg:px-20">
        <div className="w-full bg-white bg-opacity-50 rounded-3xl px-10 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 justify-center items-center py-10 w-full"
          >
            <h3 className=" uppercase text-2xl font-bold leading-none ">
              latda-shop
            </h3>
            <p className="text-gray-500 text-sm leading-none">
              ລັອກອິນເຂົ້າໃຊ້ງານ
            </p>
            <Input
              type="text"
              label="ຊື່ຜູ້ໃຊ້"
              readOnly={loading}
              color={colorName}
              variant="bordered"
              classNames={{
                inputWrapper: "border-2 border-gray-400 ",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setColorName("primary")}
              onBlur={() => setColorName("default")}
            />
            <Input
              type="password"
              label="ລະຫັດ"
              readOnly={loading}
              color={colorPassword}
              variant="bordered"
              classNames={{
                inputWrapper: "border-2 border-gray-400 ",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setColorPassword("primary")}
              onBlur={() => setColorPassword("default")}
            />
            <Button
              type="submit"
              isLoading={loading}
              disabled={loading}
              color="primary"
              className="w-full"
            >
              ລັອກອິນ
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
