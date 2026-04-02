"use client";
import React from "react";

export const ShippingInfo: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
      <div className="flex items-center gap-3">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-800">
            Free Shipping on orders over $50
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Estimated delivery: 3-5 business days
          </p>
        </div>
      </div>
    </div>
  );
};
