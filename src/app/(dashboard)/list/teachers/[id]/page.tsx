import Image from "next/image";
import React from "react";

const SingleTeacherPage = () => {
  return (
    <div className="flex flex-col p-4 flex-1 xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="bg-blue py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Julie Roberts</h1>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A</span>
                </div>
                <div className="w-full md:w-1/3">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>user@hmail.com</span>
                </div>
                <div className="w-full md:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+1 234 234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 bg-amber-400">r</div>
    </div>
  );
};

export default SingleTeacherPage;
