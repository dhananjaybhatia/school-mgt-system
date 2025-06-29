import UserCard from "@/src/components/UserCard";
import React from "react";

const AdminPage = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 bg-green-500">
        <UserCard />
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 bg-amber-300">d</div>
    </div>
  );
};

export default AdminPage;
