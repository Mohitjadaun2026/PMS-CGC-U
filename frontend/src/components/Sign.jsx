import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup, signin } from "../../api/auth";
import {
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./sign.css";
import { CheckCircle, XCircle } from "lucide-react";
import AdminLogin from "./AdminLogin";

const passwordRules = {
  length: (pw) => pw.length >= 8,
  uppercase: (pw) => /[A-Z]/.test(pw),
  lowercase: (pw) => /[a-z]/.test(pw),
  number: (pw) => /[0-9]/.test(pw),
  specialChar: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
};

function Sign() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cardAnimation, setCardAnimation] = useState("fadeIn");
  const [fieldAnimations, setFieldAnimations] = useState({});
  const [passwordRuleStatus, setPasswordRuleStatus] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [isAdminToggle, setIsAdminToggle] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [valid, setValid] = useState({});

  useEffect(() => {
    if (isRegister) {
      const fields = ["name", "email", "password", "confirmPassword"];
      const validFields = fields.filter((field) => valid[field]).length;
      const newProgress = (validFields / fields.length) * 100;
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  }, [valid, isRegister]);

  // Animate field when it becomes valid
  useEffect(() => {
    const newAnimations = { ...fieldAnimations };
    Object.keys(valid).forEach((field) => {
      if (valid[field] && !fieldAnimations[field]) {
        newAnimations[field] = "success";
        setTimeout(() => {
          setFieldAnimations((prev) => ({ ...prev, [field]: "" }));
        }, 2000);
      }
    });
    setFieldAnimations(newAnimations);
  }, [valid]);

  const toggleMode = (isRegisterMode) => {
    setCardAnimation("slideOut");
    setTimeout(() => {
      setIsRegister(isRegisterMode);
      resetForm();
      setCardAnimation("slideIn");
    }, 300);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateField = (name, value) => {
    let error = "";
    const requiredMessages = {
      name: "Username is required",
      email: "Email is required",
      password: "Password is required",
      confirmPassword: "Confirm password is required",
    };

    if (!value || (typeof value === "string" && !value.trim())) {
      error = requiredMessages[name] || "This field is required";
    } else if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Enter a valid email address";
    } else if (name === "password" && isRegister) {
      const allPassed = Object.values(passwordRules).every((fn) => fn(value));
      if (!allPassed) {
        error = "Password doesn't meet all requirements.";
      }
    } else if (name === "confirmPassword") {
      if (value !== form.password) error = "Passwords do not match";
    }

    setErrors((p) => ({ ...p, [name]: error }));
    setValid((p) => ({ ...p, [name]: !error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    if (name === "password") {
      const status = {};
      Object.entries(passwordRules).forEach(([rule, test]) => {
        status[rule] = test(value);
      });
      setPasswordRuleStatus(status);
    }
  };


  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    validateField(name, value);
  };

  const validateAll = () => {
    const fields = isRegister
      ? ["name", "email", "password", "confirmPassword"]
      : ["email", "password"];
    let hasError = false;
    fields.forEach((f) => {
      const err = validateField(f, form[f] || "");
      if (err) hasError = true;
    });
    return !hasError;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    try {
      setLoading(true);
      const res = await signup(form);
      setLoading(false);
      if (res.error) {
        setErrors({ general: res.error });
        return;
      }
      setIsRegister(false);
      setForm({ email: "", password: "" });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors({ general: "User already exists with this email." });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true);
    const res = await signin(form);
    setLoading(false);
    console.log("Sign-in response:", res);
    if (res.error) {
      alert("Sign-in failed: " + res.error); // NOTE: Still using alert, but this is outside the scope of AOS fix
      return;
    }
    alert("Signed in as " + form.email); // NOTE: Still using alert, but this is outside the scope of AOS fix
    window.location.href = "/";
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setTouched({});
    setValid({});
  };

  function resetForm() {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setTouched({});
    setValid({});
    setProgress(0);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  return (
    <>
      <div className="flex flex-row gap-6 mt-4 justify-center" data-aos="fade-up">
        <div className="flex flex-row gap-6 mt-4 justify-center">
          <button
            onClick={() => setIsAdminToggle(false)}
            className={`
      ${!isAdminToggle
                ? "!border-[var(--maroon-500)]"
                : "!bg-white !border-b-[3px] !border-[var(--maroon-500)] !text-gray-700"
              }
    `}
          >
            User Sign In
          </button>

          <button
            onClick={() => setIsAdminToggle(true)}
            className={`
      ${isAdminToggle
                ? "!border-[var(--maroon-500)]"
                : "!bg-white !border-b-[3px] !border-[var(--maroon-500)] !text-gray-700"
              }
    `}
          >
            Admin Sign In
          </button>
        </div>

      </div>

      {isAdminToggle ? (<AdminLogin />) : (<>

        <div className="sign-container">
          <div className="animated-background">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="floating-shape shape-4"></div>
          </div>

          <div className={`sign-card ${cardAnimation}`} data-aos="zoom-in" data-aos-delay="200">
            <div className="card-header">
              <div className="logo-sparkle">
                <div className="sparkle"></div>
                <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
                <div className="sparkle"></div>
              </div>
              <p className="card-subtitle">
                {isRegister
                  ? "Join our community today"
                  : "Sign in to your account"}
              </p>
            </div>

            {isRegister && (
              <div className="progress-bar-wrapper">
                <div className="progress-labels">
                  <span className={progress >= 25 ? "active" : ""}>Name</span>
                  <span className={progress >= 50 ? "active" : ""}>Email</span>
                  <span className={progress >= 75 ? "active" : ""}>Password</span>
                  <span className={progress >= 100 ? "active" : ""}>Confirm</span>
                </div>
                <div
                  className="progress-bar-dynamic-container"
                  title={`Progress: ${progress}%`}
                >
                  <div
                    className="progress-bar-dynamic-filler"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <div className="progress-segment"></div>
                  <div className="progress-segment"></div>
                  <div className="progress-segment"></div>
                </div>
              </div>
            )}

            <form onSubmit={isRegister ? handleRegister : handleSignIn} noValidate>
              {isRegister && (
                <div
                  className={`field-wrap ${fieldAnimations.name === "success" ? "success-animation" : ""
                    }`}
                >
                  <label htmlFor="name">Full Name</label>
                  <div className="input-container">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name
                          ? "input-error"
                          : valid.name
                            ? "input-success"
                            : ""
                      }
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                    />
                    {valid.name && (
                      <div className="success-indicator">
                        <FaCheck />
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <div id="name-error" className="error-text" role="alert">
                      <FaExclamationTriangle className="error-icon" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>
              )}

              <div
                className={`field-wrap ${fieldAnimations.email === "success" ? "success-animation" : ""
                  }`}
              >
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email
                        ? "input-error"
                        : valid.email
                          ? "input-success"
                          : ""
                    }
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  {valid.email && (
                    <div className="success-indicator">
                      <FaCheck />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <div id="email-error" className="error-text" role="alert">
                    <FaExclamationTriangle className="error-icon" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div
                className={`field-wrap ${fieldAnimations.password === "success" ? "success-animation" : ""
                  }`}
              >
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      isRegister
                        ? errors.password
                          ? "input-error"
                          : valid.password
                            ? "input-success"
                            : ""
                        : ""
                    }
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                  />
                  <span className="toggle-icon" onClick={togglePassword}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>

                  {valid.password && (
                    <div className="success-indicator">
                      <FaCheck />
                    </div>
                  )}
                </div>

                {isRegister && (
                  <div className="password-rules">
                    <p>Password must contain:</p>
                    <ul>
                      <li className={passwordRuleStatus.length ? "valid" : "invalid"}>
                        {passwordRuleStatus.length ? <CheckCircle /> : <XCircle />} At least 8 characters
                      </li>
                      <li className={passwordRuleStatus.uppercase ? "valid" : "invalid"}>
                        {passwordRuleStatus.uppercase ? <CheckCircle /> : <XCircle />} At least one uppercase letter
                      </li>
                      <li className={passwordRuleStatus.lowercase ? "valid" : "invalid"}>
                        {passwordRuleStatus.lowercase ? <CheckCircle /> : <XCircle />} At least one lowercase letter
                      </li>
                      <li className={passwordRuleStatus.number ? "valid" : "invalid"}>
                        {passwordRuleStatus.number ? <CheckCircle /> : <XCircle />} At least one number
                      </li>
                      <li className={passwordRuleStatus.specialChar ? "valid" : "invalid"}>
                        {passwordRuleStatus.specialChar ? <CheckCircle /> : <XCircle />} At least one special character
                      </li>
                    </ul>
                  </div>
                )}
                {errors.password && (
                  <div id="password-error" className="error-text" role="alert">
                    <FaExclamationTriangle className="error-icon" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {!isRegister && (
                <div className="forgot-password">
                  <Link to="/reset-password" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
              )}

              {isRegister && (
                <div
                  className={`field-wrap ${fieldAnimations.confirmPassword === "success"
                    ? "success-animation"
                    : ""
                    }`}
                >
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <div className="input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword
                          ? "input-error"
                          : valid.confirmPassword
                            ? "input-success"
                            : ""
                      }
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby="confirm-error"
                    />
                    <span className="toggle-icon" onClick={toggleConfirmPassword}>
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    {valid.confirmPassword && (
                      <div className="success-indicator">
                        <FaCheck />
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <div id="confirm-error" className="error-text" role="alert">
                      <FaExclamationTriangle className="error-icon" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                className={`btn-signin ${loading ? "loading" : ""} ${Object.keys(valid).length > 0 ? "pulse-glow" : ""
                  }`}
                disabled={loading}
              >
                <span className="btn-text">
                  {isRegister ? "Create Account" : "Sign In"}
                </span>
                {loading && <span className="spinner"></span>}
                <div className="btn-shine"></div>
              </button>
            </form>

            {errors.general && (
              <div className="error-general" role="alert">
                <FaExclamationTriangle />
                <span>{errors.general}</span>
              </div>
            )}

            <div className="toggle-link">
              {isRegister ? (
                <span>
                  Already have an account?{" "}
                  <button onClick={() => toggleMode(false)}>Sign In</button>
                </span>
              ) : (
                <span>
                  New user?{" "}
                  <button onClick={() => toggleMode(true)}>Create Account</button>
                </span>
              )}
            </div>
          </div>
        </div>
      </>
      )}
    </>);
}

export default Sign;
