"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="relative grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)] px-8 pb-20 pt-8 sm:px-20"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
      }}
    >
      
      {/* Header */}
      <header className="absolute top-8 left-8 right-8 flex justify-between items-center">
        {/* Logo */}
        <div className="text-[32px] font-bold text-[#60aaff]">Tunea</div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <button onClick={() => router.push("/login")}
                  className="bg-[#0070f3] text-white px-5 py-2 rounded-full hover:bg-[#005bb5] transition-colors">
            Log In
          </button>
          <button onClick={() => router.push("/signup")} 
                  className="bg-[#00b894] text-white px-5 py-2 rounded-full hover:bg-[#019875] transition-colors">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="row-start-2 flex flex-col gap-6 justify-center items-center text-center">
        <div className="text-5xl sm:text-6xl font-extrabold text-white">
          Welcome to <span className="text-[#60aaff]">Tunea</span>
        </div>
        <div className="text-[16px] text-[#e0e0e0] max-w-md">
          Find new tracks, enjoy your favorites, and make every moment musical...
        </div>
        <button onClick={() => router.push("/login")}
        className="bg-[#0070f3] text-white px-6 py-3 rounded-md hover:bg-[#005bb5] transition-colors">
          Start Now
        </button>
      </main>
    </div>
  );
}