// components/reviews/EmptyState.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  activeFilter: string;
  orderTypeFilter: string;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  activeFilter,
  orderTypeFilter,
  onReset,
}) => {
  const isFiltered = activeFilter !== "all" || orderTypeFilter !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-7xl mb-6"
      >
        📝
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        {isFiltered ? "No Reviews Match" : "No Reviews Yet"}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {isFiltered
          ? "Try adjusting your filters to see more reviews from the community."
          : "Be the first to share your 3D printing experience with the community!"}
      </p>
      {isFiltered ? (
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
        >
          Clear Filters
        </button>
      ) : (
        <button
          onClick={() => (window.location.href = "/products")}
          className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
        >
          Browse Products
        </button>
      )}
    </motion.div>
  );
};
