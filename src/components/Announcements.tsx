"use client";

const Announcements = () => {
  return (
    <div className="bg-white p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ">Announcements</h1>
        <span className="text-sm text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-blue rounded-md p-4">
          <div className="flex justify-between items">
            <h1 className="font-medium ">Library Book Return.</h1>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            All borrowed books must be returned by the end of this week to avoid
            late fees.
          </p>
        </div>
        <div className="bg-purple rounded-md p-4">
          <div className="flex justify-between items">
            <h1 className="font-medium ">Parent-Teacher Meeting.</h1>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Scheduled this Friday in the school auditorium. All parents are
            requested to attend.
          </p>
        </div>
        <div className="bg-green rounded-md p-4">
          <div className="flex justify-between items">
            <h1 className="font-medium ">Sports Day Registration.</h1>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Students can register for Sports Day events in the admin office
            until Thursday.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
