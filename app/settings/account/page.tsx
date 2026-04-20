"use client";

import { useRouter } from "next/navigation";

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
        <h1 className="text-2xl font-semibold">Account Settings</h1>
      </div>

      {/* LIST */}
      <div className="mt-6 px-4 flex flex-col gap-6">

        {items.map((item, index) => (
          <SettingItem
            key={index}
            text={item.text}
          />
        ))}

      </div>
    </main>
  );
}

function SettingItem({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer hover:opacity-70 transition">

      <p className="text-lg">{text}</p>

      {/* Arrow (clean minimal) */}
      <span className="text-2xl">{">"}</span>

    </div>
  );
}