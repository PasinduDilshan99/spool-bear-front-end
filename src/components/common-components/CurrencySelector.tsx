"use client";
import React, { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

export const CurrencySelector: React.FC = () => {
  const {
    currencies,
    currentCurrency,
    setCurrentCurrency,
    isLoading,
    refreshRates,
  } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCurrencySelect = (currency: typeof currentCurrency) => {
    setCurrentCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-[#FF5000] transition-all duration-200"
        disabled={isLoading}
      >
        <span className="text-sm">{currentCurrency.flag}</span>
        <span className="text-sm font-medium text-gray-700">
          {currentCurrency.code}
        </span>
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            <div className="p-2">
              <div className="flex items-center justify-between mb-2 px-2 py-1">
                <span className="text-xs font-medium text-gray-500">
                  Select Currency
                </span>
                <button
                  onClick={() => refreshRates()}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh rates"
                >
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer duration-300 ${
                      currentCurrency.code === currency.code
                        ? "bg-[#FF5000]/10 text-[#FF5000]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{currency.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {currency.code}
                      </div>
                      <div className="text-xs text-gray-500">
                        {currency.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {currency.symbol}
                    </div>
                    {currentCurrency.code === currency.code && (
                      <svg
                        className="w-4 h-4 text-[#FF5000]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
