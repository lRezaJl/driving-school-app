import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  RiAdminLine,
  RiLockPasswordLine,
  RiUserLine,
  RiArrowRightLine,
} from "react-icons/ri";

export default function AdminAutorize({ AdminAuto }) {
  const [username, setUserName] = useState("");
  const [password, setUserPasswod] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/LoginAdmin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 403) {
        toast.error("دسترسی غیر مجاز");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.message === "Login successful") {
        if (data?.user && data?.user?.type) {
          localStorage.setItem("admin_user_type", data?.user?.type);
        }
        if (data?.user && data?.user?.name) {
          localStorage.setItem("admin_name", data?.user?.name);
        }
        localStorage.setItem("admin_username", username);
        toast.success("ورود موفقیت آمیز بود");
        AdminAuto();
      } else {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("خطا در ورود به سیستم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full my-auto flex justify-center items-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dark-950 -z-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-600/10 rounded-full blur-[100px] animate-pulse -z-10" />

      <div className="glass-card w-full max-w-sm p-8 md:p-10 relative overflow-hidden animate-fade-in border-t border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary-600/20 text-secondary-500 flex items-center justify-center mx-auto mb-4 text-3xl shadow-glowSecondary">
            <RiAdminLine />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            پنل مدیریت آموزشگاه
          </h2>
          <p className="text-dark-400 text-sm">ورود مختص مدیران و کارکنان</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark-300 mr-1">
              نام کاربری
            </label>
            <div className="relative">
              <RiUserLine className="absolute right-3 top-3.5 text-dark-400 text-lg" />
              <input
                className="input-field pr-10 focus:ring-secondary-500 focus:border-secondary-500"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="admin"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-dark-300 mr-1">
              رمز عبور
            </label>
            <div className="relative">
              <RiLockPasswordLine className="absolute right-3 top-3.5 text-dark-400 text-lg" />
              <input
                className="input-field pr-10 focus:ring-secondary-500 focus:border-secondary-500"
                type="password"
                value={password}
                onChange={(e) => setUserPasswod(e.target.value)}
                required
                placeholder="•••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary bg-secondary-600 hover:bg-secondary-500 focus:ring-secondary-500 w-full flex items-center justify-center gap-2 group mt-4"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <span>ورود به پنل</span>
                <RiArrowRightLine className="group-hover:-translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
