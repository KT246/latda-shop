"use client"
import React from "react";
import Link from "next/link";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { Tooltip } from "@heroui/react";

interface HeaderInter {
  name: string;
  linkCreate: string;
  linkLists: string;
  nameCreate: string;
  nameList: string;
}

function HeaderLinks({
  name,
  linkCreate,
  linkLists,
  nameCreate,
  nameList,
}: HeaderInter) {
  const validLinkCreate = linkCreate || "#";
  const validLinkLists = linkLists || "#";
  return (
    <div className="w-full flex justify-between items-center gap-5 border-b-2 py-2 ">
      <h3 className="w-full font-semibold text-xl">{name}</h3>
      {validLinkCreate && validLinkLists !== "#" ? (
        <div className="w-full flex justify-end gap-3 items-center">
          <Tooltip content={nameList}>
            <Link
              href={validLinkLists}
              className=" flex items-center justify-center text-3xl bg-blue-700 hover:bg-gray-500 duration-500 ease-in-out text-gray-50 hover:text-gray-200 rounded-md p-1 "
            >
              <CiViewList />
            </Link>
          </Tooltip>
          <Tooltip content={nameCreate}>
            <Link
              href={validLinkCreate}
              className=" flex items-center justify-center text-3xl bg-blue-700 hover:bg-green-500 duration-500 ease-in-out text-gray-50 hover:text-gray-200 rounded-md p-1"
            >
              <IoCreateOutline />
            </Link>
          </Tooltip>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeaderLinks;
