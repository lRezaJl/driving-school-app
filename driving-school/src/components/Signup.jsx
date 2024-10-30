import { MdPassword } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../utility/config";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [sen, setSen] = useState("");
  const [address, setAddress] = useState("");
  const [codemeli, setCodemeli] = useState("");
  const [telephone, setTelephone] = useState("");
  const [user_type, setUser_type] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/Signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          sen,
          address,
          codemeli,
          telephone,
          user_type,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "User created successfully") {
        toast.success("ثبت نام انجام شد!");
        setName("");
        setSen("");
        setAddress("");
        setCodemeli("");
        setTelephone("");
        setUser_type("");
      } else {
        toast.error("قبل ثبت نام شده یا اشتباه پر کردید");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-800">
      <div className="m-auto w-96 h-fit rounded-2xl px-10 py-8 bg-slate-700 text-slate-300">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 justify-center items-center"
        >
          <div className="relative w-full mb-2">
            <input
              className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
              type="text"
              id="name"
              inputMode="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="name"
            >
              نام
            </label>
          </div>
          <div className="relative w-full mb-2">
            <input
              className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
              type="number"
              id="name"
              inputMode="numeric"
              placeholder=""
              value={sen}
              onChange={(e) => setSen(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="sen"
            >
              سن
            </label>
          </div>
          <div className="relative w-full">
            <input
              className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
              type="text"
              id="nationalcode"
              inputMode="tel"
              placeholder=""
              value={codemeli}
              onChange={(e) => setCodemeli(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-0"
              htmlFor="nationalcode"
            >
              کد ملی 
            </label>
          </div>
          <div className="relative my-2 w-full">
            <input
              className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
              type="text"
              inputMode="text"
              placeholder=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="Address"
            >
              آدرس
            </label>
          </div>
          <div className="relative w-full">
            <input
              className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
              id="Phonenumber"
              inputMode="tel"
              placeholder=""
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="Phonenumber"
            >
              شماره موبایل
            </label>
          </div>

          <div className="relative w-full py-4">
            <select
              className="select select-bordered rounded-3xl h-full py-4 w-full max-w-xs bg-slate-700 border-2 border-gray-300 text-lg"
              value={user_type}
              onChange={(e) => setUser_type(e.target.value)}
              required
            >
              <option value="" disabled>
                نوع کاربر را انتخاب کنید
              </option>
              <option value={1}>مربی</option>
              <option value={2}>هنرجو</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn text-3xl font-bold w-full text-gray-800 btn-warning"
          >
            تایید
          </button>
        </form>
      </div>
    </div>
  );
}
