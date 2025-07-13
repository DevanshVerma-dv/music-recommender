export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#d6eaff] px-4">
            {/* Logo */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                <div className="text-[32px] font-bold text-[#0070f3]">Tunea</div>
            </div>
            
            <div className="bg-white/40 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#0070f3]">Sign up for Tunea</h2>

                <form className="flex flex-col gap-4">
                    {/* Userame */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-900">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Username"
                            className="px-4 py-3 rounded-md border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-900">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="px-4 py-3 rounded-md border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-900">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="px-4 py-3 rounded-md border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-900">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="px-4 py-3 rounded-md border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
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
    )
}