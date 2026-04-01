// components/material-details-page-components/BackButton.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClick}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.96 }}
      className="group flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-2xl transition-colors duration-150"
      style={{
        background: "#F7F5F2",
        border: "1px solid #EAE4DC",
      }}
    >
      <ArrowLeft
        size={16}
        strokeWidth={2.5}
        className="text-[#6B5F56] transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      <span className="text-[13px] font-bold text-[#6B5F56]">
        Back to Materials
      </span>
    </motion.button>
  );
};
