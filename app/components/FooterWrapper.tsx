"use client";

import { usePathname } from "next/navigation";
import FooterNav from "./FooterNav";

export default function FooterWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/settings")) {
    return null;
  }

  return <FooterNav />;
}