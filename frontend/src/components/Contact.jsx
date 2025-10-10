import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";
import { AiOutlineMail } from 'react-icons/ai';

// Executive Director
const executiveDirector = [{
  name: "Mr. Susheel Prashar",
  title: "Executive Director",
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  phone: "+91-98765-00001",
  email: "susheel.prashar@cgc.ac.in",
},
{
  name: "Mr. Aarav Mehta",
  title: "Team Lead",
  photo: "https://www.shutterstock.com/shutterstock/photos/2516789501/display_1500/stock-photo-confident-middle-aged-business-man-manager-entrepreneur-mature-professional-executive-businessman-2516789501.jpg",
  phone: "+91-98765-00002",
  email: "aarav.mehta@cgc.ac.in"
},
{
  name: "Ms. Neha Sharma",
  title: "Senior Software Architect",
  photo: "https://images.squarespace-cdn.com/content/v1/66a4f1fc404ca05cac7d8ec8/385bc62c-b298-42f8-8f81-a931820c7a8f/Designer%2BHeadshots%2BFemale",
  phone: "+91-98765-00003",
  email: "neha.sharma@cgc.ac.in"
},
{
  name: "Mr. Rohan Kapoor",
  title: "Project Lead",
  photo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlTzCgzIvnDvw-_ucq0h862ecwvaHue-ZmIWuNl7Ei7sprZfOyN3AZJOu2DAGI7y-EYSmMXJRiQ_fRatnDoKUG5fUg1LcwM4zuD8TGinXY7vxERCvXM6oxDaNa0amv35Vf38dbKO7dYNJ3/s1600/16%2BDSC_4869.jpg",
  phone: "+91-98765-00004",
  email: "rohan.kapoor@cgc.ac.in"
},
{
  name: "Ms. Ishita Deshmukh",
  title: "Head of Product Design",
  photo: "https://www.shutterstock.com/image-photo/headshot-close-face-portrait-young-600nw-2510015507.jpg",
  phone: "+91-98765-00005",
  email: "ishita.deshmukh@cgc.ac.in"
}
];

