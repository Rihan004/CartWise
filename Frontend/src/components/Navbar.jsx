// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BarChart3 } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.profile_pic) {
          setProfilePic(parsed.profile_pic);
          return;
        }
      } catch (err) {
        console.error("Invalid user object:", err);
      }
    }
    setProfilePic("https://i.pravatar.cc/40");
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const linkClasses = (path) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
    ${
      location.pathname === path
        ? "bg-white text-indigo-700 shadow-md"
        : "text-white hover:bg-white/20"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide drop-shadow-md"
        >
          CartWise
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/" className={linkClasses("/")}>Expenses</Link>
          <Link to="/grocery" className={linkClasses("/grocery")}>Groceries</Link>
          <Link to="/analytics" className={linkClasses("/analytics")}>
            <BarChart3 size={16} /> Analytics
          </Link>

          {/* Profile */}
          <div className="relative ml-3">
            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
              onError={(e) => {
                e.currentTarget.src = "https://i.pravatar.cc/40";
              }}
            />

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-red-600 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-3">
          <Link to="/" className={linkClasses("/")}>Expenses</Link>
          <Link to="/grocery" className={linkClasses("/grocery")}>Groceries</Link>
          <Link to="/analytics" className={linkClasses("/analytics")}>
            <BarChart3 size={16} /> Analytics
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-xl text-red-300 hover:bg-red-500/20 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
