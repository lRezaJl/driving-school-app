import { useState } from "react";
import { toast } from "react-hot-toast";
import { RiShieldCheckLine, RiArrowRightLine } from "react-icons/ri";

export default function UserAutorize({ UserAuto }) {
  const [codemeli, SetCodemeli] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/LoginUser/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codemeli }),
      });

      const data = await response.json();
      if (data.message === "Login successful") {
        localStorage.setItem("codemeli", codemeli);
        if (data.type) {
          localStorage.setItem("user_type", data.type);
        }
        localStorage.setItem("user_name", data.name);
        toast.success(`خوش آمدید ${data.name}`);
        UserAuto(data.name, data.telephone);
      } else {
        toast.error("کد ملی در سامانه موجود نیست");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("خطا در برقراری ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full my-auto flex justify-center items-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dark-950 -z-20"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/10 rounded-full blur-[100px] animate-pulse -z-10" />

      <div className="glass-card w-full max-w-sm p-8 md:p-10 relative overflow-hidden animate-fade-in border-t border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-600/20 text-primary-500 flex items-center justify-center mx-auto mb-4 text-3xl shadow-glowPrimary">
            <RiShieldCheckLine />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            ورود به سامانه هنرجویان
          </h2>
          <p className="text-dark-400 text-sm">
            لطفا برای ورود کد ملی خود را وارد کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-300 mr-1 block text-right">
              کد ملی
            </label>
            <input
              className="input-field text-center tracking-widest text-xl font-mono"
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={codemeli}
              onChange={(e) => SetCodemeli(e.target.value)}
              required
              placeholder="----------"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <span>ورود به حساب</span>
                <RiArrowRightLine className="group-hover:-translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
