"use client";
// import {NextUIProvider} from '@nextui-org/react'
import Navbar from "../components/Navbar";
import Sidebar from "../components/cashier/Sidebar";
import { protectRoute } from "../middleware/authMiddleware";

export default function Layout({ children }: { children: React.ReactNode }) {
  // protectRoute();

  return (
    <div className="flex flex-col">
      <div className="bg-blue-500 h-[8vh]">
        <Navbar />
        fs
      </div>
      <div className="h-[92vh] flex">
        <div className=" bg-blue-950">
          <Sidebar />
        </div>
        <div className="bg-white w-full px-3 pt-3 ">{children}</div>
      </div>
    </div>
  );
}
