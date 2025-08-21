"use client";

import React from "react";
import { getWallets } from "@/lib/dataUtils";

interface IndividualFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const IndividualForm = ({ onSubmit }: IndividualFormProps) => {
  const wallets = getWallets();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="recipientIdentifier"
          className="block text-sm font-medium text-[#e0e0e0] mb-1"
        >
          Recipient Phone Number or Email
        </label>
        <input
          type="text"
          id="recipientIdentifier"
          name="recipientIdentifier"
          placeholder="e.g., +233241234567 or email@example.com"
          className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
          required
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-[#e0e0e0] mb-1"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="e.g., 100.00"
          step="0.01"
          min="0.01"
          className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
          required
        />
      </div>

      <div>
        <label
          htmlFor="selectWallet"
          className="block text-sm font-medium text-[#e0e0e0] mb-1"
        >
          From Wallet
        </label>
        <select
          id="selectWallet"
          name="selectWallet"
          className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
          required
        >
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.type} ({wallet.currency} {wallet.balance.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="note"
          className="block text-sm font-medium text-[#e0e0e0] mb-1"
        >
          Note (Optional)
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="e.g., For groceries or bill payment"
          className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] placeholder-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad] resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 rounded-lg text-lg font-semibold shadow-md focus:outline-none bg-[#d4af37] text-[#2a004a] hover:bg-[#e6c24d] transition-colors duration-200"
      >
        Send Money
      </button>
    </form>
  );
};
