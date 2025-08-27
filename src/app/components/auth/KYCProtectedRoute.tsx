"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface KYCProtectedRouteProps {
  children: React.ReactNode;
}

const KYCProtectedRoute: React.FC<KYCProtectedRouteProps> = ({ children }) => {
  const { user, loading, userProfile } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      // Wait for loading to complete
      if (loading) {
        return;
      }

      // Check if user is authenticated
      if (!user) {
        console.log("KYCProtectedRoute: No user, redirecting to login");
        router.push("/login");
        return;
      }

      // If userProfile is still loading, wait
      if (!userProfile) {
        console.log(
          "KYCProtectedRoute: UserProfile not loaded yet, waiting..."
        );
        return;
      }

      // Check KYC status
      if (userProfile.kycCompleted) {
        console.log(
          "KYCProtectedRoute: KYC completed, redirecting to dashboard"
        );
        router.push("/dashboard");
        return;
      }

      // User is eligible for KYC
      console.log("KYCProtectedRoute: User eligible for KYC, allowing access");
      setIsChecking(false);
    };

    checkAccess();
  }, [user, loading, userProfile, router]);

  // Handle loading state
  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-[#2a004a] flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-[#d4af37] text-4xl animate-spin mb-4"
          />
          <p className="text-[#e0e0e0] text-lg">
            {loading ? "Loading..." : "Checking KYC status..."}
          </p>
        </div>
      </div>
    );
  }

  // Render KYC form if user is authenticated and KYC not completed
  if (user && userProfile && !userProfile.kycCompleted) {
    console.log("KYCProtectedRoute: Rendering KYC form");
    return <>{children}</>;
  }

  // Fallback - should not reach here
  return null;
};

export default KYCProtectedRoute;
