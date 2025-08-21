"use client";

import React from "react";
import Header from "./Header";
import SidePanel from "./SidePanel";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#2a004a] text-[#e0e0e0] font-inter">
      <SidePanel />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
