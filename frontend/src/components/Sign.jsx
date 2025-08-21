import React, { useState } from "react";
import { signup, signin } from "../../api/auth";
import "./sign.css";

function Sign() {
  // Register vs Sign-in
  const [isRegister, setIsRegister] = useState(false);

  // Form state -- added phone for registration (assumption: phone required on register)
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
    } else if (name === "password") {
      if (value.length < 6) error = "Password must be at least 6 characters";
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

    // final validation
    if (!validateAll()) return;
    // Registration logic here (e.g., API call)
    const res = await signup(form);
    if (res.error) {
      alert("Registration failed: " + res.error);
      return;
    }
    console.log("Registration response:", res);
    alert("Registered successfully! Please sign in.");
    setIsRegister(false);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setTouched({});
    setValid({});
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;
    // Sign-in logic here (e.g., API call)
    const res = await signin(form); // <-- Make sure to await the API call
    console.log("Sign-in response:", res);
    if (res.error) {
      alert("Sign-in failed: " + res.error);
      return;
    }

    // Store token and user info in localStorage
    if (res.token && res.user) {
      if (res.user.role === "admin" || res.user.role === "super_admin") {
        localStorage.setItem("adminToken", res.token);
        localStorage.setItem("adminUser", JSON.stringify(res.user));
        window.location.href = "/admin-job-posting"; // Redirect to admin dashboard
      } else {
        localStorage.setItem("userToken", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "/profile"; // Redirect to student dashboard
      }
    }

    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setTouched({});
    setValid({});
  };

  return (
    <div className="sign-container">
      <div className="sign-card">
        <h2>{isRegister ? "Register" : "Sign In"}</h2>
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
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? "input-error" : valid.password ? "input-success" : ""}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {((touched.password || errors.password) && errors.password) && (
              <div id="password-error" className="error-text" role="alert">
                <span className="error-icon" aria-hidden="true">⚠</span>
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {isRegister && (
            <div className="field-wrap">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmPassword ? "input-error" : valid.confirmPassword ? "input-success" : ""}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirm-error"
              />
              {((touched.confirmPassword || errors.confirmPassword) && errors.confirmPassword) && (
                <div id="confirm-error" className="error-text" role="alert">
                  <span className="error-icon" aria-hidden="true">⚠</span>
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>
          )}

          <button type="submit">{isRegister ? "Register" : "Sign In"}</button>
        </form>

        <div className="toggle-link">
          {isRegister ? (
            <span>
              Already have an account? <button onClick={() => setIsRegister(false)}>Sign In</button>
            </span>
          ) : (
            <span>
              New user? <button onClick={() => setIsRegister(true)}>Register</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sign;