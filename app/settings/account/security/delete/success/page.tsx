"use client";

export default function DeleteSuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">

      <h1 className="text-2xl font-semibold mb-4 text-red-500">
        Account Deleted
      </h1>

      <p className="text-gray-400 text-sm text-center">
        Your account has been permanently removed.
      </p>

    </main>
  );
}
