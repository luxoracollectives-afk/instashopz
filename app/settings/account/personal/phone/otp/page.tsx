"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function OTPPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // ⏱️ TIMER
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔢 HANDLE INPUT
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move forward
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // ✅ AUTO SUBMIT
    if (newOtp.every((digit) => digit !== "")) {
      console.log("OTP Entered:", newOtp.join(""));
      // later → API call
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    console.log("OTP Resent");
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Verify OTP</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-8 flex flex-col gap-8 items-center">

        <p className="text-gray-400 text-sm text-center">
          Enter the 6-digit code sent to your phone
        </p>

        {/* OTP BOXES */}
        <div className="flex gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-12 h-14 text-center text-xl bg-[#1a1a1a] rounded-xl outline-none focus:ring-2 focus:ring-white"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
  onClick={() => router.push("/settings/account/personal/phone/success")}
  className="bg-white text-black py-3 px-10 rounded-xl font-semibold w-full max-w-xs"
>
  Verify
</button>

        {/* RESEND TIMER */}
        {timer > 0 ? (
          <p className="text-gray-500 text-sm">
            Resend code in <span className="text-white">{timer}s</span>
          </p>
        ) : (
          <p
            onClick={handleResend}
            className="text-white text-sm cursor-pointer"
          >
            Resend Code
          </p>
        )}

      </div>
    </main>
  );
}