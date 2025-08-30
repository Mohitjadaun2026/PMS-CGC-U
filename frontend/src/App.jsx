import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Home from "./components/home";
import Footer from "./components/Footer";
import Sign from "./components/Sign";
import About from "./components/About";
import StudentProfile from "./components/StudentProfile";
import Contact from "./components/Contact";
import AdminJobPosting from "./components/AdminJobPosting";
import AdminLogin from "./components/AdminLogin";
import AdminManagement from "./components/AdminManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import JobsPage from "./components/jobs";
import AlumniDetail from "./components/AlumniDetail";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Always inside Router */}
      <Toaster position="top-right" /> {/* Toast notifications */}
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Sign />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/alumni/:id" element={<AlumniDetail />} />
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
