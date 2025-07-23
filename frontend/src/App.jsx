import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer";
import Sign from "./components/sign";
import About from "./components/about";
import StudentProfile from "./components/StudentProfile";
import Contact from "./components/Contact";
import "../src/index.css";
import AdminJobPosting from "./components/AdminJobPosting";
import JobsPage from "./components/jobs";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Sign />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/admin-job-posting" element={<AdminJobPosting />} />
            <Route path="/jobs" element={<JobsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;