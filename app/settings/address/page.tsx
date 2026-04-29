"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddressPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<any[]>([]);

  // ✅ LOAD FROM localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses") || "[]");
    setAddresses(stored);
  }, []);

  // ❌ DELETE ADDRESS
  const deleteAddress = (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Saved Address</h1>
      </div>

      {/* EMPTY STATE */}
      {addresses.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          No saved addresses
        </div>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-4">

        {addresses.map((addr, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] p-4 rounded-xl flex justify-between items-start"
          >

            {/* LEFT (DETAILS) */}
            <div>
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm text-gray-400 mt-1">
  {addr.door}, {addr.floor && addr.floor + ", "}
  {addr.street}, {addr.area}
</p>

<p className="text-sm text-gray-400">
  {addr.city}, {addr.state} - {addr.pincode}
</p>

<p className="text-sm text-gray-400">
  {addr.phone}
</p>
              <p className="text-sm text-gray-400">
                {addr.phone}
              </p>
            </div>

            {/* RIGHT (ACTIONS) */}
            <div className="flex flex-col gap-2 text-sm">

              {/* EDIT */}
              <button
                onClick={() =>
                  router.push(`/settings/address/edit/${index}`)
                }
                className="text-blue-400"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteAddress(index)}
                className="text-red-400"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => router.push("/settings/address/add")}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
      >
        + Add Address
      </button>

    </main>
  );
}