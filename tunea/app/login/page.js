export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#d6eaff] px-4">
      {/* Logo */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
        <div className="text-[32px] font-bold text-[#0070f3]">Tunea</div>
      </div>
      
      {/* Login Form */}
      <div className="bg-white/40 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#0070f3]">Log in to Tunea</h2>

        <form className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="px-4 py-3 rounded-md border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-md border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
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
        <div className="text-center mt-4 text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#0070f3] hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
