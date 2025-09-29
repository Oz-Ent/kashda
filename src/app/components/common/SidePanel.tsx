"use client";

import {
  faChartLine,
  faCog,
  faExchangeAlt,
  faFileInvoiceDollar,
  faPiggyBank,
  faShieldAlt,
  faSignOutAlt,
  faTachometerAlt,
  faUmbrella,
  faWallet,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const SidePanel = React.memo(() => {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const getLinkClass = (path: string) => {
    const baseClass =
      "flex items-center p-3 rounded-lg transition-colors duration-200";
    if (isActive(path)) {
      return `${baseClass} bg-[#6a0dad] text-[#d4af37] font-semibold`;
    }
    return `${baseClass} text-[#e0e0e0] hover:text-[#6a0dad] hover:bg-[#3a005f]`;
  };

  const handleLinkClick = () => {
    closeSidebar();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#2a004ab6] bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        bg-[#1a003a] w-64 p-6 flex flex-col shadow-lg min-h-screen
        fixed lg:relative inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="mb-10">
          {/* Mobile close button and logo */}
          <div className="flex items-center justify-between lg:justify-center">
            <h1 className="text-3xl font-bold">
              <span className="text-[#d4af37]">KA</span>
              <span className="text-[#6a0dad]">$</span>
              <span className="text-[#d4af37]">HDA</span>
            </h1>
            <button
              onClick={closeSidebar}
              className="lg:hidden text-[#e0e0e0] text-xl p-2 hover:text-[#6a0dad] focus:outline-none transition-colors duration-200"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={getLinkClass("/dashboard")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  className="mr-3 text-lg"
                />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/wallets"
                className={getLinkClass("/wallets")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faWallet} className="mr-3 text-lg" />
                <span>Wallets</span>
              </Link>
            </li>
            <li>
              <Link
                href="/transactions"
                className={getLinkClass("/transactions")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={faExchangeAlt}
                  className="mr-3 text-lg"
                />
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/savings"
                className={getLinkClass("/savings")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faPiggyBank} className="mr-3 text-lg" />
                <span>Savings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/investment"
                className={getLinkClass("/investment")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faChartLine} className="mr-3 text-lg" />
                <span>Investments</span>
              </Link>
            </li>
            <li>
              <Link
                href="/insurance"
                className={getLinkClass("/insurance")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="mr-3 text-lg" />
                <span>Insurance</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pension"
                className={getLinkClass("/pension")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faUmbrella} className="mr-3 text-lg" />
                <span>Pension</span>
              </Link>
            </li>
            <li>
              <Link
                href="/revenue"
                className={getLinkClass("/revenue")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className="mr-3 text-lg"
                />
                <span>Revenue</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className={getLinkClass("/settings")}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faCog} className="mr-3 text-lg" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto space-y-2">
          <Link
            href=""
            className="flex items-center p-3 rounded-lg text-red-400 hover:text-red-500 hover:bg-[#3a005f] transition-colors duration-200"
            onClick={async (e) => {
              e.preventDefault();
              handleLinkClick();
              await signOut();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-lg" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
});

SidePanel.displayName = "SidePanel";

export default SidePanel;
