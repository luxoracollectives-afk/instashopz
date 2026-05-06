"use client";

import { useState, useEffect } from "react";
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
  const [sentUsers, setSentUsers] = useState<number[]>([]);
  const [friends, setFriends] = useState<number[]>([]);
  const [isAddMode, setIsAddMode] = useState(false);

  // 🔥 MAIN USER STATE (IMPORTANT)
  const [allUsersState, setAllUsersState] = useState([
    { id: 1, name: "arjun_dev", status: "active now", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "megha_styles", status: "2 min ago", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "rahul_edits", status: "online", avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 4, name: "shop_with_anu", status: "5 min ago", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 5, name: "tech_vicky", status: "active now", avatar: "https://i.pravatar.cc/150?img=15" },
  ]);

  // 🔥 GLOBAL SEARCH (new users)
  const getDynamicUsers = (query: string) => {
    if (!query) return [];

    return [
      {
        id: Date.now(),
        name: query,
        status: "new user",
        avatar: "https://i.pravatar.cc/150?u=" + query,
      },
    ];
  };

  const dynamicUsers = getDynamicUsers(search);

  // 🔥 MERGE USERS
  const allUsers = isAddMode
    ? [...allUsersState, ...dynamicUsers]
    : allUsersState;

  // 🔥 FILTER
  const filteredUsers = allUsers.filter((user) => {
    const matches = user.name.toLowerCase().includes(search.toLowerCase());

    if (isAddMode) {
      return matches && !friends.includes(user.id);
    }

    return matches;
  });

  // LOAD FRIENDS
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("friends") || "[]");
    setFriends(stored);
  }, []);

  // ✅ ADD FRIEND (CORE FIX)
  const handleAddFriendUser = (user: any) => {
    if (friends.includes(user.id)) return;

    const updatedFriends = [...friends, user.id];
    setFriends(updatedFriends);
    localStorage.setItem("friends", JSON.stringify(updatedFriends));

    // 🔥 ADD USER TO MAIN LIST (IMPORTANT)
    setAllUsersState((prev) => {
      const exists = prev.find((u) => u.id === user.id);
      if (exists) return prev;

      return [...prev, user];
    });
  };

  // ✅ SEND LOGIC
  const handleSend = (userId: number) => {
    if (sentUsers.includes(userId)) return;

    setSentUsers((prev) => [...prev, userId]);

    let chats = JSON.parse(localStorage.getItem("messages") || "[]");
    if (!Array.isArray(chats)) chats = [];

    const chatIndex = chats.findIndex((c: any) => c.userId === userId);

    if (chatIndex !== -1) {
      if (!chats[chatIndex].messages) {
        chats[chatIndex].messages = [];
      }

      chats[chatIndex].messages.push({
        id: Date.now().toString(),
        type: "reel",
        reelId: reel.id,
        timestamp: Date.now(),
      });
    } else {
      chats.push({
        userId,
        messages: [
          {
            id: Date.now().toString(),
            type: "reel",
            reelId: reel.id,
            timestamp: Date.now(),
          },
        ],
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

                {/* BUTTON */}
                <button
                  onClick={() =>
                    isAddMode
                      ? handleAddFriendUser(user)
                      : handleSend(user.id)
                  }
                >
                  {isAddMode ? (
                    <span className="text-sm text-blue-500 font-semibold">
                      Add Friend
                    </span>
                  ) : sentUsers.includes(user.id) ? (
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