// src/App.jsx
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
import JobsPage, { JobWrapper } from "./components/jobs";
import InterviewExperience from "./components/InterviewExperience";
import InterviewForm from "./components/InterviewForm"; // Added import here
import BrowseExperiences from "./components/BrowseExperiences"; // Added import here
import ExperienceDetails from "./components/ExperienceDetails"; // <--- NEW IMPORT

import ScrollToTop from "./components/ScrollToTop";
import ResetPassword from "./components/ResetPassword";
import PrivacyPolicy from "./components/PrivacyPolicy"; // ✅ Added
import CookiePolicy from "./components/CookiePolicy"; // ✅ Added
import TermsOfService from "./components/TermsOfService"; // ✅ Added
import GdprCompliance from "./components/GdprCompliance"; // ✅ Added

import "../src/index.css";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Always inside Router */}
      <Toaster position="top-right" /> {/* Toast notifications */}
      <div className="app-container">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="main-content pt-0">
                  <Home />
                </main>
                <Footer />
              </>
            }
          />

          {/* Public Routes */}
          <Route
            path="/signin"
            element={
              <>
                <Header />
                <main className="main-content">
                  <Sign />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <main className="main-content">
                  <About />
                </main>
                <Footer />
              </>
            }
          />

          {/* Browse Experiences */}
          <Route
            path="/interview-experience/browse"
            element={
              <>
                <Header />
                <main className="main-content">
                  <ProtectedRoute requireAdmin={false}>
                    <BrowseExperiences />
                  </ProtectedRoute>
                </main>
                <Footer />
              </>
            }
          />

          {/* NEW ROUTE FOR EXPERIENCE DETAILS */}
          <Route
            path="/experience/:id"
            element={
              <>
                <Header />
                <main className="main-content">
                  <ProtectedRoute requireAdmin={false}>
                    <ExperienceDetails />
                  </ProtectedRoute>
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Header />
                <main className="main-content">
                  <Contact />
                </main>
                <Footer />
              </>
            }
          />
          {/* Privacy Policy Route ✅ */}
          <Route
            path="/privacy"
            element={
              <>
                <Header />
                <main className="main-content">
                  <PrivacyPolicy />
                </main>
                <Footer />
              </>
            }
          />

          {/* User Private Routes */}
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <main className="main-content">
                  <ProtectedRoute requireAdmin={false}>
                    <StudentProfile />
                  </ProtectedRoute>
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/interview-experience"
            element={
              <>
                <Header />
                <main className="main-content">
                  <ProtectedRoute requireAdmin={false}>
                    <InterviewExperience />
                  </ProtectedRoute>
                </main>
                <Footer />
              </>
            }
          />

          {/* Added new route for sharing interview experience */}
          <Route
            path="/interview-experience/share"
            element={
              <>
                <Header />
                <main className="main-content">
                  <ProtectedRoute requireAdmin={false}>
                    <InterviewForm />
                  </ProtectedRoute>
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/jobs"
            element={
              <>
                <Header />
                <main className="main-content">
                  <JobsPage />
                </main>
                <Footer />
              </>
            }
          />  
          
          <Route
            path="/jobs/:id"
            element={
              <>
                <Header />
                <main className="main-content">
                  <JobWrapper />
                </main>
                <Footer />
              </>
            }
          />

          {/* Cookie Policy Route ✅ */}
          <Route
            path="/cookies"
            element={
              <>
                <Header />
                <main className="main-content">
                  <CookiePolicy />
                </main>
                <Footer />
              </>
            }
          />

          {/* Terms of Service Route ✅ */}
          <Route
            path="/terms"
            element={
              <>
                <Header />
                <main className="main-content">
                  <TermsOfService />
                </main>
                <Footer />
              </>
            }
          />

          {/* GDPR Compliance Route ✅ */}
          <Route
            path="/gdpr"
            element={
              <>
                <Header />
                <main className="main-content">
                  <GdprCompliance />
                </main>
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-job-posting"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminJobPosting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-management"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <>
                <Header />
                <main className="main-content">
                  <ResetPassword />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
