import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/local/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "/";
            } else {
                alert(data.error || "Login failed");
            }
        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 px-4">

            <div className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-10">

                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-center text-white mb-3">
                    Cart<span className="text-purple-400">Wise</span>
                </h1>

                <p className="text-center text-gray-400 mb-8 text-sm">
                    Smart expense tracking with intelligent insights
                </p>

                {/* Email Login */}
                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3 rounded-xl bg-gray-900/70 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl bg-gray-900/70 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-white 
                                   bg-gradient-to-r from-purple-500 to-purple-700
                                   hover:from-purple-600 hover:to-purple-800
                                   shadow-lg shadow-purple-500/30
                                   transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-gray-700"></div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                               bg-gray-900 border border-gray-700
                               hover:border-purple-500 hover:bg-gray-800
                               transition-all duration-300"
                >
                    <svg viewBox="-3 0 262 262" className="w-5 h-5">
                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                        <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                        <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                        <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                    </svg>

                    <span className="text-gray-300 font-medium">
                        Continue with Google
                    </span>
                </button>

                {/* Register */}
                <p className="mt-8 text-center text-gray-500 text-sm">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-purple-400 hover:text-purple-300 font-medium">
                        Create one
                    </a>
                </p>

            </div>
        </div>
    );
}
