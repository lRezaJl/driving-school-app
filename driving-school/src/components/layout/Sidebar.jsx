"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiSteering2Line,
  RiUser3Line,
  RiLogoutBoxLine,
  RiSettings4Line,
} from "react-icons/ri";
import { motion } from "framer-motion";

const Sidebar = ({ role = "user" }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems =
    role === "admin"
      ? [
          { title: "داشبورد", icon: RiDashboardLine, path: "/admin" },
          {
            title: "مدیریت کلاس‌ها",
            icon: RiSteering2Line,
            path: "/admin/classes",
          },
          { title: "مدیریت کاربران", icon: RiUser3Line, path: "/admin/users" },
        ]
      : [
          { title: "داشبورد", icon: RiDashboardLine, path: "/user" },
          {
            title: "کلاس‌های من",
            icon: RiSteering2Line,
            path: "/user/classes",
          },
          { title: "پروفایل", icon: RiUser3Line, path: "/user/profile" },
        ];

  const handleLogout = () => {
    if (role === "admin") {
      localStorage.removeItem("admin_username");
      localStorage.removeItem("admin_user_type");
      window.location.href = "/admin";
    } else {
      localStorage.removeItem("codemeli");
      localStorage.removeItem("user_type");
      window.location.href = "/user";
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {/* ... keeping existing code ... */}
      <aside
        className={`fixed lg:sticky top-0 right-0 h-screen w-72 bg-dark-900/95 backdrop-blur-xl border-l border-white/5 p-6 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 mb-10 px-2">
          {/* ... keeping existing code ... */}
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-glowPrimary">
            <RiSteering2Line className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            <span className="text-primary-500">راهـ</span>یاب
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? "bg-primary-600 text-white shadow-glowPrimary"
                    : "text-dark-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="text-xl" />
                <span className="font-medium">{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <RiLogoutBoxLine className="text-xl" />
            <span className="font-medium">خروج از حساب</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
