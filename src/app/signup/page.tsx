"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import SignupForm from "../components/forms/SignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SignupPage = () => {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  // If user is already authenticated and has completed KYC, redirect to dashboard
  if (user && !loading && userProfile?.kycCompleted) {
    router.push("/dashboard");
    return null;
  }

  // If user is already authenticated but needs KYC, redirect to KYC
  if (user && !loading && userProfile && !userProfile.kycCompleted) {
    router.push("/kyc");
    return null;
  }

  // If user is already authenticated, show loading
  if (user && !loading) {
    return (
      <div className="flex justify-center items-center h-screen py-2 bg-[#2a004a]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#e0e0e0] text-lg">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full lg:h-screen py-2 bg-[#2a004a]">
      <div className="text-center">
        <button
          className=" absolute top-4 left-4  gap-2 p-3 rounded-lg items-center justify-center space-x-3 font-semibold shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none bg-[#4a007a] text-[#e0e0e0] border border-[#4a007a] hover:bg-[#6a0dad] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hidden md:flex  "
          onClick={() => {
            redirect("/");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Return to Home
        </button>
        <SignupForm
          onSwitchToLogin={() => {
            router.push("/login");
          }}
          onSuccess={() => {
            console.log("Signup successful, redirecting to KYC...");
            setTimeout(() => {
              console.log("Attempting redirect to KYC...");
              try {
                router.push("/kyc");
              } catch (error) {
                console.error(
                  "Router redirect failed, using window.location:",
                  error
                );
                // Fallback: use window.location if router fails
                window.location.href = "/kyc";
              }
            }, 500); // 500ms delay
          }}
        />
      </div>
    </div>
  );
};

export default SignupPage;
