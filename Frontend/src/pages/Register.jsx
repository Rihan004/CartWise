export default function Register() {
  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        alert(data.error || "Registration failed");
      }
    } catch {
      alert("Server error");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-br from-black via-gray-900 to-purple-950">

      {/* Card */}
      <div
        className="
          w-full max-w-md
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          shadow-2xl
          p-6 sm:p-8
        "
      >
              {/* Heading */}
              <h1 className="text-4xl font-extrabold text-center text-white mb-3">
                  Cart<span className="text-purple-400">Wise</span>
              </h1>

              <p className="text-center text-gray-400 mb-8 text-sm">
                  Smart expense tracking with intelligent insights
              </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="
              w-full p-3 rounded-xl
              bg-gray-900/70 text-white
              placeholder-gray-500
              border border-gray-700
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/30
              outline-none transition
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="
              w-full p-3 rounded-xl
              bg-gray-900/70 text-white
              placeholder-gray-500
              border border-gray-700
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/30
              outline-none transition
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="
              w-full p-3 rounded-xl
              bg-gray-900/70 text-white
              placeholder-gray-500
              border border-gray-700
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/30
              outline-none transition
            "
          />

          <button
            type="submit"
            className="
              w-full bg-purple-600 hover:bg-purple-700
              text-white py-3 rounded-xl
              font-semibold text-lg
              shadow-lg shadow-purple-500/30
              transition
            "
          >
            🚀 Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="
            w-full flex items-center justify-center gap-3
            bg-gray-900/70 hover:bg-gray-800
            border border-gray-700
            px-4 py-3 rounded-xl
            shadow-md transition
          "
        >
          <svg viewBox="-3 0 262 262" className="w-6 h-6">
            <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
            <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-42.356 32.782C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
            <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82L15.26 71.312C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
            <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
          </svg>

          <span className="text-gray-200 font-medium">
            Sign up with Google
          </span>
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-400 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
