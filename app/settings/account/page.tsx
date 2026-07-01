"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountSettingsPage() {
  const router = useRouter();

  const items = [
    { text: "Personal details", href: "/settings/account/personal" },
   { text: "Passwords and security", href: "/settings/account/security" },
    { text: "Subscriptions", href: "/settings/account/subscriptions" },
    { text: "Your information and permissions", href: "/settings/account/info" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Join us & sell</h1>
      </div>

      {/* LIST */}
      <div className="mt-6 px-4 flex flex-col gap-6">

        {items.map((item, index) => (
          <Link key={index} href={item.href} className="block">
            <div className="flex justify-between items-center cursor-pointer hover:opacity-70 transition">
              <p className="text-lg">{item.text}</p>
              <span className="text-2xl">{">"}</span>
            </div>
          </Link>
        ))}

      </div>
    </main>
  );
}