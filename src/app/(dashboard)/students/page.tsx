import Announcements from "@/src/components/Announcements";
import BigCalendar from "@/src/components/BigCalendar";
import EventCalender from "@/src/components/EventCalender";
import React from "react";

const StudentsPage = () => {
  return (
    <div className="p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}

      <div className="w-full xl:w-1/3 flex flex-col gap-2">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentsPage;
