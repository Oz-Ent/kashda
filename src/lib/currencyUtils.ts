// Currency conversion rates (these would typically come from an API in a real application)
export const CURRENCY_RATES = {
  USD: 1.0,
  "GH₵": 0.08, // 1 USD = ~12.5 GHS
  DZD: 0.0074, // 1 USD = ~135 DZD
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  if (fromCurrency === toCurrency) return amount;

  // Convert to USD first, then to target currency
  const usdAmount =
    amount * CURRENCY_RATES[fromCurrency as keyof typeof CURRENCY_RATES];
  const convertedAmount =
    usdAmount / CURRENCY_RATES[toCurrency as keyof typeof CURRENCY_RATES];

  return convertedAmount;
};

export const formatCurrencyWithSymbol = (
  amount: number,
  currency: string
): string => {
  const convertedAmount = convertCurrency(amount, "USD", currency);

  switch (currency) {
    case "USD":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(convertedAmount);
    case "GH₵":
      return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        minimumFractionDigits: 2,
      }).format(convertedAmount);
    case "DZD":
      return new Intl.NumberFormat("ar-DZ", {
        style: "currency",
        currency: "DZD",
        minimumFractionDigits: 2,
      }).format(convertedAmount);
    default:
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(convertedAmount);
  }
};

export const getCurrencySymbol = (currency: string): string => {
  switch (currency) {
    case "USD":
      return "$";
    case "GH₵":
      return "GH₵";
    case "DZD":
      return "د.ج";
    default:
      return "$";
  }
};
