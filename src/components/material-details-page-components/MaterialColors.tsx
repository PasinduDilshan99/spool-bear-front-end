"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { MaterialDetailsColorsProps } from "@/types/material-types";

export const MaterialColors: React.FC<MaterialDetailsColorsProps> = ({
  colors,
  selectedColor,
  onColorSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-1 rounded-full"
            style={{ background: "linear-gradient(180deg,#FF5000,#FF8C42)" }}
          />
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#3D3530]">
            Available Colors
          </h2>
          <Palette size={12} className="text-[#B8ADA4]" strokeWidth={2} />
        </div>
        <span className="text-[11px] font-bold text-[#B8ADA4]">
          {colors.length} options
        </span>
      </div>

      <AnimatePresence mode="wait">
        {selectedColor && (
          <motion.div
            key={selectedColor}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="mb-3"
          >
            <span className="text-[12px] font-semibold text-[#6B5F56]">
              Selected:{" "}
              <span className="font-black text-[#FF5000]">{selectedColor}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#F7F5F2] border border-[#EAE4DC]">
        {colors.map((color, idx) => (
          <motion.button
            key={color.colorName}
            onClick={() => onColorSelect(color.colorName)}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.28 + idx * 0.04, duration: 0.3 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            className="relative group/sw flex flex-col items-center gap-1.5"
            title={color.colorName}
          >
            <div
              className="w-10 h-10 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: color.hexCode,
                border:
                  selectedColor === color.colorName
                    ? "3px solid #FF5000"
                    : "2.5px solid rgba(255,255,255,0.9)",
                boxShadow:
                  selectedColor === color.colorName
                    ? "0 0 0 2px rgba(255,80,0,0.25), 0 4px 12px rgba(0,0,0,0.15)"
                    : "0 2px 8px rgba(0,0,0,0.12)",
              }}
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#6B5F56] whitespace-nowrap opacity-0 group-hover/sw:opacity-100 transition-opacity duration-150 bg-white px-1.5 py-0.5 rounded-lg shadow-sm border border-[#EAE4DC]">
              {color.colorName}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
