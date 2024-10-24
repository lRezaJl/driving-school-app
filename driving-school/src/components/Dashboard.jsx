import { FaBell } from "react-icons/fa6";
import { TiInfoLarge } from "react-icons/ti";

export default function classes() {
  return (
    <div>
      <div className="flex 2xl:flex-row flex-col gap-5 w-full">
        <div className="">
          <div className="card bg-slate-900 text-slate-100 p-7 py-5 flex flex-row flex-wrap gap-5 items-center justify-stretch ss02">
            <div className="flex flex-col gap-2 divide-y-2 divide-yellow-400">
              <p className="text-xl font-medium w-52 text-yellow-400">نام</p>
              <p className="text-xl font-medium w-52 pt-2">کمیل فتحی پور</p>
            </div>
            <div className="flex flex-col gap-2 divide-y-2 divide-yellow-400">
              <p className="text-xl font-medium w-52 text-yellow-400">سن</p>
              <p className="text-xl font-medium w-52 pt-2">23</p>
            </div>
            <div className="flex flex-col gap-2 divide-y-2 divide-yellow-400">
              <p className="text-xl font-medium w-52 text-yellow-400">کدملی</p>
              <p className="text-xl font-medium w-52 pt-2">3841480682</p>
            </div>
            <div className="flex flex-col gap-2 divide-y-2 divide-yellow-400">
              <p className="text-xl font-medium w-52 text-yellow-400">تلفن</p>
              <p className="text-xl font-medium w-52 pt-2">09123456789</p>
            </div>
          </div>
        </div>

        <div className="card bg-slate-900 p-7 py-5 max-2xl:w-fit group">
          <div className="flex flex-row gap-3 items-end pb-10 text-slate-100 text-2xl font-bold">
            <div className=" border-t-2 border-slate-100">
              <FaBell className="text-yellow-400 group-hover:animate-rotate-animation" />
            </div>
            <p>اعلان‌‌ها</p>
          </div>
          <div className="flex flex-row gap-4 my-5 text-slate-100">
            <p className="whitespace-pre-wrap text-lg max-lg:text-base">
              <span>چهارشنبه </span>
              <span>02/11 </span>
              <span>ساعت </span>
              <span>17:30' </span>
              <span>کلاس داری </span>
            </p>
            <TiInfoLarge className="text-2xl rounded-full ring-2 ring-slate-200" />
          </div>
          <div className="flex flex-row gap-4 my-5 text-slate-100">
            <p className="whitespace-pre-wrap text-lg max-lg:text-base">
              <span>چهارشنبه </span>
              <span>02/11 </span>
              <span>ساعت </span>
              <span>17:30' </span>
              <span>کلاس داری </span>
            </p>
            <TiInfoLarge className="text-2xl rounded-full ring-2 ring-slate-200" />
          </div>
          <div className="flex flex-row gap-4 my-5 text-slate-100">
            <p className="whitespace-pre-wrap text-lg max-lg:text-base">
              <span>چهارشنبه </span>
              <span>02/11 </span>
              <span>ساعت </span>
              <span>17:30' </span>
              <span>کلاس داری </span>
            </p>
            <TiInfoLarge className="text-2xl rounded-full ring-2 ring-slate-200" />
          </div>
          <div className="flex flex-row gap-4 my-5 text-slate-100">
            <p className="whitespace-pre-wrap text-lg max-lg:text-base">
              <span>چهارشنبه </span>
              <span>02/11 </span>
              <span>ساعت </span>
              <span>17:30' </span>
              <span>کلاس داری </span>
            </p>
            <TiInfoLarge className="text-2xl rounded-full ring-2 ring-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
