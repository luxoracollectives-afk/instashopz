"use client";

import { useState } from "react";
import ProfilePic from "../components/ProfilePic";
import { Grid, PlaySquare, Sparkles, Plus, Menu } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("products");

  const user = {
    username: "username",
    bio: "Handmade clothing brand • New collections every week • Sustainable & stylish. DM for bulk orders.",
    website: "https://www.mystore.com",
    profileImage: "",
    products: 32,
    reels: 14,
    newArrivals: 12,
  };

  return (
    <main className="min-h-screen bg-black text-white pb-24">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center">
          <span className="font-semibold">N</span>
        </div>

        {/* ✅ MENU BUTTON → GOES TO NEW SCREEN */}
        <Link href="/menu">
          <Menu size={22} />
        </Link>
      </div>

      {/* PROFILE HEADER */}
      <div className="p-6 text-center">

        <div className="relative mx-auto w-24 h-24">

          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            <ProfilePic src={user.profileImage || undefined} />
          </div>

          <button
            onClick={() => alert("Add story")}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-black border-2 border-green-500 flex items-center justify-center"
          >
            <Plus size={14} className="text-green-500" />
          </button>

        </div>

        <h1 className="text-2xl font-semibold mt-4">@{user.username}</h1>

        <p className="text-gray-300 text-sm mt-3 leading-tight line-clamp-3">
          {user.bio}
        </p>

        {user.website && (
          <a
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm mt-2 block"
          >
            {user.website.replace("https://", "")}
          </a>
        )}

        {/* STATS */}
        <div className="flex justify-center gap-8 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold">{user.products}</p>
            <p className="text-gray-400 text-sm">Products</p>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold">{user.reels}</p>
            <p className="text-gray-400 text-sm">Reels</p>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold">{user.newArrivals}</p>
            <p className="text-gray-400 text-sm">New Arrivals</p>
          </div>
        </div>

        <button className="mt-5 px-6 py-2 border border-gray-600 rounded-xl">
          Edit Profile
        </button>

      </div>

      {/* ICON TABS */}
      <div className="grid grid-cols-3 border-b border-gray-800">

        <button
          onClick={() => setActiveTab("products")}
          className={`flex justify-center py-3 ${
            activeTab === "products"
              ? "text-white border-b-2 border-white"
              : "text-gray-500"
          }`}
        >
          <Grid size={22} />
        </button>

        <button
          onClick={() => setActiveTab("reels")}
          className={`flex justify-center py-3 ${
            activeTab === "reels"
              ? "text-white border-b-2 border-white"
              : "text-gray-500"
          }`}
        >
          <PlaySquare size={22} />
        </button>

        <button
          onClick={() => setActiveTab("newarrivals")}
          className={`flex justify-center py-3 ${
            activeTab === "newarrivals"
              ? "text-white border-b-2 border-white"
              : "text-gray-500"
          }`}
        >
          <Sparkles size={22} />
        </button>

      </div>

      {/* TAB CONTENT */}

      {activeTab === "products" && (
        <div className="grid grid-cols-3 gap-1 mt-4 px-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-full h-36 bg-gray-800 border border-gray-700"
            />
          ))}
        </div>
      )}

      {activeTab === "reels" && (
        <div className="grid grid-cols-3 gap-1 mt-4 px-1">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-full aspect-[9/16] bg-gray-800 flex items-center justify-center text-xl"
            >
              ▶
            </div>
          ))}
        </div>
      )}

      {activeTab === "newarrivals" && (
        <div className="grid grid-cols-3 gap-1 mt-4 px-1">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-full h-36 bg-gray-800 border border-gray-700"
            />
          ))}
        </div>
      )}

    </main>
  );
}