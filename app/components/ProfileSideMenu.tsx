"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function ProfileSideMenu({ open, setOpen }: any) {
  return (
    <>
      {/* Background overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sliding menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#111] text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col p-4 space-y-3">

          <Link href="/settings" className="hover:bg-[#222] p-2 rounded">
            Settings
          </Link>

          <Link href="/orders" className="hover:bg-[#222] p-2 rounded">
            Orders
          </Link>

          <Link href="/saved" className="hover:bg-[#222] p-2 rounded">
            Saved
          </Link>

          <Link href="/help" className="hover:bg-[#222] p-2 rounded">
            Help Center
          </Link>

          <button className="text-left hover:bg-[#222] p-2 rounded text-red-400">
            Logout
          </button>

        </div>
      </div>
    </>
  );
}