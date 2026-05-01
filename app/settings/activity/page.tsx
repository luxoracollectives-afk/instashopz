"use client";

import { useRouter } from "next/navigation";

export default function ActivityPage() {
  const router = useRouter();

  // ✅ MOCK DATA
  const todayTime = 95; // minutes
  const weekly = [60, 80, 120, 45, 95, 30, 70];

  const devices = [
    {
      name: "iPhone 13",
      location: "Hyderabad, India",
      lastActive: "Now",
    },
    {
      name: "Chrome - Windows",
      location: "Hyderabad, India",
      lastActive: "2 hrs ago",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-semibold">Your Activity</h1>
      </div>

      {/* TODAY */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
        <p className="text-sm text-gray-400">Today</p>
        <p className="text-2xl font-semibold mt-1">
          {todayTime} mins
        </p>
      </div>

      {/* WEEKLY */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
        <p className="text-sm text-gray-400 mb-2">
          Last 7 Days
        </p>

        <div className="flex items-end gap-2 h-24">
          {weekly.map((min, i) => (
            <div
              key={i}
              className="flex-1 bg-yellow-500 rounded"
              style={{ height: `${min / 2}px` }}
            />
          ))}
        </div>
      </div>

      {/* DEVICES */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl">

        <p className="text-sm text-gray-400 mb-3">
          Logged-in Devices
        </p>

        <div className="flex flex-col gap-3">
          {devices.map((device, i) => (
            <div
              key={i}
              onClick={() => router.push(`/settings/activity/device/${i}`)}
              className="flex justify-between items-center cursor-pointer active:scale-[0.98]"
            >

              <div>
                <p className="font-semibold">{device.name}</p>
                <p className="text-xs text-gray-400">
                  {device.location}
                </p>
              </div>

              <p className="text-xs text-gray-500">
                {device.lastActive}
              </p>

            </div>
          ))}
        </div>

      </div>

    </main>
  );
}