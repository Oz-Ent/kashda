"use client";

import { useStaticRedirect } from "@/lib/staticRedirect";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface LoginProps {
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const { redirect } = useStaticRedirect();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirect("/dashboard");
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
          <div>
            <label
              htmlFor="emailOrUsername"
              className="block text-sm font-medium text-[#e0e0e0] mb-1"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              placeholder="you@example.com or username"
              className="w-full p-3 rounded-lg bg-[#3a005f] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
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
              placeholder="Your password"
              className="w-full p-3 rounded-lg bg-[#3a005f] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
            />
            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm text-[#d4af37] hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d]"
          >
            Log In
          </button>
        </form>

        <div className="relative flex items-center justify-center my-8">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-[#a0a0a0]">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="space-y-4">
          <button className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#3a005f] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad]">
            <FontAwesomeIcon icon={faGoogle} className="text-xl" />
            <span>Log In with Google</span>
          </button>
          <button className="w-full p-3 rounded-lg flex items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#3a005f] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad]">
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
