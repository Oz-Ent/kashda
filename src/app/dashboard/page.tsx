"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faHandHoldingUsd,
  faPlusCircle,
  faMoneyBillWave,
  faBriefcase,
  faShieldAlt,
  faFileInvoiceDollar,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useStaticRedirect } from "@/lib/staticRedirect";
import {
  getWallets,
  getPensionData,
  getInsuranceData,
  getRevenueData,
  getTransactions,
} from "@/lib/dataUtils";
import AppLayout from "../components/common/AppLayout";
import BalanceCarousel from "../components/ui/BalanceCarousel";

const DashboardPage = () => {
  const { redirect } = useStaticRedirect();
  const wallets = getWallets();
  const pensionData = getPensionData();
  const insuranceData = getInsuranceData();
  const revenueData = getRevenueData();
  const recentTransactions = getTransactions().slice(0, 3); // Get latest 3 transactions

  const handleSendClick = () => {
    redirect("/transactions/send");
  };

  const handleReceiveClick = () => {
    redirect("/transactions/receive");
  };

  const formatAmount = (amount: number) => {
    const formatted = new Intl.NumberFormat("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));

    return amount >= 0 ? `+ GHS ${formatted}` : `- GHS ${formatted}`;
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Cards */}
        <BalanceCarousel wallets={wallets} />

        {/* Quick Action Tiles */}
        <section className="lg:col-span-1 bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg grid grid-cols-2 gap-4 content-start">
          <h2 className="text-xl font-medium text-[#e0e0e0] col-span-2 mb-2">
            Quick Actions
          </h2>
          <button
            onClick={handleSendClick}
            className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-md focus:outline-none transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-2xl mb-2 text-white"
            />
            <span className="text-sm font-medium">Send</span>
          </button>
          <button
            onClick={handleReceiveClick}
            className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-md focus:outline-none transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              className="text-2xl mb-2 text-white"
            />
            <span className="text-sm font-medium">Receive</span>
          </button>
          <button className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-md focus:outline-none transition-colors duration-200">
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="text-2xl mb-2 text-white"
            />
            <span className="text-sm font-medium">Top Up</span>
          </button>
          <button className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-md focus:outline-none transition-colors duration-200">
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              className="text-2xl mb-2 text-white"
            />
            <span className="text-sm font-medium">Withdraw</span>
          </button>
        </section>

        {/* Pension Scheme Card */}
        <section className="lg:col-span-1 bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-medium text-[#e0e0e0]">
              Pension Scheme
            </h2>
            <FontAwesomeIcon
              icon={faBriefcase}
              className="text-xl text-[#d4af37]"
            />
          </div>
          <p className="text-md text-[#e0e0e0] mb-2">
            Subscription Status:{" "}
            <span className="font-semibold text-green-400">
              {pensionData.subscriptionStatus}
            </span>
          </p>
          <p className="text-md text-[#e0e0e0] mb-4">
            Monthly Payment:{" "}
            <span className="font-semibold text-green-400">
              {pensionData.monthlyPayment}
            </span>
          </p>
          <button
            onClick={() => redirect("/pension")}
            className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] w-full py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200"
          >
            View Details
          </button>
        </section>

        {/* Insurance Products Card */}
        <section className="lg:col-span-1 bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-medium text-[#e0e0e0]">My Insurance</h2>
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="text-xl text-[#6a0dad]"
            />
          </div>
          <ul className="list-disc list-inside text-[#e0e0e0] mb-4">
            {insuranceData.plans.map((plan) => (
              <li key={plan.id}>{plan.name}</li>
            ))}
          </ul>
          <button
            onClick={() => redirect("/insurance")}
            className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] w-full py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200"
          >
            View Insurance Packages
          </button>
        </section>

        {/* Recent Transactions */}
        <section className="lg:col-span-2 bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-medium mb-4 text-[#e0e0e0]">
            Recent Transactions
          </h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                All
              </button>
              <button className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                Income
              </button>
              <button className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                Expenses
              </button>
            </div>
            <button
              onClick={() => redirect("/transactions")}
              className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] px-4 py-2 rounded-lg text-sm transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-[#e0e0e0]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
                    Date
                  </th>
                  <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
                    Description
                  </th>
                  <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
                    Category
                  </th>
                  <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
                    Amount
                  </th>
                  <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700">
                    <td className="py-3 px-4 text-sm">{transaction.date}</td>
                    <td className="py-3 px-4 text-sm">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {transaction.category}
                    </td>
                    <td
                      className={`py-3 px-4 text-sm ${
                        transaction.amount >= 0
                          ? "text-green-500"
                          : "text-red-400"
                      }`}
                    >
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="py-3 px-4 text-sm text-green-500">
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Revenue Collection Card */}
        <section className="lg:col-span-1 bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-medium text-[#e0e0e0]">
              Revenue Collection
            </h2>
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              className="text-xl text-[#d4af37]"
            />
          </div>
          <p className="text-md text-[#e0e0e0] mb-2">
            Revenue Paid (July):{" "}
            <span className="font-semibold text-red-400">
              GHS {revenueData.paidAmount.toFixed(2)}
            </span>
          </p>
          <p className="text-md text-[#e0e0e0] mb-4">
            Outstanding Amount:{" "}
            <span className="font-semibold text-red-400">
              GHS {revenueData.outstandingAmount.toFixed(2)} (
              {revenueData.outstandingDescription})
            </span>
          </p>
          <button
            onClick={() => redirect("/revenue")}
            className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] w-full py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200"
          >
            Pay Now
          </button>
        </section>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
