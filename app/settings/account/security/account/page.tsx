"use client";

import { useRouter } from "next/navigation";

export default function AccountActionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">
          Account Actions
        </h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-8">

        {/* DEACTIVATE */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">
            Deactivate Account
          </h2>

          <p className="text-gray-400 text-sm">
            Temporarily disable your account. Your profile, posts, and
            data will be hidden until you log back in.
          </p>

          <p className="text-gray-500 text-sm">
            You can reactivate your account anytime by signing in again.
          </p>

          <p
  onClick={() => router.push("/settings/account/security/deactivate")}
  className="text-blue-500 text-sm cursor-pointer mt-1"
>
  Deactivate Account
</p>
        </div>

        {/* DELETE */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">
            Delete Account
          </h2>

          <p className="text-gray-400 text-sm">
            Permanently delete your account and all your data. This
            action cannot be undone.
          </p>

          <p className="text-gray-500 text-sm">
            Once deleted, you will not be able to recover your account
            or any of your information.
          </p>

         <p
  onClick={() => router.push("/settings/account/security/delete")}
  className="text-red-500 text-sm cursor-pointer mt-1"
>
  Delete Account
</p>
        </div>

      </div>
    </main>
  );
}