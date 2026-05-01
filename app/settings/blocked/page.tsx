"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlockedPage() {
  const router = useRouter();

  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      username: "alex_07",
      avatar: "https://via.placeholder.com/50",
    },
  ]);

  const handleUnblock = (id: number) => {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-lg font-semibold">Blocked Users</h1>
      </div>

      {/* LIST */}
      <div className="flex flex-col">

        {blockedUsers.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No blocked users
          </p>
        )}

        {blockedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-4 py-3 border-b border-gray-800"
          >

            {/* USER INFO */}
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full"
              />

              <p className="text-sm font-semibold">
                {user.username}
              </p>
            </div>

            {/* UNBLOCK BUTTON */}
            <button
              onClick={() => handleUnblock(user.id)}
              className="text-sm bg-white text-black px-3 py-1 rounded"
            >
              Unblock
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}