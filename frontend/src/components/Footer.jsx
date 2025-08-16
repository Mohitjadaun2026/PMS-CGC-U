import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-16 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent mb-4">
              CGC Jhanjeri
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering students with cutting-edge placement solutions and
              industry connections for a successful career launch.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Alumni
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Training
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Placement Management System. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
