// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsed = JSON.parse(user);

        if (parsed.profile_pic && parsed.profile_pic !== "") {
          setProfilePic(parsed.profile_pic);
          return;
        }
      } catch (err) {
        console.error("Invalid user object:", err);
      }
    }

    // default fallback
    setProfilePic("https://i.pravatar.cc/40");
  }, []);
  const handleLogout = async () => {
    try {
      // Call backend logout (optional, mainly for Google OAuth sessions)
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // needed for cookies if using Passport
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    // Remove JWT and user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "/login";
  };

  const linkClasses = (path) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-white text-indigo-700 shadow-md scale-105"
        : "text-white hover:bg-indigo-500 hover:scale-105"
    }`;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg relative">
      <div className="text-2xl font-extrabold tracking-wide drop-shadow-md">
        <Link to="/" className="hover:opacity-80 transition">
          CartWise
        </Link>
      </div>


      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className={linkClasses("/")}>Expenses</Link>
        <Link to="/grocery" className={linkClasses("/grocery")}>Groceries</Link>
        <div className="ml-3 relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://i.pravatar.cc/40";
            }}
          />

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg flex flex-col">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-red-100 rounded-t-xl transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        className="md:hidden p-2 hover:bg-indigo-500 rounded-lg transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-indigo-700 shadow-lg flex flex-col items-center py-4 space-y-3 md:hidden z-50">
          <Link onClick={() => setMenuOpen(false)} to="/" className={linkClasses("/")}>
            Expenses
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/grocery" className={linkClasses("/grocery")}>
            Groceries
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
