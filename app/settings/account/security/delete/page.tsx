"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccountPage() {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = () => {
    setError("");

    if (input !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    // 🔴 backend later:
    // verify password + delete account

    router.push("/settings/account/security/delete/success");
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold text-red-500">
          Delete Account
        </h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        {/* WARNING */}
        <div className="flex flex-col gap-2">
          <p className="text-red-500 font-semibold">
            This action is permanent
          </p>

          <p className="text-gray-400 text-sm">
            Deleting your account will remove all your data, posts,
            and activity. This cannot be undone.
          </p>

          <p className="text-gray-500 text-sm">
            Type <span className="text-white">DELETE</span> and enter your password to confirm.
          </p>
        </div>

        {/* DELETE TEXT INPUT */}
        <input
          type="text"
          placeholder="Type DELETE"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-[#1a1a1a] p-3 rounded-xl outline-none text-center"
        />

        {/* PASSWORD INPUT */}
        <div className="flex items-center bg-[#1a1a1a] rounded-xl px-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent flex-1 py-3 outline-none"
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            👁️
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="bg-red-600 py-3 rounded-xl font-semibold"
        >
          Permanently Delete
        </button>

      </div>
    </main>
  );
}