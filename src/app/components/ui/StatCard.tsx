"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconDefinition;
  iconColor?: string;
  valueColor?: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor = "text-[#d4af37]",
  valueColor = "text-[#d4af37]",
  subtitle,
}) => {
  return (
    <div className="bg-[#3a005f] border border-[#4a007a] p-4 md:p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <h3 className="text-sm md:text-lg font-semibold text-[#e0e0e0]">
          {title}
        </h3>
        <FontAwesomeIcon
          icon={icon}
          className={`${iconColor} text-lg md:text-xl`}
        />
      </div>
      <p className={`text-2xl md:text-3xl font-bold ${valueColor}`}>
        {typeof value === "number" && value.toLocaleString
          ? value.toLocaleString()
          : value}
      </p>
      {subtitle && (
        <p className="text-xs md:text-sm text-[#a0a0a0] mt-1 md:mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

interface StatCardGridProps {
  cards: StatCardProps[];
}

export const StatCardGrid: React.FC<StatCardGridProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};

export default StatCard;
