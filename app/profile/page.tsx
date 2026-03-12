"use client";

import { useState } from "react";
import ProfilePic from "../components/ProfilePic";
import {
  Grid,
  PlaySquare,
  Sparkles,
  Plus,
  Menu,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("products");
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* MENU BUTTON */}
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {/* SLIDING MENU PANEL */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Side Menu */}
          <div className="fixed top-0 right-0 h-full w-64 bg-[#111] z-50 p-6 shadow-xl transform transition-transform">

            {/* Menu Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4 text-gray-300">

              <a href="/settings" className="hover:text-white">
                Settings
              </a>

              <a href="/orders" className="hover:text-white">
                Orders
              </a>

              <a href="/saved" className="hover:text-white">
                Saved
              </a>

              <a href="/help" className="hover:text-white">
                Help Center
              </a>

              <button className="text-left text-red-500">
                Logout
              </button>

            </div>
          </div>
        </>
      )}

      {/* PROFILE HEADER */}
      <div className="p-6 text-center">

        {/* Profile Picture */}
        <div className="relative mx-auto w-24 h-24">

          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            <ProfilePic src={user.profileImage || undefined} />
          </div>

          {/* Add Story */}
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

    </main>
  );
}