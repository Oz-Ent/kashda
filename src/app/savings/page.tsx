"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEdit,
  faMoneyBillWave,
  faPiggyBank,
  faPlus,
  faThLarge,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrency, getRemainingDays } from "@/lib/formatUtils";
import { formatCurrencyWithSymbol } from "@/lib/currencyUtils";
import { useDataState } from "@/hooks/useDataState";
import AppLayout from "../components/common/AppLayout";
import { StatCardGrid } from "../components/ui/StatCard";
import ProgressBar from "../components/ui/ProgressBar";
import CurrencySelector from "../components/ui/CurrencySelector";
import {
  StatCardSkeleton,
  CardSkeleton,
  ProgressSkeleton,
} from "../components/ui/LoadingSkeleton";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import NewSavingsForm from "../components/forms/NewSavingsForm";

const SavingsPage = () => {
  const { isLoading, isEmpty, data } = useDataState();
  const [newSavingsForm, setNewSavingsForm] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const savingsData = data.savings;
  const [selectedGoal, setSelectedGoal] = useState(
    savingsData.goals[0] || null
  );

  const statCards = [
    {
      title: "Total Savings",
      value: formatCurrencyWithSymbol(savingsData.totalSavings, selectedCurrency),
      icon: faPiggyBank,
      iconColor: "text-[#d4af37]",
      valueColor: "text-[#d4af37]",
    },
    {
      title: "Monthly Contribution",
      value: formatCurrencyWithSymbol(savingsData.monthlyContribution, selectedCurrency),
      icon: faMoneyBillWave,
      iconColor: "text-[#6a0dad]",
      valueColor: "text-[#6a0dad]",
    },
    {
      title: "Active Goals",
      value: savingsData.goals.length,
      icon: faThLarge,
      iconColor: "text-[#a78bfa]",
      valueColor: "text-[#a78bfa]",
    },
  ];

  const handleNewSavingsForm = () => {
    setNewSavingsForm(true);
  }

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#e0e0e0] mb-2">
                Savings Goals
              </h1>
              <p className="text-[#a0a0a0]">
                Track and manage your savings goals
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              <button onClick={handleNewSavingsForm} className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 cursor-pointer">
                <FontAwesomeIcon icon={faPlus} />
                <span>New Goal</span>
              </button>
            </div>
          </div>

          {/* New Goal Form Modal */}
          {newSavingsForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop with blur effect */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs h-screen"
              // onClick={() => setNewSavingsForm(false)}
              />

              {/* Modal content */}
              <div className="relative bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4">

                {/* Form content will go here */}
                <NewSavingsForm onClose={() => setNewSavingsForm(false)} />
              </div>
            </div>
          )}


          {/* Savings Overview */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          ) : (
            <StatCardGrid cards={statCards} />
          )}

          {/* Savings Goals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#e0e0e0]">
                Your Goals
              </h2>

              {isLoading ? (
                // Loading state for goals list
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : isEmpty || savingsData.goals.length === 0 ? (
                // Empty state for goals
                <div className="bg-[#3a005f] border border-[#4a007a] p-8 rounded-xl text-center">
                  <FontAwesomeIcon
                    icon={faPiggyBank}
                    className="text-6xl text-[#6a0dad] mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#e0e0e0] mb-2">
                    No Savings Goals Yet
                  </h3>
                  <p className="text-[#a0a0a0] mb-4">
                    Start building your financial future by creating your first
                    savings goal.
                  </p>
                  <button onClick={handleNewSavingsForm} className="bg-[#6a0dad] hover:bg-[#8a2dd3] text-white px-6 py-2 rounded-lg transition-colors duration-200 cursor-pointer">
                    Create Your First Goal
                  </button>
                </div>
              ) : (
                // Regular goals list
                savingsData.goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`bg-[#3a005f] border p-4 rounded-xl cursor-pointer transition-colors duration-200 ${selectedGoal && selectedGoal.id === goal.id
                      ? "border-[#6a0dad] bg-[#6a0dad]/10"
                      : "border-[#4a007a] hover:border-[#6a0dad]"
                      }`}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-[#e0e0e0]">
                          {goal.name}
                        </h3>
                        <p className="text-sm text-[#a0a0a0]">
                          {goal.category}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-[#6a0dad] hover:text-[#8a2dd3] transition-colors duration-200 cursor-pointer">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="text-red-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>

                    <ProgressBar
                      current={goal.currentAmount}
                      target={goal.targetAmount}
                      showAmounts={true}
                      className="mt-3"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-[#a0a0a0]">
                        {getRemainingDays(goal.targetDate)} days left
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Goal Details */}
            <div className="bg-[#3a005f] border border-[#4a007a] p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">
                Goal Details
              </h2>

              {isLoading ? (
                // Loading state for goal details
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-8 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md"></div>
                    <div className="h-4 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-1/2"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#2a004a] p-4 rounded-lg space-y-2">
                      <div className="h-4 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-3/4"></div>
                      <div className="h-6 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-1/2"></div>
                    </div>
                    <div className="bg-[#2a004a] p-4 rounded-lg space-y-2">
                      <div className="h-4 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-3/4"></div>
                      <div className="h-6 bg-gradient-to-r from-[#4a007a] via-[#5a0d8a] to-[#4a007a] bg-[length:200%_100%] animate-pulse rounded-md w-1/2"></div>
                    </div>
                  </div>
                  <ProgressSkeleton />
                </div>
              ) : isEmpty || !selectedGoal ? (
                // Empty state for goal details
                <div className="text-center py-8">
                  <FontAwesomeIcon
                    icon={faThLarge}
                    className="text-4xl text-[#6a0dad] mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#e0e0e0] mb-2">
                    No Goal Selected
                  </h3>
                  <p className="text-[#a0a0a0]">
                    {isEmpty || savingsData.goals.length === 0
                      ? "Create your first savings goal to see details here."
                      : "Select a goal from the list to view its details."}
                  </p>
                </div>
              ) : (
                // Regular goal details
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#d4af37] mb-2">
                      {selectedGoal.name}
                    </h3>
                    <p className="text-[#a0a0a0]">
                      {selectedGoal.category} Goal
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#2a004a] p-4 rounded-lg">
                      <p className="text-sm text-[#a0a0a0] mb-1">
                        Current Amount
                      </p>
                      <p className="text-xl font-bold text-[#6a0dad]">
                        {formatCurrencyWithSymbol(selectedGoal.currentAmount, selectedCurrency)}
                      </p>
                    </div>
                    <div className="bg-[#2a004a] p-4 rounded-lg">
                      <p className="text-sm text-[#a0a0a0] mb-1">
                        Target Amount
                      </p>
                      <p className="text-xl font-bold text-[#d4af37]">
                        {formatCurrencyWithSymbol(selectedGoal.targetAmount, selectedCurrency)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#2a004a] p-4 rounded-lg">
                    <ProgressBar
                      current={selectedGoal.currentAmount}
                      target={selectedGoal.targetAmount}
                      height="h-4"
                      gradient={true}
                    />
                  </div>

                  <div className="flex items-center justify-between bg-[#2a004a] p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-[#a78bfa]"
                      />
                      <span className="text-[#a0a0a0]">Target Date</span>
                    </div>
                    <span className="text-[#e0e0e0] font-semibold">
                      {new Date(selectedGoal.targetDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                  </div>

                  <div className="bg-[#2a004a] p-4 rounded-lg">
                    <p className="text-sm text-[#a0a0a0] mb-1">
                      Remaining to Goal
                    </p>
                    <p className="text-xl font-bold text-[#a78bfa]">
                      {formatCurrencyWithSymbol(
                        selectedGoal.targetAmount - selectedGoal.currentAmount,
                        selectedCurrency
                      )}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <button className="w-full bg-[#6a0dad] hover:bg-[#8a2dd3] text-white py-3 rounded-lg transition-colors duration-200 cursor-pointer">
                      Add Money to Goal
                    </button>
                    <button className="w-full bg-[#4a007a] hover:bg-[#6a0dad] text-[#e0e0e0] py-3 rounded-lg transition-colors duration-200 cursor-pointer">
                      Withdraw from Goal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default SavingsPage;
