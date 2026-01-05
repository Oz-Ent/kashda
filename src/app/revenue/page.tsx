"use client";

import { useDataState } from "@/hooks/useDataState";
import { formatCurrencyWithSymbol } from "@/lib/currencyUtils";
import { formatDate } from "@/lib/formatUtils";
import {
  faCheckCircle,
  faCreditCard,
  faDownload,
  faExclamationTriangle,
  faFileInvoiceDollar,
  faMoneyBillWave,
  faReceipt,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AppLayout from "../components/common/AppLayout";
import CurrencySelector from "../components/ui/CurrencySelector";
import {
  CardSkeleton,
  StatCardSkeleton,
  TableSkeleton,
} from "../components/ui/LoadingSkeleton";

const RevenuePage = () => {
  const { isLoading, isEmpty, data } = useDataState();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const revenueData = data.revenue;
  // const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const totalPaid = revenueData.paymentHistory.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#e0e0e0] mb-1 md:mb-2">
                Revenue Collection
              </h1>
              <p className="text-xs md:text-sm text-[#a0a0a0]">
                Manage your tax payments and government revenue obligations
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
              <div className="w-full md:w-auto">
                <CurrencySelector
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                />
              </div>
              <button className="w-full md:w-auto bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center justify-center md:justify-start space-x-2 transition-colors duration-200 text-sm md:text-base">
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Pay Now</span>
              </button>
            </div>
          </div>

          {/* Revenue Overview */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              <div className="bg-[#3a005f] border border-[#4a007a] p-4 md:p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-sm md:text-lg font-semibold text-[#e0e0e0]">
                    Total Paid (This Year)
                  </h3>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-400 text-lg md:text-xl"
                  />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-green-400">
                  {formatCurrencyWithSymbol(totalPaid, selectedCurrency)}
                </p>
              </div>

              <div className="bg-[#3a005f] border border-[#4a007a] p-4 md:p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-sm md:text-lg font-semibold text-[#e0e0e0]">
                    Outstanding Amount
                  </h3>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-400 text-lg md:text-xl"
                  />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-red-400">
                  {formatCurrencyWithSymbol(
                    revenueData.outstandingAmount,
                    selectedCurrency
                  )}
                </p>
              </div>

              <div className="bg-[#3a005f] border border-[#4a007a] p-4 md:p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-sm md:text-lg font-semibold text-[#e0e0e0]">
                    Payment Status
                  </h3>
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="text-[#d4af37] text-lg md:text-xl"
                  />
                </div>
                <p className="text-base md:text-lg font-bold text-red-400">
                  {revenueData.outstandingAmount > 0 ? "Overdue" : "Up to Date"}
                </p>
              </div>
            </div>
          )}

          {/* Outstanding Payment Section */}
          {!isLoading &&
            (isEmpty || revenueData.outstandingAmount === 0 ? (
              <div className="bg-green-500/10 border border-green-500/30 p-4 md:p-6 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <FontAwesomeIcon
                    icon={faSmile}
                    className="text-green-400 text-2xl md:text-3xl md:mt-1 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-2">
                      All Payments Up to Date!
                    </h3>
                    <p className="text-xs md:text-sm text-[#e0e0e0] mb-3 md:mb-4">
                      {isEmpty
                        ? "You currently have no outstanding tax obligations. All payments are current."
                        : "Great job! You have no outstanding payments at this time. All your tax obligations are up to date."}
                    </p>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <button className="w-full md:w-auto bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 md:px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base">
                        View Payment History
                      </button>
                      <button className="w-full md:w-auto bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-4 md:px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base">
                        Tax Planning
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              revenueData.outstandingAmount > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 md:p-6 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-red-400 text-2xl md:text-3xl md:mt-1 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-red-400 mb-2">
                        Outstanding Payment Required
                      </h3>
                      <p className="text-xs md:text-sm text-[#e0e0e0] mb-3 md:mb-4">
                        You have an outstanding{" "}
                        {revenueData.outstandingDescription} payment of{" "}
                        <span className="font-bold text-red-400">
                          {formatCurrencyWithSymbol(
                            revenueData.outstandingAmount,
                            selectedCurrency
                          )}
                        </span>
                        . Please settle this payment to avoid penalties.
                      </p>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                        <button className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base">
                          Pay Now
                        </button>
                        <button className="w-full md:w-auto bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-4 md:px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}

          {/* Payment Options */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-[#3a005f] border border-[#4a007a] p-4 md:p-6 rounded-xl shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold text-[#e0e0e0] mb-3 md:mb-4">
                  Quick Payment Options
                </h2>

                <div className="space-y-2 md:space-y-3">
                  <div className="bg-[#2a004a] p-3 md:p-4 rounded-lg border border-[#4a007a] hover:border-[#6a0dad] transition-colors duration-200 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm md:text-base text-[#e0e0e0]">
                          Property Tax
                        </h4>
                        <p className="text-xs md:text-sm text-[#a0a0a0]">
                          Annual property tax payment
                        </p>
                      </div>
                      <div className="text-right md:text-right flex-shrink-0">
                        <p
                          className={`font-bold text-sm md:text-base ${
                            isEmpty ? "text-[#a0a0a0]" : "text-red-400"
                          }`}
                        >
                          {isEmpty
                            ? "N/A"
                            : formatCurrencyWithSymbol(150.0, selectedCurrency)}
                        </p>
                        <p className="text-xs text-[#a0a0a0]">Due: Dec 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2a004a] p-3 md:p-4 rounded-lg border border-[#4a007a] hover:border-[#6a0dad] transition-colors duration-200 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm md:text-base text-[#e0e0e0]">
                          Income Tax
                        </h4>
                        <p className="text-xs md:text-sm text-[#a0a0a0]">
                          Personal income tax
                        </p>
                      </div>
                      <div className="text-right md:text-right flex-shrink-0">
                        <p
                          className={`font-bold text-sm md:text-base ${
                            isEmpty ? "text-[#a0a0a0]" : "text-green-400"
                          }`}
                        >
                          {isEmpty ? "N/A" : "Paid"}
                        </p>
                        <p className="text-xs text-[#a0a0a0]">Paid: Oct 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2a004a] p-3 md:p-4 rounded-lg border border-[#4a007a] hover:border-[#6a0dad] transition-colors duration-200 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm md:text-base text-[#e0e0e0]">
                          Business License
                        </h4>
                        <p className="text-xs md:text-sm text-[#a0a0a0]">
                          Annual business registration
                        </p>
                      </div>
                      <div className="text-right md:text-right flex-shrink-0">
                        <p
                          className={`font-bold text-sm md:text-base ${
                            isEmpty ? "text-[#a0a0a0]" : "text-green-400"
                          }`}
                        >
                          {isEmpty ? "N/A" : "Paid"}
                        </p>
                        <p className="text-xs text-[#a0a0a0]">Paid: Jan 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#3a005f] border border-[#4a007a] p-4 md:p-6 rounded-xl shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold text-[#e0e0e0] mb-3 md:mb-4">
                  Payment Methods
                </h2>

                <div className="space-y-2 md:space-y-3">
                  <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-2 md:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm md:text-base">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                    <span>Pay from Wallet</span>
                  </button>

                  <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 md:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm md:text-base">
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span>Credit/Debit Card</span>
                  </button>

                  <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 md:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm md:text-base">
                    <FontAwesomeIcon icon={faReceipt} />
                    <span>Bank Transfer</span>
                  </button>
                </div>

                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#4a007a]">
                  <h3 className="text-base md:text-lg font-semibold text-[#e0e0e0] mb-2 md:mb-3">
                    Need Help?
                  </h3>
                  <div className="space-y-1 md:space-y-2">
                    <button className="w-full bg-[#2a004a] hover:bg-[#4a007a] text-[#e0e0e0] py-1 md:py-2 rounded-lg transition-colors duration-200 text-xs md:text-sm">
                      Payment Calculator
                    </button>
                    <button className="w-full bg-[#2a004a] hover:bg-[#4a007a] text-[#e0e0e0] py-1 md:py-2 rounded-lg transition-colors duration-200 text-xs md:text-sm">
                      Tax Guidelines
                    </button>
                    <button className="w-full bg-[#2a004a] hover:bg-[#4a007a] text-[#e0e0e0] py-1 md:py-2 rounded-lg transition-colors duration-200 text-xs md:text-sm">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment History */}
          {isLoading ? (
            <CardSkeleton>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-1/3"></div>
                  <div className="h-8 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-lg w-20"></div>
                </div>
                <TableSkeleton rows={3} columns={5} />
              </div>
            </CardSkeleton>
          ) : (
            <div className="bg-[#3a005f] border border-[#4a007a] p-4 md:p-6 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-[#e0e0e0]">
                  Payment History
                </h2>
                <button className="w-full md:w-auto bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-3 md:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center md:justify-start space-x-2 text-xs md:text-sm">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Export</span>
                </button>
              </div>

              {isEmpty || revenueData.paymentHistory.length === 0 ? (
                <div className="text-center py-6 md:py-8">
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="text-3xl md:text-4xl text-[#6a0dad] mb-3 md:mb-4"
                  />
                  <h3 className="text-base md:text-lg font-semibold text-[#e0e0e0] mb-2">
                    No Payment History
                  </h3>
                  <p className="text-xs md:text-sm text-[#a0a0a0]">
                    {isEmpty
                      ? "You haven't made any revenue payments yet. Payment history will appear here once you start making payments."
                      : "No payment history found. Your future payments will be tracked here."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-3">
                    {revenueData.paymentHistory.map((payment, index) => (
                      <div
                        key={index}
                        className="bg-[#2a004a] border border-[#4a007a] p-3 rounded-lg hover:border-[#6a0dad] transition-colors duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="text-xs text-[#a0a0a0] mb-1">
                              {formatDate(payment.date)}
                            </p>
                            <p className="text-sm font-medium text-[#e0e0e0]">
                              {payment.description}
                            </p>
                          </div>
                          <button className="text-[#6a0dad] hover:text-[#8a2dd3] transition-colors duration-200 ml-2 flex-shrink-0">
                            <FontAwesomeIcon icon={faDownload} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-[#4a007a]">
                          <span className="text-xs text-[#a0a0a0]">Amount</span>
                          <span className="font-semibold text-[#d4af37]">
                            {formatCurrencyWithSymbol(
                              payment.amount,
                              selectedCurrency
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-[#a0a0a0]">Status</span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-[#e0e0e0]">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 px-4 text-xs font-semibold text-[#a0a0a0]">
                            Date
                          </th>
                          <th className="py-3 px-4 text-xs font-semibold text-[#a0a0a0]">
                            Description
                          </th>
                          <th className="py-3 px-4 text-xs font-semibold text-[#a0a0a0]">
                            Amount
                          </th>
                          <th className="py-3 px-4 text-xs font-semibold text-[#a0a0a0]">
                            Status
                          </th>
                          <th className="py-3 px-4 text-xs font-semibold text-[#a0a0a0]">
                            Receipt
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {revenueData.paymentHistory.map((payment, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-700 hover:bg-[#2a004a] transition-colors duration-200"
                          >
                            <td className="py-3 px-4 text-xs">
                              {formatDate(payment.date)}
                            </td>
                            <td className="py-3 px-4 text-xs">
                              {payment.description}
                            </td>
                            <td className="py-3 px-4 text-xs font-semibold text-[#d4af37]">
                              {formatCurrencyWithSymbol(
                                payment.amount,
                                selectedCurrency
                              )}
                            </td>
                            <td className="py-3 px-4 text-xs">
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                                {payment.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-xs">
                              <button className="text-[#6a0dad] hover:text-[#8a2dd3] transition-colors duration-200">
                                <FontAwesomeIcon icon={faDownload} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default RevenuePage;
