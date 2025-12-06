import { useState } from "react";
import { toast } from "react-hot-toast";
import { RiUser3Line, RiMapPinLine, RiPhoneLine, RiMarkupLine, RiSteering2Line } from "react-icons/ri";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    sen: "",
    address: "",
    codemeli: "",
    telephone: "",
    user_type: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id || 'user_type']: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/Signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message === "User created successfully") {
        toast.success("ثبت نام با موفقیت انجام شد");
        setFormData({ name: "", sen: "", address: "", codemeli: "", telephone: "", user_type: "" });
      } else {
        toast.error("خطا: " + (data.message || "مشکلی پیش آمده است"));
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("خطا در برقراری ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="glass-card w-full max-w-lg p-8 md:p-10 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl" />

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">ثبت نام در سامانه</h2>
          <p className="text-dark-400">اطلاعات خود را برای شروع وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10 w-full" dir="rtl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-300 pr-1">نام و نام خانوادگی</label>
              <div className="relative">
                <RiUser3Line className="absolute right-3 top-3.5 text-dark-400 text-lg" />
                <input
                  className="input-field pr-10"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="مثال: علی رضایی"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark-300 pr-1">سن</label>
              <div className="relative">
                <RiMarkupLine className="absolute right-3 top-3.5 text-dark-400 text-lg" />
                <input
                  className="input-field pr-10"
                  type="number"
                  id="sen"
                  value={formData.sen}
                  onChange={handleChange}
                  required
                  placeholder="مثال: ۱۸"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-dark-300 pr-1">کد ملی</label>
            <div className="relative">
              <RiShieldCheckLineWrapper className="absolute right-3 top-3.5 text-dark-400 text-lg" />
              <input
                className="input-field pr-10"
                type="text"
                id="codemeli"
                inputMode="numeric"
                value={formData.codemeli}
                onChange={handleChange}
                required
                placeholder="کد ملی ۱۰ رقمی"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-dark-300 pr-1">شماره تماس</label>
            <div className="relative">
              <RiPhoneLine className="absolute right-3 top-3.5 text-dark-400 text-lg" />
              <input
                className="input-field pr-10"
                type="tel"
                id="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                placeholder="۰۹۱۲..."
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-dark-300 pr-1">آدرس سکونت</label>
            <div className="relative">
              <RiMapPinLine className="absolute right-3 top-3.5 text-dark-400 text-lg" />
              <input
                className="input-field pr-10"
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="آدرس کامل..."
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-dark-300 pr-1">نوع کاربر</label>
            <div className="relative">
              <RiSteering2Line className="absolute right-3 top-3.5 text-dark-400 text-lg" />
              <select
                className="input-field pr-10 appearance-none cursor-pointer"
                id="user_type"
                value={formData.user_type}
                onChange={handleChange}
                required
              >
                <option value="" disabled className="bg-dark-900">انتخاب کنید...</option>
                <option value="1" className="bg-dark-900">مربی</option>
                <option value="2" className="bg-dark-900">هنرجو</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>ثبت نام و ادامه</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Helper for the missing Import in the original snippet context if any
const RiShieldCheckLineWrapper = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2l-9.5 4.5v6c0 5.5 3.8 10.7 9.5 12 5.7-1.3 9.5-6.5 9.5-12v-6l-9.5-4.5z"></path>
  </svg>
);
