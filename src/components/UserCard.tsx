import Image from "next/image";
import React from "react";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-purple even:bg-yellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="bg-white py-1 px-2 rounded-full text-xs text-darkGreen">
          01/01/2025
        </span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className="my-4 text-2xl font-semibold">1,234</h1>
      <h3 className="capitalize text-sm font-medium text-gray-500">{type}</h3>
    </div>
  );
};

export default UserCard;
