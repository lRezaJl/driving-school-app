import React, { useEffect, useState } from "react";
import { TbTrashXFilled } from "react-icons/tb";
import { toast } from "react-hot-toast";

export default function ManageUser() {
  const [allUsers, setAllUsers] = useState([]);
  const fields = [
    "#",
    "نام و نام خانوادگی",
    "آدرس",
    "کدملی",
    "سن",
    "شماره تفلن",
    "نوع تدریس",
    "نوع کاربر",
    "عملیات",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/GetUsers/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/DeleteUser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "User deleted successfully") {
        toast.success("کاربر با موفقیت حذف شد");
      } else {
        toast.error("مشکلی پیش امده");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <div
        dir="rtl"
        className="card bg-slate-900 p-7 py-5 w-full overflow-y-auto overflow-x-auto"
      >
        <table className="min-w-full text-left text-sm whitespace-nowrap p-2">
          <thead className="uppercase tracking-wider sticky top-0 outline outline-2 bg-slate-800 drop-shadow-sm">
            <tr className="text-start">
              {fields.map((field, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-4 text-lg font-bold text-yellow-400"
                >
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, idx) => (
              <tr
                key={user.id}
                className="border-b hover:bg-slate-50 text-center"
              >
                <td className="px-6 py-4 text-lg text-yellow-400">{idx + 1}</td>
                <td className="px-6 py-4 text-lg text-slate-300">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-lg text-slate-300">
                  {user.address}
                </td>
                <td className="px-6 py-4 text-lg text-slate-300">
                  {user.codemeli}
                </td>
                <td className="px-6 py-4 text-lg text-slate-300">{user.sen}</td>
                <td className="px-6 py-4 text-lg text-slate-300">
                  {user.telephone}
                </td>
                <td className="px-6 py-4 text-lg text-slate-300">
                  {user.noe_tadris === true ? "عملی" : "تئوری"}
                </td>
                <td className="px-6 py-4 text-lg text-slate-300">
                  {user.noe_tadris === 1
                    ? "مربی"
                    : user.noe_tadris === 2
                    ? "هنرجو"
                    : "ادمین"}
                </td>
                <td className="px-6 py-4 text-lg text-slate-300 flex justify-center items-center"><TbTrashXFilled onClick={(e)=> handleDelete(e, user.id)} className="hover:text-red-700 hover:cursor-pointer" size={34} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
