"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function DeviceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);

  // ✅ MOCK DEVICES
  const devices = [
    {
      name: "iPhone 13",
      timeSpent: "2 hrs 30 mins today",
    },
    {
      name: "Chrome - Windows",
      timeSpent: "1 hr 10 mins today",
    },
  ];

  const device = devices[Number(id)];

  if (!device) {
    return (
      <main className="min-h-screen bg-black text-white p-4">
        <p>Device not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-lg font-semibold">Device Details</h1>
      </div>

      {/* DEVICE CARD */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
        <p className="font-semibold text-lg">{device.name}</p>
        <p className="text-sm text-gray-400 mt-1">
          Time spent: {device.timeSpent}
        </p>
      </div>

      {/* STEP 1: LOGOUT BUTTON */}
      {!showOtp && !loggedOut && (
        <button
          onClick={() => setShowOtp(true)}
          className="w-full bg-red-500 py-3 rounded-xl font-semibold"
        >
          Logout from this device
        </button>
      )}

      {/* STEP 2: OTP */}
      {showOtp && !loggedOut && (
        <div className="mt-4 flex flex-col gap-3">

          <input
            placeholder="Enter OTP (try 1234)"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-[#1a1a1a] p-3 rounded-xl outline-none"
          />

          <button
            onClick={() => {
              if (otp === "1234") {
                setLoggedOut(true);
              } else {
                alert("Invalid OTP ❌");
              }
            }}
            className="bg-yellow-500 text-black py-3 rounded-xl font-semibold"
          >
            Verify OTP
          </button>

        </div>
      )}

      {/* STEP 3: SUCCESS */}
      {loggedOut && (
        <div className="mt-6 text-center text-green-400 font-semibold">
          Logout successful ✅
        </div>
      )}

    </main>
  );
}