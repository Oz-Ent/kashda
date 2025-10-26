"use client";

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
import { useDataState } from "@/hooks/useDataState";
import { formatCurrency, formatDate } from "@/lib/formatUtils";
import { formatCurrencyWithSymbol } from "@/lib/currencyUtils";
import AppLayout from "../components/common/AppLayout";
import CurrencySelector from "../components/ui/CurrencySelector";
import {
  StatCardSkeleton,
  CardSkeleton,
  TableSkeleton,
} from "../components/ui/LoadingSkeleton";
import ProtectedRoute from "../components/auth/ProtectedRoute";

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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">
                Revenue Collection
              </h1>
              <p className="text-[#a0a0a0]">
                Manage your tax payments and government revenue obligations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#e0e0e0]">
                    Total Paid (This Year)
                  </h3>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-400 text-xl"
                  />
                </div>
                <p className="text-3xl font-bold text-green-400">
                  {formatCurrencyWithSymbol(totalPaid, selectedCurrency)}
                </p>
              </div>

              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#e0e0e0]">
                    Outstanding Amount
                  </h3>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-400 text-xl"
                  />
                </div>
                <p className="text-3xl font-bold text-red-400">
                  {formatCurrencyWithSymbol(revenueData.outstandingAmount, selectedCurrency)}
                </p>
              </div>

              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#e0e0e0]">
                    Payment Status
                  </h3>
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="text-[#d4af37] text-xl"
                  />
                </div>
                <p className="text-lg font-bold text-red-400">
                  {revenueData.outstandingAmount > 0 ? "Overdue" : "Up to Date"}
                </p>
              </div>
            </div>
          )}

          {/* Outstanding Payment Section */}
          {!isLoading &&
            (isEmpty || revenueData.outstandingAmount === 0 ? (
              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                  <FontAwesomeIcon
                    icon={faSmile}
                    className="text-green-400 text-2xl mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">
                      All Payments Up to Date!
                    </h3>
                    <p className="text-[#e0e0e0] mb-4">
                      {isEmpty
                        ? "You currently have no outstanding tax obligations. All payments are current."
                        : "Great job! You have no outstanding payments at this time. All your tax obligations are up to date."}
                    </p>
                    <div className="flex space-x-4">
                      <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-6 py-3 rounded-lg transition-colors duration-200">
                        View Payment History
                      </button>
                      <button className="bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-6 py-3 rounded-lg transition-colors duration-200">
                        Tax Planning
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              revenueData.outstandingAmount > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="text-red-400 text-2xl mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-red-400 mb-2">
                        Outstanding Payment Required
                      </h3>
                      <p className="text-[#e0e0e0] mb-4">
                        You have an outstanding{" "}
                        {revenueData.outstandingDescription} payment of{" "}
                        <span className="font-bold text-red-400">
                          {formatCurrencyWithSymbol(revenueData.outstandingAmount, selectedCurrency)}
                        </span>
                        . Please settle this payment to avoid penalties.
                      </p>
                      <div className="flex space-x-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                          Pay Now
                        </button>
                        <button className="bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-6 py-3 rounded-lg transition-colors duration-200">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                  Quick Payment Options
                </h2>

                <div className="space-y-4">
                  <div className="bg-[#2a004a] p-4 rounded-lg border border-[#4a007a] hover:border-[#6a0dad] transition-colors duration-200 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-[#e0e0e0]">
                          Property Tax
                        </h4>
                        <p className="text-sm text-[#a0a0a0]">
                          Annual property tax payment
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${isEmpty ? "text-[#a0a0a0]" : "text-red-400"
                            }`}
                        >
                          {isEmpty ? "N/A" : formatCurrencyWithSymbol(150.0, selectedCurrency)}
                        </p>
                        <p className="text-xs text-[#a0a0a0]">Due: Dec 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2a004a] p-4 rounded-lg border border-[#4a007a] hover:border-[#6a0dad] transition-colors duration-200 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-[#e0e0e0]">
                          Income Tax
                        </h4>
                        <p className="text-sm text-[#a0a0a0]">
                          Personal income tax
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${isEmpty ? "text-[#a0a0a0]" : "text-green-400"
                            }`}
                        >
                          {isEmpty ? "N/A" : "Paid"}
                        </p>
                        <p className="text-xs text-[#a0a0a0]">Paid: Oct 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2a004a] p-4 rounded-lg border border-[#4a007a] hover:border-[#6a0dad] transition-colors duration-200 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-[#e0e0e0]">
                          Business License
                        </h4>
                        <p className="text-sm text-[#a0a0a0]">
                          Annual business registration
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${isEmpty ? "text-[#a0a0a0]" : "text-green-400"
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

              <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                  Payment Methods
                </h2>

                <div className="space-y-3">
                  <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                    <span>Pay from Wallet</span>
                  </button>

                  <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span>Credit/Debit Card</span>
                  </button>

                  <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                    <FontAwesomeIcon icon={faReceipt} />
                    <span>Bank Transfer</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-[#4a007a]">
                  <h3 className="text-lg font-semibold text-[#e0e0e0] mb-3">
                    Need Help?
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full bg-[#2a004a] hover:bg-[#4a007a] text-[#e0e0e0] py-2 rounded-lg transition-colors duration-200 text-sm">
                      Payment Calculator
                    </button>
                    <button className="w-full bg-[#2a004a] hover:bg-[#4a007a] text-[#e0e0e0] py-2 rounded-lg transition-colors duration-200 text-sm">
                      Tax Guidelines
                    </button>
                    <button className="w-full bg-[#2a004a] hover:bg-[#4a007a] text-[#e0e0e0] py-2 rounded-lg transition-colors duration-200 text-sm">
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
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#e0e0e0]">
                  Payment History
                </h2>
                <button className="bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Export</span>
                </button>
              </div>

              {isEmpty || revenueData.paymentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="text-4xl text-[#6a0dad] mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#e0e0e0] mb-2">
                    No Payment History
                  </h3>
                  <p className="text-[#a0a0a0]">
                    {isEmpty
                      ? "You haven't made any revenue payments yet. Payment history will appear here once you start making payments."
                      : "No payment history found. Your future payments will be tracked here."}
                  </p>
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
                          Amount
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
                          Status
                        </th>
                        <th className="py-2 px-4 text-sm font-semibold text-[#a0a0a0]">
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
                          <td className="py-3 px-4 text-sm">
                            {formatDate(payment.date)}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {payment.description}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-[#d4af37]">
                            {formatCurrencyWithSymbol(payment.amount, selectedCurrency)}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <button className="text-[#6a0dad] hover:text-[#8a2dd3] transition-colors duration-200">
                              <FontAwesomeIcon icon={faDownload} />
                            </button>
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

export default RevenuePage;
