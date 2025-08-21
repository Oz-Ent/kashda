"use client";

import AppLayout from "../components/common/AppLayout";

const ProfilePage = () => {
  return (
    <AppLayout>
      <div>
        <h2 className="text-3xl font-bold mb-6">User Profile</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <p className="text-lg font-medium">Name:</p>
              <p className="text-gray-700">John Doe</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">Email:</p>
              <p className="text-gray-700">john.doe@example.com</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">Phone:</p>
              <p className="text-gray-700">+1 234 567 8900</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Account Details</h3>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <p className="text-lg font-medium">Account Number:</p>
              <p className="text-gray-700">**** **** **** 1234</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">Joined:</p>
              <p className="text-gray-700">January 1, 2023</p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
