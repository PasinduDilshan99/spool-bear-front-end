// components/material-details/BackButton.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#FF5000] transition-colors group"
    >
      <svg
        className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span>Back to Materials</span>
    </motion.button>
  );
};
