"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCopy,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useStaticRedirect } from "@/lib/staticRedirect";
import AppLayout from "@/app/components/common/AppLayout";
import { getWallets, getUserData } from "@/lib/dataUtils";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";

export default function ReceiveMoney() {
  const [selectedWallet, setSelectedWallet] = useState("main");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { redirect } = useStaticRedirect();

  const wallets = getWallets();
  const userData = getUserData();

  const handleBackToTransactions = () => {
    redirect("/transactions");
  };

  const generateReceiveLink = () => {
    if (!amount) {
      alert("Please enter an amount to generate a receive link.");
      return;
    }

    const wallet = wallets.find((w) => w.id === selectedWallet);
    const link = `https://kashda.app/pay?to=${
      userData.email
    }&amount=${amount}&wallet=${selectedWallet}&note=${encodeURIComponent(
      note
    )}`;

    navigator.clipboard.writeText(link);
    setCopiedField("link");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const selectedWalletData = wallets.find((w) => w.id === selectedWallet);

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="max-w-3xl mx-auto bg-[#3a005f] border border-[#4a007a] p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToTransactions}
                className="text-[#d4af37] hover:text-[#e6c24d] transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
              </button>
              <h1 className="text-2xl font-bold text-[#e0e0e0]">
                Receive Money
              </h1>
            </div>
          </div>

          <div className="space-y-6">
            {/* Receive Options */}
            <div className="bg-[#2a004a] border border-[#4a007a] p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Your Receive Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userData.email}
                      readOnly
                      className="flex-1 p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none"
                    />
                    <button
                      onClick={() => copyToClipboard(userData.email, "email")}
                      className="px-3 py-3 rounded-lg bg-[#6a0dad] text-white hover:bg-[#8a2dd3] transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={copiedField === "email" ? faCheck : faCopy}
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userData.phone}
                      readOnly
                      className="flex-1 p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none"
                    />
                    <button
                      onClick={() => copyToClipboard(userData.phone, "phone")}
                      className="px-3 py-3 rounded-lg bg-[#6a0dad] text-white hover:bg-[#8a2dd3] transition-colors duration-200"
                    >
                      <FontAwesomeIcon
                        icon={copiedField === "phone" ? faCheck : faCopy}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Payment Link */}
            <div className="bg-[#2a004a] border border-[#4a007a] p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Generate Payment Link
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="receiveWallet"
                    className="block text-sm font-medium text-[#e0e0e0] mb-1"
                  >
                    Receive To Wallet
                  </label>
                  <select
                    id="receiveWallet"
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  >
                    {wallets.map((wallet) => (
                      <option key={wallet.id} value={wallet.id}>
                        {wallet.type} ({wallet.currency}{" "}
                        {wallet.balance.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="requestAmount"
                    className="block text-sm font-medium text-[#e0e0e0] mb-1"
                  >
                    Amount to Request (Optional)
                  </label>
                  <input
                    type="number"
                    id="requestAmount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 100.00"
                    step="0.01"
                    min="0.01"
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="requestNote"
                    className="block text-sm font-medium text-[#e0e0e0] mb-1"
                  >
                    Note (Optional)
                  </label>
                  <textarea
                    id="requestNote"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="e.g., Payment for services"
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] resize-none"
                  />
                </div>

                <button
                  onClick={generateReceiveLink}
                  className="w-full p-3 rounded-lg text-lg font-semibold shadow-md focus:outline-none bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
                >
                  <FontAwesomeIcon
                    icon={copiedField === "link" ? faCheck : faCopy}
                    className="mr-2"
                  />
                  {copiedField === "link"
                    ? "Link Copied!"
                    : "Generate & Copy Payment Link"}
                </button>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-[#2a004a] border border-[#4a007a] p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                QR Code
              </h2>
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-sm">
                    QR Code would appear here
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#a0a0a0]">
                Show this QR code to others for quick payments to your{" "}
                {selectedWalletData?.type}
              </p>
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
