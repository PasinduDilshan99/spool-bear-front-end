// components/currency/MobileCurrencySelector.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

export const MobileCurrencySelector: React.FC = () => {
  const {
    currencies,
    currentCurrency,
    setCurrentCurrency,
    isLoading,
    refreshRates,
  } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Listen for custom event to close modal when mobile menu closes
    const handleCloseModals = () => {
      setIsOpen(false);
    };

    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener('closeMobileModals', handleCloseModals);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('closeMobileModals', handleCloseModals);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('closeMobileModals', handleCloseModals);
    };
  }, [isOpen]);

  const handleCurrencySelect = (currency: typeof currentCurrency) => {
    setCurrentCurrency(currency);
    setIsOpen(false);
  };

  const handleRefreshRates = () => {
    refreshRates();
    // Optional: Show a toast notification
  };

  return (
    <>
      {/* Trigger Button - Full Width */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200 border border-transparent active:bg-gray-50"
        disabled={isLoading}
        style={{ color: "inherit" }}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{currentCurrency.flag}</span>
          <div className="flex flex-col items-start">
            <span className="font-medium">{currentCurrency.code}</span>
            <span className="text-xs opacity-70">{currentCurrency.name}</span>
          </div>
        </div>
        <svg
          className="w-5 h-5 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Full Width Bottom Sheet Modal for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content - Full Width */}
            <motion.div
              ref={modalRef}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-[60] max-h-[85vh] flex flex-col w-full"
            >
              {/* Header - Full Width */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 rounded-t-2xl w-full">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select Currency
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRefreshRates}
                      className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
                      title="Refresh rates"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Currency List - Full Width Items */}
              <div className="flex-1 overflow-y-auto py-2 w-full">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency)}
                    className={`w-full flex items-center gap-3 px-4 py-4 transition-all active:bg-gray-50 ${
                      currentCurrency.code === currency.code
                        ? "bg-[#FF5000]/10"
                        : ""
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{currency.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-base font-semibold ${
                            currentCurrency.code === currency.code
                              ? "text-[#FF5000]"
                              : "text-gray-900"
                          }`}
                        >
                          {currency.code}
                        </span>
                        <span className="text-sm text-gray-500">
                          {currency.symbol}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {currency.name}
                      </div>
                    </div>
                    {currentCurrency.code === currency.code && (
                      <svg
                        className="w-5 h-5 text-[#FF5000] flex-shrink-0"
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

              {/* Optional: Current Rate Info - Full Width */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-3 w-full">
                <p className="text-xs text-center text-gray-500">
                  Exchange rates update automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};