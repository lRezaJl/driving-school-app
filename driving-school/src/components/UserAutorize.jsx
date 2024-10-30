import { useState } from "react";
import { toast } from "react-hot-toast";

export default function UserAutorize({ UserAuto }) {
  const [codemeli, SetCodemeli] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("/api/LoginUser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codemeli
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Login successful") {
        localStorage.setItem("codemeli", codemeli)
        UserAuto(data.name, data.telephone);
      } else {
        toast.error("کد ملی در سامانه موجود نیست");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-slate-800">
      <div className="m-auto z-50 w-96 max-h-96 rounded-2xl px-10 py-8 bg-slate-700 text-gray-300">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 justify-center items-center"
        >
          <div className="relative w-full mb-5">
            <input
              className="mt-2 outline-none border-2 rounded-3xl px-4 py-2 border-slate-300 text-gray-300 block pb-2.5 pt-4 w-full text-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
              type="text"
              id="nationalcode"
              inputMode="tel"
              placeholder=""
              value={codemeli}
              onChange={(e) => SetCodemeli(e.target.value)}
              required
            />
            <label
              className="absolute text-slate-300 text-lg font-normal duration-300 transform -translate-y-2 px-2 scale-75 top-0 z-10 origin-[0] bg-slate-700 mx-2 peer-focus:px-2 peer-focus:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-3.5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="nationalcode"
            >
              کد ملی
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
