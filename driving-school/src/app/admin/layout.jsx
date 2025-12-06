"use client";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="پنل مدیریت" role="admin" />
        <main className="flex-1 p-8 pt-2 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
