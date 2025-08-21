"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSearch,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="bg-[#3a005f] border border-[#4a007a] p-4 flex items-center justify-between shadow-md">
      <div className="relative w-1/3">
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
      <div className="flex items-center space-x-6">
        <button
          aria-label="Notifications"
          className="text-xl text-[#e0e0e0] focus:outline-none"
        >
          <FontAwesomeIcon icon={faBell} />
        </button>
        <div className="flex items-center space-x-3">
          <img
            src="https://placehold.co/40x40/6a0dad/e0e0e0?text=K"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-[#d4af37]"
          />
          <div className="text-[#e0e0e0]">
            <p className="font-medium">Kwakye</p>
            <p className="text-sm text-[#a0a0a0]">User</p>
          </div>
          <button
            aria-label="User Dropdown"
            className="text-[#a0a0a0] focus:outline-none"
          >
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
