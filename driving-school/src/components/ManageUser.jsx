import React, { useEffect, useState } from "react";
import { TbTrashXFilled } from "react-icons/tb";
import { toast } from "react-hot-toast";
import {
  RiUser3Line,
  RiAddCircleLine,
  RiMapPinLine,
  RiPhoneLine,
  RiMarkupLine,
  RiSteering2Line,
} from "react-icons/ri";

export default function ManageUser() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sen: "",
    address: "",
    codemeli: "",
    telephone: "",
    user_type: "",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/GetUsers/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setAllUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("خطا در دریافت اطلاعات کاربران");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    if (!confirm(`آیا از حذف کاربر ${user.name} مطمئن هستید؟`)) return;

    try {
      const response = await fetch("/api/DeleteUser/", {
        method: "POST", // This proxies to DELETE in Next.js API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id }),
      });

      const data = await response.json();
      if (data.message === "User deleted successfully") {
        toast.success("کاربر با موفقیت حذف شد");
        setAllUsers((prev) => prev.filter((u) => u.id !== user.id));
      } else {
        toast.error("مشکلی پیش آمد");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/Signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message === "User created successfully") {
        toast.success("کاربر جدید با موفقیت ایجاد شد");
        setIsCreateModalOpen(false);
        fetchUsers();
        setFormData({
          name: "",
          sen: "",
          address: "",
          codemeli: "",
          telephone: "",
          user_type: "",
        });
      } else {
        toast.error("خطا: " + (data.message || "مشکلی پیش آمده است"));
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("خطا در ایجاد کاربر");
    }
  };

  // Read user_type from localStorage
  const userType =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_user_type")
      : null;

  const fields = [
    "نام و نام خانوادگی",
    "آدرس",
    "کدملی",
    "سن",
    "تلفن",
    "نوع کاربر",
    ...(userType === "1" ? ["عملیات"] : []),
  ];

  // Helper for Missing Import
  const RiShieldCheckLineWrapper = (props) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2l-9.5 4.5v6c0 5.5 3.8 10.7 9.5 12 5.7-1.3 9.5-6.5 9.5-12v-6l-9.5-4.5z"></path>
    </svg>
  );

  return (
    <div className="w-full h-full self-stretch animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">مدیریت کاربران</h2>
          <span className="px-3 py-1 rounded-full bg-primary-900/50 border border-primary-500/30 text-primary-400 text-sm">
            {allUsers.length} کاربر
          </span>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <RiAddCircleLine className="text-xl" />
          <span>افزودن کاربر جدید</span>
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-dark-900/50 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-dark-400 font-medium">#</th>
                {fields.map((field, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-dark-400 font-medium"
                  >
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td
                    colSpan={fields.length + 1}
                    className="text-center py-10 text-dark-400"
                  >
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : allUsers.length > 0 ? (
                allUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-dark-500">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center text-dark-400">
                          <RiUser3Line />
                        </div>
                        <span className="font-medium text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-dark-300 max-w-[200px] truncate"
                      title={user.address}
                    >
                      {user.address}
                    </td>
                    <td className="px-6 py-4 text-dark-300 font-mono">
                      {user.codemeli}
                    </td>
                    <td className="px-6 py-4 text-dark-300">{user.sen}</td>
                    <td className="px-6 py-4 text-dark-300 font-mono">
                      {user.telephone}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium border ${
                          user.user_type === 1
                            ? "bg-secondary-900/30 border-secondary-500/30 text-secondary-400"
                            : "bg-primary-900/30 border-primary-500/30 text-primary-400"
                        }`}
                      >
                        {user.user_type === 1 ? "مربی" : "هنرجو"}
                      </span>
                    </td>
                    {userType == "1" && (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(user)}
                          className="p-2 rounded-lg text-dark-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          title="حذف کاربر"
                        >
                          <TbTrashXFilled className="text-xl" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={fields.length + 1}
                    className="text-center py-10 text-dark-400"
                  >
                    کاربری یافت نشد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 h-full z-50 self-stretch flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="glass-card w-full max-w-2xl p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">
                افزودن کاربر جدید
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-dark-400 hover:text-white"
              >
                <TbTrashXFilled className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4" dir="rtl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    نام و نام خانوادگی
                  </label>
                  <div className="relative">
                    <RiUser3Line className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="نام کامل"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    سن
                  </label>
                  <div className="relative">
                    <RiMarkupLine className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      type="number"
                      value={formData.sen}
                      onChange={(e) =>
                        setFormData({ ...formData, sen: e.target.value })
                      }
                      required
                      placeholder="مثال: 25"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    کد ملی
                  </label>
                  <div className="relative">
                    <RiShieldCheckLineWrapper className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={formData.codemeli}
                      onChange={(e) =>
                        setFormData({ ...formData, codemeli: e.target.value })
                      }
                      required
                      placeholder="کد ملی 10 رقمی"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    تلفن تماس
                  </label>
                  <div className="relative">
                    <RiPhoneLine className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={formData.telephone}
                      onChange={(e) =>
                        setFormData({ ...formData, telephone: e.target.value })
                      }
                      required
                      placeholder="0912..."
                    />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-dark-300">
                    آدرس
                  </label>
                  <div className="relative">
                    <RiMapPinLine className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                      placeholder="آدرس دقیق"
                    />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-dark-300">
                    نوع کاربر
                  </label>
                  <div className="relative">
                    <RiSteering2Line className="absolute top-3.5 right-3 text-dark-400" />
                    <select
                      className="input-field pr-10 appearance-none cursor-pointer"
                      value={formData.user_type}
                      onChange={(e) =>
                        setFormData({ ...formData, user_type: e.target.value })
                      }
                      required
                    >
                      <option value="" className="bg-dark-900">
                        انتخاب کنید...
                      </option>
                      <option value="1" className="bg-dark-900">
                        مربی
                      </option>
                      <option value="2" className="bg-dark-900">
                        هنرجو
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="btn-secondary bg-dark-800 hover:bg-dark-700 text-white border-transparent"
                >
                  انصراف
                </button>
                <button type="submit" className="btn-primary">
                  ایجاد کاربر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
