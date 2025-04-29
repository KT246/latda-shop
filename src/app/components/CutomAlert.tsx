import React, { useState } from "react";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

// Custom Alert Dialog Component
interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  title,
  message,
  type,
  onClose,
}) => {
  if (!isOpen) return null;

  // Điều chỉnh màu sắc tùy theo loại
  const getDialogColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "";
    }
  };

  const icon = () => {
    switch (type) {
      case "success":
        return <IoCheckmarkCircleOutline className="text-3xl" />;
      case "error":
        return <IoCloseCircleOutline className="text-3xl" />;
      case "warning":
        return <IoCloseCircleOutline className="text-3xl" />;
      case "info":
        return <IoCheckmarkCircleOutline className="text-3xl" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-96 ${getDialogColor()}`}
      >
        <div className="flex items-center gap-3">
          {icon()}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-700 mt-2">{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 duration-200"
          >
            Đóng
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-200"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
