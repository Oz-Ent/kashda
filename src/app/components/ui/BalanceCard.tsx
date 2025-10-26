"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrencyWithSymbol, getCurrencySymbol } from "@/lib/currencyUtils";

interface BalanceCardProps {
  type: string;
  balance: number;
  currency: string;
  color?: string;
  className?: string;
  displayCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  type,
  balance,
  currency,
  color = "#d4af37",
  className = "",
  displayCurrency = currency,
  onCurrencyChange,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const formatBalance = (amount: number) => {
    // Always use formatCurrencyWithSymbol to ensure proper currency formatting
    return formatCurrencyWithSymbol(amount, displayCurrency);
  };

  return (
    <div
      className={`bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg flex-shrink-0 min-w-[250px] flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.666rem)] ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#e0e0e0]">{type}</h3>
        <button
          onClick={toggleVisibility}
          className="text-[#e0e0e0] focus:outline-none hover:text-[#d4af37] transition-colors duration-200"
        >
          <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
        </button>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-4xl font-bold" style={{ color: color }}>
          {isVisible ? formatBalance(balance) : "••••••"}
        </p>
        {onCurrencyChange ? (
          <select
            value={displayCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="text-sm bg-transparent text-[#a0a0a0] border-none focus:outline-none hover:text-[#e0e0e0] transition-colors duration-200 cursor-pointer"
          >
            <option value="USD">USD</option>
            <option value="GH₵">GH₵</option>
            <option value="DZD">DZD</option>
          </select>
        ) : (
          <span className="text-sm text-[#a0a0a0]">{displayCurrency}</span>
        )}
      </div>
    </div>
  );
};

export default BalanceCard;
