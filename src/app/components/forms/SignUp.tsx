"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";

interface SignUpProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin, onSuccess }) => {
  const { signUp, signInWithGoogle, signInWithApple, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    console.log("Starting email/password signup...");

    try {
      const result = await signUp(formData.email, formData.password);
      console.log("Signup result:", result);

      if (result.success) {
        console.log("Signup successful, calling onSuccess");
        // Call onSuccess to let the parent handle the redirect
        onSuccess();
        console.log("onSuccess called, should redirect to KYC");
      } else {
        console.log("Signup failed:", result.error);
        setError(result.error || "Sign up failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    console.log("Starting Google signup...");
    try {
      const result = await signInWithGoogle();
      console.log("Google signup result:", result);
      if (result.success) {
        console.log("Google signup successful, calling onSuccess");
        // Call onSuccess to let the parent handle the redirect
        onSuccess();
        console.log("Google onSuccess called, should redirect to KYC");
      } else {
        console.log("Google signup failed:", result.error);
        setError(result.error || "Google sign-up failed");
      }
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Google sign-up failed");
    }
  };

  const handleAppleSignUp = async () => {
    setError("");
    console.log("Starting Apple signup...");
    try {
      const result = await signInWithApple();
      console.log("Apple signup result:", result);
      if (result.success) {
        console.log("Apple signup successful, calling onSuccess");
        // Call onSuccess to let the parent handle the redirect
        onSuccess();
        console.log("Apple onSuccess called, should redirect to KYC");
      } else {
        console.log("Apple signup failed:", result.error);
        setError(result.error || "Apple sign-up failed");
      }
    } catch (err) {
      console.error("Apple signup error:", err);
      setError("Apple sign-up failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#3a005f] border border-[#4a007a] p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-[#d4af37]">KA</span>
          <span className="text-[#6a0dad]">$</span>
          <span className="text-[#d4af37]">HDA</span>
        </h1>
        <h2 className="text-2xl font-semibold text-[#e0e0e0]">
          Create Your Account
        </h2>
        <p className="text-sm text-[#a0a0a0] mt-2">
          Join KASHDA and manage your finances with ease.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#e0e0e0] mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            className="w-full p-3 pr-12 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
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
              placeholder="Minimum 8 characters"
              className="w-full p-3 pr-12 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
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
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[#e0e0e0] mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Re-enter your password"
              className="w-full p-3 pr-12 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
              required
              disabled={isSubmitting || loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a0a0a0] hover:text-[#e0e0e0]"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
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
              <span>Creating Account...</span>
            </span>
          ) : (
            "Sign Up"
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
          onClick={handleGoogleSignUp}
          disabled={isSubmitting || loading}
          className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <FontAwesomeIcon icon={faGoogle} className="text-xl" />
          <span>Sign Up with Google</span>
        </button>
        <button
          type="button"
          onClick={handleAppleSignUp}
          disabled={isSubmitting || loading}
          className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <FontAwesomeIcon icon={faApple} className="text-xl" />
          <span>Sign Up with Apple</span>
        </button>
      </div>

      <p className="text-center text-sm text-[#a0a0a0] mt-8">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-[#d4af37] hover:underline font-medium"
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
