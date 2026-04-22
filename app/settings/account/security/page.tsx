"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SecurityPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>

        <h1 className="text-2xl font-semibold">
          Passwords & Security
        </h1>
      </div>

      {/* OPTIONS */}
      <div className="mt-6 px-4 flex flex-col gap-6">

        {/* CHANGE PASSWORD */}
        <Link href="/settings/account/security/password" className="block">
          <div className="flex justify-between items-center cursor-pointer">
            <p className="text-lg">Change Password</p>
            <span>{">"}</span>
          </div>
        </Link>

        {/* 2FA */}
        <Link href="/settings/account/security/2fa" className="block">
          <div className="flex justify-between items-center cursor-pointer">
            <p className="text-lg">Two-Factor Authentication</p>
            <span>{">"}</span>
          </div>
        </Link>

        {/* DELETE / DEACTIVATE */}
        <Link href="/settings/account/security/account" className="block">
          <div className="flex justify-between items-center cursor-pointer text-red-500">
            <p className="text-lg">Delete / Deactivate Account</p>
            <span>{">"}</span>
          </div>
        </Link>

      </div>
    </main>
  );
}