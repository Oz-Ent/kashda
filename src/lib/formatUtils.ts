export const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string, locale: string = "en-GB") => {
  return new Date(dateString).toLocaleDateString(locale);
};

export const formatPercentage = (value: number, decimals: number = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const getRemainingDays = (targetDate: string) => {
  const target = new Date(targetDate);
  const today = new Date();
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export const getProgressPercentage = (current: number, target: number) => {
  return Math.min((current / target) * 100, 100);
};

export const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "low":
    case "very low":
      return "text-green-400";
    case "medium":
      return "text-yellow-400";
    case "high":
      return "text-red-400";
    default:
      return "text-[#a0a0a0]";
  }
};

export const getRiskBgColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "low":
    case "very low":
      return "bg-green-500/20";
    case "medium":
      return "bg-yellow-500/20";
    case "high":
      return "bg-red-500/20";
    default:
      return "bg-[#4a007a]/20";
  }
};
