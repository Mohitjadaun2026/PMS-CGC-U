import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./resetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert("Password is less than 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password not same");
      return;
    }

    alert("Password is changed successfully");
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className="field-wrap">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-wrap">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="field-wrap">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
