import { MdPassword } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../utility/config";
import { toast } from "react-hot-toast";

export default function AdminAutorize({ AdminAuto }) {
  const [username, setUserName] = useState("");
  const [password, setUserPasswod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // This will now prevent the page refresh
    try {
      const response = await fetch("/api/LoginAdmin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Login successful") {
        AdminAuto();
      } else {
        toast.error("user name or password is wrong");
      }
      // Process data here, such as setting tokens in local storage
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-slate-800">
      <div className="m-auto z-50 w-96 max-h-96 rounded-2xl px-10 py-8 bg-slate-700 text-slate-800">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 justify-center items-center"
        >
          <div className="relative w-full">
            <input
              className="mt-2 outline-none  border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-800 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
              id="Phonenumber"
              inputMode="tel"
              placeholder=""
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="Phonenumber"
            >
              شماره موبایل
            </label>
          </div>
          <div className="relative w-full mb-5">
            <input
              className="mt-2 outline-none cursor-pointer border-2 rounded-3xl px-4 py-2 border-slate-300 text-slate-800 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
              type="text"
              id="nationalcode"
              inputMode="tel"
              placeholder=""
              value={password}
              onChange={(e) => setUserPasswod(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="nationalcode"
            >
              کد ملی مشتری
            </label>
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
  );
}
