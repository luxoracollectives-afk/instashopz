"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddAddressPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    door: "",
    floor: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveAddress = () => {
    const existing = JSON.parse(localStorage.getItem("addresses") || "[]");

    const updated = [...existing, form];

    localStorage.setItem("addresses", JSON.stringify(updated));

    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-semibold">Add Address</h1>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-3">

        <input placeholder="Full Name" onChange={(e) => handleChange("name", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="Phone Number" onChange={(e) => handleChange("phone", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="Door No / House No" onChange={(e) => handleChange("door", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="Floor (optional)" onChange={(e) => handleChange("floor", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="Street Name" onChange={(e) => handleChange("street", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="Area / Locality" onChange={(e) => handleChange("area", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="City" onChange={(e) => handleChange("city", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="State" onChange={(e) => handleChange("state", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

        <input placeholder="Pincode" onChange={(e) => handleChange("pincode", e.target.value)} className="bg-[#1a1a1a] p-3 rounded-xl" />

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveAddress}
        className="w-full mt-6 bg-yellow-500 py-3 rounded-xl text-black font-semibold"
      >
        Save Address
      </button>

    </main>
  );
}