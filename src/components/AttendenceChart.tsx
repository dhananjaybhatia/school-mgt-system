"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tues",
    present: 70,
    absent: 30,
  },
  {
    name: "Wed",
    present: 74,
    absent: 26,
  },
  {
    name: "Thu",
    present: 67,
    absent: 33,
  },
  {
    name: "Fri",
    present: 65,
    absent: 35,
  },
];

const AttendenceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 ">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="capitalize font-black text-lg">attendence</h1>
        <Image
          src="/moreDark.png"
          alt=""
          width={20}
          height={20}
          className="text-gray-500"
        />
      </div>
      <div className=" w-full h-[90%]">
        <ResponsiveContainer>
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "5px", paddingBottom: "40px" }}
            />
            <Bar
              dataKey="present"
              fill="#a9def9"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="absent"
              fill="#ff99c8"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendenceChart;
