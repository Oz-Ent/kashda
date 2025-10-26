"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faHandHoldingUsd,
  faPlusCircle,
  faMoneyBillWave,
  faFilter,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { useDataState } from "@/hooks/useDataState";
import { formatCurrency } from "@/lib/formatUtils";
import { formatCurrencyWithSymbol } from "@/lib/currencyUtils";
import AppLayout from "../components/common/AppLayout";
import CurrencySelector from "../components/ui/CurrencySelector";
import { CardSkeleton, TableSkeleton } from "../components/ui/LoadingSkeleton";
import ProtectedRoute from "../components/auth/ProtectedRoute";

type FilterType = "all" | "income" | "expenses";

const TransactionsPage = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { isLoading, isEmpty, data } = useDataState();

  const getFilteredTransactions = () => {
    const allTransactions = data.transactions;
    if (filter === "all") return allTransactions;
    if (filter === "income") return allTransactions.filter((t) => t.amount > 0);
    if (filter === "expenses")
      return allTransactions.filter((t) => t.amount < 0);
    return allTransactions;
  };

  const transactions = getFilteredTransactions();

  const formatAmount = (amount: number) => {
    const formatted = formatCurrencyWithSymbol(Math.abs(amount), selectedCurrency);
    return amount >= 0 ? `+ ${formatted}` : `- ${formatted}`;
  };

  const getFilterButtonClass = (filterType: FilterType) => {
    const baseClass =
      "px-4 py-2 rounded-lg text-sm transition-colors duration-200";
    if (filter === filterType) {
      return `${baseClass} bg-[#6a0dad] text-white`;
    }
    return `${baseClass} bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad]`;
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">
                Transactions
              </h1>
              <p className="text-[#a0a0a0]">
                Manage your money transfers and view transaction history
              </p>
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>

          {/* Quick Actions - Top Row Format */}
          <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-medium text-[#e0e0e0] mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/transactions/send"
                className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-md focus:outline-none transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="text-2xl mb-2 text-white"
                />
                <span className="text-sm font-medium">Send</span>
              </Link>
              <Link
                href="/transactions/receive"
                className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-md focus:outline-none transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faHandHoldingUsd}
                  className="text-2xl mb-2 text-white"
                />
                <span className="text-sm font-medium">Receive</span>
              </Link>
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
            </div>
          </div>

          {/* Transaction History */}
          {isLoading ? (
            <CardSkeleton>
              <div className="space-y-4">
                <div className="h-6 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-1/3"></div>
                <div className="flex space-x-2 mb-4">
                  <div className="h-8 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-lg w-16"></div>
                  <div className="h-8 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-lg w-20"></div>
                  <div className="h-8 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-lg w-24"></div>
                </div>
                <TableSkeleton rows={6} columns={6} />
              </div>
            </CardSkeleton>
          ) : (
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-medium mb-4 text-[#e0e0e0]">
                Transaction History
              </h2>
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={getFilterButtonClass("all")}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("income")}
                    className={getFilterButtonClass("income")}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setFilter("expenses")}
                    className={getFilterButtonClass("expenses")}
                  >
                    Expenses
                  </button>
                </div>
                <button className="bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] hover:bg-[#6a0dad] px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  Filter
                </button>
              </div>

              {isEmpty || transactions.length === 0 ? (
                <div className="text-center py-12">
                  <FontAwesomeIcon
                    icon={faReceipt}
                    className="text-6xl text-[#6a0dad] mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                    {isEmpty
                      ? "No Transactions Yet"
                      : `No ${filter} transactions found`}
                  </h3>
                  <p className="text-[#a0a0a0] mb-6">
                    {isEmpty
                      ? "Start using your wallet to see transaction history here."
                      : `No transactions found for the ${filter === "all" ? "selected" : filter
                      } filter.`}
                  </p>
                  {isEmpty && (
                    <div className="flex justify-center space-x-4">
                      <Link
                        href="/transactions/send"
                        className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span>Send Money</span>
                      </Link>
                      <Link
                        href="/transactions/receive"
                        className="bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                      >
                        <FontAwesomeIcon icon={faHandHoldingUsd} />
                        <span>Receive Money</span>
                      </Link>
                    </div>
                  )}
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
                        <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
                          Reference
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-700 hover:bg-[#2a004a] transition-colors duration-200"
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
                            className={`py-3 px-4 text-sm font-semibold whitespace-nowrap  ${transaction.amount >= 0
                              ? "text-green-500"
                              : "text-red-400"
                              }`}
                          >
                            {formatAmount(transaction.amount)}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-[#a0a0a0]">
                            {transaction.reference}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default TransactionsPage;
