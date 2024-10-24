"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import HamyabLogo from "../../public/HamyabLogo.png";
import EditProfile from "@/Components/EditProfile";
import Dashboard from "@/Components/Dashboard";
import Classes from "@/Components/Classes";
import Payments from "@/Components/Payments";

import { CiEdit } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import { FaClipboardList } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

const userPage = () => {
  const [focusedCard, setFocusedCard] = useState([2]);
  console.log(focusedCard);
  const [router, setRouter] = useState(null);
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleFocus = (cardIndex) => {
    if (window.innerWidth >= 1024) {
      // در صفحه‌های بزرگتر از 1024 پیکسل تغییری در اندازه نده
      return;
    }
    if (cardIndex === 1) {
      setFocusedCard([1]);
    } else {
      setFocusedCard([2]);
    }
  };

  const navigateTo = (path) => {
    if (router) {
      router.push(path);
    }
  };

  function LogOut() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  }

  function Backdrop() {
    setActiveComponent("Dashboard");
  }

  return (
    <div
      dir="rtl"
      className="relative w-full h-screen rounded-box bg-gray-300 flex flex-row p-1"
    >
      {/* بخش 1 */}
      <div
        className={`relative flex-1 h-full overflow-hidden rounded-btn transition-all duration-500 bg-gray-300 flex justify-center items-start min-w-5 ${
          focusedCard.includes(1)
            ? "flex-[0.5] max-sm:flex-[10] max-md:flex-[10] max-lg:flex-[8] max-xl:flex-[0.75]"
            : "max-lg:cursor-pointer"
        }`}
      >
        <div
          onClick={() => handleFocus(1)}
          className={`absolute z-40 flex justify-center items-center min-w-[52rem] min-h-20 mt-2 p-2 transform transition-all duration-500 ${
            focusedCard.includes(1)
              ? "top-0"
              : "max-lg:w-full max-lg:h-full max-lg:backdrop-blur-lg"
          }`}
        >
          <span
            className={`text-center hover:rotate-0 text-gray-800 text-xl font-bold transform transition-all duration-500 ${
              focusedCard.includes(1)
                ? "rotate-0"
                : "lg:hidden -rotate-90 top-[50%] max-lg:cursor-pointer text-2xl max-sm:text-lg"
            }`}
          >
            منو
          </span>
        </div>
        {/* محتوای بخش 1 */}
        <div className="flex flex-col w-full mt-5 md:pr-3 pl-2 pr-1 overflow-hidden">
          <div className="flex items-center gap-4 my-10">
            <Image
              className="w-[112px]"
              src={HamyabLogo}
              alt="HamyabLogo"
              width={180}
              height={67}
            />
            <p className="text-3xl font-bold">همیاب</p>
          </div>

          <div className="relative flex flex-row justify-start items-start gap-4 p-3 glass bg-slate-800 rounded-box">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="flex flex-col mt-1 space-y-1">
              <p className="text-lg font-medium text-gray-100">RezaJ</p>
              <p className="text-base font-normal text-primary-400 tracking-wide">
                09123456789
              </p>
            </div>
            <button
              onClick={() => handleComponentChange("EditProfile")}
              className="absolute left-3 top-3 text-xl text-gray-800 p-1 rounded-badge bg-primary-400"
            >
              <CiEdit />
            </button>
          </div>
          {/* منوهای ناوبری */}
          <nav className="flex flex-col justify-center items-start gap-8 my-10">
            <Link
              href="/"
              className="btn w-full justify-start pr-5 bg-slate-300 rounded-se-3xl transition-all duration-500 border-none hover:bg-gray-700 h-16 flex-nowrap flex flex-row gap-x-6 hover:shadow-inner shadow-md text-gray-700 hover:text-gray-300"
            >
              <IoHome className="text-4xl font-bold" />
              <p className="text-4xl font-bold tracking-wide ">خانه</p>
            </Link>

            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("Dashboard");
              }}
              className={`btn w-full justify-start pr-5 bg-slate-300 rounded-se-3xl transition-all duration-500 border-none hover:bg-gray-700 h-16 flex-nowrap flex flex-row gap-x-6 hover:shadow-inner shadow-md text-gray-700 hover:text-gray-300 
      ${
        activeComponent === "Dashboard"
          ? "bg-gradient-to-r from-blue-100 to-slate-800"
          : ""
      }`}
            >
              <MdSpaceDashboard
                className={`text-4xl font-bold tracking-wide ${
                  activeComponent === "Dashboard" ? "text-gray-300" : ""
                }`}
              />
              <p
                className={`text-4xl font-bold tracking-wide ${
                  activeComponent === "Dashboard" ? "text-gray-300" : ""
                }`}
              >
                داشبورد
              </p>
            </button>

            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("Classes");
              }}
              className={`btn w-full justify-start pr-5 bg-slate-300 rounded-se-3xl transition-all duration-500 border-none hover:bg-gray-700 h-16 flex-nowrap flex flex-row gap-x-6 hover:shadow-inner shadow-md text-gray-700 hover:text-gray-300 
      ${
        activeComponent === "Classes"
          ? "bg-gradient-to-r from-blue-100 to-slate-800"
          : ""
      }`}
            >
              <SiGoogleclassroom
                className={`text-4xl font-bold tracking-wide ${
                  activeComponent === "Classes" ? "text-gray-300" : ""
                }`}
              />
              <p
                className={`text-4xl font-bold tracking-wide ${
                  activeComponent === "Classes" ? "text-gray-300" : ""
                }`}
              >
                کلاس‌ها
              </p>
            </button>

            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("Payments");
              }}
              className={`btn w-full justify-start pr-5 bg-slate-300 rounded-se-3xl transition-all duration-500 border-none hover:bg-gray-700 h-16 flex-nowrap flex flex-row gap-x-6 hover:shadow-inner shadow-md text-gray-700 hover:text-gray-300 
      ${
        activeComponent === "Payments"
          ? "bg-gradient-to-r from-blue-100 to-slate-800"
          : ""
      }`}
            >
              <SiCashapp
                className={`text-4xl font-bold tracking-wide ${
                  activeComponent === "Payments" ? "text-gray-300" : ""
                }`}
              />
              <p
                className={`text-4xl font-bold tracking-wide ${
                  activeComponent === "Payments" ? "text-gray-300" : ""
                }`}
              >
                پرداخت
              </p>
            </button>

            <button
              onClick={LogOut}
              className="btn w-full justify-start pr-5 bg-slate-300 rounded-se-3xl transition-all duration-500 border-none hover:bg-gray-700 h-16 flex-nowrap flex flex-row gap-x-6 hover:shadow-inner shadow-md text-gray-700 hover:text-gray-300"
            >
              <FaPowerOff className="text-4xl font-bold" />
              <p className="text-4xl font-bold tracking-wide">خروج</p>
            </button>
          </nav>
        </div>
      </div>

      {/* بخش 2 */}
      <div
        className={`relative flex-1 h-full overflow-hidden rounded-box transition-all duration-500 bg-gray-800 flex justify-center items-start min-w-5 ${
          focusedCard.includes(2)
            ? "max-sm:flex-[10] max-md:flex-[10] max-lg:flex-[8] lg:flex-[2.7] xl:flex-[3]"
            : "max-lg:cursor-pointer rounded-s-lg"
        }`}
      >
        <div
          onClick={() => handleFocus(2)}
          className={`lg:hidden absolute z-50 flex justify-center items-center min-w-[52rem] min-h-20 p-2 transform transition-all duration-500 text-gray-300 text-xl font-bold ${
            focusedCard.includes(2)
              ? "rotate-0 top-0"
              : "max-lg:w-full max-lg:h-full max-lg:backdrop-blur-lg"
          }`}
        >
          <span
            className={`text-center md:hover:rotate-0 transform transition-all duration-500 ${
              focusedCard.includes(2)
                ? "rotate-0"
                : "lg:hidden -rotate-90 top-[50%] max-lg:cursor-pointer"
            }`}
          >
            {activeComponent === "Dashboard" && "داشبورد"}
            {activeComponent === "Classes" && "کلاس‌ها"}
            {activeComponent === "Payments" && "پرداخت ها"}
          </span>
        </div>

        {/* محتوای بخش 2 */}
        <div className="p-5 mt-16 w-full">
          {activeComponent === "Dashboard" && <Dashboard />}
          {activeComponent === "Classes" && <Classes />}
          {activeComponent === "Payments" && <Payments />}
        </div>
      </div>

      <div className="fixed z-50 ">
        {activeComponent === "EditProfile" && (
          <EditProfile Backdrop={Backdrop} />
        )}
      </div>
    </div>
  );
};

export default userPage;
