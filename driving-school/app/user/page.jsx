"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import RahyabLogo from "../../public/logo.png";
import profile from "../../public/avatar.png";
import Dashboard from "@/Components/Dashboard";
import UserAutoize from "@/components/UserAutorize";
import Classes from "@/components/Classes";

import { IoHome } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";

const userPage = () => {
  const [focusedCard, setFocusedCard] = useState([2]);
  const [login, setLogin] = useState(0); // Start as 0, meaning not logged in
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activeComponent, setActiveComponent] = useState("UserAutoize");

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleFocus = (cardIndex) => {
    if (window.innerWidth >= 1024) {
      return;
    }
    if (cardIndex === 1) {
      setFocusedCard([1]);
    } else {
      setFocusedCard([2]);
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

  const handleAuthorize = (name, phone) => {
    setPhone(phone);
    setName(name)
    setLogin(1);
    setActiveComponent("SignupPage");
  };

  if (login === 0) {
    return <UserAutoize UserAuto={handleAuthorize} />;
  }

  return (
    <div
      dir="rtl"
      className="relative w-full h-screen rounded-box bg-slate-300 flex flex-row p-1"
    >
      {/* بخش 1 */}
      <div
        className={`relative flex-1 h-full overflow-hidden rounded-btn transition-all duration-500 bg-slate-300 flex justify-center items-start min-w-5 ${focusedCard.includes(1)
            ? "flex-[0.5] max-sm:flex-[10] max-md:flex-[10] max-lg:flex-[8] max-xl:flex-[0.75]"
            : "max-lg:cursor-pointer"
          }`}
      >
        <div
          onClick={() => handleFocus(1)}
          className={`absolute z-40 flex justify-center items-center min-w-[52rem] min-h-20 mt-2 p-2 transform transition-all duration-500 ${focusedCard.includes(1)
              ? "top-0"
              : "max-lg:w-full max-lg:h-full max-lg:backdrop-blur-lg"
            }`}
        >
          <span
            className={`text-center hover:rotate-0 text-slate-800 text-xl font-bold transform transition-all duration-500 ${focusedCard.includes(1)
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
              src={RahyabLogo}
              alt="RahyabLogo"
              width={180}
              height={67}
            />
            <p className="text-3xl font-black text-slate-900">
              موسسه آموزشی راهیاب
            </p>
          </div>

          <div className="relative flex flex-row justify-start items-start gap-4 p-3 glass bg-slate-900 rounded-box">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <Image
                  src={profile}
                  alt="avatar"
                  width={512}
                  height={512}
                />
              </div>
            </div>
            <div className="flex flex-col mt-1 space-y-1">
              <p className="text-lg font-medium text-slate-100">{name}</p>
              <p className="text-base font-normal text-yellow-400">
                {phone}
              </p>
            </div>
          </div>
          {/* منوهای ناوبری */}
          <nav className="flex flex-col justify-center items-start gap-8 my-10">
            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("Dashboard");
              }}
              className={`btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-900 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-300 
              ${activeComponent === "Dashboard"
                  ? "bg-gradient-to-r from-slate-700 to-slate-900"
                  : ""
                }`}
            >
              <MdSpaceDashboard
                className={`text-3xl font-bold ${activeComponent === "Dashboard" ? "text-slate-300" : ""
                  }`}
              />
              <p
                className={`text-2xl font-black tracking-wide  ${activeComponent === "Dashboard" ? "text-slate-300" : ""
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
              className={`btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-900 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-300 
                ${activeComponent === "Classes"
                  ? "bg-gradient-to-r from-slate-700 to-slate-900"
                  : ""
                }`}
            >
              <HiMiniUserGroup
                className={`font-bold text-4xl ${activeComponent === "Classes" ? "text-slate-300" : ""
                  }`}
              />
              <p
                className={`text-2xl font-black tracking-wide  ${activeComponent === "Classes" ? "text-slate-300" : ""
                  }`}
              >
                کلاس‌
              </p>
            </button>

            <button
              onClick={LogOut}
              className="btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-900 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-300 group"
            >
              <FaPowerOff className="text-3xl text-RedTxt group-hover:text-slate-300 font-bold" />
              <p className="text-2xl text-RedTxt group-hover:text-slate-300 font-black tracking-wide">
                خروج
              </p>
            </button>
          </nav>
        </div>
      </div>

      {/* بخش 2 */}
      <div
        className={`relative flex-1 h-full overflow-hidden rounded-box transition-all duration-500 bg-slate-800 flex justify-center items-start min-w-5 ${focusedCard.includes(2)
            ? "max-sm:flex-[10] max-md:flex-[10] max-lg:flex-[8] lg:flex-[2.7] xl:flex-[3]"
            : "max-lg:cursor-pointer rounded-s-lg"
          }`}
      >
        <div
          onClick={() => handleFocus(2)}
          className={`lg:hidden absolute z-50 flex justify-center items-center min-w-[52rem] min-h-20 p-2 transform transition-all duration-500 text-slate-300 text-xl font-bold ${focusedCard.includes(2)
              ? "rotate-0 top-0"
              : "max-lg:w-full max-lg:h-full max-lg:backdrop-blur-lg"
            }`}
        >
          <span
            className={`text-center md:hover:rotate-0 transform transition-all duration-500 ${focusedCard.includes(2)
                ? "rotate-0"
                : "lg:hidden -rotate-90 top-[50%] max-lg:cursor-pointer"
              }`}
          >
            {activeComponent === "Dashboard" && "داشبورد"}
            {activeComponent === "Classes" && "کلاس‌ها"}
          </span>
        </div>

        {/* محتوای بخش 2 */}
        <div className="p-5 mt-16 w-full">
          {activeComponent === "Dashboard" && (
            <Dashboard handleComponentChange={handleComponentChange} />
          )}
          {activeComponent === "Classes" && <Classes />}
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
