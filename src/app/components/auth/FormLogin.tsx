"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@heroui/react";
import axios from "axios";
import useAuthStore from "@/app/store/authStores";
import { toast } from "react-toastify";
import { useRouter, redirect } from "next/navigation";
import { protectRoute } from "@/app/middleware/authMiddleware";

export default function FormLogin() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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

      if (res.data?.token) {
        const token = res.data?.token;
        const user = {
          username: res.data?.username,
          name: res.data?.name,
          path: res.data?.path,
        };

        Login(token, user);
        toast.success("ສຳເລັດ");
        const path = user?.path;

        if (path === 1) {
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
        toast.error("ລະບົບບໍ່ສາມາດໃຊແລ້ວ");
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
    <div className="grid grid-cols-2 gap-10 h-screen bg-slate-300">
      <div className="bg-[url('/skv.jpg')] bg-cover "></div>
      <div className="flex justify-center items-center ">
        <div className="w-[700px] h-[400px] bg-white bg-opacity-50 rounded-3xl px-20">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 justify-center items-center py-10"
          >
            <h3 className=" uppercase text-2xl font-bold">Login</h3>
            <Input
              type="text"
              label="ຊື່ຜູ້ໃຊ້"
              readOnly={loading}
              color="primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              label="ລະຫັດ"
              readOnly={loading}
              color="primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
