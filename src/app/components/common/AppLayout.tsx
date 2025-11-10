"use client";

import React from "react";
import Header from "./Header";
import SidePanel from "./SidePanel";
import { SidebarProvider } from "@/contexts/SidebarContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = React.memo(({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex max-h-screen bg-[#2a004a] text-[#e0e0e0] font-inter">
        <SidePanel />
        <div className="flex flex-col flex-1 lg:ml-0">
          <Header />
          <main className="flex-grow p-4 sm:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
});

AppLayout.displayName = "AppLayout";

export default AppLayout;
