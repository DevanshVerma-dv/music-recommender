"use client";

import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();

    const handleSignUp = async(e) => {
        e.preventDefault();
        const form = e.target;
        if (form.password.value != form.confirmPassword.value) {
            alert("Passwords do not match");
            return;
        }

        try{
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form.name.value,
                    email: form.email.value,
                    password: form.password.value,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Failed to sign up");
                return;
            }
            router.push("/dashboard");
        }
        catch(error) {
            console.error("Error signing up:", error);
            alert("An error occurred while signing up.");
        }
    }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Logo */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
        <div className="text-[32px] font-bold text-[#60aaff]">Tunea</div>
      </div>

      <div className="bg-[#181c2b]/80 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#60aaff]">
          Sign up for Tunea
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1 text-sm font-medium text-[#e0e0e0]"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Username"
              className="px-4 py-3 rounded-md border border-gray-700 bg-[#23243a]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60aaff]"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-[#e0e0e0]"
            >
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

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-[#e0e0e0]"
            >
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

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-sm font-medium text-[#e0e0e0]"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-md border border-gray-700 bg-[#23243a]/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60aaff]"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button className="bg-[#0070f3] text-white px-5 py-2 rounded-full hover:bg-[#005bb5] transition-colors">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
