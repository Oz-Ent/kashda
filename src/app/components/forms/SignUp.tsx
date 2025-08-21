"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { useStaticRedirect } from "@/lib/staticRedirect";

interface SignUpProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin, onSuccess }) => {
  const { redirect } = useStaticRedirect();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(); // Close modal and redirect to KYC
    redirect("/kyc");
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
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#e0e0e0] mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Minimum 8 characters"
            className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[#e0e0e0] mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d]"
        >
          Sign Up
        </button>
      </form>

      <div className="relative flex items-center justify-center my-8">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="flex-shrink mx-4 text-[#a0a0a0]">OR</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      <div className="space-y-4">
        <button className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad]">
          <FontAwesomeIcon icon={faGoogle} className="text-xl" />
          <span>Sign Up with Google</span>
        </button>
        <button className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad]">
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
