"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HiddenWordsPage() {
  const router = useRouter();

  const [enabled, setEnabled] = useState(true);
  const [input, setInput] = useState("");
  const [words, setWords] = useState(["spam", "abuse"]);

  const addWord = () => {
    if (!input.trim()) return;
    setWords([...words, input]);
    setInput("");
  };

  const removeWord = (word: string) => {
    setWords(words.filter((w) => w !== word));
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-lg font-semibold">Hidden Words</h1>
      </div>

      {/* TOGGLE */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4 flex justify-between items-center">
        <p className="text-sm">Hide offensive words</p>

        <button
          onClick={() => setEnabled(!enabled)}
          className={`px-3 py-1 rounded ${
            enabled ? "bg-yellow-500 text-black" : "bg-gray-700"
          }`}
        >
          {enabled ? "ON" : "OFF"}
        </button>
      </div>

      {/* ADD INPUT */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Add word..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#1a1a1a] p-3 rounded-xl"
        />

        <button
          onClick={addWord}
          className="bg-yellow-500 text-black px-4 rounded-xl"
        >
          Add
        </button>
      </div>

      {/* WORD LIST */}
      <div className="flex flex-col gap-2">

        {words.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            No hidden words
          </p>
        )}

        {words.map((word, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] p-3 rounded-xl flex justify-between items-center"
          >
            <p>{word}</p>

            <button
              onClick={() => removeWord(word)}
              className="text-red-400 text-sm"
            >
              Remove
            </button>
          </div>
        ))}

      </div>

    </main>
  );
}