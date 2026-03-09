"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <img src="/logo.png" className="animate-bounce w-60" />
    </main>
  );
}
