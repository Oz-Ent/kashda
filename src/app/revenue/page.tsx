"use client";

import { getRevenueData } from "@/lib/dataUtils";
import {
  faCheckCircle,
  faCreditCard,
  faDownload,
  faExclamationTriangle,
  faFileInvoiceDollar,
  faMoneyBillWave,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
import AppLayout from "../components/common/AppLayout";

const RevenuePage = () => {
  const revenueData = getRevenueData();
  // const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const totalPaid = revenueData.paymentHistory.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
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
          <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Pay Now</span>
          </button>
        </div>

        {/* Revenue Overview */}
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
              {formatCurrency(totalPaid)}
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
              {formatCurrency(revenueData.outstandingAmount)}
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

        {/* Outstanding Payment Section */}
        {revenueData.outstandingAmount > 0 && (
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
                  You have an outstanding {revenueData.outstandingDescription}{" "}
                  payment of{" "}
                  <span className="font-bold text-red-400">
                    {formatCurrency(revenueData.outstandingAmount)}
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
        )}

        {/* Payment Options */}
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
                    <p className="font-bold text-red-400">
                      {formatCurrency(150.0)}
                    </p>
                    <p className="text-xs text-[#a0a0a0]">Due: Dec 2024</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2a004a] p-4 rounded-lg border border-[#4a007a] hover:border-[#6a0dad] transition-colors duration-200 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#e0e0e0]">Income Tax</h4>
                    <p className="text-sm text-[#a0a0a0]">
                      Personal income tax
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">Paid</p>
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
                    <p className="font-bold text-green-400">Paid</p>
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

        {/* Payment History */}
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
                    <td className="py-3 px-4 text-sm">{payment.description}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-[#d4af37]">
                      {formatCurrency(payment.amount)}
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
        </div>
      </div>
    </AppLayout>
  );
};

export default RevenuePage;
