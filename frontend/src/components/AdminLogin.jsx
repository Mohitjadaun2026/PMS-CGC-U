import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/auth";
import "./AdminLogin.css";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", formData);
      const response = await signin(formData);
      console.log("Login response:", response);

      if (
        response.user &&
        (response.user.role === "admin" || response.user.role === "super_admin")
      ) {
        console.log(
          "Admin login successful, redirecting to:",
          "/admin-job-posting"
        );
        console.log("User role:", response.user.role);
        navigate("/admin-job-posting");
        setTimeout(() => {
          if (window.location.pathname !== "/admin-job-posting") {
            console.log(
              "React Router navigation failed, using window.location"
            );
            window.location.href = "/admin-job-posting";
          }
        }, 1000);
      } else {
        console.log("Access denied - user role:", response.user?.role);
        setError("Access denied. Admin privileges required.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err?.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-main-container ">
      <div className="admin-login-background ">
        <div className="admin-login-glow-effect glow-1"></div>
        <div className="admin-login-glow-effect glow-2"></div>
        <div className="admin-login-glow-effect glow-3"></div>

        <div className="admin-login-container">
          <div className="admin-login-card">
            <div className="admin-login-card-inner">
              {/* Premium Header Section */}
              <div className="admin-login-header">
                <div className="login-icon-container">
                  <div className="login-icon-wrapper">
                    <div className="login-icon-shield"></div>
                    <div className="login-icon-lock"></div>
                  </div>
                </div>
                <h1 className="login-title">Admin Portal</h1>
                <p className="login-subtitle">
                  Secure Access to Placement Management System
                </p>
                <div className="login-divider">
                  <div className="divider-line"></div>
                  <div className="divider-dot"></div>
                  <div className="divider-line"></div>
                </div>
              </div>

              {/* Enhanced Form Section */}
              <form onSubmit={handleSubmit} className="admin-login-form">
                {error && (
                  <div className="error-message-container">
                    <div className="error-icon">⚠</div>
                    <div className="error-text">{error}</div>
                  </div>
                )}

                <div className="form-group-enhanced">
                  <label
                    htmlFor="email"
                    className={`form-label ${
                      focusedField === "email" || formData.email
                        ? "label-focused"
                        : ""
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      required
                      placeholder="admin@cgcu.edu"
                      className="form-input-enhanced"
                    />
                    <div className="input-underline">
                      <div className="underline-active"></div>
                    </div>
                  </div>
                </div>

                <div className="form-group-enhanced">
                  <label
                    htmlFor="password"
                    className={`form-label ${
                      focusedField === "password" || formData.password
                        ? "label-focused"
                        : ""
                    }`}
                  >
                    Password
                  </label>
                  <div className="input-container">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => handleFocus("password")}
                      onBlur={handleBlur}
                      required
                      placeholder="Enter your password"
                      className="form-input-enhanced"
                    />
                    <div className="input-underline">
                      <div className="underline-active"></div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`admin-login-btn-enhanced ${
                    loading ? "btn-loading" : ""
                  }`}
                  disabled={loading}
                >
                  <span className="btn-content">
                    {loading ? (
                      <>
                        <div className="btn-spinner"></div>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <span className="btn-shine"></span>
                        Access System
                      </>
                    )}
                  </span>
                  <div className="btn-background"></div>
                </button>
              </form>

              {/* Premium Footer Section */}
              <div className="admin-login-footer-enhanced">
                <div className="security-badge">
                  <div className="security-icon">🛡️</div>
                  <span className="security-text">
                    Enterprise-grade Security
                  </span>
                </div>
                <div className="access-notice">
                  Restricted to authorized administrators only
                </div>
              </div>
            </div>

            {/* Card Background Effects */}
            <div className="card-glow"></div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
