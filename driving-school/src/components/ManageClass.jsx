import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TbTrashXFilled } from "react-icons/tb";
import { FaBook } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";

export default function ManageClass() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [address, setAddress] = useState("");
  const [class_number, setClass_number] = useState("");
  const [class_time, setClass_time] = useState("");
  const [morabi, setMorabi] = useState("");
  const [noe_tadris, setNoe_tadris] = useState("");
  const [morabiOptions, setMorabiOptions] = useState([]);
  const [getClass, setGetClass] = useState([]);
  const [classId, setClassId] = useState("");

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newUserId, setNewUserId] = useState("");

  useEffect(() => {
    const fetchMorabiOptions = async () => {
      try {
        const response = await axios.get("/api/GetMorabi/");
        setMorabiOptions(response.data);
      } catch (error) {
        console.error("Error fetching morabi options:", error);
      }
    };
    fetchMorabiOptions();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/PostClass/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          class_number,
          class_time,
          morabi,
          noe_tadris,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Class created successfully") {
        toast.success("ثبت نام انجام شد!");
      } else {
        toast.error("قبل ثبت نام شده یا اشتباه پر کردید");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/DeleteClass/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Class deleted successfully") {
        toast.success("ثبت نام انجام شد!");
      } else {
        toast.error("قبل ثبت نام شده یا اشتباه پر کردید");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const toggleForm = (id) => {
    setClassId(id);
    setIsFormVisible(!isFormVisible);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      setIsFormVisible(false);
    }
  };

  useEffect(() => {
    if (isFormVisible) {
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
  }, [isFormVisible, classId]);

  useEffect(() => {
    if (isFormVisible) {
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
    }
  }, [isFormVisible, classId]);

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
        className="card bg-slate-700 p-7 py-5 w-full max-h-96 overflow-y-auto overflow-x-auto mt-8"
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
                className="border-b hover:bg-slate-50 hover:text-slate-800 text-center text-slate-200 text-xl"
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
                    className="hover:text-red-700 hover:cursor-pointer"
                    size={28}
                  />
                  <MdEditSquare
                    onClick={(e) => toggleForm(classData.id)}
                    className="hover:text-red-700 hover:cursor-pointer"
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
          <div className="card bg-slate-700 text-slate-300 w-fit px-8 py-5">
            <h2 className="text-xl font-black text-slate-300">کاربران کلاس</h2>
            <ul className="grid grid-cols-4 gap-y-10 my-6 gap-x-20">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center gap-8 text-lg font-bold "
                >
                  <div>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn bg-coralRed text-slate-300 hover:bg-RedTxt"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="card bg-slate-700 flex flex-col gap-4 w-full px-10 py-8 m-5 mt-2">
        <p className="text-slate-200 font-bold">انتخاب کاربر جدید:</p>
        <div className="flex flex-wrap gap-4">
          {allUsers.map((user) => (
            <label key={user.id} className="flex items-center gap-2">
              <input
                type="radio"
                name="newUser"
                value={user.id}
                checked={newUserId === user.id}
                onChange={() => setNewUserId(user.id)}
                className="radio radio-warning"
              />
              <span className="text-slate-200">{user.name}</span>
            </label>
          ))}
        </div>
        <button
          onClick={() => handleAddUser(newUserId)}
          disabled={!newUserId}
          className="btn btn-warning disabled:bg-gray-800/35 mt-4"
        >
          افزودن کاربر جدید
        </button>
      </div>
    </div>
  );
}
