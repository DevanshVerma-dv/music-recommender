"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogOut = (e) => {
    router.push("/");
  }

  return (
    <div
      className="min-h-screen px-6 sm:px-12 py-10 relative"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-[#181c2b]/70 shadow-lg rounded-b-xl">
        <div className="text-[32px] font-bold text-[#60aaff]">Tunea</div>
        <button onClick={handleLogOut}
        className="bg-[#ff6b6b] text-white px-5 py-2 rounded-full hover:bg-[#e55050] shadow transition-colors duration-200">
          Log Out
        </button>
      </div>
      <div className="pt-32">
        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search for songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-xl border border-gray-700 bg-[#23243a]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60aaff] shadow"
          />
        </div>
        {/* Recommendations */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#e0e0e0] mb-6 text-center">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#181c2b]/80 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-200"
              >
                <div className="h-40 bg-gradient-to-br from-[#23243a]/80 to-[#302b63]/60 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-[#60aaff] text-4xl font-bold opacity-30">
                    🎵
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Song Title
                </h3>
                <p className="text-sm text-[#e0e0e0]">Artist Name</p>
              </div>
            ))}
          </div>
        </section>
        {/* Recently Played */}
        <section>
          <h2 className="text-2xl font-bold text-[#e0e0e0] mb-6 text-center">
            Recently Played
          </h2>
          <div className="flex gap-6 overflow-visible pb-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] bg-[#181c2b]/80 backdrop-blur p-5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-200"
              >
                <div className="h-32 bg-gradient-to-br from-[#23243a]/80 to-[#302b63]/60 rounded-xl mb-3 flex items-center justify-center">
                  <span className="text-[#60aaff] text-3xl font-bold opacity-30">
                    🎶
                  </span>
                </div>
                <h3 className="text-md font-bold text-white mb-1">
                  Track Name
                </h3>
                <p className="text-sm text-[#e0e0e0]">Artist</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
