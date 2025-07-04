import Announcements from "@/src/components/Announcements";
import AttendenceChart from "@/src/components/AttendenceChart";
import CountChart from "@/src/components/CountChart";
import EventCalender from "@/src/components/EventCalender";
import FinanceChart from "@/src/components/FinanceChart";
import UserCard from "@/src/components/UserCard";
import React from "react";

const AdminPage = () => {
  return (
    <div className="px-3 flex flex-col md:flex-row gap-2">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-3">
        <div className="flex gap-3 justify-between flex-wrap">
          <UserCard type={"student"} />
          <UserCard type={"teacher"} />
          <UserCard type={"parent"} />
          <UserCard type={"staff"} />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendenceChart />
          </div>
        </div>
        <div className="w-full h-[500px] ">
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-2">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
