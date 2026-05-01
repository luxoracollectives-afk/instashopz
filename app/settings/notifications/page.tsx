"use client";

import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const router = useRouter();

  // 🔔 MOCK NOTIFICATIONS
  const notifications = [
    {
      id: 1,
      user: "john_doe",
      action: "liked your post",
      time: "2h",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      user: "alex_07",
      action: 'commented: "Nice bro 🔥"',
      time: "5h",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      user: "sarah",
      action: "started following you",
      time: "1d",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      user: "rahul",
      action: "liked your reel",
      time: "2d",
      avatar: "https://via.placeholder.com/50",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-lg font-semibold">Notifications</h1>
      </div>

      {/* LIST */}
      <div className="flex flex-col">

        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-center gap-3 px-4 py-3 border-b border-gray-800"
          >

            {/* PROFILE */}
            <img
              src={n.avatar}
              className="w-10 h-10 rounded-full"
            />

            {/* TEXT */}
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{n.user}</span>{" "}
                {n.action}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {n.time} ago
              </p>
            </div>

          </div>
        ))}

      </div>

    </main>
  );
}