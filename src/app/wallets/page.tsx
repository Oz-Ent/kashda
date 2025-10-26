"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDataState } from "@/hooks/useDataState";
import { formatCurrencyWithSymbol } from "@/lib/currencyUtils";
import AppLayout from "../components/common/AppLayout";
import BalanceCarousel from "../components/ui/BalanceCarousel";
import CurrencySelector from "../components/ui/CurrencySelector";
import { CardSkeleton } from "../components/ui/LoadingSkeleton";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const WalletsPage = () => {
  const { isLoading, isEmpty, data } = useDataState({
    loadingTimeout: 2000,
    emptyTimer: 4000,
  });
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const wallets = data.wallets;

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">
                My Wallets
              </h1>
              <p className="text-[#a0a0a0]">
                Manage all your wallets and accounts in one place
              </p>
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>
          {/* Balance Cards */}
          {isLoading ? (
            <CardSkeleton className="h-32" />
          ) : (
            <BalanceCarousel
              wallets={wallets}
              title="All Wallets"
              displayCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          )}

          {/* Wallet Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 self-center">
            {isLoading ? (
              // Loading state for wallets
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : isEmpty || wallets.length === 0 ? (
              // Empty state for wallets
              <div className="col-span-full">
                <div className="bg-[#3a005f] border border-[#4a007a] p-8 rounded-xl text-center">
                  <FontAwesomeIcon
                    icon={faWallet}
                    className="text-6xl text-[#6a0dad] mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                    No Wallets Found
                  </h3>
                  <p className="text-[#a0a0a0] mb-4">
                    You currently have no active wallets. Create your first
                    wallet to start managing your finances.
                  </p>
                  <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add Wallet</span>
                  </button>
                </div>
              </div>
            ) : (
              // Regular wallets list
              wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#e0e0e0]">
                        {wallet.type}
                      </h3>
                      <p className="text-sm text-[#a0a0a0]">
                        Account ID: {wallet.id.toUpperCase()}
                      </p>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: wallet.color }}
                    ></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#a0a0a0]">Balance:</span>
                      <span className="text-[#e0e0e0] font-semibold">
                        {formatCurrencyWithSymbol(wallet.balance, selectedCurrency)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#a0a0a0]">Currency:</span>
                      <span className="text-[#e0e0e0]">{selectedCurrency}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#a0a0a0]">Status:</span>
                      <span
                        className={
                          isEmpty ? "text-[#a0a0a0]" : "text-green-400"
                        }
                      >
                        {isEmpty ? "Inactive" : "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#4a007a]">
                    <div className="flex space-x-2">
                      {wallet.id === "main" && !isEmpty && (
                        <>
                          <button className="flex-1 bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 px-3 rounded-lg text-sm transition-colors duration-200">
                            Send
                          </button>
                          <button className="flex-1 bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 px-3 rounded-lg text-sm transition-colors duration-200">
                            Receive
                          </button>
                        </>
                      )}
                      <button className="flex-1 bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 px-3 rounded-lg text-sm transition-colors duration-200">
                        {isEmpty ? "Activate" : "Move"}
                      </button>
                      <button className="flex-1 bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 px-3 rounded-lg text-sm transition-colors duration-200">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Wallet Section */}
          {/* <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-[#e0e0e0] mb-4">
            Add New Wallet
          </h3>
          <p className="text-[#a0a0a0] mb-4">
            Create additional wallets for better organization of your finances.
          </p>
          <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-2 px-6 rounded-lg transition-colors duration-200">
            + Add Wallet
          </button>
        </div> */}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default WalletsPage;
