/**
 * Currency system for Zerobet.
 *
 * All amounts are stored internally in FCFA (the app's original currency,
 * XOF = 1 FCFA). The user picks their preferred display currency on the
 * CurrencyScreen during onboarding; every displayed amount is then converted
 * via `formatCurrency` / `formatCurrencyShort` using approximate rates.
 *
 * Rates are indicative, for display purposes only — they are NOT live FX
 * rates and must not be used for real financial calculations.
 */
export type CurrencyCode =
  | "USD"
  | "EUR"
  | "XOF"
  | "NGN"
  | "GHS"
  | "ZAR"
  | "GBP"
  | "MAD"
  | "TND"
  | "BRL"
  | "INR"
  | "CNY"
  | "JPY";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  nativeName: string;
  flag: string; // emoji flag
  /** Approximate exchange rate relative to FCFA (1 FCFA = rateFromFCFA units). */
  rateFromFCFA: number;
  decimals: number;
  position: "before" | "after"; // symbol before or after amount
  thousandsSeparator: string;
  decimalSeparator: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  {
    code: "XOF",
    symbol: "FCFA",
    name: "West African CFA Franc",
    nativeName: "Franc CFA",
    flag: "🇨🇮",
    rateFromFCFA: 1,
    decimals: 0,
    position: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
  },
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    nativeName: "Dollar",
    flag: "🇺🇸",
    rateFromFCFA: 0.00165,
    decimals: 2,
    position: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    nativeName: "Euro",
    flag: "🇫🇷",
    rateFromFCFA: 0.00152,
    decimals: 2,
    position: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    nativeName: "Livre sterling",
    flag: "🇬🇧",
    rateFromFCFA: 0.0013,
    decimals: 2,
    position: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  {
    code: "NGN",
    symbol: "₦",
    name: "Nigerian Naira",
    nativeName: "Naira",
    flag: "🇳🇬",
    rateFromFCFA: 2.45,
    decimals: 0,
    position: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  {
    code: "GHS",
    symbol: "₵",
    name: "Ghanaian Cedi",
    nativeName: "Cedi",
    flag: "🇬🇭",
    rateFromFCFA: 0.024,
    decimals: 2,
    position: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  {
    code: "ZAR",
    symbol: "R",
    name: "South African Rand",
    nativeName: "Rand",
    flag: "🇿🇦",
    rateFromFCFA: 0.03,
    decimals: 2,
    position: "before",
    thousandsSeparator: " ",
    decimalSeparator: ".",
  },
  {
    code: "MAD",
    symbol: "DH",
    name: "Moroccan Dirham",
    nativeName: "Dirham",
    flag: "🇲🇦",
    rateFromFCFA: 0.016,
    decimals: 2,
    position: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
  },
  {
    code: "TND",
    symbol: "DT",
    name: "Tunisian Dinar",
    nativeName: "Dinar",
    flag: "🇹🇳",
    rateFromFCFA: 0.0052,
    decimals: 3,
    position: "after",
    thousandsSeparator: " ",
    decimalSeparator: ",",
  },
  {
    code: "BRL",
    symbol: "R$",
    name: "Brazilian Real",
    nativeName: "Real",
    flag: "🇧🇷",
    rateFromFCFA: 0.0082,
    decimals: 2,
    position: "before",
    thousandsSeparator: ".",
    decimalSeparator: ",",
  },
  {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    nativeName: "Roupie",
    flag: "🇮🇳",
    rateFromFCFA: 0.138,
    decimals: 0,
    position: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  {
    code: "CNY",
    symbol: "¥",
    name: "Chinese Yuan",
    nativeName: "Yuan",
    flag: "🇨🇳",
    rateFromFCFA: 0.012,
    decimals: 2,
    position: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    nativeName: "Yen",
    flag: "🇯🇵",
    rateFromFCFA: 0.24,
    decimals: 0,
    position: "before",
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
];

export function getCurrency(code: CurrencyCode): CurrencyInfo {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

/**
 * Format an amount in FCFA to the user's selected currency.
 * The app stores all amounts internally in FCFA (the original currency).
 * This function converts and formats for display.
 */
export function formatCurrency(amountInFCFA: number, currency: CurrencyCode): string {
  const info = getCurrency(currency);
  const converted = amountInFCFA * info.rateFromFCFA;

  const formatted = converted.toLocaleString("fr-FR", {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals,
  });

  if (info.position === "before") {
    return `${info.symbol}${formatted}`;
  }
  return `${formatted} ${info.symbol}`;
}

/**
 * Format with just the symbol (for compact display).
 * Falls back to the full format for small amounts.
 */
export function formatCurrencyShort(amountInFCFA: number, currency: CurrencyCode): string {
  const info = getCurrency(currency);
  const converted = amountInFCFA * info.rateFromFCFA;

  // For large amounts, use compact notation
  if (converted >= 1000000) {
    const millions = converted / 1000000;
    return `${millions.toFixed(1)}M ${info.symbol}`;
  }
  if (converted >= 1000) {
    const thousands = converted / 1000;
    return `${thousands.toFixed(1)}k ${info.symbol}`;
  }

  return formatCurrency(amountInFCFA, currency);
}
