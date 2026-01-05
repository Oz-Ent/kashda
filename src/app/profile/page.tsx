"use client";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import AppLayout from "../components/common/AppLayout";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#e0e0e0]">
            User Profile
          </h2>

          <section className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#e0e0e0]">
              Personal Information
            </h3>
            <div className="bg-[#3a005f] border border-[#4a007a] shadow-lg rounded-xl p-4 md:p-6">
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg font-medium text-[#d4af37]">
                  Name:
                </p>
                <p className="text-sm md:text-base text-[#e0e0e0]">John Doe</p>
              </div>
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg font-medium text-[#d4af37]">
                  Email:
                </p>
                <p className="text-sm md:text-base text-[#e0e0e0]">
                  john.doe@example.com
                </p>
              </div>
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg font-medium text-[#d4af37]">
                  Phone:
                </p>
                <p className="text-sm md:text-base text-[#e0e0e0]">
                  +1 234 567 8900
                </p>
              </div>
              <button className="w-full md:w-auto bg-[#6a0dad] hover:bg-[#8a2dd3] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
                Edit Profile
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#e0e0e0]">
              Account Details
            </h3>
            <div className="bg-[#3a005f] border border-[#4a007a] shadow-lg rounded-xl p-4 md:p-6">
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg font-medium text-[#d4af37]">
                  Account Number:
                </p>
                <p className="text-sm md:text-base text-[#e0e0e0]">
                  **** **** **** 1234
                </p>
              </div>
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg font-medium text-[#d4af37]">
                  Joined:
                </p>
                <p className="text-sm md:text-base text-[#e0e0e0]">
                  January 1, 2023
                </p>
              </div>
            </div>
          </section>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default ProfilePage;
