"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: any) {
    e.preventDefault();
    // Temporary: After login, go to home
    router.push("/");
  }

  return (
    <main className="h-screen w-screen bg-black flex flex-col items-center pt-24 px-6">
      
      {/* Logo */}
      <div className="mb-12">
        <Image 
          src="/logo.png"
          alt="InstAshopZ Logo"
          width={250}
          height={60}
          priority
        />
      </div>

      {/* Form */}
      <form 
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-6 mt-6"
      >

        <input
          type="text"
          placeholder="USERNAME OR PHONE NUMBER"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg outline-none"
        />

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white rounded-xl py-4 px-4 text-black text-lg outline-none"
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-white text-black font-semibold rounded-xl py-4 mt-4 active:scale-95 transition"
        >
          LOGIN
        </button>
      </form>

      {/* Sign Up */}
      <p className="text-white mt-8 tracking-wide">
        DONT HAVE AN ACCOUNT?{" "}
        <span 
          onClick={() => router.push("/signup")}
          className="underline cursor-pointer"
        >
          SIGN IN
        </span>
      </p>

    </main>
  );
}
