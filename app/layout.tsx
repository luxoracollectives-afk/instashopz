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

  // Hide floating menu ONLY on stories (fullscreen)
  const hideBottomNav = pathname.startsWith("/stories");

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        {!hideBottomNav && <BottomNav />}
      </body>
    </html>
  );
}
