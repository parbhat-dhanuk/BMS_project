import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthProvider";
import {
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  PenSquare,
  BookOpen,
  User,
  Info,
} from "lucide-react";

const Navbar = () => {
  const { dark, toggleTheme } = useTheme();
  const { isAuth, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-base font-semibold text-gray-900 dark:text-white tracking-tight whitespace-nowrap shrink-0"
        >
          Blog<span className="text-blue-500">MS</span>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {isAuth && (
            <>
              <NavLink to="/blog/add" icon={<PenSquare size={14} />}>
                Add Blog
              </NavLink>
              <NavLink to="/blogs/all" icon={<BookOpen size={14} />}>
                Blogs
              </NavLink>
              <NavLink to="/myblogs" icon={<User size={14} />}>
                My Blogs
              </NavLink>
            </>
          )}
          <NavLink to="/about" icon={<Info size={14} />}>
            About
          </NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuth ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                  {user?.username}
                </span>
                <ChevronDown
                  size={13}
                  className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden py-1">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                      {user?.username}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={14} />
                    {loading ? "Signing out…" : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
  >
    {icon}
    {children}
  </Link>
);

export default Navbar;
