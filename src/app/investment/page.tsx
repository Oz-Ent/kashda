"use client";

import { getInvestmentsData } from "@/lib/dataUtils";
import {
  faArrowDown,
  faArrowUp,
  faChartLine,
  faMoneyBillWave,
  faPlus,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AppLayout from "../components/common/AppLayout";

const InvestmentPage = () => {
  const investmentData = getInvestmentsData();
  const [selectedInvestment, setSelectedInvestment] = useState(
    investmentData.portfolio[0]
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
      case "very low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-[#a0a0a0]";
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
      case "very low":
        return "bg-green-500/20";
      case "medium":
        return "bg-yellow-500/20";
      case "high":
        return "bg-red-500/20";
      default:
        return "bg-[#4a007a]/20";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">
              Investment Portfolio
            </h1>
            <p className="text-[#a0a0a0]">
              Manage and track your investment portfolio
            </p>
          </div>
          <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <FontAwesomeIcon icon={faPlus} />
            <span>New Investment</span>
          </button>
        </div>

        {/* Investment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#e0e0e0]">
                Total Investments
              </h3>
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-[#d4af37] text-xl"
              />
            </div>
            <p className="text-3xl font-bold text-[#d4af37]">
              {formatCurrency(investmentData.totalInvestments)}
            </p>
          </div>

          <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#e0e0e0]">
                Total Returns
              </h3>
              <FontAwesomeIcon
                icon={
                  investmentData.totalReturns >= 0 ? faArrowUp : faArrowDown
                }
                className={`text-xl ${
                  investmentData.totalReturns >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              />
            </div>
            <p
              className={`text-3xl font-bold ${
                investmentData.totalReturns >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {investmentData.totalReturns >= 0 ? "+" : ""}
              {investmentData.totalReturns.toFixed(1)}%
            </p>
          </div>

          <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#e0e0e0]">
                Active Investments
              </h3>
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-[#6a0dad] text-xl"
              />
            </div>
            <p className="text-3xl font-bold text-[#6a0dad]">
              {investmentData.portfolio.length}
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Investments */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#e0e0e0]">
              Your Portfolio
            </h2>
            {investmentData.portfolio.map((investment) => (
              <div
                key={investment.id}
                className={`bg-[#3a005f] border p-4 rounded-xl cursor-pointer transition-colors duration-200 ${
                  selectedInvestment.id === investment.id
                    ? "border-[#6a0dad] bg-[#6a0dad]/10"
                    : "border-[#4a007a] hover:border-[#6a0dad]"
                }`}
                onClick={() => setSelectedInvestment(investment)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#e0e0e0]">
                      {investment.name}
                    </h3>
                    <p className="text-sm text-[#a0a0a0]">{investment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#d4af37]">
                      {formatCurrency(investment.amount)}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        investment.returns >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {investment.returns >= 0 ? "+" : ""}
                      {investment.returns.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getRiskBgColor(
                      investment.risk
                    )} ${getRiskColor(investment.risk)}`}
                  >
                    <FontAwesomeIcon icon={faShieldAlt} className="mr-1" />
                    {investment.risk} Risk
                  </span>
                  <span className="text-sm text-[#a0a0a0]">
                    Click for details
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Investment Details */}
          <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
              Investment Details
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#d4af37] mb-2">
                  {selectedInvestment.name}
                </h3>
                <p className="text-[#a0a0a0]">{selectedInvestment.type}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2a004a] p-4 rounded-lg">
                  <p className="text-sm text-[#a0a0a0] mb-1">
                    Investment Amount
                  </p>
                  <p className="text-xl font-bold text-[#6a0dad]">
                    {formatCurrency(selectedInvestment.amount)}
                  </p>
                </div>
                <div className="bg-[#2a004a] p-4 rounded-lg">
                  <p className="text-sm text-[#a0a0a0] mb-1">Returns</p>
                  <p
                    className={`text-xl font-bold ${
                      selectedInvestment.returns >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selectedInvestment.returns >= 0 ? "+" : ""}
                    {selectedInvestment.returns.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="bg-[#2a004a] p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className={getRiskColor(selectedInvestment.risk)}
                    />
                    <span className="text-[#a0a0a0]">Risk Level</span>
                  </div>
                  <span
                    className={`font-semibold ${getRiskColor(
                      selectedInvestment.risk
                    )}`}
                  >
                    {selectedInvestment.risk}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200">
                  Add More Funds
                </button>
                <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200">
                  Withdraw Investment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Investments */}
        <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
            Available Investment Opportunities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investmentData.availableInvestments.map((investment) => (
              <div
                key={investment.id}
                className="bg-[#2a004a] p-4 rounded-lg border border-[#4a007a]"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#e0e0e0]">
                      {investment.name}
                    </h3>
                    <p className="text-sm text-[#a0a0a0]">
                      Min: {formatCurrency(investment.minimumAmount)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getRiskBgColor(
                      investment.risk
                    )} ${getRiskColor(investment.risk)}`}
                  >
                    {investment.risk} Risk
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Expected Returns:</span>
                    <span className="text-green-400 font-semibold">
                      +{investment.expectedReturns}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Duration:</span>
                    <span className="text-[#e0e0e0]">
                      {investment.duration}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-2 rounded-lg transition-colors duration-200">
                  Invest Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default InvestmentPage;
