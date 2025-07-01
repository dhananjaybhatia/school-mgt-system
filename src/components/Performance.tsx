"use client";

import Image from "next/image";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#a9def9" },
  { name: "Group B", value: 8, fill: "#fcf6bd" },
];
const Performance = () => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className={"text-3xl font-bold"}>9.2</h1>
        <p className="text-gray-400 text-xs">of 10 max IELTS</p>
      </div>
      <div className=" absolute bottom-16 left-0 right-0 m-auto text-center">
        <h1 className="text-xl font-semibold">1st Semester - 2nd Semester</h1>
      </div>
    </div>
  );
};

export default Performance;
