import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/admin/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="bg-blue-500 h-[8vh]">
        <Navbar />
      </div>
      <div className="h-[92vh] flex ">
        <div className=" bg-blue-950 w-[150px]">
          <Sidebar />
        </div>
        <div className="bg-white w-full p-3 ">{children}</div>
      </div>
    </div>
  );
}
