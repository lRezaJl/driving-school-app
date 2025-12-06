import { useState, useEffect } from "react";
import { TbTrashXFilled } from "react-icons/tb";
import {
  RiSteering2Line,
  RiTimeLine,
  RiCalendarLine,
  RiMapPinLine,
  RiHashtag,
  RiUser3Line,
} from "react-icons/ri";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGetClass = async () => {
      const codemeli = localStorage.getItem("codemeli");
      try {
        setLoading(true);
        const response = await fetch("/api/GetAllUserClasses/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codemeli,
          }),
        });
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGetClass();
  }, []);

  return (
    <div className="w-full h-full animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white">کلاس‌های من</h2>
        <span className="px-3 py-1 rounded-full bg-primary-900/50 border border-primary-500/30 text-primary-400 text-sm">
          {classes.length} کلاس ثبت‌شده
        </span>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-dark-900/50 border-b border-white/5">
              <tr>
                {[
                  "#",
                  "نام مربی",
                  "آدرس آموزشگاه",
                  "شماره کلاس",
                  "نوع آموزش",
                  "زمان برگزاری",
                  "روزهای برگزاری",
                ].map((head, i) => (
                  <th key={i} className="px-6 py-4 text-dark-400 font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-dark-400">
                    در حال دریافت اطلاعات...
                  </td>
                </tr>
              ) : classes.length > 0 ? (
                classes.map((classData) => (
                  <tr
                    key={classData.id}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-dark-500 font-mono">
                      {classData.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center text-dark-400">
                          <RiUser3Line />
                        </div>
                        <span className="font-medium text-white">
                          {classData.morabi_name}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-dark-300 max-w-[200px] truncate"
                      title={classData.address}
                    >
                      <div className="flex items-center gap-2">
                        <RiMapPinLine className="text-dark-400" />
                        {classData.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-dark-300 font-mono">
                      <div className="flex items-center gap-2">
                        <RiHashtag className="text-dark-400" />
                        {classData.class_number}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border flex items-center gap-1 w-fit ${
                          classData.noe_tadris
                            ? "bg-emerald-900/30 text-emerald-400 border-emerald-500/20"
                            : "bg-blue-900/30 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        <RiSteering2Line />
                        {classData.noe_tadris ? "عملی" : "تئوری"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark-300">
                      <div className="flex items-center gap-2">
                        <RiTimeLine className="text-secondary-500" />
                        {classData.class_time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-dark-300">
                      <div className="flex items-center gap-2">
                        <RiCalendarLine className="text-secondary-500" />
                        {classData.day}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-dark-500">
                    شما هنوز در هیچ کلاسی ثبت‌نام نکرده‌اید.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
