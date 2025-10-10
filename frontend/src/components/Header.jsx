import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./header.css";
import collegeLogo from "../assets/cgc logo.png"; // Make sure to add the logo to your assets folder
import ConfirmAlert from "./ConfirmAlert";

function Header() {
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // On mount, load saved theme or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      setTheme(defaultTheme);
      document.body.className = defaultTheme;
    }

    // Check login status from token and user data (matching ProtectedRoute logic)
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!(token && user));
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => checkAuthStatus();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    setShowAlert(true); 
  };

  const confirmLogout = () => {
    // NOTE: Changed to use custom modal instead of window.confirm
    // const confirmLogout = window.confirm("Are you sure you want to log out?");
    // if(confirmLogout){
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    // }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    // Apply fade-down AOS effect to the header
    <header className="pms-header" data-aos="fade-down">
      {showAlert && <ConfirmAlert
        isOpen={showAlert}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={() => {
          confirmLogout();
          setShowAlert(false);
        }}
        onCancel={() => setShowAlert(false)}
      />}
      <div className="logo">
        <img
          src={collegeLogo}
          alt="College Logo"
          className="logo-image"
        />
        <Link to="/" className="logo-link">
          <span className="line1">Campus Recruitment</span>
          <span className="line2">Portal</span>
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {isLoggedIn &&
          <>
            <Link to="/jobs">Jobs</Link>
            <Link to="/profile">Student Profile</Link>
            <Link to="/interview-experience">Interview Experience</Link>
          </>
        }
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="logout-btn"
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>
        )}

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle light/dark theme"
        >
          {theme === 'light' ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}
        </button>
        {!isLoggedIn && (
          <Link to="/signin" className="login-btn">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;

// In your SignIn component (example)
const handleLogin = async (e) => {
  e.preventDefault();
  // ...login logic...
  // On successful login:
  localStorage.setItem('isLoggedIn', 'true');
  window.location.href = '/'; // or use navigate('/')
};
