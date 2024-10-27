"use client";
import React from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function Payments() {
  return (
    <div>
      <div
        dir="rtl"
        className="card bg-slate-900 p-7 py-5  w-full  overflow-y-auto overflow-x-auto"
      >
        {/* <div className="relative m-[2px] mb-3 mr-5 float-left">
          <input
            type="text"
            placeholder="جستوجو ..."
            className="block w-64 rounded-lg border py-2 pl-10 pr-4 text-sm text-slate-800 bg-slate-300 focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300"
          />
          <button className="pointer-events-none absolute right-56 top-1/2 -translate-y-1/2 transform">
            <HiMiniMagnifyingGlass />
          </button>
        </div> */}

        <table className="min-w-full text-left text-sm whitespace-nowrap p-2 ">
          <thead className="uppercase tracking-wider sticky top-0 outline outline-2  bg-slate-800 drop-shadow-sm">
            <tr className="text-start">
              <th
                scope="col"
                className="px-6 py-4 text-lg font-bold text-yellow-400"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-lg font-bold text-yellow-400"
              >
                مبلغ پرداخت شده
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-lg font-bold text-yellow-400"
              >
                تاریخ
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-lg font-bold text-yellow-400 "
              >
                شناسه پرداخت
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b hover:bg-slate-50 text-center">
              <th scope="row" className="px-6 py-4 text-lg">
                #1
              </th>
              <td className="px-6 py-4 text-lg text-yellow-400">123,567</td>
              <td className="px-6 py-4 text-lg">1403/12/12</td>
              <td className="px-6 py-4 text-lg">
                <p>86758902549883124</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
