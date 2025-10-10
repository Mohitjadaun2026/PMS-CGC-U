// src/App.jsx
import React, { useEffect } from "react"; // Added useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// AOS Import
import AOS from 'aos';

// Component Imports
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import Home from "./components/home";
import Footer from "./components/Footer";
import Sign from "./components/Sign";
import About from "./components/About";
import StudentProfile from "./components/StudentProfile";
import Contact from "./components/Contact";
import AdminJobPosting from "./components/AdminJobPosting";
// AdminLogin is imported but not used in routes, kept for completeness
import AdminLogin from "./components/AdminLogin"; 
import AdminManagement from "./components/AdminManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import JobsPage, { JobWrapper } from "./components/jobs";
import InterviewExperience from "./components/InterviewExperience";
import InterviewForm from "./components/InterviewForm"; 
import BrowseExperiences from "./components/BrowseExperiences"; 
import ExperienceDetails from "./components/ExperienceDetails"; 
import BackToTopButton from "./components/Backtotopbutton"; 

import ScrollToTop from "./components/ScrollToTop";
import ResetPassword from "./components/ResetPassword";
import PrivacyPolicy from "./components/PrivacyPolicy"; 
import CookiePolicy from "./components/CookiePolicy"; 
import TermsOfService from "./components/TermsOfService"; 
import GdprCompliance from "./components/GdprCompliance"; 

import "../src/index.css";

function App() {
  // 1. AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1000,    // Global duration for animations
      once: true,        // Animation only happens once
      easing: 'ease-in-out',
      // Further customization can be done here (e.g., offset, delay)
    });
    // This is important to refresh AOS state after routes/components change
    AOS.refresh();
  }, []);

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
                {/* Use a common layout for all public pages */}
                <main className="main-content pt-0">
                  <Home />
                </main>
                <Footer />
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />

          {/* Public Routes - Header/Footer/BackToTop/Chatbot repeated for consistency */}
          <Route
            path="/signin"
            element={
              <>
                <Header />
                <main className="main-content">
                  <Sign />
                </main>
                <Footer />
                <BackToTopButton />
                <Chatbot/>
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
                <BackToTopButton />
                <Chatbot />
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
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />

          {/* Experience Details Route */}
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
                <BackToTopButton />
                <Chatbot/>
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
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />
          
          {/* Legal/Policy Routes */}
          <Route
            path="/privacy"
            element={
              <>
                <Header />
                <main className="main-content">
                  <PrivacyPolicy />
                </main>
                <Footer />
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />
          <Route
            path="/cookies"
            element={
              <>
                <Header />
                <main className="main-content">
                  <CookiePolicy />
                </main>
                <Footer />
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <Header />
                <main className="main-content">
                  <TermsOfService />
                </main>
                <Footer />
                <BackToTopButton />
                <Chatbot />
              </>
            }
          />
          <Route
            path="/gdpr"
            element={
              <>
                <Header />
                <main className="main-content">
                  <GdprCompliance />
                </main>
                <Footer />
                <BackToTopButton />
                <Chatbot/>
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
                <BackToTopButton />
                <Chatbot/>
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
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />

          {/* Route for sharing interview experience */}
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
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />

          {/* Job Routes */}
          <Route
            path="/jobs"
            element={
              <>
                <Header />
                <main className="main-content">
                  <JobsPage />
                </main>
                <Footer />
                <BackToTopButton /> 
                <Chatbot/>
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
                <BackToTopButton />
                <Chatbot/>
              </>
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
                <BackToTopButton />
                <Chatbot/>
              </>
            }
          />

          {/* Admin Routes (usually without surrounding Header/Footer) */}
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

        </Routes>
        {/* Removed duplicate BackToTopButton and Chatbot elements here */}
      </div>
    </Router>
  );
}

export default App;
