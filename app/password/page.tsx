"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin(e: any) {
    e.preventDefault();

    // Later: validate password, save user, etc.
    router.push("/"); // Move to Home after login
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
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="password"
          placeholder="ENTER PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg"
        />

        {/* Password rule */}
        <p className="text-white text-sm px-1">
          PASSWORD MUST INCLUDE BOTH LETTERS AND NUMBER.
        </p>

        {/* Button */}
        <button
          type="submit"
          className="bg-white text-black font-semibold rounded-xl py-4 mt-4 active:scale-95 transition w-48 mx-auto"
        >
          LOGIN
        </button>
      </form>

    </main>
  );
}

