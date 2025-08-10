import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="pms-footer">
      <div className="footer-content">
        <span className="copyright">
          &copy; {new Date().getFullYear()} Placement Management System. All rights reserved.
        </span>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;