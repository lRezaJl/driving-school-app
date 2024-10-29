import { FaBell } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";

export default function Dashboard({ handleComponentChange }) {
  // این بخش اطلاعات کاربر را به طور ساختاریافته نمایش می‌دهد.
  const userInfo = [
    { label: "نام", value: "کمیل فتحی پور" },
    { label: "سن", value: "23" },
    { label: "کدملی", value: "3841480682" },
    { label: "تلفن", value: "09123456789" },
  ];

  const notifications = [
    { day: "چهارشنبه", date: "02/11", time: "17:30", description: "کلاس داری" },
    {
      day: "پنجشنبه",
      date: "02/12",
      time: "14:00",
      description: "جلسه با مدیر",
    },
  ];

  return (
    <div>
      <div className="flex 2xl:flex-row flex-col gap-5 w-full">
        {/* کارت اطلاعات کاربر */}
        <div className="card bg-slate-700 text-slate-100 p-7 py-5 flex flex-row flex-wrap gap-5 items-center justify-stretch ss02">
          {userInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 divide-y-2 divide-yellow-400"
            >
              <p className="text-xl font-medium w-52 text-yellow-400">
                {info.label}
              </p>
              <p className="text-xl font-medium w-52 pt-2">{info.value}</p>
            </div>
          ))}
        </div>

        {/* کارت اعلان‌ها */}
        <div className="card bg-slate-700 p-7 py-5 max-2xl:w-fit group">
          <div className="flex flex-row gap-3 items-end pb-3 text-slate-100 text-2xl font-bold">
            <div className="border-t-2 border-slate-100">
              <FaBell className="text-yellow-400 group-hover:animate-rotate-animation" />
            </div>
            <p>اعلان‌ها</p>
          </div>

          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-4 my-5 text-slate-100"
            >
              <p className="whitespace-pre-wrap text-lg max-lg:text-base">
                <span>{notification.day} </span>
                <span>{notification.date} </span>
                <span>ساعت </span>
                <span>{notification.time} </span>
                <span>{notification.description} </span>
              </p>
              <button onClick={() => handleComponentChange("Classes")}>
                <TiInfoLarge className="text-2xl rounded-full ring-2 ring-slate-200" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
