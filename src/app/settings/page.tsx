"use client";

import { getSettingsData, getUserData } from "@/lib/dataUtils";
import {
  faBell,
  faCog,
  faFingerprint,
  faKey,
  faPalette,
  faShieldAlt,
  faToggleOff,
  faToggleOn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AppLayout from "../components/common/AppLayout";

const SettingsPage = () => {
  const settingsData = getSettingsData();
  const userData = getUserData();
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "security" | "preferences"
  >("profile");
  const [settings, setSettings] = useState(settingsData);

  const toggleSetting = (category: keyof typeof settings, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !(prev[category] as Record<string, boolean>)[setting],
      },
    }));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">Settings</h1>
            <p className="text-[#a0a0a0]">
              Manage your account preferences and security settings
            </p>
          </div>
          <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <FontAwesomeIcon icon={faCog} />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-[#2a004a] rounded-lg p-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "profile"
                ? "bg-[#6a0dad] text-white"
                : "text-[#a0a0a0] hover:text-[#e0e0e0]"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "notifications"
                ? "bg-[#6a0dad] text-white"
                : "text-[#a0a0a0] hover:text-[#e0e0e0]"
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "security"
                ? "bg-[#6a0dad] text-white"
                : "text-[#a0a0a0] hover:text-[#e0e0e0]"
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === "preferences"
                ? "bg-[#6a0dad] text-white"
                : "text-[#a0a0a0] hover:text-[#e0e0e0]"
            }`}
          >
            Preferences
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[#d4af37] mr-3 text-xl"
                />
                <h2 className="text-xl font-semibold text-[#e0e0e0]">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={userData.phone}
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Profile Picture
              </h2>

              <div className="text-center">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#d4af37]"
                />
                <button className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  Change Picture
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-2 rounded-lg transition-colors duration-200">
                  Update Profile
                </button>
                <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition-colors duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon
                icon={faBell}
                className="text-[#d4af37] mr-3 text-xl"
              />
              <h2 className="text-xl font-semibold text-[#e0e0e0]">
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-[#4a007a]">
                <div>
                  <h3 className="text-[#e0e0e0] font-medium">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">
                    Receive notifications via email
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("notifications", "email")}
                  className="text-2xl focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={
                      settings.notifications.email ? faToggleOn : faToggleOff
                    }
                    className={
                      settings.notifications.email
                        ? "text-green-400"
                        : "text-[#a0a0a0]"
                    }
                  />
                </button>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-[#4a007a]">
                <div>
                  <h3 className="text-[#e0e0e0] font-medium">
                    SMS Notifications
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">
                    Receive notifications via SMS
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("notifications", "sms")}
                  className="text-2xl focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={settings.notifications.sms ? faToggleOn : faToggleOff}
                    className={
                      settings.notifications.sms
                        ? "text-green-400"
                        : "text-[#a0a0a0]"
                    }
                  />
                </button>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-[#4a007a]">
                <div>
                  <h3 className="text-[#e0e0e0] font-medium">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">
                    Receive push notifications on your devices
                  </p>
                </div>
                <button
                  onClick={() => toggleSetting("notifications", "push")}
                  className="text-2xl focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={
                      settings.notifications.push ? faToggleOn : faToggleOff
                    }
                    className={
                      settings.notifications.push
                        ? "text-green-400"
                        : "text-[#a0a0a0]"
                    }
                  />
                </button>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-[#4a007a]">
                <div>
                  <h3 className="text-[#e0e0e0] font-medium">
                    Transaction Alerts
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">
                    Get notified of all transactions
                  </p>
                </div>
                <button
                  onClick={() =>
                    toggleSetting("notifications", "transactionAlerts")
                  }
                  className="text-2xl focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={
                      settings.notifications.transactionAlerts
                        ? faToggleOn
                        : faToggleOff
                    }
                    className={
                      settings.notifications.transactionAlerts
                        ? "text-green-400"
                        : "text-[#a0a0a0]"
                    }
                  />
                </button>
              </div>

              <div className="flex justify-between items-center py-3">
                <div>
                  <h3 className="text-[#e0e0e0] font-medium">
                    Payment Reminders
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">
                    Receive reminders for upcoming payments
                  </p>
                </div>
                <button
                  onClick={() =>
                    toggleSetting("notifications", "paymentReminders")
                  }
                  className="text-2xl focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={
                      settings.notifications.paymentReminders
                        ? faToggleOn
                        : faToggleOff
                    }
                    className={
                      settings.notifications.paymentReminders
                        ? "text-green-400"
                        : "text-[#a0a0a0]"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="text-[#d4af37] mr-3 text-xl"
                />
                <h2 className="text-xl font-semibold text-[#e0e0e0]">
                  Security Settings
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[#4a007a]">
                  <div>
                    <h3 className="text-[#e0e0e0] font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-[#a0a0a0]">
                      Add an extra layer of security
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSetting("security", "twoFactorAuth")}
                    className="text-2xl focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={
                        settings.security.twoFactorAuth
                          ? faToggleOn
                          : faToggleOff
                      }
                      className={
                        settings.security.twoFactorAuth
                          ? "text-green-400"
                          : "text-[#a0a0a0]"
                      }
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-[#4a007a]">
                  <div>
                    <h3 className="text-[#e0e0e0] font-medium">
                      Biometric Authentication
                    </h3>
                    <p className="text-sm text-[#a0a0a0]">
                      Use fingerprint or face recognition
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSetting("security", "biometricAuth")}
                    className="text-2xl focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={
                        settings.security.biometricAuth
                          ? faToggleOn
                          : faToggleOff
                      }
                      className={
                        settings.security.biometricAuth
                          ? "text-green-400"
                          : "text-[#a0a0a0]"
                      }
                    />
                  </button>
                </div>

                <div className="py-3">
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          sessionTimeout: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Password & Access
              </h2>

              <div className="space-y-4">
                <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <FontAwesomeIcon icon={faKey} />
                  <span>Change Password</span>
                </button>

                <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <FontAwesomeIcon icon={faFingerprint} />
                  <span>Setup Biometric</span>
                </button>

                <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200">
                  View Active Sessions
                </button>

                <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-lg transition-colors duration-200">
                  Sign Out All Devices
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faPalette}
                  className="text-[#d4af37] mr-3 text-xl"
                />
                <h2 className="text-xl font-semibold text-[#e0e0e0]">
                  App Preferences
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Default Currency
                  </label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          currency: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  >
                    <option value="GHS">Ghanaian Cedi (GHS)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Language
                  </label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          language: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  >
                    <option value="English">English</option>
                    <option value="Akan">Akan</option>
                    <option value="Ewe">Ewe</option>
                    <option value="Ga">Ga</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Date Format
                  </label>
                  <select
                    value={settings.preferences.dateFormat}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          dateFormat: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          theme: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 rounded-lg bg-[#4a007a] border border-[#4a007a] text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#6a0dad]"
                  >
                    <option value="Dark">Dark</option>
                    <option value="Light">Light</option>
                    <option value="Auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Data & Privacy
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-[#2a004a] rounded-lg">
                  <h3 className="text-[#e0e0e0] font-medium mb-2">
                    Data Usage
                  </h3>
                  <p className="text-sm text-[#a0a0a0] mb-3">
                    Control how your data is used to improve our services
                  </p>
                  <button className="text-[#6a0dad] hover:text-[#8a2dd3] text-sm transition-colors duration-200">
                    Manage Data Preferences
                  </button>
                </div>

                <div className="p-4 bg-[#2a004a] rounded-lg">
                  <h3 className="text-[#e0e0e0] font-medium mb-2">
                    Privacy Settings
                  </h3>
                  <p className="text-sm text-[#a0a0a0] mb-3">
                    Review and adjust your privacy settings
                  </p>
                  <button className="text-[#6a0dad] hover:text-[#8a2dd3] text-sm transition-colors duration-200">
                    Privacy Controls
                  </button>
                </div>

                <div className="p-4 bg-[#2a004a] rounded-lg">
                  <h3 className="text-[#e0e0e0] font-medium mb-2">
                    Export Data
                  </h3>
                  <p className="text-sm text-[#a0a0a0] mb-3">
                    Download a copy of your account data
                  </p>
                  <button className="text-[#6a0dad] hover:text-[#8a2dd3] text-sm transition-colors duration-200">
                    Request Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
