"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const router = useRouter();

  const settingsItems = [
    { text: "Join Us and Sell", icon: <Tag /> },
    { text: "Account Settings", icon: <User />, href: "/settings/account" },
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
        <button onClick={() => router.back()} className="text-xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Settings</h1>
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
      <div className="px-4 flex flex-col gap-2">

        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <SettingItem
              key={index}
              icon={item.icon}
              text={item.text}
              href={item.href}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center mt-4">
            No results found
          </p>
        )}

        <p className="text-red-500 mt-6">LOG OUT</p>

        <div className="h-20" />
      </div>
    </main>
  );
}

function SettingItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-[#1a1a1a] transition">
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  );

  // ✅ If link exists → clickable
  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  // ❌ Otherwise normal item
  return content;
}