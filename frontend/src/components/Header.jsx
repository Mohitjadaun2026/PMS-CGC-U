import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import collegeLogo from "../assets/cgc.jpeg"; // Make sure to add the logo to your assets folder

function Header() {
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
      </nav>
    </header>
  );
}

export default Header;