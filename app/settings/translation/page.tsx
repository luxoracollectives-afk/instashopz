"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TranslationPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");

  const languages = [
    { id: "en", label: "English" },
    { id: "hi", label: "Hindi" },
    { id: "te", label: "Telugu" },
    { id: "es", label: "Spanish" },
    { id: "fr", label: "French" },
  ];

  // ✅ Load saved language
  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLanguage(saved);
  }, []);

  // ✅ Save language
  const handleSelect = (id: string) => {
    setLanguage(id);
    localStorage.setItem("language", id);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Translation</h1>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3">
        {languages.map((lang) => (
          <div
            key={lang.id}
            onClick={() => handleSelect(lang.id)}
            className={`p-4 rounded-xl cursor-pointer flex justify-between ${
              language === lang.id
                ? "bg-yellow-500 text-black"
                : "bg-[#1a1a1a]"
            }`}
          >
            <p>{lang.label}</p>
            {language === lang.id && <span>✓</span>}
          </div>
        ))}
      </div>

    </main>
  );
}