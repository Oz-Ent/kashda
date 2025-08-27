"use client";

import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const getTabClass = (tabName: string) => {
    const baseClass =
      "flex-1 py-2 px-4 text-center font-semibold rounded-t-lg transition-colors duration-300";
    if (activeTab === tabName) {
      return `${baseClass} bg-[#6a0dad] text-white`;
    }
    return `${baseClass} text-[#e0e0e0] hover:bg-[#4a007a]`;
  };

  return (
    <div className="flex border-b border-[#3a005f] mb-6">
      <button
        onClick={() => setActiveTab("individual")}
        className={getTabClass("individual")}
      >
        Individual
      </button>
      <button
        onClick={() => setActiveTab("group")}
        className={getTabClass("group")}
      >
        Group
      </button>
    </div>
  );
};

