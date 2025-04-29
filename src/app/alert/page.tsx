"use client";
import React, { useState } from "react";
import CustomDialog from "@/app/components/CutomAlert";
import Swal from "sweetalert2";

const Home = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const openDialog = (type: "success" | "error" | "warning" | "info") => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };
  const testAlert = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Đây là một thông báo từ hệ thống.",
      icon: "success",
      confirmButtonText: "OK",
      background: "#3fd1f3",
      color: "#fff",
      iconColor: "#fff",
    });
  };

  return (
    <div>
      <button onClick={testAlert}>OK</button>
      <button
        onClick={() => openDialog("success")}
        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Success Dialog
      </button>
      <button
        onClick={() => openDialog("error")}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Error Dialog
      </button>
      <button
        onClick={() => openDialog("warning")}
        className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Warning Dialog
      </button>
      <button
        onClick={() => openDialog("info")}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Info Dialog
      </button>

      <CustomDialog
        isOpen={isDialogOpen}
        title="Thông báo"
        message="Đây là một thông báo từ hệ thống."
        type={dialogType}
        onClose={closeDialog}
      />
    </div>
  );
};

export default Home;
