import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import "./sign.css";
const API = process.env.REACT_APP_API_URL;

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token); // Save JWT
        alert("Login successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
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

          <button type="submit">Sign In</button>
        </form>
        <div className="toggle-link">
          New user?{" "}
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
