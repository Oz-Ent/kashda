"use client";

import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = React.memo(() => {
  const { toggleSidebar } = useSidebar();
  const { loggedInUser } = useAuth();

  // Memoize the user initials and display name to prevent unnecessary re-renders
  const userInfo = useMemo(() => {
    if (!loggedInUser) {
      return { initials: "U", displayName: "User", accountType: "Personal" };
    }

    const isIndividual = loggedInUser.accountType === "individual";

    if (isIndividual) {
      const firstName = loggedInUser.firstName;
      return {
        initials: firstName?.charAt(0)?.toUpperCase() || "U",
        displayName: firstName?.toLocaleUpperCase() || "User",
        accountType: "Personal",
      };
    } else {
      const companyName = loggedInUser.lastName; // For business, lastName contains company name
      return {
        initials: companyName?.charAt(0)?.toUpperCase() || "B",
        displayName: companyName?.toUpperCase() || "Business",
        accountType: "Business",
      };
    }
  }, [
    loggedInUser?.accountType,
    loggedInUser?.firstName,
    loggedInUser?.lastName,
  ]);

  return (
    <header className="bg-[#3a005f] border border-[#4a007a] p-4 flex items-center justify-between shadow-md">
      {/* Hamburger Menu - visible on mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-[#e0e0e0] text-xl p-2 hover:text-[#6a0dad] focus:outline-none transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Search bar - responsive width */}
      <div className="relative flex-1 max-w-md mx-4 lg:w-1/3 lg:mx-0">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#3a005f] text-[#e0e0e0] border border-gray-700 focus:outline-none focus:border-[#6a0dad]"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0a0a0]"
        />
      </div>

      {/* Right side - notifications and user profile */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        <button
          aria-label="Notifications"
          className="text-xl text-[#e0e0e0] focus:outline-none"
        >
          <FontAwesomeIcon icon={faBell} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#6a0dad] border-2 border-[#d4af37] flex items-center justify-center text-white font-bold text-sm lg:text-base">
            {userInfo.initials}
          </div>
          <div className="flex flex-col">
            <div className="text-[#e0e0e0] hidden sm:block">
              <p className="font-medium">{userInfo.displayName}</p>
            </div>
            <button
              aria-label={userInfo.accountType}
              className="text-[#a0a0a0] focus:outline-none hidden sm:block"
            >
              {userInfo.accountType}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
