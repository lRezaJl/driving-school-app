import { useState, useEffect } from "react";
import { RiNotification3Line, RiSearchLine } from "react-icons/ri";

const Header = ({ title, role = "user" }) => {
  const [displayName, setDisplayName] = useState("کاربر");
  const [displayRole, setDisplayRole] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (role === "admin") {
        const name = localStorage?.getItem("admin_name");
        setDisplayName(name || "مدیر سیستم");
        const type = localStorage.getItem("admin_user_type");
        setDisplayRole(type === "1" ? "مدیر" : "مربی");
      } else {
        const name = localStorage.getItem("user_name");
        setDisplayName(name || "هنرجو");
        const type = localStorage.getItem("user_type");
        setDisplayRole(type === "1" ? "مربی" : "هنرجو");
      }
    }
  }, [role]);

  return (
    <header className="flex items-center justify-between py-5 px-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">{title}</h2>
        <p className="text-dark-400 text-sm">
          خوش آمدید، امروز روز خوبی برای یادگیری است!
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar - hidden on mobile */}
        <div className="hidden md:flex relative group">
          <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            type="text"
            placeholder="جستجو..."
            className="bg-dark-800 border border-dark-700/50 text-dark-100 text-sm rounded-xl pr-10 pl-4 py-2.5 w-64 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
        </div>

        {/* Notification Btn */}
        <button className="w-11 h-11 rounded-xl bg-dark-800 border border-dark-700/50 flex items-center justify-center text-dark-300 hover:text-primary-400 hover:border-primary-500/30 transition-all relative">
          <RiNotification3Line className="text-xl" />
          <span className="absolute top-3 left-3.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-dark-800 animate-pulse"></span>
        </button>

        {/* User Mini Profile */}
        <div className="flex items-center gap-3 pr-2 pl-1 py-1 rounded-xl hover:bg-dark-800/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-primary-300 p-[2px]">
            <div className="w-full h-full rounded-full bg-dark-900 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-white leading-tight">
              {displayName}
            </p>
            <p className="text-xs text-dark-400">{displayRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
