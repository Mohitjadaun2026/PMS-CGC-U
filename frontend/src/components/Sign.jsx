import React, { useState, useEffect } from "react";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

function Sign() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Reset form when switching between sign in and register
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  }, [isRegister]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert("Registered successfully! Please sign in.");
      setIsRegister(false);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setIsLoading(false);
    }, 1500);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert("Signed in as " + form.email);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl border border-gray-700/50 p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-400">
              {isRegister
                ? "Fill in your details to get started"
                : "Enter your credentials to continue"}
            </p>
          </div>

          <div className="space-y-6">
            {isRegister && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-white placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-white placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={isLoading}
              onClick={isRegister ? handleRegister : handleSignIn}
              className="w-full group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isRegister ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="text-gray-400">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200 cursor-pointer"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200 cursor-pointer"
                  >
                    Register Now
                  </button>
                </>
              )}
            </div>
          </div>

          {!isRegister && (
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sign;
