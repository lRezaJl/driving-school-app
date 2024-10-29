import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TbTrashXFilled } from "react-icons/tb";
import { FaBook } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";

export default function ManageClass() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible1, setIsFormVisible1] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const [getClass, setGetClass] = useState([]);
  const [classId, setClassId] = useState("");

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newUserId, setNewUserId] = useState("");

  useEffect(() => {
    const fetchGetClass = async () => {
      try {
        const response = await axios.get("/api/GetClass/");
        setGetClass(response.data);
      } catch (error) {
        console.error("Error fetching morabi options:", error);
      }
    };
    fetchGetClass();
  }, []);

  const toggleBookIcon = (id) => {
    // Toggle the selectedBookId
    setSelectedBookId((prevId) => (prevId === id ? null : id));
    setIsFormVisible((prevVisible) => !prevVisible); // Toggle form visibility
    setClassId(id);
  };

  const toggleEditIcon = (id) => {
    // Toggle the selectedEditId
    setSelectedEditId((prevId) => (prevId === id ? null : id));
    setIsFormVisible1((prevVisible) => !prevVisible); // Toggle form visibility
    setClassId(id);
  };

  useEffect(() => {
    if (isFormVisible || isFormVisible1) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("/api/GetUsersOfClass/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              classId,
            }),
          });
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }
  }, [isFormVisible, isFormVisible1, classId]);

  useEffect(() => {
    if (isFormVisible1) {
      const fetchUsers = async () => {
        try {
          const response = await fetch("/api/GetUsers/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          const filteredUsers = data.filter(
            (user) => !users.some((classUser) => classUser.id === user.id)
          );

          setAllUsers(filteredUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }
  }, [isFormVisible1, users]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch("/api/DeleteUserFromClass/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          classId,
        }),
      });

      const data = await response.json();

      if (data.message === "User removed from class") {
        toast.success("کاربر با موفقیت حذف شد");
      } else {
        toast.error("مشکلی پیش آمده");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleAddUser = async (userId) => {
    try {
      const response = await fetch("/api/AddUserToClass/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          classId,
        }),
      });
      const data = await response.json();
      if (data.message === "User Added to class successfully") {
        toast.success("کاربر با موفقیت به کلاس اضافه شد");
      } else {
        toast.error("مشکلی پیش آمده");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-slate-800">
      <div
        dir="rtl"
        className="card bg-slate-700 px-8 py-5 w-full max-h-96 overflow-y-auto overflow-x-auto mt-8"
      >
        <table className="min-w-full text-left text-sm whitespace-nowrap p-2">
          <thead className="uppercase tracking-wider sticky top-0 outline outline-2 bg-slate-800 drop-shadow-sm">
            <tr className="text-start text-yellow-400 text-xl font-black">
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                مربی
              </th>
              <th scope="col" className="px-6 py-4">
                آدرس
              </th>
              <th scope="col" className="px-6 py-4">
                شماره کلاس
              </th>
              <th scope="col" className="px-6 py-4">
                نوع تدریس
              </th>
              <th scope="col" className="px-6 py-4">
                زمان
              </th>
              <th scope="col" className="px-2 py-4">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {getClass.map((classData) => (
              <tr
                key={classData.id}
                className={`border-b text-center text-slate-200 text-xl font-semibold ${
                  selectedClassId === classData.id
                    ? "bg-slate-200 text-slate-800"
                    : ""
                } hover:bg-slate-600 hover:text-slate-200`}
              >
                <th scope="row" className="px-6 py-4 text-yellow-400">
                  {classData.id}
                </th>
                <td className="px-6 py-4">{classData.morabi_name}</td>
                <td className="px-6 py-4">{classData.address}</td>
                <td className="px-6 py-4">{classData.class_number}</td>
                <td className="px-6 py-4">
                  {classData.noe_tadris === true ? "عملی" : "تئوری"}
                </td>
                <td className="px-6 py-4">
                  <p>
                    <span className="whitespace-pre-wrap">ساعت </span>
                    <span className="text-yellow-400">
                      {classData.class_time}
                    </span>
                  </p>
                </td>
                <td className="px-2 py-4 flex justify-center gap-x-2 items-center">
                  <FaBook
                    onClick={() => toggleBookIcon(classData.id)}
                    className={`hover:cursor-pointer ${
                      selectedBookId === classData.id
                        ? "text-yellow-500"
                        : "text-slate-200"
                    }`}
                    size={28}
                  />
                  <MdEditSquare
                    onClick={() => toggleEditIcon(classData.id)}
                    className={`hover:cursor-pointer ${
                      selectedEditId === classData.id
                        ? "text-yellow-500"
                        : "text-slate-200"
                    }`}
                    size={34}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormVisible && (
        <div className="flex justify-start items-start w-full m-5">
          <div className="card bg-slate-700 text-slate-300 px-8 py-5 w-full">
            <h2 className="text-xl font-black text-slate-200">
              هنرجویان کلاس{" "}
              <span className="text-yellow-400  rounded-2xl py-0.5 px-2">
                {classId}#
              </span>
            </h2>
            <ul className="grid py-2 gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="card bg-slate-800 hover:bg-slate-600 flex flex-row px-4 py-4 justify-between items-center text-lg font-bold transition-colors duration-300 focus-within:bg-coralRed focus-within:hover:bg-coralRed"
                >
                  <p className="text-pretty focus-within:text-slate-200">
                    {user.name}
                  </p>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-yellow-400 hover:text-slate-300 focus:outline-none focus-within:text-slate-200"
                  >
                    <TbTrashXFilled className="text-2xl" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isFormVisible1 && (
        <div className="card bg-slate-700 flex flex-col gap-4 w-full px-10 py-8 m-5 mt-2">
          <h2 className="text-xl font-black text-slate-200">
            هنرجویان کلاس{" "}
            <span className="text-yellow-400 rounded-2xl py-0.5 px-2">
              {classId}#
            </span>
          </h2>
          <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {allUsers.map((user) => (
              <label
                key={user.id}
                className="card bg-slate-800 hover:bg-slate-600 flex flex-row px-4 py-4 justify-between items-center text-lg font-bold transition-colors duration-300 focus-within:bg-slate-600"
              >
                <span className="text-slate-200 text-lg font-bold">
                  {user.name}
                </span>
                <input
                  type="radio"
                  name="newUser"
                  value={user.id}
                  checked={newUserId === user.id}
                  onChange={() => setNewUserId(user.id)}
                  className="radio radio-warning peer"
                />
              </label>
            ))}
          </div>
          <button
            onClick={() => handleAddUser(newUserId)}
            disabled={!newUserId}
            className="btn bg-yellow-400 text-xl text-slate-800 font-black hover:bg-primary-400 disabled:bg-gray-800/35 mt-4"
          >
            افزودن کاربر جدید
          </button>
        </div>
      )}
    </div>
  );
}
