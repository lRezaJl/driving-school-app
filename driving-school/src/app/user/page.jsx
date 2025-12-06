"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import UserAutoize from "@/components/UserAutorize";

export default function UserPage() {
  const [login, setLogin] = useState(0);
  const [userData, setUserData] = useState({ name: "", phone: "" });

  const handleAuthorize = (name, phone) => {
    setUserData({ name, phone });
    setLogin(1);
  };

  useEffect(() => {
    const codemeli = localStorage.getItem("codemeli");
    if (codemeli) {
      setLogin(1);
    }
  }, []);

  const handleComponentChange = (comp) => {
    // For now logging it or we can handle internal routing if needed
    console.log("Change to", comp);
  };

  if (login === 0) {
    return <UserAutoize UserAuto={handleAuthorize} />;
  }

  return (
    <div className="w-full">
      <Dashboard handleComponentChange={handleComponentChange} />
    </div>
  );
}
