"use client";
import React, { useState } from "react";
import { Input, Button } from "@heroui/react";

import Image from "next/image";

export default function Account() {
  const [changes, setChanges] = React.useState(false);
  const [names, setNames] = React.useState("khamtay");
  const handleChanges = () => {
    setChanges(!changes);
  };
  const handleChangesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNames(e.target.value);
  };
  // alert(changes);
  console.log(changes);
  return (
    <div className="ms-9 mt-7 w-[89vw] h-[84vh] bg-gray-100 rounded-medium px-4 py-2">
      <div className="grid grid-cols-3 p-3">
        <div className="pt-5">
          <div className="w-[400px] h-[500px] relative rounded-lg overflow-hidden ">
            <Image
              src={"/CV.jpg"}
              alt="User Profile"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className=" col-span-2 flex flex-col ">
          <h3 className="text-lg font-semibold border-l-3 border-blue-500 pl-2 mb-5">
            ຂໍ້ມູນຜູ້ໃຊ້
          </h3>
          <div className="grid grid-cols-2 gap-5">
            <Input
              type="text"
              color="secondary"
              size="md"
              label="ຊື່ຜູ້ໃຊ້"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
            />
            <Input
              type="text"
              color="default"
              size="md"
              label="ເບີຕິດຕໍ່"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
            />
            <Input
              type="text"
              color="default"
              size="md"
              label="ວັນເດຶອນປີເກີດ"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
            />

            <Input
              type="text"
              color="default"
              size="md"
              label="ວັນເລີ່ມວຽກ"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
            />
            <Input
              type="text"
              color="default"
              size="md"
              label="ໜ້າທີ່"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
              className="col-span-2"
            />
            <Input
              type="text"
              color="default"
              size="md"
              label="ທີ່ຢູ່"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
              className="col-span-2"
            />
            <h3 className="text-lg font-semibold border-l-3 border-blue-500 pl-2 col-span-2">
              ປ່ຽນລະຫັດ
            </h3>
            <Input
              type="password"
              color="default"
              size="md"
              label="ລະຫັດເກົ່າ"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
            />
            <Input
              type="password"
              color="default"
              size="md"
              label="ລະຫັດໃໝ່"
              value={names}
              onChange={handleChangesInput}
              readOnly={!changes}
            />
          </div>
          <div className="flex justify-end items-center mt-10">
            <div>
              {changes ? (
                <Button color="primary" onPress={handleChanges}>
                  ບັນທືກ
                </Button>
              ) : (
                <Button color="warning" onPress={handleChanges}>
                  ແກ້ໄຂ
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
