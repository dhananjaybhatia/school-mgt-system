"use client";

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Math Class",
    time: "9:00 AM - 10:30 AM",
    description: "Algebra and Geometry basics with Mr. Smith.",
  },
  {
    id: 2,
    title: "Science Lab",
    time: "11:00 AM - 12:30 PM",
    description: "Practical experiments on electricity and magnetism.",
  },
  {
    id: 3,
    title: "History Lecture",
    time: "1:00 PM - 2:00 PM",
    description: "World War II overview and impact discussion.",
  },
];

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-2">
      <Calendar onChange={onChange} value={value} />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>

      <div className="flex flex-col gap-4">
        {events.map((event) => {
          return (
            <div
              key={event.id}
              className="p-5 rounded-md flex flex-col gap-2 border-2 border-gray-100 border-t-4 odd:border-t-purple even:border-t-yellow"
            >
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-xs text-gray-400">{event.time}</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalender;
