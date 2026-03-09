"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Search,
  Home,
  PlaySquare,
  User,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // icon stroke thickness logic
  const iconProps = (path: string) => ({
    size: 18,
    strokeWidth: pathname === path ? 2.8 : 1.8,
  });

  // NO background, NO rounded bubble
  const itemClass = (path: string) =>
    `flex items-center justify-center w-14 h-9 transition ${
      pathname === path
        ? "text-white"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">

      {/* 🌫️ Ambient Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[110%] h-[140%] rounded-full bg-white/10 blur-2xl animate-ambientGlow" />
      </div>

      {/* Floating Nav */}
      <nav className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-xl shadow-lg border border-white/10">

        <Link href="/messages" className={itemClass("/messages")}>
          <MessageCircle {...iconProps("/messages")} />
        </Link>

        <Link href="/search" className={itemClass("/search")}>
          <Search {...iconProps("/search")} />
        </Link>

        {/* Home — NO special bubble */}
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 transition text-white"
        >
          <Home {...iconProps("/")} />
        </Link>

        <Link href="/reels" className={itemClass("/reels")}>
          <PlaySquare {...iconProps("/reels")} />
        </Link>

        <Link href="/profile" className={itemClass("/profile")}>
          <User {...iconProps("/profile")} />
        </Link>

      </nav>
    </div>
  );
}
