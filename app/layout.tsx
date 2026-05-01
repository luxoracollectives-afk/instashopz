"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import BottomNav from "./components/BottomNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ FORCE HIDE FOR REELS
  const hideBottomNav =
    pathname === "/reels" ||
    pathname.startsWith("/reels/") ||
    pathname.startsWith("/stories") ||
    pathname.startsWith("/settings");

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">

        <main className="pb-0">
          {children}
        </main>

        {!hideBottomNav && <BottomNav />}

      </body>
    </html>
  );
}