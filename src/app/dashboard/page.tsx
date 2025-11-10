"use client";

import React, { useState } from "react";
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
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useStaticRedirect } from "@/lib/staticRedirect";
import { useDataState } from "@/hooks/useDataState";
import { formatCurrency } from "@/lib/formatUtils";
import { formatCurrencyWithSymbol } from "@/lib/currencyUtils";
import AppLayout from "../components/common/AppLayout";
import BalanceCarousel from "../components/ui/BalanceCarousel";
import CurrencySelector from "../components/ui/CurrencySelector";
import { CardSkeleton, TableSkeleton } from "../components/ui/LoadingSkeleton";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const DashboardPage = () => {
  const { redirect } = useStaticRedirect();
  const { isLoading, isEmpty, data } = useDataState({
    loadingTimeout: 2000,
    emptyTimer: 7000,
  });
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Debug logging to verify timing behavior
  React.useEffect(() => {
    console.log("Dashboard: isLoading:", isLoading, "isEmpty:", isEmpty);
  }, [isLoading, isEmpty]);

  const wallets = data.wallets;
  const pensionData = data.pension;
  const insuranceData = data.insurance;
  const revenueData = data.revenue;
  const recentTransactions = data.transactions.slice(0, 3); // Get latest 3 transactions

  const handleSendClick = () => {
    redirect("/transactions/send");
  };

  const handleReceiveClick = () => {
    redirect("/transactions/receive");
  };

  const formatAmount = (amount: number) => {
    const formatted = formatCurrencyWithSymbol(Math.abs(amount), selectedCurrency);
    return amount >= 0 ? `+ ${formatted}` : `- ${formatted}`;
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-6">
          {/* Currency Selector */}
          <div className="flex justify-end">
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:flex-col">
            {/* Balance Cards */}
            {isLoading ? (
              <CardSkeleton className="h-32" />
            ) : (
              <BalanceCarousel
                wallets={wallets}
                displayCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            )}

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
            {isLoading ? (
              <CardSkeleton />
            ) : (
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
                {isEmpty ||
                  pensionData.subscriptionStatus === "Not Subscribed" ? (
                  <div className="text-center py-4">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-3xl text-orange-400 mb-2"
                    />
                    <p className="text-sm text-[#a0a0a0] mb-4">
                      No active pension plan. Start securing your retirement
                      today.
                    </p>
                    <button
                      onClick={() => redirect("/pension")}
                      className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white w-full py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200"
                    >
                      Subscribe Now
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </section>
            )}

            {/* Insurance Products Card */}
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <section className="lg:col-span-1 bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-medium text-[#e0e0e0]">
                    My Insurance
                  </h2>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-xl text-[#6a0dad]"
                  />
                </div>
                {isEmpty || insuranceData.plans.length === 0 ? (
                  <div className="text-center py-4">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-3xl text-[#6a0dad] mb-2"
                    />
                    <p className="text-sm text-[#a0a0a0] mb-4">
                      No active insurance plans. Protect yourself and your family.
                    </p>
                    <button
                      onClick={() => redirect("/insurance")}
                      className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white w-full py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200"
                    >
                      Browse Plans
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </section>
            )}

            {/* Recent Transactions */}
            {isLoading ? (
              <CardSkeleton className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="h-6 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-1/3"></div>
                  <TableSkeleton rows={3} columns={5} />
                </div>
              </CardSkeleton>
            ) : (
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

                {isEmpty || recentTransactions.length === 0 ? (
                  <div className="text-center py-8">
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="text-4xl text-[#6a0dad] mb-4"
                    />
                    <h3 className="text-lg font-semibold text-[#e0e0e0] mb-2">
                      No Transactions Yet
                    </h3>
                    <p className="text-[#a0a0a0] mb-4">
                      Start using your wallet to see transaction history here.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handleSendClick}
                        className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        Send Money
                      </button>
                      <button
                        onClick={handleReceiveClick}
                        className="bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        Receive Money
                      </button>
                    </div>
                  </div>
                ) : (
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
                          <tr
                            key={transaction.id}
                            className="border-b border-gray-700"
                          >
                            <td className="py-3 px-4 text-sm">
                              {transaction.date}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {transaction.description}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {transaction.category}
                            </td>
                            <td
                              className={`py-3 px-4 text-sm whitespace-nowrap ${transaction.amount >= 0
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
                )}
              </section>
            )}

            {/* Revenue Collection Card */}
            {isLoading ? (
              <CardSkeleton />
            ) : (
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
                {isEmpty || revenueData.outstandingAmount === 0 ? (
                  <div className="text-center py-4">
                    <FontAwesomeIcon
                      icon={faFileInvoiceDollar}
                      className="text-3xl text-green-400 mb-2"
                    />
                    <p className="text-sm text-[#a0a0a0] mb-4">
                      {isEmpty
                        ? "No revenue obligations at this time."
                        : "All payments are up to date!"}
                    </p>
                    <button
                      onClick={() => redirect("/revenue")}
                      className="bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] w-full py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-md text-[#e0e0e0] mb-2">
                      Revenue Paid (July):{" "}
                      <span className="font-semibold text-green-400">
                        {formatCurrency(revenueData.paidAmount)}
                      </span>
                    </p>
                    <p className="text-md text-[#e0e0e0] mb-4">
                      Outstanding Amount:{" "}
                      <span className="font-semibold text-red-400">
                        {formatCurrency(revenueData.outstandingAmount)} (
                        {revenueData.outstandingDescription})
                      </span>
                    </p>
                    <button
                      onClick={() => redirect("/revenue")}
                      className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white w-full py-2 rounded-lg text-sm font-medium focus:outline-none transition-colors duration-200"
                    >
                      Pay Now
                    </button>
                  </>
                )}
              </section>
            )}
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
