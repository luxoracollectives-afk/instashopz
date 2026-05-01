"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddressPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("");

  // ✅ LOAD ADDRESSES
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses") || "[]");

    // ✅ Ensure every address has unique id
    const fixed = stored.map((addr: any, index: number) => ({
      ...addr,
      id: addr.id ?? `${Date.now()}-${index}`,
    }));

    setAddresses(fixed);
  }, []);

  // ✅ CONTINUE
  const handleContinue = () => {
    if (!selected) {
      alert("Please select an address");
      return;
    }

    const chosen = addresses.find(
      (a) => String(a.id) === selected
    );

    localStorage.setItem("selectedAddress", JSON.stringify(chosen));

    router.push("/checkout/payment");
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Select Address</h1>
      </div>

      {/* EMPTY STATE */}
      {addresses.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          No saved addresses
        </div>
      )}

      {/* ADDRESS LIST */}
      <div className="flex flex-col gap-4">

        {addresses.map((addr) => {
          const id = String(addr.id);

          return (
            <div
              key={id}
              className={`flex gap-3 p-4 rounded-xl border ${
                selected === id
                  ? "border-yellow-500"
                  : "border-gray-700"
              } bg-[#1a1a1a]`}
            >

              {/* RADIO */}
              <input
                type="radio"
                id={`address-${id}`}
                name="address"
                value={id}
                checked={selected === id}
                onChange={(e) => setSelected(e.target.value)}
                className="mt-1"
              />

              {/* LABEL */}
              <label
                htmlFor={`address-${id}`}
                className="cursor-pointer flex-1"
              >
                <p className="font-semibold">{addr.name}</p>
                <p className="text-sm text-gray-400">{addr.phone}</p>

                <p className="text-sm mt-1">
                  {addr.address}, {addr.city}
                </p>

                <p className="text-sm text-gray-400">
                  {addr.state} - {addr.pincode}
                </p>
              </label>

            </div>
          );
        })}

      </div>

      {/* ADD NEW ADDRESS */}
      <button
        onClick={() => router.push("/settings/address")}
        className="w-full mt-6 border border-gray-600 py-3 rounded-xl"
      >
        + Add New Address
      </button>

      {/* CONTINUE */}
      {addresses.length > 0 && (
        <button
          onClick={handleContinue}
          className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-xl font-semibold"
        >
          Continue
        </button>
      )}

    </main>
  );
}