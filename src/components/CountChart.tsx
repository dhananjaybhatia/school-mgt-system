"use client";

import Image from "next/image";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    count: 45,
    fill: "#FFBBD9",
  },
  {
    name: "Boys",
    count: 55,
    fill: "#a9def9",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="capitalize font-black text-lg">student</h1>
        <Image
          src="/moreDark.png"
          alt=""
          width={20}
          height={20}
          className="text-gray-500"
        />
      </div>
      <div className=" w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={25}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale1.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTOTOM */}
      <div className="flex justify-center gap-16 ">
        <div className="flex flex-col gap-1 items-center leading-5 ">
          <div className="w-5 h-5 rounded-full  bg-blue" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-gray-300 text-xs">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1 items-center leading-5">
          <div className="w-5 h-5 rounded-full bg-[#FFCCE1]" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-gray-300 text-xs">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
