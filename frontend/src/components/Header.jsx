import React ,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./header.css";
import collegeLogo from "../assets/cgc.png"; // Make sure to add the logo to your assets folder

function Header() { const [theme, setTheme] = useState('light');

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
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="pms-header">
      <div className="logo">
        <img 
          src={collegeLogo} 
          alt="College Logo" 
          className="logo-image"
        />
        <Link to="/" className="logo-link">Placement Management System</Link>
      </div>
      <nav className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/profile">Student Profile</Link>
        <Link to="/admin-job-posting">Admin Panel</Link>
        <Link to="/signin" className="login-btn">Login</Link>

        {/* Theme toggle button */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn"
          aria-label="Toggle light/dark theme"
          style={{
            marginLeft: '1rem',
            padding: '0.3rem 0.7rem',
            cursor: 'pointer',
            borderRadius: '4px',
            border: 'none',
            background: theme === 'light' ? '#333' : '#eee',
            color: theme === 'light' ? '#fff' : '#333',
          }}
        >
          {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  );
}

export default Header;