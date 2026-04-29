"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { use } from "react";

export default function EditAddress({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses") || "[]");
    const data = stored[Number(id)];

    if (data) {
      setName(data.name);
      setAddress(data.address);
      setPhone(data.phone);
    }
  }, [id]);

  const updateAddress = () => {
    const stored = JSON.parse(localStorage.getItem("addresses") || "[]");

    stored[Number(id)] = { name, address, phone };

    localStorage.setItem("addresses", JSON.stringify(stored));

    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-semibold">Edit Address</h1>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#1a1a1a] p-3 rounded-xl"
        />

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-[#1a1a1a] p-3 rounded-xl"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-[#1a1a1a] p-3 rounded-xl"
        />

      </div>

      {/* SAVE */}
      <button
        onClick={updateAddress}
        className="w-full mt-6 bg-yellow-500 py-3 rounded-xl text-black font-semibold"
      >
        Update Address
      </button>

    </main>
  );
}