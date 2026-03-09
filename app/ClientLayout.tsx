"use client";

import { usePathname } from "next/navigation";
import FooterNav from "./components/FooterNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide footer on one-on-one chat pages
  const hideFooter =
    pathname.startsWith("/messages/") && pathname !== "/messages";

  return (
    <>
      {children}
      {!hideFooter && <FooterNav />}
    </>
  );
}
