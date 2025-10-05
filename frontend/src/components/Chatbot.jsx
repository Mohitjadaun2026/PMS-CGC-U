import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css"; // your CSS file

// import React from "react";
import "./Chatbot.css"; // your CSS file

const FAQ = [
    {
    triggers: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    response: "Hello 👋! Welcome to <b>Campus Recruitment Portal of CGC University Jhanjeri</b>. How can I help you today?",
  },
  {
    triggers: ["thanks", "thank you", "thx"],
    response: "You're welcome! 😊 Always here to help.",
  },
  {
    triggers: ["bye", "goodbye", "see you", "later"],
    response: "Goodbye! 👋 Have a productive coding day!",
  }, {
    triggers: ["what is this", "what is this portal", "portal", "about portal"],
    response: "Hey there! 👋 Welcome to your very own campus sidekick!<br><br>This is the <b>official DCPD Campus Portal</b> for <b>CGC Jhanjeri</b>, your <b>one-stop hub</b> for all things <b>career-related</b>.<br>From planning your path to landing your <b>dream job</b>, I’m here to guide you every step of the way. 🚀<br>Let’s make your <b>career journey exciting</b>!",
  },
  {
    triggers: ["about dcpd", "dcpd team", "who are dcpd", "tell me about dcpd"],
    response: "You’ve landed in the right spot!<br><br>The <b>DCPD (Department of Career Planning & Development)</b> is a <b>passionate team</b> of <b>trainers and career specialists</b> on a mission to empower <b>future leaders</b>—yes, that means <b>you!</b> 🌟<br>Curious about the people behind the magic? Check out our <b>'About Us'</b> page to meet the amazing <b>mentors</b> ready to support your journey.",
  },
  {
    triggers: ["for students", "How does this portal help students", "students help", "student portal"],
    response: "Wondering how this portal helps you? Well, it’s like having a <b>career coach in your pocket!</b> 😎<br><br>Here’s what I bring to the table:<br>🏢 <b>Centralized Job Listings:</b> All <b>opportunities</b> in one place.<br>🔔 <b>Smart Notifications:</b> Stay ahead with <b>event & interview alerts</b>.<br>📊 <b>Placement Insights:</b> Track your <b>progress</b> and improve your <b>strategy</b>.<br><br>Everything is designed to make your <b>job hunt smarter and stress-free</b>!",
  },
  {
    triggers: ["how to login", "login", "sign in", "how do i log in"],
    response: "Getting started is a <b>breeze!</b> ✨<br><br>- <b>Students & Recruiters:</b> Click the main <b>'DCPD Campus Portal'</b> button on the homepage.<br>- <b>Administrators:</b> Use the <b>'Admin'</b> link in the top navigation bar for <b>secure access</b>.<br><br>Enter your <b>credentials</b> and boom—you’re in! Ready to <b>explore</b>? 🚀",
  },
  {
    triggers: ["job opportunities", "jobs", "find jobs", "career opportunities"],
    response: "Looking for your next <b>big break</b>? You’ve hit the <b>jackpot!</b> 🎯<br><br>Once logged in, head straight to the <b>'Job Listings'</b> section.<br>We partner with <b>top companies</b>, so <b>new roles</b> are added frequently.<br>Dive in, explore, and grab the <b>opportunity</b> that’s perfect for you!",
  },
  {
    triggers: ["contact", "how to contact", "need to contact", "get in touch"],
    response: "Need a <b>human touch</b>? No worries! 😊<br><br>Our friendly <b>DCPD team</b> is just a click away.<br>Visit the <b>'Contact Us'</b> page to send a <b>message</b> or find <b>direct contact info</b>.<br>They’re always ready to <b>help</b> with questions, guidance, or a little <b>pep talk</b>!",
  },
  {
    triggers: ["admin portal", "what is admin portal", "admin login", "admin area"],
    response: "Welcome to the <b>mission control center!</b> 🧑‍🚀<br><br>The <b>Admin Portal</b> is a <b>secure space</b> for staff to <b>manage the placement system</b>, <b>analyze data</b>, and <b>streamline recruitment processes</b>.<br>With <b>enterprise-grade security</b>, it keeps everything running <b>smoothly</b>—so you can focus on what matters.",
  },
  {
    triggers: ["support team", "who can support me", "need support", "help team"],
    response: "Remember, you’re <b>never alone</b> on this journey! 💪<br><br>Our <b>Dedicated Support Team</b> of <b>DCPD trainers</b> and <b>placement specialists</b> is here to help—whether it’s <b>resume tips</b>, <b>interview prep</b>, or <b>career guidance</b>.<br>Want to see the team in action? Check out the <b>'About Us'</b> page and meet your <b>career cheerleaders</b>!",
  },
  {
    triggers: [],
    response: "❌ Sorry, I didn’t understand that. Please try asking differently 🙂",
  },
];

const QUICK_QUESTIONS = [
  "What is this portal?",
  "Tell me about the DCPD team",
  "How does this portal help students?",
  "How do I log in?",
  "Where can I find job opportunities?",
  "How can I contact someone?",
  "What is the Admin Portal?",
  "Who can support me on this journey?",
];
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to the <b>DCPD Campus Portal</b>🎓. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [showFirstFour, setShowFirstFour] = useState(true);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const findResponse = (text) => {
    const lc = text.toLowerCase();

    const sortedFAQ = [...FAQ].sort((a, b) => {
      const maxA = Math.max(...a.triggers.map((t) => t.length), 0);
      const maxB = Math.max(...b.triggers.map((t) => t.length), 0);
      return maxB - maxA;
    });

    for (const item of sortedFAQ) {
      if (item.triggers.some((trig) => lc.includes(trig.toLowerCase()))) {
        return item.response;
      }
    }

    return FAQ.find((i) => i.triggers.length === 0).response;
  };

  const sendMessage = (customText) => {
    const text = customText || input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");

    setTimeout(() => {
      const response = findResponse(text);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 500);
  };

  const toggleQuickQuestions = () => {
    setShowFirstFour(!showFirstFour);
  };

  const renderQuickQuestions = () => {
    const questionsToShow = showFirstFour ? QUICK_QUESTIONS.slice(0, 4) : QUICK_QUESTIONS.slice(4, 8);
    return (
      <>
        {questionsToShow.map((q, i) => (
          <button key={i} className="quick-question-btn" onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
        <button className="quick-question-btn toggle-btn" onClick={toggleQuickQuestions}>
          {showFirstFour ? "See More" : "See Less"}
        </button>
      </>
    );
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window open">
          <div className="chatbot-header">
            <img 
  src="/default-logo.png" 
  alt="Campus Recruitment Portal Logo" 
  className="chatbot-header-logo" 
/>
            <span>Campus Recruitment Portal</span>
            <button onClick={toggleChat}>
              <img
                src="/close.png"
                alt="Close"
              />
            </button>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.sender}-msg`}>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          <div className="quick-questions">{renderQuickQuestions()}</div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              placeholder="Type your query..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>
              <img src="/send.png" alt="Send" />
            </button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        🤖
      </button>
    </div>
  );
};

export default Chatbot;
