"use client";

import { useState } from "react";
import {
  User,
  Package,
  Heart,
  Headphones,
  CreditCard,
  MapPin,
  Mail,
  Tag,
  ThumbsUp,
  Bookmark,
  Clock,
  Bell,
  Ban,
  AtSign,
  EyeOff,
  Shield,
  Languages,
  Globe,
  HelpCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [search, setSearch] = useState("");

  const settingsItems = [
    { text: "Join Us and Sell", icon: <Tag /> },
    { text: "Account Settings", icon: <User />, sub: "Shopping settings" },
    { text: "My Orders", icon: <Package /> },
    { text: "My Wishlist", icon: <Heart /> },
    { text: "Support", icon: <Headphones /> },
    { text: "My Transactions", icon: <CreditCard /> },
    { text: "Saved Address", icon: <MapPin /> },
    { text: "Mail Box", icon: <Mail /> },
    { text: "Deals", icon: <Tag /> },

    { text: "Liked posts", icon: <ThumbsUp /> },
    { text: "Saved posts", icon: <Bookmark /> },
    { text: "Your Activity", icon: <Clock /> },

    { text: "Notifications", icon: <Bell /> },
    { text: "Blocked", icon: <Ban /> },
    { text: "Tags and mentions", icon: <AtSign /> },
    { text: "Hidden Words", icon: <EyeOff /> },
    { text: "Account type and tools", icon: <Shield /> },
    { text: "Translation", icon: <Languages /> },

    { text: "App permissions", icon: <Globe /> },
    { text: "Help", icon: <HelpCircle /> },
  ];

  const filteredItems = settingsItems.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white overflow-y-auto">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <span className="text-xl">←</span>
        <h1 className="text-xl font-semibold">settings and profile</h1>
      </div>

      {/* SEARCH */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Search settings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-300 text-black rounded-full px-4 py-2 outline-none"
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 flex flex-col gap-4">

        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <SettingItem
              key={index}
              icon={item.icon}
              text={item.text}
              sub={item.sub}
            />
          ))
        ) : (
          <p className="text-gray-400">No results found</p>
        )}

        {/* LOGOUT */}
        <p className="text-red-500 mt-6">LOG OUT</p>

        <div className="h-20" />
      </div>
    </main>
  );
}

function SettingItem({
  icon,
  text,
  sub,
}: {
  icon: React.ReactNode;
  text: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800">

      <div className="flex items-center gap-4">
        <div>{icon}</div>

        <div>
          <p>{text}</p>
          {sub && <p className="text-sm text-gray-400">{sub}</p>}
        </div>
      </div>

      <span className="text-gray-400">{">"}</span>
    </div>
  );
}