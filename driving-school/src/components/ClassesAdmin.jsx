import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupAndClasses() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [address, setAddress] = useState("");
  const [class_number, setClass_number] = useState("");
  const [class_time, setClass_time] = useState("");
  const [morabi, setMorabi] = useState("");
  const [noe_tadris, setNoe_tadris] = useState("");
  const [morabiOptions, setMorabiOptions] = useState([]);
  const [getClass, setGetClass] = useState([]);

  useEffect(() => {
    // Fetch options for 'morabi' from API
    const fetchMorabiOptions = async () => {
      try {
        const response = await axios.get("/api/GetMorabi/"); // replace with your actual endpoint
        setMorabiOptions(response.data);
      } catch (error) {
        console.error("Error fetching morabi options:", error);
      }
    };
    fetchMorabiOptions();
  }, []);

  useEffect(() => {
    // Fetch options for 'morabi' from API
    const fetchGetClass = async () => {
      try {
        const response = await axios.get("/api/GetClass/"); // replace with your actual endpoint
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
          className="fixed modal-background w-screen h-screen top-0 left-0 bg-dark/20 backdrop-blur-md backdrop-saturate-150"
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
              <div className="relative w-full">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="relative w-full">
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="class_number"
                  value={class_number}
                  onChange={(e) => setClass_number(e.target.value)}
                  required
                />
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="class_time"
                  value={class_time}
                  onChange={(e) => setClass_time(e.target.value)}
                  required
                />
              </div>

              <div className="relative w-full">
                <select
                  className="input input-bordered w-full"
                  placeholder="Select Morabi"
                  value={morabi}
                  onChange={(e) => setMorabi(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Morabi
                  </option>
                  {morabiOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative w-full">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text text-lg font-medium">
                      تئوری
                    </span>
                    <input
                      type="radio"
                      name="radio-10"
                      value={false}
                      onChange={(e) => setNoe_tadris(e.target.value === "true")}
                      className="radio checked:bg-warning"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text text-lg font-medium">عملی</span>
                    <input
                      type="radio"
                      name="radio-10"
                      value={true}
                      onChange={(e) => setNoe_tadris(e.target.value === "true")}
                      className="radio checked:bg-warning"
                    />
                  </label>
                </div>
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
