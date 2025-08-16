import React, { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/toastConfig";
import "./sign.css";

function Sign() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration logic here (e.g., API call)
    if (form.password !== form.confirmPassword) {
      showErrorToast("Passwords do not match!");
      return;
    }
    showSuccessToast("Registered successfully! Please sign in.");
    setIsRegister(false);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Sign-in logic here (e.g., API call)
    showSuccessToast("Signed in as " + form.email);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="sign-container">
      <div className="sign-card">
        <h2>{isRegister ? "Register" : "Sign In"}</h2>
        <form onSubmit={isRegister ? handleRegister : handleSignIn}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{isRegister ? "Register" : "Sign In"}</button>
        </form>
        <div className="toggle-link">
          {isRegister ? (
            <span>
              Already have an account?{" "}
              <button onClick={() => setIsRegister(false)}>Sign In</button>
            </span>
          ) : (
            <span>
              New user?{" "}
              <button onClick={() => setIsRegister(true)}>Register</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sign;