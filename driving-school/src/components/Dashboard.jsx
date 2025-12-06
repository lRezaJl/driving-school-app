import Link from "next/link";
import { useState, useEffect } from "react";
import {
  RiUser3Line,
  RiShieldCheckLine,
  RiCalendarLine,
  RiPhoneLine,
  RiMapPinLine,
  RiNotification3Line,
  RiSteering2Line,
} from "react-icons/ri";

export default function Dashboard({ handleComponentChange }) {
  const [userData, setUserData] = useState({
    name: "در حال بارگذاری...",
    sen: "",
    codemeli: "",
    telephone: "",
    address: "",
  });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const codemeli = localStorage.getItem("codemeli");
    if (!codemeli) return;

    const fetchData = async () => {
      try {
        // Fetch Classes
        const classRes = await fetch("/api/GetAllUserClasses/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codemeli }),
        });
        const classData = await classRes.json();
        setClasses(Array.isArray(classData) ? classData : []);

        // Fetch User Data
        const userRes = await fetch("/api/UserData/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codemeli }),
        });
        const userDataFetched = await userRes.json();
        setUserData(userDataFetched);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const infoCards = [
    {
      label: "نام کاربر",
      value: userData.name,
      icon: RiUser3Line,
      color: "text-primary-400",
    },
    {
      label: "کد ملی",
      value: userData.codemeli,
      icon: RiShieldCheckLine,
      color: "text-secondary-400",
    },
    {
      label: "سن",
      value: userData.sen ? `${userData.sen} سال` : "-",
      icon: RiCalendarLine,
      color: "text-blue-400",
    },
    {
      label: "تلفن",
      value: userData.telephone,
      icon: RiPhoneLine,
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Welcome Section */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary-900/10 to-transparent">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            سلام، {userData.name} خوش آمدید! 👋
          </h2>
          <p className="text-dark-300">
            امیدواریم روز خوبی برای یادگیری رانندگی داشته باشید.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="text-center px-6 py-3 rounded-xl bg-dark-800/50 border border-white/5 shadow-inner">
            <div className="text-3xl font-bold text-primary-500">
              {classes.length}
            </div>
            <div className="text-xs text-dark-400 mt-1">کلاس فعال</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoCards.map((item, index) => (
            <div
              key={index}
              className="glass-card p-5 flex items-center gap-4 hover:border-primary-500/30 transition-colors group"
            >
              <div
                className={`p-3 rounded-xl bg-dark-900/50 ${item.color} text-2xl group-hover:scale-110 transition-transform`}
              >
                <item.icon />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm text-dark-400 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-white truncate">
                  {item.value || "..."}
                </p>
              </div>
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2 glass-card p-5 flex items-start gap-4 hover:border-red-500/30 transition-colors group">
            <div className="p-3 rounded-xl bg-dark-900/50 text-red-400 text-2xl mt-1 group-hover:scale-110 transition-transform">
              <RiMapPinLine />
            </div>
            <div>
              <p className="text-sm text-dark-400 mb-1">آدرس ثبت شده</p>
              <p className="text-white leading-relaxed">
                {userData.address || "آدرسی ثبت نشده است"}
              </p>
            </div>
          </div>
        </div>

        {/* Notifications / Classes */}
        <div className="glass-card p-6 lg:h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <RiNotification3Line className="text-secondary-400 text-2xl" />
            <h3 className="text-lg font-bold text-white">برنامه کلاس‌ها</h3>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[300px]">
            {classes.length > 0 ? (
              classes.map((cls, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-dark-900/40 border border-white/5 hover:bg-dark-800/60 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-primary-400 text-sm font-bold flex items-center gap-2">
                      <RiSteering2Line className="text-lg" />
                      کلاس{" "}
                      <span className="font-mono text-base">
                        {cls.class_number}
                      </span>
                    </span>
                    <span className="text-xs text-dark-300 bg-dark-950/50 px-2 py-1 rounded-lg border border-white/5">
                      {cls.day}
                    </span>
                  </div>
                  <div className="text-dark-200 font-medium mb-3 text-sm flex items-center gap-2">
                    <span className="text-dark-400">ساعت:</span>
                    <span className="text-secondary-400 font-mono text-base">
                      {cls.class_time}
                    </span>
                  </div>
                  <Link
                    href="/user/classes"
                    className="block w-full py-2.5 text-center rounded-lg bg-dark-800/80 text-xs text-dark-300 group-hover:bg-primary-600/20 group-hover:text-primary-400 group-hover:border-primary-500/30 border border-transparent transition-all"
                  >
                    مشاهده جزئیات
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-dark-500 opacity-60">
                <RiSteering2Line className="text-5xl mb-4 text-dark-600" />
                <p>کلاسی یافت نشد</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
