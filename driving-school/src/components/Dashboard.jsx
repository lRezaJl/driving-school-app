import { FaBell } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";
import { useState, useEffect } from "react";

export default function Dashboard({ handleComponentChange }) {

  const [name, setName] = useState("")
  const [sen, setSen] = useState("")
  const [codemeliNumber, setCodemeliNumber] = useState("")
  const [telephone, setTelephone] = useState("")
  const [address, setAddress] = useState("")
  const [classes, setClasses] = useState([])

  useEffect(() => {

    const fetchGetClass = async () => {
      const codemeli = localStorage.getItem("codemeli")
      try {
        const response = await fetch("/api/GetAllUserClasses/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codemeli,
          }),
        });
        const data = await response.json();
        setClasses(data);

      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchGetClass();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {

      const codemeli = localStorage.getItem("codemeli")

      try {
        const response = await fetch("/api/UserData/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codemeli,
          }),
        });
        const data = await response.json();
        console.log(data);
        
        setName(data.name)
        setCodemeliNumber(data.codemeli)
        setTelephone(data.telephone)
        setSen(data.sen)
        setAddress(data.address)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const userInfo = [
    { label: "نام", value: name },
    { label: "سن", value: sen },
    { label: "کدملی", value: codemeliNumber },
    { label: "تلفن", value: telephone },
    { label: "آدرس", value: address },
  ];

  return (
    <div>
      <div className="flex 2xl:flex-row flex-col gap-5 w-full">
        {/* کارت اطلاعات کاربر */}
        <div className="card bg-slate-700 text-slate-100 p-7 py-5 flex flex-row flex-wrap gap-5 items-center justify-stretch ss02">
          {userInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 divide-y-2 divide-yellow-400"
            >
              <p className="text-xl font-medium w-52 text-yellow-400">
                {info.label}
              </p>
              <p className="text-xl font-medium w-52 pt-2">{info.value}</p>
            </div>
          ))}
        </div>

        {/* کارت اعلان‌ها */}
        <div className="card bg-slate-700 p-7 py-5 max-2xl:w-fit group">
          <div className="flex flex-row gap-3 items-end pb-3 text-slate-100 text-2xl font-bold">
            <div className="border-t-2 border-slate-100">
              <FaBell className="text-yellow-400 group-hover:animate-rotate-animation" />
            </div>
            <p>اعلان‌ها</p>
          </div>

          {classes.map((notification, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-4 my-5 text-slate-100"
            >
              <p className="whitespace-pre-wrap text-lg max-lg:text-base">
                <span>{notification.day} </span>
                <span>ساعت </span>
                <span className="text-yellow-400">{notification.class_time} </span>
                <span>در کلاس </span>
                <span className="text-yellow-400">{notification.class_number} </span>
                <span>کلاس داری </span>
              </p>
              <button onClick={() => handleComponentChange("Classes")}>
                <TiInfoLarge className="text-2xl rounded-full ring-2 ring-slate-200" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
