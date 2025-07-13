import Image from "next/image";

export default function Home() {
  return (
    <div className="relative grid grid-rows-[auto_1fr_auto] min-h-screen bg-[#eaf6fb] font-[family-name:var(--font-geist-sans)] px-8 pb-20 pt-8 sm:px-20">
      
      {/* Header */}
      <header className="absolute top-8 left-8 right-8 flex justify-between items-center">
        {/* Logo */}
        <div className="text-[32px] font-bold text-[#0070f3]">Tunea</div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <button className="bg-[#0070f3] text-white px-5 py-2 rounded-full hover:bg-[#005bb5] transition-colors">
            Log In
          </button>
          <button className="bg-[#00b894] text-white px-5 py-2 rounded-full hover:bg-[#019875] transition-colors">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="row-start-2 flex flex-col gap-6 justify-center items-center text-center">
        <div className="text-5xl sm:text-6xl font-extrabold text-[#1a1a1a]">
          Welcome to <span className="text-[#0070f3]">Tunea</span>
        </div>
        <div className="text-[16px] text-[#555] max-w-md">
          Find new tracks, enjoy your favorites, and make every moment musical...
        </div>
        <button className="bg-[#0070f3] text-white px-6 py-3 rounded-md hover:bg-[#005bb5] transition-colors">
          Start Now
        </button>
      </main>
    </div>
  );
}
