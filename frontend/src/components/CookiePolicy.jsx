import React, { useEffect, useState } from 'react';

const CookiePolicy = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get current theme from body class
    const currentTheme = document.body.className || 'light';
    setTheme(currentTheme);
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.body.className || 'light';
      setTheme(newTheme);
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="rounded-lg shadow-lg p-8" style={{ 
          backgroundColor: 'var(--bg-darker)', 
          color: 'var(--text-primary)',
          border: theme === 'light' ? '1px solid rgba(128, 0, 32, 0.1)' : '1px solid rgba(128, 0, 32, 0.3)',
          boxShadow: theme === 'light' 
            ? '0 10px 25px rgba(128, 0, 32, 0.1)' 
            : '0 10px 25px rgba(0, 0, 0, 0.3)'
        }}>
          <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#800020' }}>
            Cookie Policy
          </h1>

          <div className="mb-8">
            <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              This Cookie Policy explains how CGC University Campus Recruitment Portal ("we," "us," or "our") uses cookies and similar technologies when you visit our website.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#800020' }}>
              What are Cookies?
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain features.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#800020' }}>
              Types of Cookies We Use
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3" style={{ color: '#a00028' }}>
                Essential Cookies
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3" style={{ color: '#a00028' }}>
                Functional Cookies
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                These cookies allow us to remember your preferences, such as your login information, language settings, and theme preferences (light/dark mode).
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3" style={{ color: '#a00028' }}>
                Analytics Cookies
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#800020' }}>
              How We Use Cookies
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              We use cookies to:
            </p>
            <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--text-primary)' }}>
              <li>Keep you logged in during your session</li>
              <li>Remember your theme preferences (light/dark mode)</li>
              <li>Improve website performance and user experience</li>
              <li>Analyze website usage and traffic patterns</li>
              <li>Provide personalized content and features</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#800020' }}>
              Managing Your Cookie Preferences
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4" style={{ color: 'var(--text-primary)' }}>
              <li>View what cookies are stored on your device</li>
              <li>Delete cookies individually or all at once</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies</li>
              <li>Set preferences for third-party cookies</li>
            </ul>
            <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Please note that disabling certain cookies may affect the functionality of our website and your user experience.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#800020' }}>
              Third-Party Cookies
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Our website may contain links to third-party websites or services that may set their own cookies. We are not responsible for the privacy practices or content of these third-party sites.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#800020' }}>
              Updates to This Policy
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please check this page periodically for updates.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#800020' }}>
              Contact Us
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              If you have any questions about this Cookie Policy or our use of cookies, please contact us through the contact information provided on our website.
            </p>
            <div className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <strong>CGC University Campus Recruitment Portal</strong><br />
              Email: recruitment@cgc.edu.in<br />
              Phone: +91-XXXX-XXXXXX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;