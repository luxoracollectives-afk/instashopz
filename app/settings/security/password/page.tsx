"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔐 PASSWORD STRENGTH
  const getStrength = (password: string) => {
    if (password.length < 4) return "Weak";
    if (password.length < 8) return "Medium";
    return "Strong";
  };

  const strength = getStrength(newPass);

  const handleSubmit = () => {
    setError("");

    if (!current || !newPass || !confirm) {
      setError("All fields are required");
      return;
    }

    if (newPass !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // ✅ backend later → verify current password

    router.push("/settings/account/security/success");
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Change Password</h1>
      </div>

      {/* FORM */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* CURRENT PASSWORD */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm">Current Password</label>
          <div className="flex items-center bg-[#1a1a1a] rounded-xl px-3">
            <input
              type={showCurrent ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="bg-transparent flex-1 py-3 outline-none"
            />
            <button onClick={() => setShowCurrent(!showCurrent)}>
              👁️
            </button>
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm">New Password</label>
          <div className="flex items-center bg-[#1a1a1a] rounded-xl px-3">
            <input
              type={showNew ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="bg-transparent flex-1 py-3 outline-none"
            />
            <button onClick={() => setShowNew(!showNew)}>
              👁️
            </button>
          </div>

          {/* STRENGTH */}
          {newPass && (
            <p
              className={`text-sm ${
                strength === "Weak"
                  ? "text-red-500"
                  : strength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Strength: {strength}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm">
            Confirm New Password
          </label>
          <div className="flex items-center bg-[#1a1a1a] rounded-xl px-3">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="bg-transparent flex-1 py-3 outline-none"
            />
            <button onClick={() => setShowConfirm(!showConfirm)}>
              👁️
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="bg-white text-black py-3 rounded-xl font-semibold"
        >
          Update Password
        </button>

      </div>
    </main>
  );
}