"use client";

import Image from "next/image";
import React, { useState } from "react";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendence"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create" ? "bg-yellow" : type === "update" ? "bg-blue" : "bg-pink";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action={""} className="p-4 flex flex-col gap-4">
        <span className="text-center font-semibold">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : (
      "create or update form"
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${size} flex justify-center items-center rounded-full ${bgColor}`}
      >
        <Image src={`/${type}.png`} alt="" width={14} height={14} />
      </button>
      {open && (
        <div className="w-screen h-full absolute top-0 left-0 bg-black/70 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]2xl:w-[40%]">
            <Form />

            <div
              className="absolute top-4 right-4 cursor-pointer w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={10} height={10} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
