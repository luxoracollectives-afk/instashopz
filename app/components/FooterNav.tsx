"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterNav() {
  const pathname = usePathname();

  // 🔥 HIDE FOOTER ON ORDERS (list + details)
  if (pathname.startsWith("/settings/orders")) {
    return null;
  }

  const isActive = (path: string) =>
    pathname === path ? "opacity-100" : "opacity-50";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 py-3 flex justify-around items-center z-50">

      {/* Messages */}
      <Link href="/messages" className={isActive("/messages")}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </Link>

      {/* Search */}
      <Link href="/search" className={isActive("/search")}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </Link>

      {/* Home */}
      <Link href="/" className={isActive("/")}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7"/>
          <path d="M9 22V12h6v10"/>
        </svg>
      </Link>

      {/* Reels */}
      <Link href="/reels" className={isActive("/reels")}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </Link>

      {/* Profile */}
      <Link href="/profile" className={isActive("/profile")}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a8.5 8.5 0 0 1 13 0" />
        </svg>
      </Link>

    </div>
  );
}