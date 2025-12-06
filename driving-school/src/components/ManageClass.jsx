import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TbTrashXFilled } from "react-icons/tb";
import { FaBook } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import {
  RiSteering2Line,
  RiTimeLine,
  RiCalendarLine,
  RiUserAddLine,
  RiAddCircleLine,
  RiMapPinLine,
  RiHashtag,
} from "react-icons/ri";

export default function ManageClass() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible1, setIsFormVisible1] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const [getClass, setGetClass] = useState([]);
  const [classId, setClassId] = useState("");

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newUserId, setNewUserId] = useState("");
  const [loading, setLoading] = useState(true);

  // New Class Form State
  const [morabiOptions, setMorabiOptions] = useState([]);
  const [newClassData, setNewClassData] = useState({
    address: "",
    class_number: "",
    class_time: "",
    day: "",
    morabi: "",
    noe_tadris: false, // false = Theory, true = Practical (Amali)
  });

  useEffect(() => {
    fetchGetClass();
    fetchMorabis();
  }, []);

  const fetchGetClass = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/GetClass/");
      setGetClass(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("خطا در دریافت لیست کلاس‌ها");
    } finally {
      setLoading(false);
    }
  };

  const fetchMorabis = async () => {
    try {
      const response = await axios.get("/api/GetMorabi/");
      setMorabiOptions(response.data);
    } catch (error) {
      console.error("Error fetching morabis:", error);
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/PostClass/", newClassData);
      if (response.status === 200 || response.status === 201) {
        toast.success("کلاس با موفقیت ایجاد شد");
        setIsCreateModalOpen(false);
        fetchGetClass();
        setNewClassData({
          address: "",
          class_number: "",
          class_time: "",
          day: "",
          morabi: "",
          noe_tadris: false,
        });
      }
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("خطا در ایجاد کلاس");
    }
  };

  const handleDeleteClass = async (id) => {
    if (!confirm("آیا از حذف این کلاس مطمئن هستید؟")) return;
    try {
      const response = await axios.delete("/api/DeleteClass/", {
        data: { id },
      });
      if (response.data.message === "Class deleted successfully") {
        toast.success("کلاس حذف شد");
        fetchGetClass();
        // Reset selections if the deleted class was selected
        if (selectedBookId === id) toggleBookIcon(id);
        if (selectedEditId === id) toggleEditIcon(id);
      } else {
        toast.error("خطا: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("خطا در حذف کلاس");
    }
  };

  const toggleBookIcon = (id) => {
    if (selectedBookId === id) {
      setSelectedBookId(null);
      setIsFormVisible(false);
    } else {
      setSelectedBookId(id);
      setSelectedEditId(null);
      setIsFormVisible(true);
      setIsFormVisible1(false);
      setClassId(id);
    }
  };

  const toggleEditIcon = (id) => {
    if (selectedEditId === id) {
      setSelectedEditId(null);
      setIsFormVisible1(false);
    } else {
      setSelectedEditId(id);
      setSelectedBookId(null);
      setIsFormVisible1(true);
      setIsFormVisible(false);
      setClassId(id);
    }
  };

  useEffect(() => {
    if (isFormVisible || isFormVisible1) {
      fetchClassUsers();
    }
  }, [isFormVisible, isFormVisible1, classId]);

  useEffect(() => {
    if (isFormVisible1) {
      fetchAvailableUsers();
    }
  }, [isFormVisible1, users]);

  const fetchClassUsers = async () => {
    try {
      const response = await fetch("/api/GetUsersOfClass/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId }),
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching class users:", error);
    }
  };

  const fetchAvailableUsers = async () => {
    try {
      const response = await fetch("/api/GetUsers/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const filteredUsers = data.filter(
        (user) => !users.some((classUser) => classUser.id === user.id)
      );
      setAllUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("آیا از حذف این هنرجو از کلاس مطمئن هستید؟")) return;

    try {
      const response = await fetch("/api/DeleteUserFromClass/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, classId }),
      });

      const data = await response.json();

      if (data.message === "User removed from class") {
        toast.success("کاربر با موفقیت از کلاس حذف شد");
        fetchClassUsers();
        fetchAvailableUsers();
      } else {
        toast.error("مشکلی پیش آمده");
      }
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  const handleAddUser = async (userId) => {
    try {
      const response = await fetch("/api/AddUserToClass/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, classId }),
      });
      const data = await response.json();
      if (data.message === "User Added to class successfully") {
        toast.success("کاربر با موفقیت به کلاس اضافه شد");
        fetchClassUsers();
        fetchAvailableUsers();
        setNewUserId("");
      } else {
        toast.error("مشکلی پیش آمده");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  // Read user_type from localStorage
  const userType =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_user_type")
      : null;

  return (
    <div className="w-full h-full self-stretch animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">مدیریت کلاس‌ها</h2>
          <span className="px-3 py-1 rounded-full bg-secondary-900/50 border border-secondary-500/30 text-secondary-400 text-sm">
            {getClass.length} کلاس فعال
          </span>
        </div>
        {userType === "1" && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <RiAddCircleLine className="text-xl" />
            <span>ایجاد کلاس جدید</span>
          </button>
        )}
      </div>

      {/* Main Table */}
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
                  "عملیات",
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
                  <td colSpan={8} className="text-center py-10 text-dark-400">
                    در حال دریافت اطلاعات...
                  </td>
                </tr>
              ) : (
                getClass.map((classData) => (
                  <tr
                    key={classData.id}
                    className={`group transition-colors ${
                      selectedBookId === classData.id ||
                      selectedEditId === classData.id
                        ? "bg-secondary-900/20"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <td className="px-6 py-4 text-dark-500 font-mono">
                      {classData.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {classData.morabi_name}
                    </td>
                    <td
                      className="px-6 py-4 text-dark-300 max-w-[200px] truncate"
                      title={classData.address}
                    >
                      {classData.address}
                    </td>
                    <td className="px-6 py-4 text-dark-300 font-mono">
                      {classData.class_number}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          classData.noe_tadris
                            ? "bg-emerald-900/30 text-emerald-400 border border-emerald-500/20"
                            : "bg-blue-900/30 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {classData.noe_tadris ? "عملی" : "تئوری"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark-300 flex items-center gap-2">
                      <RiTimeLine className="text-secondary-500" />
                      {classData.class_time}
                    </td>
                    <td className="px-6 py-4 text-dark-300">{classData.day}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookIcon(classData.id)}
                          className={`p-2 rounded-lg transition-all ${
                            selectedBookId === classData.id
                              ? "bg-secondary-500 text-dark-900"
                              : "text-dark-400 hover:bg-white/10 hover:text-secondary-400"
                          }`}
                          title="مشاهده هنرجویان"
                        >
                          <FaBook />
                        </button>
                        <button
                          onClick={() => toggleEditIcon(classData.id)}
                          className={`p-2 rounded-lg transition-all ${
                            selectedEditId === classData.id
                              ? "bg-blue-500 text-white"
                              : "text-dark-400 hover:bg-white/10 hover:text-blue-400"
                          }`}
                          title="افزودن هنرجو"
                        >
                          <RiUserAddLine className="text-xl" />
                        </button>
                        {userType === "1" && (
                          <button
                            onClick={() => handleDeleteClass(classData.id)}
                            className="p-2 rounded-lg text-dark-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                            title="حذف کلاس"
                          >
                            <TbTrashXFilled className="text-xl" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Class Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 h-full z-50 self-stretch flex items-center justify-center bg-black/60 backdrop-blur-sm !m-0 p-4"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="glass-card w-full my-auto max-w-2xl p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">ایجاد کلاس جدید</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-dark-400 hover:text-white"
              >
                <TbTrashXFilled className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    آدرس
                  </label>
                  <div className="relative">
                    <RiMapPinLine className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={newClassData.address}
                      onChange={(e) =>
                        setNewClassData({
                          ...newClassData,
                          address: e.target.value,
                        })
                      }
                      required
                      placeholder="آدرس محل برگزاری"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    شماره کلاس
                  </label>
                  <div className="relative">
                    <RiHashtag className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={newClassData.class_number}
                      onChange={(e) =>
                        setNewClassData({
                          ...newClassData,
                          class_number: e.target.value,
                        })
                      }
                      required
                      placeholder="مثال: 101"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    زمان برگزاری
                  </label>
                  <div className="relative">
                    <RiTimeLine className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={newClassData.class_time}
                      onChange={(e) =>
                        setNewClassData({
                          ...newClassData,
                          class_time: e.target.value,
                        })
                      }
                      required
                      placeholder="مثال: 14:00 - 16:00"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    روزهای برگزاری
                  </label>
                  <div className="relative">
                    <RiCalendarLine className="absolute top-3.5 right-3 text-dark-400" />
                    <input
                      className="input-field pr-10"
                      value={newClassData.day}
                      onChange={(e) =>
                        setNewClassData({
                          ...newClassData,
                          day: e.target.value,
                        })
                      }
                      required
                      placeholder="مثال: شنبه و دوشنبه"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    مربی
                  </label>
                  <select
                    className="input-field appearance-none cursor-pointer"
                    value={newClassData.morabi}
                    onChange={(e) =>
                      setNewClassData({
                        ...newClassData,
                        morabi: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" className="bg-dark-900">
                      انتخاب کنید...
                    </option>
                    {morabiOptions.map((m) => (
                      <option key={m.id} value={m.id} className="bg-dark-900">
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-dark-300">
                    نوع تدریس
                  </label>
                  <select
                    className="input-field appearance-none cursor-pointer"
                    value={newClassData.noe_tadris}
                    onChange={(e) =>
                      setNewClassData({
                        ...newClassData,
                        noe_tadris: e.target.value === "true",
                      })
                    }
                  >
                    <option value="false" className="bg-dark-900">
                      تئوری
                    </option>
                    <option value="true" className="bg-dark-900">
                      عملی
                    </option>
                  </select>
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
                  ایجاد کلاس
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Users Section */}
      {isFormVisible && (
        <div className="glass-card p-6 animate-slide-in">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaBook className="text-secondary-500" />
              لیست هنرجویان کلاس{" "}
              <span className="text-secondary-400 font-mono">#{classId}</span>
            </h3>
            <span className="text-sm text-dark-400">
              {users.length} نفر ثبت نام شده
            </span>
          </div>

          {users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 rounded-xl bg-dark-800/50 border border-white/5 flex items-center justify-between group hover:border-red-500/30 transition-colors"
                >
                  <span className="text-dark-200 font-medium">{user.name}</span>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-dark-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="حذف از کلاس"
                  >
                    <TbTrashXFilled className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-dark-500 bg-dark-900/30 rounded-xl">
              هنوز هیچ هنرجویی در این کلاس ثبت نام نشده است.
            </div>
          )}
        </div>
      )}

      {/* Add Users Section */}
      {isFormVisible1 && (
        <div className="glass-card p-6 animate-slide-in border-t-2 border-blue-500/50">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <RiUserAddLine className="text-blue-500" />
              افزودن هنرجو به کلاس{" "}
              <span className="text-blue-400 font-mono">#{classId}</span>
            </h3>
          </div>

          <div className="bg-dark-900/30 rounded-xl p-4 mb-4 max-h-[300px] overflow-y-auto custom-scrollbar">
            {allUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {allUsers.map((user) => (
                  <label
                    key={user.id}
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      newUserId === user.id
                        ? "border-blue-500 bg-blue-500/10 text-white"
                        : "border-transparent bg-dark-800 hover:bg-dark-700 text-dark-300"
                    }`}
                  >
                    <span className="font-medium">{user.name}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        newUserId === user.id
                          ? "border-blue-500"
                          : "border-dark-500"
                      }`}
                    >
                      {newUserId === user.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="newUser"
                      value={user.id}
                      checked={newUserId === user.id}
                      onChange={() => setNewUserId(user.id)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-dark-500">
                هیچ هنرجوی جدیدی برای افزودن یافت نشد.
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleAddUser(newUserId)}
              disabled={!newUserId}
              className="btn-primary bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ثبت هنرجوی انتخاب شده
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
