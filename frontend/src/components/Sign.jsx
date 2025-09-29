import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup, signin } from "../../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./sign.css";

function Sign() {
  // Register vs Sign-in
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  // Form state -- added phone for registration (assumption: phone required on register)
  const [progress, setProgress] = useState(0); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [valid, setValid] = useState({});

   useEffect(() => {
    // Calculate progress only when in register mode
    if (isRegister) {
        const fields = ["name", "email", "password", "confirmPassword"];
        const validFields = fields.filter(field => valid[field]).length;
        const newProgress = (validFields / fields.length) * 100;
        setProgress(newProgress);
    } else {
        // Reset progress when switching to sign-in
        setProgress(0);
    }
  }, [valid, isRegister]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Simple validators
  const validateField = (name, value) => {
    let error = "";
    // Custom required messages per field
    const requiredMessages = {
      name: "Username is required",
      email: "Email is required",
      password: "Password is required",
      confirmPassword: "Confirm password is required",
    };

    // If empty, show a field-specific required message
    if (!value || (typeof value === "string" && !value.trim())) {
      error = requiredMessages[name] || "This field is required";
    } else if (name === "email") {
      // specific format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address";
    } else if (name === "password" && isRegister) {
      if (value.length < 8) error = "Password must be at least 8 characters";
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
    // real-time validation on input
    validateField(name, value);
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
      setForm({ email: '', password: '' });

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
    // Await the API call
    setLoading(true);
    const res = await signin(form);
    setLoading(false);
    console.log("Sign-in response:", res);
    if (res.error) {
      alert("Sign-in failed: " + res.error);
      return;
    }
    // Set login state
    localStorage.setItem('isLoggedIn', 'true');
    alert("Signed in as " + form.email);
    // Redirect to home or dashboard
    window.location.href = '/';
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
    })

    setErrors({})
    setTouched({})
    setValid({})
    setProgress(0);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  return (
    <div className="sign-container">
      <div className="sign-card">
        <h2>{isRegister ? "Register" : "Sign In"}</h2>
            {isRegister && (
           <div className="progress-bar-wrapper">
              <div className="progress-labels">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Password</span>
                  <span>Confirm</span>
              </div>
              <div className="progress-bar-dynamic-container" title={`Progress: ${progress}%`}>
                  <div className="progress-bar-dynamic-filler" style={{ width: `${progress}%` }}></div>
                  <div className="progress-segment"></div>
                  <div className="progress-segment"></div>
                  <div className="progress-segment"></div>
              </div>
          </div>
        )}
        {/* disable browser native validation with noValidate */}
        <form onSubmit={isRegister ? handleRegister : handleSignIn} noValidate>
          {isRegister && (
            <div className="field-wrap">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? "input-error" : valid.name ? "input-success" : ""}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {((touched.name || errors.name) && errors.name) && (
                <div id="name-error" className="error-text" role="alert">
                  <span className="error-icon" aria-hidden="true">⚠</span>
                  <span>{errors.name}</span>
                </div>
              )}
            </div>
          )}

          <div className="field-wrap">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? "input-error" : valid.email ? "input-success" : ""}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {((touched.email || errors.email) && errors.email) && (
              <div id="email-error" className="error-text" role="alert">
                <span className="error-icon" aria-hidden="true">⚠</span>
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <div className="field-wrap">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={isRegister? errors.password ? "input-error" : valid.password ? "input-success" : "": ""}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              <span className="toggle-icon" onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {((touched.password || errors.password) && errors.password) && (
              <div id="password-error" className="error-text" role="alert">
                <span className="error-icon" aria-hidden="true">⚠</span>
                <span>{errors.password}</span>
              </div>
            )}
            
          </div>

          {/* Forgot Password link (only on Sign In) */}
          {!isRegister && (
            <div className="forgot-password">
              <Link to="/reset-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
          )}

          {isRegister && (
            <div className="field-wrap">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirmPassword ? "input-error" : valid.confirmPassword ? "input-success" : ""}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirm-error"
                />
                <span className="toggle-icon" onClick={toggleConfirmPassword}>
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {((touched.confirmPassword || errors.confirmPassword) && errors.confirmPassword) && (
                <div id="confirm-error" className="error-text" role="alert">
                  <span className="error-icon" aria-hidden="true">⚠</span>
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>
          )}
           
           {/* Button with loader when registering or signing in*/}
           <button type="submit" className={`btn-signin ${loading ? "loading" : ""}`} disabled={loading}><span className="btn-text">{isRegister ? "Register" : "Sign In"}</span>{loading && <span className="spinner"></span>}</button>

        </form>

        {errors.general && <div className="error">{errors.general}</div>}

        <div className="toggle-link">
          {isRegister ? (
            <span>
              Already have an account? <button onClick={() => { setIsRegister(false); resetForm() }}>Sign In</button>
            </span>
          ) : (
            <span>
              New user? <button onClick={() => { setIsRegister(true); resetForm() }}>Register</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sign;