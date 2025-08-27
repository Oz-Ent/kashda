"use client";

import React from "react";
import { formatCurrency } from "@/lib/formatUtils";

interface ProgressBarProps {
  current: number;
  target: number;
  height?: string;
  showPercentage?: boolean;
  showAmounts?: boolean;
  currency?: string;
  className?: string;
  gradient?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  target,
  height = "h-3",
  showPercentage = true,
  showAmounts = false,
  currency = "GH₵",
  className = "",
  gradient = false,
}) => {
  const percentage = Math.min((current / target) * 100, 100);

  const progressBarClass = gradient
    ? "bg-gradient-to-r from-[#6a0dad] to-[#d4af37]"
    : "bg-[#6a0dad]";

  return (
    <div className={`space-y-2 ${className}`}>
      {showAmounts && (
        <div className="flex justify-between text-sm">
          <span className="text-[#a0a0a0]">Progress</span>
          <span className="text-[#e0e0e0]">
            {formatCurrency(current)} / {formatCurrency(target)}
          </span>
        </div>
      )}

      <div className={`w-full bg-[#2a004a] rounded-full ${height}`}>
        <div
          className={`${height} rounded-full transition-all duration-300 ${progressBarClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {showPercentage && (
        <div className="flex justify-between text-sm">
          <span className="text-[#a0a0a0]">
            {percentage.toFixed(1)}% complete
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
