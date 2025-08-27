"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const { user, loading, sessionTime } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check if session has expired (24 hours = 86400000 ms)
  const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;
  const isSessionExpired = sessionTime > SESSION_TIMEOUT;

  useEffect(() => {
    if (loading) return; // Wait for auth state to load

    if (requireAuth) {
      if (!user) {
        // User not logged in - redirect to login
        setIsRedirecting(true);
        router.push("/login");
        return;
      }

      if (isSessionExpired) {
        // Session expired - redirect to login with message
        setIsRedirecting(true);
        router.push("/login?expired=true");
        return;
      }
    }
  }, [user, loading, requireAuth, router, isSessionExpired]);

  // Show loading spinner while checking auth or redirecting
  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen bg-[#2a004a] flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-[#d4af37] text-4xl animate-spin mb-4"
          />
          <p className="text-[#e0e0e0] text-lg">
            {loading ? "Loading..." : "Redirecting..."}
          </p>
        </div>
      </div>
    );
  }

  // If auth is not required or user is authenticated, render children
  if (!requireAuth || (user && !isSessionExpired)) {
    return <>{children}</>;
  }

  // This should not be reached, but just in case
  return null;
};

export default ProtectedRoute;
