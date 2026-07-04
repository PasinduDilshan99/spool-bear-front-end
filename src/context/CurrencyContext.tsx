// context/CurrencyContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate from USD to this currency
  flag?: string;
}

// Available currencies - most commonly used
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee", rate: 1, flag: "🇱🇰" },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1, flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.93, flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79, flag: "🇬🇧" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12, flag: "🇮🇳" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.51, flag: "🇦🇺" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36, flag: "🇨🇦" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 148.50, flag: "🇯🇵" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.20, flag: "🇨🇳" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67, flag: "🇦🇪" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", rate: 3.75, flag: "🇸🇦" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 1.34, flag: "🇸🇬" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", rate: 4.73, flag: "🇲🇾" },
  { code: "THB", symbol: "฿", name: "Thai Baht", rate: 35.50, flag: "🇹🇭" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", rate: 1330.00, flag: "🇰🇷" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", rate: 92.50, flag: "🇷🇺" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 5.05, flag: "🇧🇷" },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 18.80, flag: "🇿🇦" },
];

// USD to LKR exchange rate (this should be fetched from API or set based on real rates)
// Since your database is in LKR, we need the USD to LKR conversion rate
let USD_TO_LKR_RATE = 300; // Default rate, should be updated from API

interface CurrencyContextType {
  currencies: Currency[];
  currentCurrency: Currency;
  setCurrentCurrency: (currency: Currency) => void;
  convertPrice: (priceInLKR: number) => number;
  formatPrice: (priceInLKR: number) => string;
  isLoading: boolean;
  error: string | null;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// FIXED: This hook now returns default values during prerendering instead of throwing
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  
  // Return default values during prerendering or if context is missing
  // This prevents the build from failing
  if (!context) {
    // Default currency (LKR)
    const defaultCurrency = SUPPORTED_CURRENCIES[0];
    
    // Return a mock context with default values
    return {
      currencies: SUPPORTED_CURRENCIES,
      currentCurrency: defaultCurrency,
      setCurrentCurrency: () => {
        // Do nothing during prerendering
        if (typeof window !== 'undefined') {
          console.warn('CurrencyProvider not found');
        }
      },
      convertPrice: (priceInLKR: number) => priceInLKR, // Return original price in LKR
      formatPrice: (priceInLKR: number) => {
        // Simple formatting without currency symbol during prerendering
        return `Rs${Math.round(priceInLKR)}`;
      },
      isLoading: false,
      error: null,
      refreshRates: async () => {
        // Do nothing during prerendering
      },
    };
  }
  
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currency[]>(SUPPORTED_CURRENCIES);
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Mark when component is mounted (client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load saved currency preference from localStorage (only on client-side)
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const savedCurrencyCode = localStorage.getItem("preferredCurrency");
      if (savedCurrencyCode) {
        const savedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === savedCurrencyCode);
        if (savedCurrency) {
          setCurrentCurrency(savedCurrency);
        }
      }
    } catch (err) {
      console.error("Error accessing localStorage:", err);
    }
  }, [isMounted]);

  // Save currency preference to localStorage (only on client-side)
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      localStorage.setItem("preferredCurrency", currentCurrency.code);
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [currentCurrency, isMounted]);

  // Fetch latest exchange rates
  const refreshRates = async () => {
    // Don't fetch during SSR/prerendering
    if (typeof window === 'undefined') return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch USD to LKR rate first
      const lkrResponse = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/lkr.json");
      const lkrData = await lkrResponse.json();
      const usdToLkrRate = lkrData.lkr?.usd;
      
      if (usdToLkrRate) {
        USD_TO_LKR_RATE = 1 / usdToLkrRate; // Convert to USD to LKR rate
      }
      
      // Fetch USD to other currencies
      const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json");
      
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }
      
      const data = await response.json();
      const rates = data.usd;
      
      // Update rates for supported currencies
      const updatedCurrencies = SUPPORTED_CURRENCIES.map(currency => {
        if (currency.code === "LKR") {
          return { ...currency, rate: 1 };
        }
        
        // Get rate from USD to this currency
        const rate = rates[currency.code.toLowerCase()];
        if (rate) {
          return { ...currency, rate };
        }
        return currency;
      });
      
      setCurrencies(updatedCurrencies);
      
      // Update current currency if it changed
      setCurrentCurrency(prev => {
        const updated = updatedCurrencies.find(c => c.code === prev.code);
        return updated || prev;
      });
      
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      setError("Failed to fetch exchange rates. Using cached rates.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch rates on mount (only on client-side)
  useEffect(() => {
    if (isMounted) {
      refreshRates();
    }
  }, [isMounted]);

  /**
   * Convert price from LKR to selected currency
   * Formula: LKR → USD → Target Currency
   */
  const convertPrice = (priceInLKR: number): number => {
    if (currentCurrency.code === "LKR") {
      return priceInLKR;
    }
    
    // Step 1: Convert LKR to USD
    const priceInUSD = priceInLKR / USD_TO_LKR_RATE;
    
    // Step 2: Convert USD to target currency
    const priceInTargetCurrency = priceInUSD * currentCurrency.rate;
    
    // Return with 2 decimal places
    return Number(priceInTargetCurrency.toFixed(2));
  };

  // Format price with currency symbol
  const formatPrice = (priceInLKR: number): string => {
    const converted = convertPrice(priceInLKR);
    const { symbol, code } = currentCurrency;
    
    // Format based on currency
    if (code === "JPY" || code === "KRW" || code === "INR" || code === "LKR") {
      // For currencies that typically don't use decimals
      return `${symbol}${Math.round(converted)}`;
    }
    
    return `${symbol}${converted.toFixed(2)}`;
  };

  const value = {
    currencies,
    currentCurrency,
    setCurrentCurrency,
    convertPrice,
    formatPrice,
    isLoading,
    error,
    refreshRates,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};