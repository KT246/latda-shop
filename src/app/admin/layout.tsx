import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/admin/Sidebar";
export const metadata = {
  title: "Admin - LATDA",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="bg-blue-500 h-[8vh]">
        <Navbar />
      </div>
      <div className="h-[92vh] flex gap-5">
        <div className=" bg-blue-950 w-[200px]">
          <Sidebar />
        </div>
        <div className="bg-white w-full">{children}</div>
      </div>
    </div>
  );
}
