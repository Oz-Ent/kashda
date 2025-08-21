"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDownload,
  faInfoCircle,
  faMoneyBillWave,
  faPlus,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";
import { getPensionData } from "@/lib/dataUtils";
import { formatCurrency, formatDate } from "@/lib/formatUtils";
import AppLayout from "../components/common/AppLayout";
import { StatCardGrid } from "../components/ui/StatCard";
import TabNavigation from "../components/ui/TabNavigation";
import DataTable from "../components/data/DataTable";

const PensionPage = () => {
  const pensionData = getPensionData();
  const [activeTab, setActiveTab] = useState<
    "overview" | "contributions" | "projections"
  >("overview");

  const statCards = [
    {
      title: "Total Contributions",
      value: formatCurrency(pensionData.totalContributions),
      icon: faMoneyBillWave,
      iconColor: "text-[#d4af37]",
      valueColor: "text-[#d4af37]",
    },
    {
      title: "Subscription Status",
      value: pensionData.subscriptionStatus,
      icon: faUmbrella,
      iconColor: "text-green-400",
      valueColor: "text-green-400",
    },
    {
      title: "Estimated Benefits",
      value: formatCurrency(pensionData.estimatedRetirementBenefit),
      icon: faChartLine,
      iconColor: "text-[#6a0dad]",
      valueColor: "text-[#6a0dad]",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "contributions", label: "Contributions" },
    { id: "projections", label: "Projections" },
  ];

  const contributionColumns = [
    {
      key: "date",
      title: "Date",
      render: (value: string) => formatDate(value),
    },
    { key: "month", title: "Month" },
    {
      key: "amount",
      title: "Amount",
      render: (value: number) => (
        <span className="font-semibold text-[#d4af37]">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value: string) => (
        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
          {value}
        </span>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">
              Pension Scheme
            </h1>
            <p className="text-[#a0a0a0]">
              Plan for your retirement with our comprehensive pension scheme
            </p>
          </div>
          <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <FontAwesomeIcon icon={faPlus} />
            <span>Make Contribution</span>
          </button>
        </div>

        {/* Pension Overview */}
        <StatCardGrid cards={statCards} />

        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) =>
            setActiveTab(tabId as "overview" | "contributions" | "projections")
          }
        />

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Current Status
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Subscription:</span>
                  <span className="text-green-400 font-semibold">
                    {pensionData.subscriptionStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Monthly Payment:</span>
                  <span className="text-green-400 font-semibold">
                    {pensionData.monthlyPayment}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Total Contributed:</span>
                  <span className="text-[#e0e0e0] font-semibold">
                    {formatCurrency(pensionData.totalContributions)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Estimated Benefits:</span>
                  <span className="text-[#d4af37] font-semibold">
                    {formatCurrency(pensionData.estimatedRetirementBenefit)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200">
                  Make Contribution
                </button>
                <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Download Statement</span>
                </button>
                <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>Learn More</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contributions Tab */}
        {activeTab === "contributions" && (
          <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
              Contribution History
            </h2>
            <DataTable
              columns={contributionColumns}
              data={pensionData.contributions}
              emptyMessage="No contributions found"
            />
          </div>
        )}

        {/* Projections Tab */}
        {activeTab === "projections" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Retirement Projections
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Retirement Age
                  </label>
                  <select className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]">
                    <option value="60">60 years</option>
                    <option value="65">65 years</option>
                    <option value="70">70 years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Monthly Contribution
                  </label>
                  <input
                    type="number"
                    defaultValue="250"
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                </div>

                <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200">
                  Calculate Projections
                </button>
              </div>
            </div>

            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Projected Benefits
              </h2>

              <div className="space-y-4">
                <div className="bg-[#2a004a] p-4 rounded-lg">
                  <p className="text-sm text-[#a0a0a0] mb-1">At Age 60</p>
                  <p className="text-2xl font-bold text-[#d4af37]">
                    {formatCurrency(
                      pensionData.estimatedRetirementBenefit * 0.8
                    )}
                  </p>
                </div>

                <div className="bg-[#2a004a] p-4 rounded-lg">
                  <p className="text-sm text-[#a0a0a0] mb-1">At Age 65</p>
                  <p className="text-2xl font-bold text-[#d4af37]">
                    {formatCurrency(pensionData.estimatedRetirementBenefit)}
                  </p>
                </div>

                <div className="bg-[#2a004a] p-4 rounded-lg">
                  <p className="text-sm text-[#a0a0a0] mb-1">At Age 70</p>
                  <p className="text-2xl font-bold text-[#d4af37]">
                    {formatCurrency(
                      pensionData.estimatedRetirementBenefit * 1.2
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default PensionPage;
