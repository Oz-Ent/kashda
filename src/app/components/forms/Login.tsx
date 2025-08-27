"use client";

import { useStaticRedirect } from "@/lib/staticRedirect";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginProps {
  onSwitchToSignup: () => void;
  onSwitchToPasswordReset?: () => void;
}

const Login: React.FC<LoginProps> = ({
  onSwitchToSignup,
  onSwitchToPasswordReset,
}) => {
  const { redirect } = useStaticRedirect();
  const { signIn, signInWithGoogle, signInWithApple, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);

  // Check for expired session parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("expired") === "true") {
      setShowExpiredMessage(true);
      setError("Your session has expired. Please log in again.");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await signIn(formData.email, formData.password);

      if (result.success) {
        redirect("/dashboard");
      } else {
        if (result.error === "Firebase: Error (auth/invalid-credential).") {
          setError("Invalid email or password");
        } else {
          setError(result.error || "Login failed");
        }
        console.log(result);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        redirect("/dashboard");
      } else {
        setError(result.error || "Google sign-in failed");
      }
    } catch {
      setError("Google sign-in failed");
    }
  };

  const handleAppleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithApple();
      if (result.success) {
        redirect("/dashboard");
      } else {
        setError(result.error || "Apple sign-in failed");
      }
    } catch {
      setError("Apple sign-in failed");
    }
  };

  return (
    <>
      <div className="w-full max-w-md bg-[#4a007a] border border-[#6a0dad] p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#d4af37]">KA</span>
            <span className="text-[#6a0dad]">$</span>
            <span className="text-[#d4af37]">HDA</span>
          </h1>
          <h2 className="text-2xl font-semibold text-[#e0e0e0]">
            Welcome Back!
          </h2>
          <p className="text-sm text-[#a0a0a0] mt-2">
            Log in to access your financial dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {showExpiredMessage && (
            <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-4 py-3 rounded-lg text-sm">
              <strong>Session Expired:</strong> Your previous session has
              expired. Please log in again to continue.
            </div>
          )}
          {error && !showExpiredMessage && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#e0e0e0] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-[#3a005f] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
              required
              disabled={isSubmitting || loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#e0e0e0] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Your password"
                className="w-full p-3 pr-12 rounded-lg bg-[#3a005f] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                required
                disabled={isSubmitting || loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a0a0a0] hover:text-[#e0e0e0]"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={onSwitchToPasswordReset}
                className="text-sm text-[#d4af37] hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full p-3 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                <span>Signing In...</span>
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-8">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-[#a0a0a0]">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || loading}
            className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#3a005f] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-xl" />
            <span>Log In with Google</span>
          </button>
          <button
            type="button"
            onClick={handleAppleSignIn}
            disabled={isSubmitting || loading}
            className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#3a005f] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <FontAwesomeIcon icon={faApple} className="text-xl" />
            <span>Log In with Apple</span>
          </button>
        </div>

        <p className="text-center text-sm text-[#a0a0a0] mt-8">
          {`Don't have an account?`}
          <button
            onClick={onSwitchToSignup}
            className="text-[#d4af37] hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;
