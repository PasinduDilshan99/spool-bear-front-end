// components/material-details/MaterialActions.tsx
"use client";
import React from "react";

interface MaterialActionsProps {
  isAvailable: boolean;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
}

export const MaterialActions: React.FC<MaterialActionsProps> = ({
  isAvailable,
  onAddToCart,
  onAddToFavorites,
}) => {
  return (
    <div className="flex gap-3 pt-4">
      <button
        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onAddToCart}
        disabled={!isAvailable}
      >
        {isAvailable ? "Add to Cart" : "Out of Stock"}
      </button>
      <button
        className="px-6 py-3 border border-gray-200 rounded-xl hover:border-[#FF5000] hover:text-[#FF5000] transition-all duration-300"
        onClick={onAddToFavorites}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
};
