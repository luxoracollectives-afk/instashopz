"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MessageBubble from "../../components/MessageBubble";

export default function ChatPage({ params }: { params: { id: string } }) {
  // Demo participant (replace when backend comes)
  const sampleUser = {
    username: "artisan_shop",
    profileImage: "/profile-placeholder.png",
  };

  // Messages (demo local state)
  const [messages, setMessages] = useState<any[]>([
    { from: "them", text: "Hello, do you ship nationwide?" },
    { from: "me", text: "Yes — we ship across India." },
  ]);

  const [input, setInput] = useState("");

  // -------------------------------
  // ACTIVE NOW / LAST SEEN SYSTEM
  // -------------------------------
  const [isOnline, setIsOnline] = useState(true);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  // Convert time → Instagram-like text
  function getLastSeenText() {
    if (!lastSeen) return "a moment ago";

    const diffSec = Math.floor((Date.now() - lastSeen.getTime()) / 1000);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  }

  const lastSeenText = getLastSeenText();

  // Detect when user leaves → mark offline
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsOnline(false);
        setLastSeen(new Date());
      } else {
        setIsOnline(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Refresh last seen text every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOnline) {
        setLastSeen((prev) => (prev ? new Date(prev) : new Date()));
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isOnline]);

  // -------------------------------
  // MESSAGE SENDING
  // -------------------------------

  // Text send
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "me", text: input }]);
    setInput("");
  };

  // Add a product preview into chat
  const attachProduct = () => {
    const product = {
      id: "prod-demo-001",
      name: "Handmade Leather Wallet",
      price: "₹1,299",
      image: "/product-placeholder.png",
      link: "/product/prod-demo-001",
    };

    setMessages((prev) => [
      ...prev,
      {
        from: "me",
        product,
        text: "Sharing a product — check this out!",
      },
    ]);
  };

  // Media upload
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleMedia = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video" : "image";

    setMessages((prev) => [
      ...prev,
      {
        from: "me",
        media: { url, type },
      },
    ]);
  };

  // -------------------------------
  // UI RENDERING
  // -------------------------------
  return (
    <div className="h-screen bg-black text-white flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
        <Link href="/messages">
          <span className="text-xl cursor-pointer">←</span>
        </Link>

        <Image
          src={sampleUser.profileImage}
          width={40}
          height={40}
          alt="profile"
          className="rounded-full border border-gray-700"
        />

        <div>
          <p className="font-semibold text-lg">{sampleUser.username}</p>
          <p className="text-xs text-gray-400">
            {isOnline ? "Active now" : `Last seen ${lastSeenText}`}
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} isMine={m.from === "me"} />
        ))}
      </div>

      {/* Input Section */}
      <div className="p-3 border-t border-gray-800 flex items-center gap-2 bg-black">

        {/* Attach Product */}
        <button
          onClick={attachProduct}
          className="px-3 py-2 rounded-xl border border-gray-700 text-sm"
        >
          🏷️
        </button>

        {/* Attach Media */}
        <button
          onClick={() => fileRef.current?.click()}
          className="px-3 py-2 rounded-xl border border-gray-700 text-sm"
        >
          📎
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleMedia}
        />

        {/* Text Field */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-[#1a1a1a] rounded-xl px-4 py-2 outline-none text-gray-300 border border-gray-800"
        />

        {/* Send */}
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 rounded-xl font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
