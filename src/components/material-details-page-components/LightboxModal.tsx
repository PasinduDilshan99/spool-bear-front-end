// components/material-details/LightboxModal.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LightboxModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  imageUrl,
  onClose,
}) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-5xl max-h-[90vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={imageUrl} alt="Full size" fill className="object-contain" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-all"
        >
          <svg
            className="w-6 h-6"
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
      </motion.div>
    </div>
  );
};
