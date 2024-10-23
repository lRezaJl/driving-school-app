"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import LogIn from "./LogIn";

import { FaPowerOff } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";

export default function Navbar() {

  const [isModalOpen, setIsModalOpen] = useState(false); // state برای نمایش مودال

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // غیرفعال کردن اسکرول
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // فعال کردن اسکرول
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "backdrop") {
      closeModal();
    }
  };

  const UserRegistered = () => {
    const [isRegistered, setIsRegistered] = useState(false);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const access = !!localStorage.getItem('access');
        setIsRegistered(access);
      }
    }, []);
  
    return isRegistered;
  };

  return (
    <div id="navbar" className="">
      <div className="">
        <div
          dir="rtl"
          className="flex navbar bg-base-100/75 backdrop-saturate-150 backdrop-blur-lg border border-slate-300 shadow-lg shadow-primary-700/20 rounded-box"
        >
          <div className="flex-1 mr-2">
            <Image
              className="w-[112px]"
              src="/images/oxinLogo180x67.png"
              alt="Oxin Game"
              width={180}
              height={67}
            />
          </div>
          <div className="flex-none">
            {/*  <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100/95 backdrop-saturate-150 backdrop-blur-lg z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            {/* --------------------------- */}
            {!UserRegistered() ? <div>
              <button
                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={openModal} // باز کردن مودال هنگام کلیک
              >
                ورود / ثبت نام
              </button>

              {isModalOpen && (
                <div
                  id="backdrop"
                  className="fixed -mx-5  w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                  onClick={handleOutsideClick} // بستن مودال هنگام کلیک روی پس‌زمینه
                >
                  <div className="bg-slate-50 p-8 rounded-lg shadow-lg">
                    <LogIn />
                  </div>
                </div>
              )}
            </div> : <div className="dropdown dropdown-end">
              <button className="w-full btn btn-ghost btn-circle avatar text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">حساب کاربری</button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100/95 backdrop-saturate-150 backdrop-blur-lg rounded-box z-[1] mt-3 w-40 p-2 py-3 shadow space-y-2"
              >
                <li className="flex flex-row">
                  <Link href="/account" className=" text-lg gap-3">
                    <TbLayoutDashboardFilled className="text-xl" />
                    پیشخوان
                  </Link>
                </li>
                <li className="flex flex-row">
                  <span className=" text-lg gap-3">
                    <IoSettingsSharp className="text-xl" />
                    تنظیمات
                  </span>
                </li>
                <li className="flex flex-row">
                  <span className="text-coralRed text-lg gap-3">
                    <FaPowerOff className=" text-xl" />
                    خروج
                  </span>
                </li>
              </ul>
            </div>}

          </div>
        </div>
      </div>
    </div>
  );
}
