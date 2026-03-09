"use client";

import ProfilePic from "../components/ProfilePic";
import Link from "next/link";

export default function MessagesPage() {
  const chats = [
    {
      id: 1,
      username: "artisan_shop",
      lastMessage: "Is this available?",
      time: "2h",
      profileImage: "",
    },
    {
      id: 2,
      username: "cozyhome",
      lastMessage: "Thank you!",
      time: "1d",
      profileImage: "",
    },
    {
      id: 3,
      username: "urbanwear",
      lastMessage: "Can I get COD?",
      time: "3d",
      profileImage: "",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pb-24">

      {/* Header */}
      <div className="p-4 text-xl font-semibold border-b border-gray-800">
        Messages
      </div>

      {/* Chat List */}
      <div className="px-2">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/messages/${chat.id}`}
            className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-[#111]"
          >
            {/* Profile Photo */}
            <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
              <ProfilePic src={chat.profileImage || undefined} />
            </div>

            {/* Chat Text */}
            <div className="flex-1">
              <p className="font-medium">{chat.username}</p>
              <p className="text-sm text-gray-400">{chat.lastMessage}</p>
            </div>

            {/* Time */}
            <p className="text-xs text-gray-500">{chat.time}</p>
          </Link>
        ))}
      </div>

    </main>
  );
}
