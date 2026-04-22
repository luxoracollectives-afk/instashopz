"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TwoFactorPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">
          Two-Factor Authentication
        </h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        <p className="text-gray-400 text-sm">
          Add an extra layer of security to your account by enabling
          two-factor authentication.
        </p>

        <Link href="/settings/account/security/2fa/setup">
          <button className="bg-white text-black py-3 rounded-xl font-semibold">
            Enable 2FA
          </button>
        </Link>

      </div>
    </main>
  );
}