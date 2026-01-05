"use client";

import React from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  const getTabClass = (tabId: string) => {
    const baseClass =
      "flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors duration-200 overflow-hidden text-ellipsis";
    if (activeTab === tabId) {
      return `${baseClass} bg-[#6a0dad] text-white`;
    }
    return `${baseClass} text-[#a0a0a0] hover:text-[#e0e0e0]`;
  };

  return (
    <div
      className={`flex flex-wrap md:flex-nowrap gap-1 md:gap-0 md:space-x-1 bg-[#2a004a] rounded-lg p-1 ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={getTabClass(tab.id)}
          title={tab.label}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
