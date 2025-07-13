"use client";

import { useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf6fb] to-[#d6eaff] px-6 sm:px-12 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        {/* Logo Text */}
        <div className="text-[32px] font-bold text-[#0070f3]">Tunea</div>

        {/* Log Out Button */}
        <button className="bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#e55050] transition">
          Log Out
        </button>
      </header>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for songs, artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0070f3] text-[#1a1a1a] placeholder-gray-500"
        />
      </div>

      {/* Recommendations */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/40 backdrop-blur p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-200 rounded-md mb-3"></div>
              <h3 className="text-lg font-bold text-[#1a1a1a]">Song Title</h3>
              <p className="text-sm text-[#333]">Artist Name</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">Recently Played</h2>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="min-w-[200px] bg-white/40 backdrop-blur p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="h-32 bg-gray-200 rounded-md mb-2"></div>
              <h3 className="text-md font-bold text-[#1a1a1a]">Track Name</h3>
              <p className="text-sm text-[#333]">Artist</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