// DCPD Team - 20 members
const dcpdTeam = [
  {
    name: "Er. Ravneet Singh",
    title: "Head, DCPD",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-43210",
    email: "ravneet.singh@cgc.ac.in",
  },
  {
    name: "Ms. Simran Kaur",
    title: "Senior DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=faces",
    phone: "+91-98765-12345",
    email: "simran.kaur@cgc.ac.in",
  },
  {
    name: "Mr. Aman Sharma",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-67890",
    email: "aman.sharma@cgc.ac.in",
  },
  {
    name: "Ms. Priya Verma",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-24680",
    email: "priya.verma@cgc.ac.in",
  },
  {
    name: "Mr. Rohit Kumar",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-11111",
    email: "rohit.kumar@cgc.ac.in",
  },
  {
    name: "Ms. Anjali Rani",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-22222",
    email: "anjali.rani@cgc.ac.in",
  },
  {
    name: "Mr. Manish Verma",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-33333",
    email: "manish.verma@cgc.ac.in",
  },
  {
    name: "Ms. Kavya Reddy",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-44444",
    email: "kavya.reddy@cgc.ac.in",
  },
  {
    name: "Mr. Deepak Yadav",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-55555",
    email: "deepak.yadav@cgc.ac.in",
  },
  {
    name: "Ms. Ritu Sharma",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-66666",
    email: "ritu.sharma@cgc.ac.in",
  },
  {
    name: "Mr. Vikash Gupta",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-77777",
    email: "vikash.gupta@cgc.ac.in",
  },
  {
    name: "Ms. Sneha Singh",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-88888",
    email: "sneha.singh@cgc.ac.in",
  },
  {
    name: "Mr. Arjun Malhotra",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop&crop=faces",
    phone: "+91-98765-99999",
    email: "arjun.malhotra@cgc.ac.in",
  },

  {
    name: "Ms. Pooja Patel",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-10101",
    email: "pooja.patel@cgc.ac.in",
  },
  {
    name: "Mr. Karan Joshi",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-20202",
    email: "karan.joshi@cgc.ac.in",
  },
  {
    name: "Ms. Nisha Agarwal",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-30303",
    email: "nisha.agarwal@cgc.ac.in",
  },
  {
    name: "Mr. Suresh Bansal",
    title: "DCPD Coordinator",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-40404",
    email: "suresh.bansal@cgc.ac.in",
  },
  {
    name: "Ms. Meera Chopra",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-50505",
    email: "meera.chopra@cgc.ac.in",
  },
  {
    name: "Mr. Rahul Mittal",
    title: "DCPD Assistant",
    photo:
      "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-60606",
    email: "rahul.mittal@cgc.ac.in",
  },
  {
    name: "Ms. Sunita Devi",
    title: "DCPD Trainer",
    photo:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=200&h=200&fit=crop&crop=face",
    phone: "+91-98765-70707",
    email: "sunita.devi@cgc.ac.in",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    if (isFormOpen) {
      // Small delay to allow the form to render before expanding
      setTimeout(() => {
        setIsFormExpanded(true);
      }, 10);
    } else {
      setIsFormExpanded(false);
    }
  }, [isFormOpen]);

  useEffect(() => {
    // Auto-expand textarea based on content
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = messageRef.current.scrollHeight + "px";
    }
  }, [formData.message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2)
          error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[0-9+\-\s()]{10,}$/.test(value))
          error = "Phone number is invalid";
        break;
      case "subject":
        if (!value.trim()) error = "Subject is required";
        else if (value.trim().length < 5)
          error = "Subject must be at least 5 characters";
        break;
      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.trim().length < 10)
          error = "Message must be at least 10 characters";
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error,
    });

    return !error;
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!validateField("name", formData.name)) isValid = false;
    if (!validateField("email", formData.email)) isValid = false;
    if (!validateField("phone", formData.phone)) isValid = false;
    if (!validateField("subject", formData.subject)) isValid = false;
    if (!validateField("message", formData.message)) isValid = false;

    return { isValid, formErrors: errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid } = validateForm();
    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success state
      setIsSuccess(true);

      // Show success notification
      toast.success(
        "Your message has been sent successfully! We will get back to you soon."
      );

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
        setIsFormOpen(false);
        setIsSuccess(false);
        setCurrentStep(1);
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = () => {
    if (isSuccess) return; // Don't allow closing during success animation

    setIsFormOpen(!isFormOpen);
    if (isFormOpen) {
      setIsFormExpanded(false);
    }
  };

  const handleFocus = (e) => {
    e.target.parentElement.classList.add("focused");
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      e.target.parentElement.classList.remove("focused");
    }
    validateField(e.target.name, e.target.value);
  };

  return (
    <div className="contact-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="custom-toast"
      />

      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Get in touch with the DCPD (Department of Career Planning &
          Development) at CGC Jhanjeri.
          <br />
          We are here to help you with all your placement and career queries.
        </p>
      </div>

      <div className="contact-content-wrapper">
        <div className="contact-main-content space">
          {/* Contact Info Section */}
          <div className="contact-info">
            <div className="contact-card">
              <h2>General Contact</h2>
              <p>
                <span className="contact-label">Address:</span> Chandigarh Group
                of Colleges, Jhanjeri, Mohali, Punjab, India
              </p>
              <p>
                <span className="contact-label">Phone:</span>{" "}
                <a href="tel:+911234567890">+91-12345-67890</a>
              </p>
              <p>
                <span className="contact-label">Email:</span>{" "}
                <a href="mailto:dcpd@cgc.ac.in">dcpd@cgc.ac.in</a>
              </p>
              <p>
                <span className="contact-label">Website:</span>{" "}
                <a
                  href="https://www.cgc.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.cgc.ac.in
                </a>
              </p>
            </div>
          </div>

          {/* Executive Director Section */}
          <div className="executive-section">
            <h2>Leadership</h2>
            <div className="executive-scroll">
              {executiveDirector.concat(executiveDirector, executiveDirector).map((leader, idx) => (
              <div className="executive-card" key={idx}>
                <div className="photo-container">
                  <img
                  src={leader.photo}
                  alt={leader.name}
                  className="executive-photo"
                  />
                  <div className="photo-overlay"></div>
                </div>
                <div className="executive-info">
                  <h3>{leader.name}</h3>
                  <p className="executive-title">{leader.title}</p>
                  <div className="executive-contact">
                    <p>
                      <span className="contact-label">Phone:</span>{" "}
                      <a href={`tel:${leader.phone}`}>{leader.phone}</a>
                    </p>
                    <p>
                      <span className="contact-label">Email:</span>{" "}
                      <a href={`mailto:${leader.email}`}>{leader.email}</a>
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>





          {/* DCPD Team Section */}
          <div className="team-section">
            <h2>Meet Our DCPD Team</h2>
            <div className="team-grid">
              {dcpdTeam.map((member, idx) => (
                <div className="team-card" key={idx}>
                  <div className="photo-container photo-container-team">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="team-photo"
                    />
                    <div className="photo-overlay"></div>
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-title">{member.title}</p>
                  <div className="team-contact">
                    <p>
                      <span className="contact-label">Phone:</span>{" "}
                      <a href={`tel:${member.phone}`}>{member.phone}</a>
                    </p>
                    <p>
                      <span className="contact-label">Email:</span>{" "}
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Form */}
      <div
        className={`floating-contact-form relative ${isFormOpen ? "open" : ""} ${
          isFormExpanded ? "expanded" : ""
        } ${isSuccess ? "success" : ""}`}
      >
        {isFormOpen ? "": (<AiOutlineMail size={26} className="text-white absolute left-4 top-4"/>)}

        <div className="floating-form-header" onClick={toggleForm}>
          <span className="form-title">Contact Us</span>
          <span className="form-toggle-icon"> {isSuccess ? ( "🎉") : isFormOpen ? ("✕") : " "}
          </span>
        </div>

        <div className="floating-form-content">
          {isSuccess ? (
            <div className="success-animation">
              <div className="success-checkmark">
                <div className="check-icon"></div>
              </div>
              <h3>Message Sent Successfully!</h3>
              <p>We'll get back to you shortly.</p>
              <div className="confetti">
                {[...Array(50)].map((_, i) => (
                  <div key={i} className="confetti-piece"></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="form-progress">
                <div className="progress-steps">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`progress-step ${
                        currentStep >= step ? "active" : ""
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <h3>Send Us a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group floating">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={errors.name ? "error" : ""}
                    autoComplete="name"
                  />
                  <label htmlFor="name">Full Name *</label>
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group floating">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={errors.email ? "error" : ""}
                    autoComplete="email"
                  />
                  <label htmlFor="email">Email Address *</label>
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group floating">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={errors.phone ? "error" : ""}
                    autoComplete="tel"
                  />
                  <label htmlFor="phone">Phone Number *</label>
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group floating">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={errors.subject ? "error" : ""}
                  />
                  <label htmlFor="subject">Subject *</label>
                  {errors.subject && (
                    <span className="error-message">{errors.subject}</span>
                  )}
                </div>

                <div className="form-group floating">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={errors.message ? "error" : ""}
                    ref={messageRef}
                    rows="3"
                  ></textarea>
                  <label htmlFor="message">Message *</label>
                  <div className="character-count">
                    {formData.message.length}/500
                  </div>
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-bttn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;