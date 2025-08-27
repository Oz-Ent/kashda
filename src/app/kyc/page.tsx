"use client";

import { Suspense } from "react";
import KYCForm from "../components/forms/KYCForm";
import KYCProtectedRoute from "../components/auth/KYCProtectedRoute";

const KYCPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#2a004a] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#e0e0e0] text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <KYCProtectedRoute>
        <KYCForm />
      </KYCProtectedRoute>
    </Suspense>
  );
};

export default KYCPage;
