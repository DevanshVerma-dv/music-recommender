"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VideoCard from "../components/VideoCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();

  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await fetch("/api/search?q=" + encodeURIComponent(query));
        const data = await res.json();
        setRes(data || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleLogOut = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white pb-16">
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

      {/* Page content */}
      <div className="pt-32 px-6 sm:px-12">
        <h1 className="text-3xl font-bold mb-8">Search Results:</h1>

        {loading ? (
          <p>Loading...</p>
        ) : res.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {res.map((video) => (
              <VideoCard key={`${video.id}-${video.title}`} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
