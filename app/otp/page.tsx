"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  function handleVerify(e: any) {
    e.preventDefault();

    // Temporary — after verifying OTP, go to home page
    router.push("/");
  }

  return (
    <main className="min-h-screen w-full bg-black flex flex-col items-center pt-20 px-6">

      {/* Logo */}
      <div className="mb-12">
        <Image 
          src="/logo.png"
          alt="Instashopz Logo"
          width={260}
          height={80}
          priority
        />
      </div>

      {/* OTP Input */}
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md flex flex-col gap-8"
      >
        <input
          type="text"
          maxLength={6}
          placeholder="ENTER OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg tracking-widest text-center"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-white text-black font-semibold rounded-xl py-4 active:scale-95 transition w-48 mx-auto"
        >
          VERIFY OTP
        </button>
      </form>

    </main>
  );
}

