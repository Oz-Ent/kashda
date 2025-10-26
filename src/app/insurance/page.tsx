"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faPlus,
  faCalendarAlt,
  faCheckCircle,
  faInfoCircle,
  faMoneyBillWave,
  faEdit,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useDataState } from "@/hooks/useDataState";
import { formatCurrency, formatDate } from "@/lib/formatUtils";
import { formatCurrencyWithSymbol } from "@/lib/currencyUtils";
import AppLayout from "../components/common/AppLayout";
import CurrencySelector from "../components/ui/CurrencySelector";
import {
  StatCardSkeleton,
  CardSkeleton,
} from "../components/ui/LoadingSkeleton";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const InsurancePage = () => {
  const { isLoading, isEmpty, data } = useDataState();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const insuranceData = data.insurance;
  const [selectedPlan, setSelectedPlan] = useState(
    insuranceData.plans[0] || null
  );
  const [activeTab, setActiveTab] = useState<"current" | "available">(
    "current"
  );

  const totalCoverage = insuranceData.plans.reduce(
    (sum, plan) => sum + plan.coverage,
    0
  );
  const totalPremium = insuranceData.plans.reduce(
    (sum, plan) => sum + plan.premium,
    0
  );

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">
                Insurance Plans
              </h1>
              <p className="text-[#a0a0a0]">
                Protect yourself and your loved ones with our insurance coverage
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                <FontAwesomeIcon icon={faPlus} />
                <span>New Plan</span>
              </button>
            </div>
          </div>

          {/* Insurance Overview */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#e0e0e0]">
                    Total Coverage
                  </h3>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-[#d4af37] text-xl"
                  />
                </div>
                <p className="text-3xl font-bold text-[#d4af37]">
                  {formatCurrencyWithSymbol(totalCoverage, selectedCurrency)}
                </p>
              </div>

              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#e0e0e0]">
                    Monthly Premium
                  </h3>
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="text-[#6a0dad] text-xl"
                  />
                </div>
                <p className="text-3xl font-bold text-[#6a0dad]">
                  {formatCurrencyWithSymbol(totalPremium, selectedCurrency)}
                </p>
              </div>

              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#e0e0e0]">
                    Active Plans
                  </h3>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-400 text-xl"
                  />
                </div>
                <p className="text-3xl font-bold text-green-400">
                  {insuranceData.plans.length}
                </p>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-[#2a004a] rounded-lg p-1">
            <button
              onClick={() => setActiveTab("current")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === "current"
                ? "bg-[#6a0dad] text-white"
                : "text-[#a0a0a0] hover:text-[#e0e0e0]"
                }`}
            >
              Current Plans
            </button>
            <button
              onClick={() => setActiveTab("available")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === "available"
                ? "bg-[#6a0dad] text-white"
                : "text-[#a0a0a0] hover:text-[#e0e0e0]"
                }`}
            >
              Available Plans
            </button>
          </div>

          {/* Current Plans */}
          {activeTab === "current" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#e0e0e0]">
                  Your Active Plans
                </h2>

                {isLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : isEmpty || insuranceData.plans.length === 0 ? (
                  <div className="bg-[#3a005f] border border-[#4a007a] p-8 rounded-xl text-center">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-6xl text-orange-400 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                      No Active Insurance Plans
                    </h3>
                    <p className="text-[#a0a0a0] mb-4">
                      You currently have no active insurance coverage. Protect
                      yourself and your family today.
                    </p>
                    <button
                      onClick={() => setActiveTab("available")}
                      className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                      Browse Available Plans
                    </button>
                  </div>
                ) : (
                  insuranceData.plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`bg-[#3a005f] border p-4 rounded-xl cursor-pointer transition-colors duration-200 ${selectedPlan && selectedPlan.id === plan.id
                        ? "border-[#6a0dad] bg-[#6a0dad]/10"
                        : "border-[#4a007a] hover:border-[#6a0dad]"
                        }`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[#e0e0e0]">
                            {plan.name}
                          </h3>
                          <p className="text-sm text-green-400 flex items-center">
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="mr-1"
                            />
                            {plan.status}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-[#6a0dad] hover:text-[#8a2dd3] transition-colors duration-200">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="text-red-400 hover:text-red-500 transition-colors duration-200">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-[#a0a0a0]">Coverage</p>
                          <p className="text-[#e0e0e0] font-semibold">
                            {formatCurrencyWithSymbol(plan.coverage, selectedCurrency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#a0a0a0]">Premium</p>
                          <p className="text-[#d4af37] font-semibold">
                            {formatCurrencyWithSymbol(plan.premium, selectedCurrency)}/month
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#4a007a]">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#a0a0a0]">Next Payment</span>
                          <span className="text-[#e0e0e0]">
                            {formatDate(plan.nextPayment)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Plan Details */}
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                  <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                    Plan Details
                  </h2>

                  {isEmpty || !selectedPlan ? (
                    <div className="text-center py-8">
                      <FontAwesomeIcon
                        icon={faShieldAlt}
                        className="text-4xl text-[#6a0dad] mb-4"
                      />
                      <h3 className="text-lg font-semibold text-[#e0e0e0] mb-2">
                        No Plan Selected
                      </h3>
                      <p className="text-[#a0a0a0]">
                        {isEmpty || insuranceData.plans.length === 0
                          ? "Subscribe to an insurance plan to see details here."
                          : "Select a plan from your active plans to view details."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#d4af37] mb-2">
                          {selectedPlan.name}
                        </h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="mr-1"
                          />
                          {selectedPlan.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-[#2a004a] p-4 rounded-lg">
                          <p className="text-sm text-[#a0a0a0] mb-1">
                            Coverage Amount
                          </p>
                          <p className="text-2xl font-bold text-[#6a0dad]">
                            {formatCurrencyWithSymbol(selectedPlan.coverage, selectedCurrency)}
                          </p>
                        </div>
                        <div className="bg-[#2a004a] p-4 rounded-lg">
                          <p className="text-sm text-[#a0a0a0] mb-1">
                            Monthly Premium
                          </p>
                          <p className="text-2xl font-bold text-[#d4af37]">
                            {formatCurrencyWithSymbol(selectedPlan.premium, selectedCurrency)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#2a004a] p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="text-[#a78bfa]"
                            />
                            <span className="text-[#a0a0a0]">Next Payment</span>
                          </div>
                          <span className="text-[#e0e0e0] font-semibold">
                            {formatDate(selectedPlan.nextPayment)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200">
                          Make Payment
                        </button>
                        <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200">
                          Download Policy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Available Plans */}
          {activeTab === "available" &&
            (isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insuranceData.availablePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-[#a0a0a0] text-sm">
                          {plan.description}
                        </p>
                      </div>
                      <FontAwesomeIcon
                        icon={faShieldAlt}
                        className="text-[#6a0dad] text-2xl"
                      />
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-[#a0a0a0]">Coverage:</span>
                        <span className="text-[#e0e0e0] font-semibold">
                          {formatCurrencyWithSymbol(plan.coverage, selectedCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#a0a0a0]">Monthly Premium:</span>
                        <span className="text-[#d4af37] font-semibold">
                          {formatCurrencyWithSymbol(plan.premium, selectedCurrency)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200">
                        Get Quote
                      </button>
                      <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <span>Learn More</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default InsurancePage;
