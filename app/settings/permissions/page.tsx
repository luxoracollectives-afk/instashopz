"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PermissionsPage() {
  const router = useRouter();

  const [permissions, setPermissions] = useState({
    camera: true,
    microphone: false,
    location: true,
    storage: true,
  });

  const toggle = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-lg font-semibold">App Permissions</h1>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3">

        {Object.entries(permissions).map(([key, value]) => (
          <div
            key={key}
            className="bg-[#1a1a1a] p-4 rounded-xl flex justify-between items-center"
          >

            <p className="capitalize">{key}</p>

            <button
              onClick={() => toggle(key as keyof typeof permissions)}
              className={`px-3 py-1 rounded ${
                value ? "bg-yellow-500 text-black" : "bg-gray-700"
              }`}
            >
              {value ? "ON" : "OFF"}
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}