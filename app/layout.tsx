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

  // 🔥 ROUTES WHERE FOOTER SHOULD BE HIDDEN
  const hiddenRoutes = [
    "/stories",
    "/settings",
  ];

  const hideBottomNav = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">

        {/* MAIN CONTENT */}
        <main className="pb-0">
          {children}
        </main>

        {/* FOOTER NAV */}
        {!hideBottomNav && <BottomNav />}

      </body>
    </html>
  );
}