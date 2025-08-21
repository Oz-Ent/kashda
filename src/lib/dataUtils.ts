import appData from "@/data/appData.json";

export const getAppData = () => {
  return appData;
};

export const getWallets = () => {
  return appData.wallets;
};

export const getTransactions = (filter?: "all" | "income" | "expenses") => {
  const transactions = appData.transactions;

  if (!filter || filter === "all") {
    return transactions;
  }

  if (filter === "income") {
    return transactions.filter((transaction) => transaction.amount > 0);
  }

  if (filter === "expenses") {
    return transactions.filter((transaction) => transaction.amount < 0);
  }

  return transactions;
};

export const getUserData = () => {
  return appData.user;
};

export const getPensionData = () => {
  return appData.pension;
};

export const getInsuranceData = () => {
  return appData.insurance;
};

export const getRevenueData = () => {
  return appData.revenue;
};

export const getSavingsData = () => {
  return appData.savings;
};

export const getInvestmentsData = () => {
  return appData.investments;
};

export const getSettingsData = () => {
  return appData.settings;
};

export const getGroups = () => {
  return appData.groups;
};
