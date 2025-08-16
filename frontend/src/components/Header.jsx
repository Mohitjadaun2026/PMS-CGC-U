import React ,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Moon, Sun,Menu, X  } from "lucide-react";
import "./header.css";
import collegeLogo from "../assets/cgc logo.png"; // Make sure to add the logo to your assets folder

function Header() { const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 


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
        <button
  className="menu-toggle-btn"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
>
  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
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
      <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
  <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
  <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Student Profile</Link>
  <Link to="/admin-job-posting" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>

  {/* Theme toggle button */}
  <button
    onClick={() => {
    toggleTheme();      // ✅ theme toggle karega
    setIsMenuOpen(false); // ✅ menu bhi close hoga
  }}
    className="theme-toggle-btn"
    aria-label="Toggle light/dark theme"
  >
    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
  </button>

  <Link to="/signin" className="login-btn" onClick={() => setIsMenuOpen(false)}>
    Login
  </Link>
</nav>

    </header>
  );
}

export default Header;


