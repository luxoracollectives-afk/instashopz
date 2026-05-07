"use client";

import { useEffect, useState } from "react";
import ProfilePic from "../components/ProfilePic";
import Link from "next/link";

type ChatType = {
  userId: string | number;
  username: string;
  profileImage: string;
  lastMessage: string;
  time: string;
};

export default function MessagesPage() {
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("messages") || "[]");

    if (!Array.isArray(stored)) return;

    const grouped: Record<string, ChatType> = {};

    stored.forEach((chat: any) => {
      const userId = String(chat.userId);

      if (!grouped[userId]) {
        grouped[userId] = {
          userId: chat.userId,
          username: chat.username || `user_${chat.userId}`,
          profileImage: chat.avatar || "",
          lastMessage: "Shared a reel",
          time: "now",
        };
      }
    });

    const finalChats = Object.values(grouped);

    setChats(finalChats.reverse());
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
            key={chat.userId} 
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