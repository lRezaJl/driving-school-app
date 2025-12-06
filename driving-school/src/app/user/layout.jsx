"use client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar role="user" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="داشبورد هنرجو" role="user" />
        <main className="flex-1 p-8 pt-2 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
