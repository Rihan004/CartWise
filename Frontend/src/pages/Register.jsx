export default function Register() {

    const handleRegister = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch("http://localhost:5000/api/auth/local/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();
            if (data.token) {
                // Save token
                localStorage.setItem("token", data.token);
                window.location.href = "/";
            } else {
                alert(data.error || "Registration failed");
            }
        } catch (err) {
            alert("Server error");
        }
    };

    const handleGoogleSignup = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl p-10 rounded-2xl text-center w-full max-w-md">

                <h1 className="text-3xl font-bold mb-6 text-purple-600">
                    Create Your Account
                </h1>

                <form onSubmit={handleRegister} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full border border-gray-300 p-3 rounded-xl"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full border border-gray-300 p-3 rounded-xl"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-300 p-3 rounded-xl"
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition"
                    >
                        Register
                    </button>
                </form>

                <div className="my-4 text-gray-500">OR</div>

                <button
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-3 rounded-xl shadow-sm transition-all"
                >
                    {/* Google Logo */}
                    <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                        <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                        <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                        <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                    </svg>

                    <span className="text-gray-700 font-medium">Sign up with Google</span>
                </button>

                <p className="mt-6 text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-purple-600 font-medium">Login</a>
                </p>

            </div>
        </div>
    );
}
