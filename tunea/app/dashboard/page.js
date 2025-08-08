"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "../components/VideoCard";
import Cookies from "js-cookie"; // Assuming you might use this for user info

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  
  // --- ADDED: State for the recommendation model ---
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(""); // Added for greeting

  // This useEffect now handles loading everything on startup
  useEffect(() => {
    // Greet the user if they are logged in
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name || "User");
      } catch (e) {
        console.error("Could not decode token.");
      }
    }

    // Load recently played from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
      const validStored = Array.isArray(stored) ? stored.filter(v => v && v.id) : [];
      setRecentlyPlayed(validStored);
      // Fetch initial recommendations based on stored history
      fetchRecommendations(validStored);
    } catch (err) {
      console.error("Failed to load recently played:", err);
      setRecentlyPlayed([]);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleLogOut = () => {
    Cookies.remove("authToken", { path: "/" });
    localStorage.removeItem("recentlyPlayed");
    router.push("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      router.push("/search?q=" + encodeURIComponent(searchQuery));
    }
  };
  
  // --- ADDED: Function to fetch recommendations from the API ---
  const fetchRecommendations = async (playedTracks) => {
    setIsLoading(true);
    const recentlyPlayedArtists = [
      ...new Set(playedTracks.map(video => video?.snippet?.channelTitle).filter(Boolean))
    ];

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recentlyPlayedArtists }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      
      const videoPromises = data.recommendations.map(artistName => 
        fetch(`/api/search?q=${encodeURIComponent(artistName)}&maxResults=1`)
          .then(res => res.json())
          .then(searchData => (searchData.items && searchData.items.length > 0) ? searchData.items[0] : null)
      );

      const recommendedVideos = (await Promise.all(videoPromises)).filter(Boolean);
      setRecommendations(recommendedVideos);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- ADDED: Function to handle video plays and trigger recommendations ---
  const handleVideoPlay = (video) => {
    if (!video || !video.id) return;
    try {
      let played = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
      if (!Array.isArray(played)) played = [];
      
      const newPlayed = [video, ...played.filter(v => v?.id?.videoId !== video.id.videoId)];
      const updatedList = newPlayed.slice(0, 20);
      
      localStorage.setItem("recentlyPlayed", JSON.stringify(updatedList));
      setRecentlyPlayed(updatedList);
      fetchRecommendations(updatedList); // Re-fetch recommendations
    } catch (e) {
      console.error("Could not update recently played:", e);
    }
  };

  return (
    <div
      className="min-h-screen px-6 sm:px-12 py-10 relative"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-[#181c2b]/70 shadow-lg rounded-b-xl">
        <div className="text-[32px] font-bold text-[#60aaff]">Tunea</div>
        <div className="flex items-center gap-4">
          <span className="text-white">Welcome, {userName}!</span>
          <button
            onClick={handleLogOut}
            className="bg-[#ff6b6b] text-white px-5 py-2 rounded-full hover:bg-[#e55050] shadow transition-colors duration-200"
          >
            Log Out
          </button>
        </div>
      </header>
      <div className="pt-32">
        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search for songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full max-w-xl px-5 py-3 rounded-xl border border-gray-700 bg-[#23243a]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60aaff] shadow"
          />
        </div>

        {/* Recommendations Section - NOW DYNAMIC */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#e0e0e0] mb-6 text-center">
            Recommended for You
          </h2>
          {isLoading ? (
            <p className="text-center text-gray-400">Finding new music for you...</p>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((video, i) => (
                <VideoCard
                  key={`${video?.id?.videoId}-${i}`}
                  video={video}
                  onPlay={() => handleVideoPlay(video)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Play a song to get new recommendations!
            </p>
          )}
        </section>

        {/* Recently Played Section - NOW TRIGGERS RECOMMENDATIONS */}
        <section>
          <h2 className="text-2xl font-bold text-[#e0e0e0] mb-6 text-center">
            Recently Played
          </h2>
          {recentlyPlayed.length === 0 ? (
            <p className="text-center text-gray-400">
              No recently played tracks
            </p>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {recentlyPlayed.slice(0, 10).map((video, i) => (
                <div
                  key={`${video?.id?.videoId}-${i}`}
                  className="min-w-[320px] max-w-[360px] flex-shrink-0"
                >
                  <VideoCard
                    video={video}
                    onPlay={() => handleVideoPlay(video)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
