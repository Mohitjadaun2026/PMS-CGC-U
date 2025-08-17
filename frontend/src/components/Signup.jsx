import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import "./sign.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          username: form.name,
          email: form.email,
          password: form.password,
        }
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token); // Save JWT
        alert("Registration successful!");
        navigate("/login"); // redirect to login after register
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again!");
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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

          <button type="submit">Register</button>
        </form>
        <div className="toggle-link">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
