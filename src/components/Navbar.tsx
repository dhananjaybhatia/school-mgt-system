import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      {/* search-bar */}
      <div className="hidden md:flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src={"/search.png"} alt="search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* icons */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className=" rounded-full w-7 h-7 flex justify-center items-center cursor-pointer">
          <Image src={"/message.png"} alt="message" width={20} height={20} />
        </div>
        <div className=" rounded-full w-7 h-7 flex justify-center items-center cursor-pointer relative">
          <Image
            src={"/announcement.png"}
            alt="announcement"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 bg-purple-500 rounded-full w-5 h-5 flex justify-center items-center text-white text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-black text-sm leading-3">
            John Doe
          </span>
          <span className="text-gray-500 text-xs text-right">Student</span>
        </div>
        {/* <Image
          src={"/avatar.png"}
          alt="message"
          width={36}
          height={36}
          className="rounded-full"
        /> */}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
