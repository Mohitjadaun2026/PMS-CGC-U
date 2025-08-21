import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/home";
import Footer from "./components/Footer";
import Sign from "./components/Sign";
import About from "./components/About";
import StudentProfile from "./components/StudentProfile";
import Contact from "./components/Contact";
import "../src/index.css";
import AdminJobPosting from "./components/AdminJobPosting";
import AdminLogin from "./components/AdminLogin";
import AdminManagement from "./components/AdminManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import JobsPage from "./components/jobs";
import InterviewExperience from "./components/InterviewExperience";


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/interview-experience" element={
            <>
              <Header />
              <main className="main-content">
                <InterviewExperience />
              </main>
              <Footer />
            </>
          } />
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header />
              <main className="main-content">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/signin" element={
            <>
              <Header />
              <main className="main-content">
                <Sign />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              <main className="main-content">
                <About />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <main className="main-content">
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header />
              <main className="main-content">
                <StudentProfile />
              </main>
              <Footer />
            </>
          } />
          <Route path="/jobs" element={
            <>
              <Header />
              <main className="main-content">
                <JobsPage />
              </main>
              <Footer />
            </>
          } />
          
          {/* Admin routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-job-posting" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminJobPosting />
            </ProtectedRoute>
          } />
          <Route path="/admin-management" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminManagement />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;