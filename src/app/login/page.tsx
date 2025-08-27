"use client";

import React from "react";
import { useStaticRedirect } from "@/lib/staticRedirect";
import LoginForm from "../components/forms/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const { redirect } = useStaticRedirect();

  return (
    <div className="flex justify-center items-center h-full lg:h-screen bg-[#2a004a]">
      <button
        className=" absolute top-4 left-4  gap-2 p-3 rounded-lg items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hidden md:flex  "
        onClick={() => {
          redirect("/");
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Return to Home
      </button>
      <LoginForm
        onSwitchToSignup={() => {
          redirect("/signup");
        }}
      />
    </div>
  );
};
export default LoginPage;
