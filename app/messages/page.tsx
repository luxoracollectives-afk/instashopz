"use client";

import { useEffect, useState } from "react";
import ProfilePic from "../components/ProfilePic";
import Link from "next/link";

export default function MessagesPage() {
  const [chats, setChats] = useState<any[]>([]);

  // 🔥 SAME USERS (must match ReelShare)
  const users = [
    { id: 1, name: "arjun_dev", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "megha_styles", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "rahul_edits", avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 4, name: "shop_with_anu", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 5, name: "tech_vicky", avatar: "https://i.pravatar.cc/150?img=15" },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("messages") || "[]");

    // 🔥 MAP messages → chats
    const mapped = stored.map((msg: any) => {
      const user = users.find((u) => u.id === msg.userId);

      return {
        id: msg.id,
        username: user?.name || "unknown",
        profileImage: user?.avatar || "",
        lastMessage: "Shared a reel",
        time: "now",
        userId: msg.userId,
      };
    });

    setChats(mapped.reverse()); // latest first
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pb-24">

      {/* Header */}
      <div className="p-4 text-xl font-semibold border-b border-gray-800">
        Messages
      </div>

      {/* Chat List */}
      <div className="px-2">

        {chats.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No messages yet
          </p>
        )}

        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/messages/${chat.userId}`}
            className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-[#111]"
          >
            {/* Profile Photo */}
            <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
              <ProfilePic src={chat.profileImage || undefined} />
            </div>

            {/* Chat Text */}
            <div className="flex-1">
              <p className="font-medium">{chat.username}</p>
              <p className="text-sm text-gray-400">
                {chat.lastMessage}
              </p>
            </div>

            {/* Time */}
            <p className="text-xs text-gray-500">{chat.time}</p>
          </Link>
        ))}

      </div>

    </main>
  );
}