"use client";

import {
  faArrowLeft,
  faEnvelope,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface PasswordResetProps {
  onBack: () => void;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ onBack }) => {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await resetPassword(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Failed to send reset email");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-[#4a007a] border border-[#6a0dad] p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-2xl text-green-400"
            />
          </div>
          <h2 className="text-2xl font-semibold text-[#e0e0e0] mb-2">
            Check Your Email
          </h2>
          <p className="text-sm text-[#a0a0a0] mb-6">
            We&apos;ve sent a password reset link to your email address.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onBack}
            className="w-full p-3 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d]"
          >
            Back to Login
          </button>

          <p className="text-center text-sm text-[#a0a0a0] mb-6">
            Don&apos;t see the email? Check your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-[#4a007a] border border-[#6a0dad] p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-[#a0a0a0] hover:text-[#e0e0e0] mr-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        </button>
        <h2 className="text-2xl font-semibold text-[#e0e0e0]">
          Reset Password
        </h2>
      </div>

      <div className="mb-6">
        <p className="text-sm text-[#a0a0a0] mb-6">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg bg-[#3a005f] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              <span>Sending...</span>
            </span>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
