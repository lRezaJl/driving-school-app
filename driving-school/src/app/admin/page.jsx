"use client";
import React, { useState, useEffect } from "react";
import AdminAutorize from "@/components/AdminAutorize";
import { RiDashboardLine } from "react-icons/ri";

export default function AdminPage() {
  const [login, setLogin] = useState(0);

  const handleAuthorize = () => {
    setLogin(1);
  };

  useEffect(() => {
    const adminUser = localStorage.getItem("admin_username");
    if (adminUser) {
      setLogin(1);
    }
  }, []);

  if (login === 0) {
    return <AdminAutorize AdminAuto={handleAuthorize} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-8 text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-900/30 text-primary-400 mb-6">
          <RiDashboardLine className="text-4xl" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">داشبورد مدیریت</h1>
        <p className="text-dark-400 max-w-lg mx-auto">
          از منوی سمت راست برای مدیریت کاربران و کلاس‌ها سیستم استفاده کنید.
        </p>
      </div>
    </div>
  );
}
