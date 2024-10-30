"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import profile from "../../public/avatar.png";
import Image from "next/image";
import RahyabLogo from "../../public/logo.png";
import AdminAutorize from "@/components/AdminAutorize";
import SignupPage from "@/components/Signup";
import ClassesAdmin from "@/Components/ClassesAdmin";
import ManageClass from "@/components/ManageClass";
import ManageUser from "@/components/ManageUser";

import { MdManageAccounts } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";

import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";

const userPage = () => {
  const [focusedCard, setFocusedCard] = useState([2]);
  const [login, setLogin] = useState(0);
  const [router, setRouter] = useState(null);
  const [activeComponent, setActiveComponent] = useState("AdminAutorize");

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
    setActiveComponent("SignupPage");
  }
  function AdminAuto() {
    setActiveComponent("SignupPage");
  }

  const handleAuthorize = () => {
    setLogin(1);
    setActiveComponent("SignupPage");
  };

  if (login === 0) {
    return <AdminAutorize AdminAuto={handleAuthorize} />;
  }

  return (
    <div
      dir="rtl"
      className="relative w-full h-screen rounded-box bg-slate-300 flex flex-row p-1"
    >
      <div
        className={`relative flex-1 h-full overflow-hidden rounded-btn transition-all duration-500 bg-slate-300 flex justify-center items-start min-w-5 ${focusedCard.includes(1)
            ? "flex-[0.5] max-sm:flex-[10] max-md:flex-[10] max-lg:flex-[8] max-xl:flex-[0.75] overflow-y-auto"
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
              <p className="text-lg font-medium text-slate-100">مدیر</p>
              <p className="text-base font-normal text-yellow-400">
                مدیریت مجموعه
              </p>
            </div>
          </div>
          <nav className="flex flex-col justify-center items-start gap-8 my-10 ">
            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("SignupPage");
              }}
              className={`btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-800 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-200 
              ${activeComponent === "SignupPage"
                  ? "bg-gradient-to-r from-slate-700 to-slate-900"
                  : ""
                }`}
            >
              <FaUserEdit
                className={`text-3xl font-bold ${activeComponent === "SignupPage" ? "text-slate-200" : ""
                  }`}
              />
              <p
                className={`text-2xl font-black  tracking-wide ${activeComponent === "SignupPage" ? "text-slate-200" : ""
                  }`}
              >
                ثبت نام
              </p>
            </button>

            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("ClassesAdmin");
              }}
              className={`btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-800 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-200 
                ${activeComponent === "ClassesAdmin"
                  ? "bg-gradient-to-r from-slate-700 to-slate-900"
                  : ""
                }`}
            >
              <HiMiniUserGroup
                className={`font-bold text-4xl ${activeComponent === "ClassesAdmin" ? "text-slate-200" : ""
                  }`}
              />
              <p
                className={`text-2xl font-black tracking-wide  ${activeComponent === "ClassesAdmin" ? "text-slate-200" : ""
                  }`}
              >
                کلاس‌ها
              </p>
            </button>
            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("ManageClass");
              }}
              className={`btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-800 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-200 
                ${activeComponent === "ManageClass"
                  ? "bg-gradient-to-r from-slate-700 to-slate-900"
                  : ""
                }`}
            >
              <MdManageAccounts
                className={`font-bold text-4xl ${activeComponent === "ManageClass" ? "text-slate-200" : ""
                  }`}
              />
              <p
                className={`text-2xl font-black tracking-wide  ${activeComponent === "ManageClass" ? "text-slate-200" : ""
                  }`}
              >
                مدیریت کلاس‌ها
              </p>
            </button>
            <button
              onClick={() => {
                setFocusedCard([2]);
                handleComponentChange("ManageUser");
              }}
              className={`btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-800 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-200 
                ${activeComponent === "ManageUser"
                  ? "bg-gradient-to-r from-slate-700 to-slate-900"
                  : ""
                }`}
            >
              <MdManageAccounts
                className={`font-bold text-4xl ${activeComponent === "ManageUser" ? "text-slate-200" : ""
                  }`}
              />
              <p
                className={`text-2xl font-black tracking-wide  ${activeComponent === "ManageUser" ? "text-slate-200" : ""
                  }`}
              >
                مدیریت کاربران
              </p>
            </button>
            <button
              onClick={LogOut}
              className="btn w-full justify-start bg-slate-100 rounded-se-3xl transition-all duration-500 border-none hover:bg-slate-800 h-16 flex-nowrap flex flex-row gap-x-3 hover:shadow-inner shadow-md text-slate-700 hover:text-slate-200 group"
            >
              <FaPowerOff className="text-3xl text-RedTxt group-hover:text-slate-200 font-bold" />
              <p className="text-2xl text-RedTxt group-hover:text-slate-200 font-black tracking-wide">
                خروج
              </p>
            </button>
          </nav>
        </div>
      </div>

      <div
        className={`relative flex-1 h-full overflow-hidden rounded-box transition-all duration-500 bg-slate-800 flex justify-center items-start min-w-5 ${focusedCard.includes(2)
            ? "max-sm:flex-[10] max-md:flex-[10] max-lg:flex-[8] lg:flex-[2.7] xl:flex-[3] overflow-y-auto"
            : "max-lg:cursor-pointer rounded-s-lg"
          }`}
      >
        <div
          onClick={() => handleFocus(2)}
          className={`lg:hidden absolute z-50 flex justify-center items-center min-w-[52rem] min-h-20 p-2 transform transition-all duration-500 text-slate-200 text-2xl font-black ${focusedCard.includes(2)
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
            {activeComponent === "SignupPage" && "ثبت نام"}
            {activeComponent === "ClassesAdmin" && "کلاس‌ها"}
            {activeComponent === "ManageClass" && "مدیریت کلاس‌ها"}
            {activeComponent === "ManageUser" && "مدیریت کاربران"}
          </span>
        </div>

        {/* محتوای بخش 2 */}
        <div className="p-5 mt-16 w-full">
          {activeComponent === "SignupPage" && (
            <SignupPage handleComponentChange={handleComponentChange} />
          )}
          {activeComponent === "ClassesAdmin" && <ClassesAdmin />}
          {activeComponent === "ManageClass" && <ManageClass />}
          {activeComponent === "ManageUser" && <ManageUser />}
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
