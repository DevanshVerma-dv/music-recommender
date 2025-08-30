"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TrackCard from "../components/TrackCard";

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
      setRecentlyPlayed(stored);

      // if there's recently played tracks, get recommendations for latest one
      if (stored.length > 0) {
        getRecommendations(stored[0].id);
      }
    } catch (err) {
      console.error("Failed to load recently played:", err);
    }
  }, []);

  const handleLogOut = () => {
    router.push("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      router.push("/search?q=" + encodeURIComponent(searchQuery));
      setSearchQuery("");
    }
  };

  const getRecommendations = async (trackId) => {
    setLoadingRecs(true);
    try {
      const trackObj = recentlyPlayed.find(t => t.id === trackId);
      if (!trackObj) return;

      const trackName = trackObj.name;
      const artistName = trackObj.artists?.[0]?.name;

      const res = await fetch(
        `http://localhost:5000/recommend?track_nm=${encodeURIComponent(trackName)}&artist_nm=${encodeURIComponent(artistName)}`
      );
      const data = await res.json();
      setRecommendations(data || []);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoadingRecs(false);
    }
  };

  return (
    <div
      className="min-h-screen px-6 sm:px-12 py-10 relative"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-[#181c2b]/70 shadow-lg rounded-b-xl">
        <div className="text-[32px] font-bold text-[#60aaff]">Tunea</div>
        <button
          onClick={handleLogOut}
          className="bg-[#ff6b6b] text-white px-5 py-2 rounded-full hover:bg-[#e55050] shadow transition-colors duration-200"
        >
          Log Out
        </button>
      </div>
      <div className="pt-32">
        {/* Search Bar */}
        <div className="mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Search for songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full max-w-xl px-5 py-3 rounded-xl border border-gray-700 bg-[#23243a]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60aaff] shadow"
          />
        </div>
        
        {/* Recently Played */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#e0e0e0] mb-6 text-center">
            Recently Played
          </h2>
          {recentlyPlayed.length === 0 ? (
            <p className="text-center text-gray-400">
              You haven't started vibing yet!
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {recentlyPlayed.map((track) => (
                <TrackCard key={track.id} track={track} onTrackClick={getRecommendations} />
              ))}
            </div>
          )}
        </section>

        {/* Recommended */}
        <section>
          <h2 className="text-2xl font-bold text-[#e0e0e0] mb-6 text-center">
            Recommended for You
          </h2>
          {Array.isArray(recommendations) && recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {recommendations.map((track) => (
                <TrackCard key={track.id || `${track.Artist}-${track.Track}`}
                  track={track}
                  onTrackClick={getRecommendations}
                />
              ))}
            </div>
          ) : loadingRecs ? (
            <p className="text-center text-gray-400">Getting recommendations...</p>
          ) : (
            <p className="text-center text-gray-400">Click a song to get recommendations.</p>
          )}
        </section>
      </div>
    </div>
  );
}