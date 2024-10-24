import Link from "next/link";
export default function Home() {
  return (
    <div className="bg-slate-900 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-row gap-x-5">
        <Link href="/admin" className="bg-gray-300 p-5 rounded-md text-3xl font-bold text-slate-900">صفحه ادمین</Link>
        <Link href="/user" className="bg-gray-300 p-5 rounded-md text-3xl font-bold text-slate-900">صفحه کاربر</Link>
      </div>
    </div>
  );
}
