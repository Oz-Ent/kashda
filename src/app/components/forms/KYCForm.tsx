"use client";

import { useStaticRedirect } from "@/lib/staticRedirect";
import {
  faFileAlt,
  faIdCard,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const KYCForm = () => {
  const { redirect } = useStaticRedirect();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState<string>("individual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirect("/dashboard");
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#2a004a] text-[#e0e0e0] font-inter flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#3a005f] border border-[#4a007a] rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#d4af37]">KA</span>
            <span className="text-[#6a0dad]">$</span>
            <span className="text-[#d4af37]">HDA</span>
          </h1>
          <h2 className="text-2xl font-semibold text-[#e0e0e0]">
            Know Your Customer (KYC) Verification
          </h2>
          <p className="text-sm text-[#a0a0a0] mt-2">
            Please complete your profile to access all features of KASHDA.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-[#e0e0e0]">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-[#a0a0a0]">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-[#2a004a] rounded-full h-2">
            <div
              className="bg-[#d4af37] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        {/* Account Type */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
            Account Type *
          </h3>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="individual"
                checked={accountType === "individual"}
                onChange={() => setAccountType("individual")}
                className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
              />
              <span className="ml-2 text-[#e0e0e0]">Personal</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="business"
                checked={accountType === "business"}
                onChange={() => setAccountType("business")}
                className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
              />
              <span className="ml-2 text-[#e0e0e0]">Business</span>
            </label>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[#d4af37] mr-3 text-xl"
                />
                <h3 className="text-xl font-semibold text-[#e0e0e0]">
                  {accountType === "individual"
                    ? `Personal Information`
                    : `Business Information`}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accountType === "individual" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                        Gender *
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                          />
                          <span className="ml-2 text-[#e0e0e0]">Male</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                          />
                          <span className="ml-2 text-[#e0e0e0]">Female</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {accountType === "business" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] resize-none"
                    placeholder="Enter your full address"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Identity Verification */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="text-[#d4af37] mr-3 text-xl"
                />
                <h3 className="text-xl font-semibold text-[#e0e0e0]">
                  {accountType === "individual"
                    ? "Identity Verification"
                    : "Business Identity Verification"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accountType === "individual" && (
                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                      ID Type *
                    </label>
                    <select
                      required
                      className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                    >
                      <option value="">Select ID Type</option>
                      <option value="national_id">National ID</option>
                      <option value="passport">Passport</option>
                      <option value="drivers_license">{`Driver's License`}</option>
                      <option value="voter_id">Voter ID</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    {accountType === "individual"
                      ? "National ID Number"
                      : "Company Registration Number"}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                    placeholder={
                      accountType === "individual"
                        ? "Enter your ID number"
                        : "Enter your Company Registration Number"
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    {accountType === "individual"
                      ? "Front of ID *"
                      : "Company Registration Certificates * (have one or more)"}
                  </label>
                  <div className="border-2 border-dashed border-[#4a007a] rounded-lg p-6 text-center hover:border-[#6a0dad] transition-colors duration-200">
                    <FontAwesomeIcon
                      icon={faUpload}
                      className="text-[#a0a0a0] text-3xl mb-4"
                    />
                    <p className="text-[#a0a0a0] mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-[#a0a0a0]">
                      PNG, JPG up to 10MB
                    </p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                {accountType === "individual" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                      Back of ID *
                    </label>
                    <div className="border-2 border-dashed border-[#4a007a] rounded-lg p-6 text-center hover:border-[#6a0dad] transition-colors duration-200">
                      <FontAwesomeIcon
                        icon={faUpload}
                        className="text-[#a0a0a0] text-3xl mb-4"
                      />
                      <p className="text-[#a0a0a0] mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-[#a0a0a0]">
                        PNG, JPG up to 10MB
                      </p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Additional Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="text-[#d4af37] mr-3 text-xl"
                />
                <h3 className="text-xl font-semibold text-[#e0e0e0]">
                  Additional Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    {`${
                      accountType === "individual"
                        ? "Occupation"
                        : "Industry Type"
                    } *`}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                    placeholder={`${
                      accountType === "individual"
                        ? "Enter your occupation"
                        : "Enter your industry type"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    {`${
                      accountType === "individual"
                        ? "Monthly Income Range"
                        : "Business Income Range"
                    } *`}
                  </label>
                  <select
                    required
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  >
                    <option value="">Select income range</option>
                    <option value="under_1000">Under GHS 1,000</option>
                    <option value="1000_5000">GHS 1,000 - 5,000</option>
                    <option value="5000_10000">GHS 5,000 - 10,000</option>
                    <option value="10000_plus">Above GHS 10,000</option>
                  </select>
                </div>

                {accountType === "individual" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                      Purpose of Account *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                        />
                        <span className="ml-2 text-[#e0e0e0]">
                          Personal savings and transactions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                        />
                        <span className="ml-2 text-[#e0e0e0]">
                          Business transactions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                        />
                        <span className="ml-2 text-[#e0e0e0]">
                          Investment and wealth management
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      required
                      className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                    />
                    <span className="ml-2 text-[#e0e0e0]">
                      I agree to the{" "}
                      <a href="#" className="text-[#d4af37] hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#d4af37] hover:underline">
                        Privacy Policy
                      </a>
                      *
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-lg bg-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-lg bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
              >
                Complete Verification
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default KYCForm;
