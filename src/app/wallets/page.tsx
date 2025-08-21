"use client";

import React from "react";
import { getWallets } from "@/lib/dataUtils";
import AppLayout from "../components/common/AppLayout";
import BalanceCarousel from "../components/ui/BalanceCarousel";

const WalletsPage = () => {
  const wallets = getWallets();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">My Wallets</h1>
          <p className="text-[#a0a0a0]">
            Manage all your wallets and accounts in one place
          </p>
        </div>
        {/* Balance Cards */}
        <BalanceCarousel wallets={wallets} title="All Wallets" />

        {/* Wallet Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 self-center">
          {wallets.map((wallet) => (
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
                    {wallet.currency}{" "}
                    {wallet.balance.toLocaleString("en-GH", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Currency:</span>
                  <span className="text-[#e0e0e0]">{wallet.currency}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Status:</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#4a007a]">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 px-3 rounded-lg text-sm transition-colors duration-200">
                    Send
                  </button>
                  <button className="flex-1 bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 px-3 rounded-lg text-sm transition-colors duration-200">
                    Receive
                  </button>
                  <button className="flex-1 bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 px-3 rounded-lg text-sm transition-colors duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
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
  );
};

export default WalletsPage;
