"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAuth, formatSessionTime } from "@/contexts/AuthContext";

interface SessionManagerProps {
  showDetails?: boolean;
  className?: string;
}

const SessionManager: React.FC<SessionManagerProps> = ({
  showDetails = true,
  className = "",
}) => {
  const { user, userProfile, sessionTime, signOut } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div
      className={`bg-[#3a005f] border border-[#4a007a] rounded-lg p-4 ${className}`}
    >
      {showDetails && (
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-[#6a0dad] rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#e0e0e0]">
              {userProfile?.kycData?.accountType === "individual"
                ? userProfile?.kycData?.personalInfo?.firstName
                : userProfile?.kycData?.businessInfo?.companyName || user.email}
            </p>
            <p className="text-xs text-[#a0a0a0]">
              {userProfile?.provider === "email"
                ? "Email Account"
                : userProfile?.provider === "google"
                ? "Google Account"
                : userProfile?.provider === "apple"
                ? "Apple Account"
                : "Account"}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <FontAwesomeIcon icon={faClock} className="text-[#6a0dad]" />
          <span className="text-[#a0a0a0]">Session:</span>
          <span className="text-[#e0e0e0] font-medium">
            {formatSessionTime(sessionTime)}
          </span>
        </div>

        <button
          onClick={handleSignOut}
          className="text-red-400 hover:text-red-500 transition-colors duration-200 text-sm"
          title="Sign Out"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>

      {/* Session status indicator */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-[#a0a0a0]">Active Session</span>
        </div>

        {userProfile?.emailVerified ? (
          <span className="text-green-400">✓ Verified</span>
        ) : (
          <span className="text-orange-400">! Verify Email</span>
        )}
      </div>
    </div>
  );
};

export default SessionManager;
