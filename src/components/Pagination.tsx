"use client";

import React from "react";
import { ITEM_PER_PAGE } from "../lib/utils";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  const router = useRouter();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => {
          changePage(page - 1);
        }}
        className="px-4 py-2 bg-slate-200 text-xs rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={page === 1}
      >
        Prev
      </button>

      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              onClick={() => {
                changePage(pageIndex);
              }}
              key={pageIndex}
              className={`px-2 cursor-pointer rounded-sm ${
                page === pageIndex ? "bg-blue" : ""
              }`}
            >
              {pageIndex}
            </button>
          );
        })}

        {totalPages > 10 && (
          <>
            <span>...</span>
            <button className="px-2 rounded-sm">{totalPages}</button>
          </>
        )}
      </div>

      <button
        onClick={() => {
          changePage(page + 1);
        }}
        className="px-4 py-2 bg-slate-200 text-xs rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
