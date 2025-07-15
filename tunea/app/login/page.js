"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = async(e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to log in");
        return;
      }

      router.push("/dashboard");
    }
    catch(error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
      }}
    >
      {/* Logo */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
        <div className="text-[32px] font-bold text-[#60aaff]">Tunea</div>
      </div>
      
      {/* Login Form */}
      <div className="bg-[#181c2b]/80 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#60aaff]">Log in to Tunea</h2>

        {error && <p text-red-400 text-sm mb-4 text-center>{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleLogIn}>
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-[#e0e0e0]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="px-4 py-3 rounded-md border border-gray-700 bg-[#23243a]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60aaff]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-[#e0e0e0]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-md border border-gray-700 bg-[#23243a]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60aaff]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#0070f3] text-white py-3 rounded-md hover:bg-[#005bb5] transition-colors"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-[#e0e0e0]">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#60aaff] hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
