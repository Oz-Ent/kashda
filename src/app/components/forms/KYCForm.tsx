"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  faFileAlt,
  faIdCard,
  faUpload,
  faUser,
  faSpinner,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const KYCForm = () => {
  const { submitKYC } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accountType, setAccountType] = useState<string>("individual");

  // Form state for individual account
  const [individualData, setIndividualData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    phoneNumber: "",
    address: "",
    occupation: "",
    incomeRange: "",
    purposeOfAccount: [] as string[],
  });

  // Form state for business account
  const [businessData, setBusinessData] = useState({
    companyName: "",
    nationality: "",
    phoneNumber: "",
    address: "",
    industryType: "",
    incomeRange: "",
  });

  // Form state for documents
  const [documents, setDocuments] = useState({
    idType: "",
    idNumber: "",
    idExpiryDate: "",
    proofOfAddress: "",
    additionalDocuments: [] as string[],
  });

  const handleIndividualChange = (field: string, value: string) => {
    setIndividualData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBusinessChange = (field: string, value: string) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentChange = (field: string, value: string) => {
    setDocuments((prev) => ({ ...prev, [field]: value }));
  };

  const handlePurposeChange = (purpose: string) => {
    setIndividualData((prev) => ({
      ...prev,
      purposeOfAccount: prev.purposeOfAccount.includes(purpose)
        ? prev.purposeOfAccount.filter((p) => p !== purpose)
        : [...prev.purposeOfAccount, purpose],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields based on account type
      if (accountType === "individual") {
        if (
          !individualData.firstName ||
          !individualData.lastName ||
          !individualData.dateOfBirth ||
          !individualData.gender ||
          !individualData.nationality ||
          !individualData.phoneNumber ||
          !individualData.address ||
          !individualData.occupation ||
          !individualData.incomeRange
        ) {
          alert("Please fill in all required fields for individual account");
          setIsSubmitting(false);
          return;
        }
      } else if (accountType === "business") {
        if (
          !businessData.companyName ||
          !businessData.nationality ||
          !businessData.phoneNumber ||
          !businessData.address ||
          !businessData.industryType ||
          !businessData.incomeRange
        ) {
          alert("Please fill in all required fields for business account");
          setIsSubmitting(false);
          return;
        }
      }

      // Validate documents
      if (
        (accountType === "individual" && !documents.idType) ||
        !documents.idNumber
      ) {
        alert("Please fill in all required document fields");
        setIsSubmitting(false);
        return;
      }

      // Prepare KYC data based on account type, excluding undefined fields
      const kycData: {
        accountType: "individual" | "business";
        documents: typeof documents;
        submittedAt: Date;
        status: "pending";
        personalInfo?: typeof individualData;
        businessInfo?: typeof businessData;
      } = {
        accountType: accountType as "individual" | "business",
        documents: documents,
        submittedAt: new Date(),
        status: "pending" as const,
      };

      // Only add personalInfo if account type is individual
      if (accountType === "individual") {
        kycData.personalInfo = individualData;
      }

      // Only add businessInfo if account type is business
      if (accountType === "business") {
        kycData.businessInfo = businessData;
      }

      console.log("Submitting KYC data:", kycData);
      console.log("Account type:", accountType);
      console.log("Individual data:", individualData);
      console.log("Business data:", businessData);
      console.log("Documents:", documents);

      const result = await submitKYC(kycData);
      console.log("KYC submission result:", result);

      if (result.success) {
        setIsSubmitted(true);
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        alert(result.error || "KYC submission failed");
      }
    } catch (error) {
      console.error("KYC submission error:", error);
      alert("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#2a004a] text-[#e0e0e0] font-inter flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-[#3a005f] border border-[#4a007a] rounded-xl shadow-lg p-8 text-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-400 text-6xl mb-6"
          />
          <h1 className="text-3xl font-bold mb-4 text-[#d4af37]">
            KYC Submitted Successfully!
          </h1>
          <p className="text-lg mb-6">
            Thank you for completing your KYC verification. Your application is
            now under review.
          </p>
          <p className="text-sm text-[#a0a0a0]">
            You will be redirected to your dashboard shortly...
          </p>
        </div>
      </div>
    );
  }

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
        {currentStep===1 &&<div className="mb-8">
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
        </div>}
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
                        value={individualData.firstName}
                        onChange={(e) =>
                          handleIndividualChange("firstName", e.target.value)
                        }
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
                        value={individualData.lastName}
                        onChange={(e) =>
                          handleIndividualChange("lastName", e.target.value)
                        }
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
                        value={individualData.dateOfBirth}
                        onChange={(e) =>
                          handleIndividualChange("dateOfBirth", e.target.value)
                        }
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
                            checked={individualData.gender === "male"}
                            onChange={() =>
                              handleIndividualChange("gender", "male")
                            }
                            className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                          />
                          <span className="ml-2 text-[#e0e0e0]">Male</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={individualData.gender === "female"}
                            onChange={() =>
                              handleIndividualChange("gender", "female")
                            }
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
                        value={businessData.companyName}
                        onChange={(e) =>
                          handleBusinessChange("companyName", e.target.value)
                        }
                      />
                    </div>
                  </>
                )}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                    placeholder="Enter your nationality"
                    value={
                      accountType === "individual"
                        ? individualData.nationality
                        : businessData.nationality
                    }
                    onChange={(e) => {
                      if (accountType === "individual") {
                        handleIndividualChange("nationality", e.target.value);
                      } else {
                        handleBusinessChange("nationality", e.target.value);
                      }
                    }}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                    placeholder="+233 XX XXX XXXX"
                    value={
                      accountType === "individual"
                        ? individualData.phoneNumber
                        : businessData.phoneNumber
                    }
                    onChange={(e) => {
                      if (accountType === "individual") {
                        handleIndividualChange("phoneNumber", e.target.value);
                      } else {
                        handleBusinessChange("phoneNumber", e.target.value);
                      }
                    }}
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
                    value={
                      accountType === "individual"
                        ? individualData.address
                        : businessData.address
                    }
                    onChange={(e) => {
                      if (accountType === "individual") {
                        handleIndividualChange("address", e.target.value);
                      } else {
                        handleBusinessChange("address", e.target.value);
                      }
                    }}
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
                      value={documents.idType}
                      onChange={(e) =>
                        handleDocumentChange("idType", e.target.value)
                      }
                    >
                      <option value="">Select ID Type</option>
                      <option value="national_id">National ID</option>
                      <option value="passport">Passport</option>
                      {/* <option value="drivers_license">{`Driver's License`}</option>
                      <option value="voter_id">Voter ID</option> */}
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
                    value={documents.idNumber}
                    onChange={(e) =>
                      handleDocumentChange("idNumber", e.target.value)
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
                    value={
                      accountType === "individual"
                        ? individualData.occupation
                        : businessData.industryType
                    }
                    onChange={(e) => {
                      if (accountType === "individual") {
                        handleIndividualChange("occupation", e.target.value);
                      } else {
                        handleBusinessChange("industryType", e.target.value);
                      }
                    }}
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
                    value={
                      accountType === "individual"
                        ? individualData.incomeRange
                        : businessData.incomeRange
                    }
                    onChange={(e) => {
                      if (accountType === "individual") {
                        handleIndividualChange("incomeRange", e.target.value);
                      } else {
                        handleBusinessChange("incomeRange", e.target.value);
                      }
                    }}
                  >
                    <option value="">Select income range</option>
                    <option value="under_1000">Under GH₵ 1,000</option>
                    <option value="1000_5000">GH₵ 1,000 - 5,000</option>
                    <option value="5000_10000">GH₵ 5,000 - 10,000</option>
                    <option value="10000_plus">Above GH₵ 10,000</option>
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
                          checked={individualData.purposeOfAccount.includes(
                            "Personal savings and transactions"
                          )}
                          onChange={() =>
                            handlePurposeChange(
                              "Personal savings and transactions"
                            )
                          }
                        />
                        <span className="ml-2 text-[#e0e0e0]">
                          Personal savings and transactions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                          checked={individualData.purposeOfAccount.includes(
                            "Business transactions"
                          )}
                          onChange={() =>
                            handlePurposeChange("Business transactions")
                          }
                        />
                        <span className="ml-2 text-[#e0e0e0]">
                          Business transactions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className=" appearance-none w-5 h-5 rounded-full border-2 border-[#4a007a] bg-[#4a007a] cursor-pointer transition-colors duration-200 checked:border-[#6a0dad] checked:bg-[#d4af37] checked:border-4 checked:ring-2 checked:ring-[#d4af37] relative"
                          checked={individualData.purposeOfAccount.includes(
                            "Investment and wealth management"
                          )}
                          onChange={() =>
                            handlePurposeChange(
                              "Investment and wealth management"
                            )
                          }
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
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="mr-2 text-lg"
                    />
                    Submitting...
                  </>
                ) : (
                  "Complete Verification"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default KYCForm;
