import React, { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  Phone,
  User,
  Settings,
  LogIn,
  Moon,
  Sun,
  Menu,
  X,
  Home,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On mount, load saved theme or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.body.className = defaultTheme;
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/about", label: "About", icon: <Users className="w-4 h-4" /> },
    { href: "/jobs", label: "Jobs", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <Phone className="w-4 h-4" /> },
    { href: "/profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    {
      href: "/admin-job-posting",
      label: "Admin Panel",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className=" bg-gray-950 text-white">
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-950/95 backdrop-blur-xl border-b border-yellow-400/20 shadow-2xl"
            : "bg-gray-950/80 backdrop-blur-lg border-b border-yellow-400/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <Link
              to="/"
              className="group flex items-center gap-4 hover:scale-105 transition-transform duration-200"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-yellow-400/25 transition-all duration-300">
                  <Zap className="w-6 h-6 text-black group-hover:animate-pulse" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                  CGC Jhanjeri
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  Placement Management System
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:bg-yellow-400/10"
                >
                  <div className="group-hover:animate-pulse">{item.icon}</div>
                  <span className="font-medium">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 rounded-lg transition-all duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              {/* <button
                onClick={toggleTheme}
                className="group relative p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-200 hover:scale-105"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 rounded-xl transition-all duration-300"></div>
                <div className="relative">
                  {theme === "light" ? (
                    <Moon className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  ) : (
                    <Sun className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  )}
                </div>
              </button> */}

              {/* Login Button */}
              <Link
                to="/signin"
                className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-yellow-400/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <LogIn className="w-4 h-4 group-hover:animate-pulse" />
                  Login
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden group relative p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 rounded-xl transition-all duration-300"></div>
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 bg-gray-900/95 backdrop-blur-xl border-t border-yellow-400/10">
            <nav className="flex flex-col space-y-2 pt-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:bg-yellow-400/10"
                >
                  <div className="group-hover:animate-pulse">{item.icon}</div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
