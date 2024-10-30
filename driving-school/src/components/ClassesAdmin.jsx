import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TbTrashXFilled } from "react-icons/tb";


export default function ClassesAdmin() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [address, setAddress] = useState("");
  const [class_number, setClass_number] = useState("");
  const [class_time, setClass_time] = useState("");
  const [morabi, setMorabi] = useState("");
  const [noe_tadris, setNoe_tadris] = useState(false);
  const [morabiOptions, setMorabiOptions] = useState([]);
  const [getClass, setGetClass] = useState([]);
  
  const days = [
    { fullName: "شنبه", shortName: "ش" },
    { fullName: "یکشنبه", shortName: "ی" },
    { fullName: "دوشنبه", shortName: "د" },
    { fullName: "سه‌شنبه", shortName: "س" },
    { fullName: "چهارشنبه", shortName: "چ" },
    { fullName: "پنج‌شنبه", shortName: "پ" }
  ];

  const [day, setSelectedDay] = useState("شنبه");

  const handleDayClick = (day) => {
    setSelectedDay(day.fullName);
  };


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

  const fetchGetClass = async () => {
    try {
      const response = await axios.get("/api/GetClass/");
      setGetClass(response.data);
    } catch (error) {
      console.error("Error fetching morabi options:", error);
    }
  };

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
          day,
          noe_tadris,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Class created successfully") {
        toast.success("کلاس با موفقیت ایجاد شد");
        setAddress("");
        setClass_number("");
        setClass_time("");
        setMorabi("");
        setNoe_tadris(false);
        setSelectedDay("شنبه");
        fetchGetClass()
        toggleForm()
      } else {
        toast.error("مشکلی پیش آمده");
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
          id
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Class deleted successfully") {
        toast.success("کلاس با موفقیت حذف شد");
        fetchGetClass()
      } else {
        toast.error("مشکلی پیش آمده");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      setIsFormVisible(false);
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
              <th scope="col" className="px-6 py-4">
                روز
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
                <th className="px-6 py-4 text-yellow-400">
                  {classData.day}
                </th>
                <td className="px-2 py-4 flex justify-center items-center"><TbTrashXFilled onClick={(e) => handleDelete(e, classData.id)} className="hover:text-red-700 hover:cursor-pointer" size={34} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={toggleForm}
        className="btn btn-warning text-lg font-bold my-5"
      >
        ایجاد کلاس
      </button>

      {isFormVisible && (
        <div
          className="fixed modal-background w-screen h-screen top-0 flex justify-center items-center left-0 bg-dark/20 backdrop-blur-md backdrop-saturate-150"
          onClick={handleBackgroundClick}
        >
          <div
            className="m-auto w-96 h-fit rounded-2xl px-10 py-8 bg-slate-700 text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5 justify-center items-center"
            >
              <div className="relative w-full mb-2">
                <input
                  className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                  type="text"
                  id="address"
                  inputMode="text"
                  placeholder=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label
                  className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="address"
                >
                  آدرس
                </label>
              </div>

              <div className="relative w-full mb-2">
                <input
                  className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                  type="number"
                  id="class_number"
                  inputMode="numeric"
                  placeholder=""
                  value={class_number}
                  onChange={(e) => setClass_number(e.target.value)}
                  required
                />
                <label
                  className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="class_number"
                >
                  شماره کلاس
                </label>
              </div>

              <div className="relative w-full mb-2">
                <input
                  className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                  type="text"
                  id="class_time"
                  inputMode="text"
                  placeholder=""
                  value={class_time}
                  onChange={(e) => setClass_time(e.target.value)}
                  required
                />
                <label
                  className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="class_time"
                >
                  زمان کلاس
                </label>
              </div>

              <div className="relative w-full pb-2">
                <select
                  className="select select-bordered rounded-3xl h-full py-4 w-full max-w-xs bg-slate-700 border-2 border-gray-300 text-lg"
                  value={morabi}
                  onChange={(e) => setMorabi(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    مربی کلاس را انتخاب کنید
                  </option>
                  {morabiOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative w-full flex flex-row gap-x-5">

                <label
                  className="card w-full bg-slate-800 hover:bg-yellow-400 hover:text-gray-700 flex flex-row px-4 py-4 justify-between items-center text-lg font-bold transition-colors duration-300"
                >
                  <span className=" text-lg font-bold">
                    تئوری
                  </span>
                  <input
                    type="radio"
                    name="noe_tadris"
                    value={false}
                    checked={noe_tadris === false}
                    onChange={() => setNoe_tadris(false)}
                    className="radio radio-warning peer"
                  />
                </label>
                <label
                  className="card w-full bg-slate-800 hover:bg-yellow-400 hover:text-gray-700 flex flex-row px-4 py-4 justify-between items-center text-lg font-bold transition-colors duration-300"
                >
                  <span className=" text-lg font-bold">
                    عملی
                  </span>
                  <input
                    type="radio"
                    name="noe_tadris"
                    value={true}
                    checked={noe_tadris === true}
                    onChange={() => setNoe_tadris(true)}
                    className="radio radio-warning peer"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                {days.map((dayy) => (
                  <div
                    key={dayy.fullName}
                    onClick={() => handleDayClick(dayy)}
                    className={`h-11 w-11 flex justify-center items-center cursor-pointer rounded-md transition-colors font-bold
                        ${day === dayy.fullName ? 'bg-yellow-400 text-gray-700' : 'bg-gray-300 text-gray-700'}
                        hover:bg-yellow-400`}
                  >
                    {dayy.shortName}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="btn text-3xl font-bold w-full btn-warning"
              >
                تایید
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
