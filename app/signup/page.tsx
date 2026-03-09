"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");

  function handleGenerateOtp(e: any) {
    e.preventDefault();

    // Later we can add OTP logic
    router.push("/otp"); // Navigate to OTP verification screen
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

      {/* Form */}
      <form 
        onSubmit={handleGenerateOtp}
        className="w-full max-w-md flex flex-col gap-6"
      >
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg"
        />

        <input
          type="tel"
          placeholder="PHONE NUMBER"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg"
        />

        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg"
        />

        <input
          type="date"
          placeholder="DATE OF BIRTH"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-white text-black font-semibold rounded-xl py-4 mt-4 active:scale-95 transition w-48 mx-auto"
        >
          GENERATE OTP
        </button>
      </form>

    </main>
  );
}
