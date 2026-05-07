"use client";

import { useState } from "react";
import {
  X,
  Send,
  Link2,
  Mail,
  Share2,
  PlusSquare,
} from "lucide-react";

type Reel = {
  id: number;
  videoSrc: string;
  poster?: string;
  seller: {
    name: string;
    profile: string;
  };
  product: {
    name: string;
    price: number;
  };
};

type UserType = {
  id: string | number;
  name: string;
  status: string;
  avatar: string;
};

export default function ReelShare({
  reel,
  onClose,
}: {
  reel: Reel;
  onClose: () => void;
}) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/reels?start=${reel.id}`
      : "";

  const [search, setSearch] = useState("");
  const [sentUsers, setSentUsers] = useState<(string | number)[]>([]);
  const [isAddMode, setIsAddMode] = useState(false);

  // USERS
  const [allUsersState] = useState<UserType[]>([
    { id: 1, name: "arjun_dev", status: "active now", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "megha_styles", status: "2 min ago", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "rahul_edits", status: "online", avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 4, name: "shop_with_anu", status: "5 min ago", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 5, name: "tech_vicky", status: "active now", avatar: "https://i.pravatar.cc/150?img=15" },
  ]);

  // 🔥 DYNAMIC USERS (STABLE STRING ID)
  const getDynamicUsers = (query: string): UserType[] => {
    if (!query) return [];

    return [
      {
        id: "user_" + query, // ✅ always string (stable)
        name: query,
        status: "new user",
        avatar: "https://i.pravatar.cc/150?u=" + query,
      },
    ];
  };

  const dynamicUsers = getDynamicUsers(search);

  const allUsers = isAddMode
    ? [...allUsersState, ...dynamicUsers]
    : allUsersState;

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 SHARE LOGIC (CORE)
  const handleShareToUser = (user: UserType) => {
    if (sentUsers.includes(user.id)) return;

    setSentUsers((prev) => [...prev, user.id]);

    let chats = JSON.parse(localStorage.getItem("messages") || "[]");
    if (!Array.isArray(chats)) chats = [];

    const chatIndex = chats.findIndex((c: any) => c.userId === user.id);

    const newMessage = {
      id: Date.now().toString(),
      type: "reel",
      reelId: reel.id,
      timestamp: Date.now(),
    };

    if (chatIndex !== -1) {
      if (!chats[chatIndex].messages) {
        chats[chatIndex].messages = [];
      }
      chats[chatIndex].messages.push(newMessage);
    } else {
      chats.push({
        userId: user.id,
        username: user.name,
        avatar: user.avatar,
        messages: [newMessage],
      });
    }

    localStorage.setItem("messages", JSON.stringify(chats));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleEmail = () => {
    window.open(`mailto:?body=${encodeURIComponent(shareUrl)}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: shareUrl });
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 flex items-end">
      <div className="w-full bg-black text-white rounded-t-2xl p-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Share</p>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-4">

          {/* SEARCH */}
          <div className="flex items-center gap-3">
            <input
              placeholder={isAddMode ? "Find friends..." : "search"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-gray-700 px-4 py-2 rounded-lg outline-none"
            />
            <button onClick={() => setIsAddMode((prev) => !prev)}>
              👤+
            </button>
          </div>

          {/* USER LIST */}
          <div className="space-y-4 max-h-[250px] overflow-y-auto">

            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">
                      {user.status}
                    </p>
                  </div>
                </div>

                {/* ✅ SEND ICON (WORKS IN BOTH MODES) */}
                <button
                  onClick={() => handleShareToUser(user)}
                  className="cursor-pointer"
                >
                  {sentUsers.includes(user.id) ? (
                    <span className="text-sm text-green-500 font-semibold">
                      Sent ✓
                    </span>
                  ) : (
                    <Send size={20} strokeWidth={1.8} />
                  )}
                </button>

              </div>
            ))}

            {filteredUsers.length === 0 && (
              <p className="text-center text-gray-500">
                No users found
              </p>
            )}

          </div>

          {/* BOTTOM */}
          <div className="flex justify-between pt-5 px-2">

            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleCopy}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 text-black"
              >
                <Link2 size={20} />
              </button>
              <span className="text-xs text-gray-400">Copy link</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleWhatsApp}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="whatsapp"
                  className="w-6 h-6 object-contain"
                />
              </button>
              <span className="text-xs text-gray-400">WhatsApp</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleEmail}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 text-black"
              >
                <Mail size={20} />
              </button>
              <span className="text-xs text-gray-400">Email</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 text-black">
                <PlusSquare size={20} />
              </button>
              <span className="text-xs text-gray-400">Your story</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleShare}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 text-black"
              >
                <Share2 size={20} />
              </button>
              <span className="text-xs text-gray-400">More</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}