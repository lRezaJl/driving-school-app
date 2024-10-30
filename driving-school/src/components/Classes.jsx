import { useState, useEffect } from "react";
import { TbTrashXFilled } from "react-icons/tb";


export default function Classes() {

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
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classData) => (
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
