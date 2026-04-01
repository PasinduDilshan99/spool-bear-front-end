// components/product-details-page-components/ColorSwatches.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

interface ColorSwatchesProps {
  colors: string[];
}

const getColorCode = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
    purple: "#a855f7",
    pink: "#ec4899",
    orange: "#f97316",
    black: "#1a1a1a",
    white: "#f5f5f5",
    gray: "#6b7280",
    brown: "#92400e",
    cyan: "#06b6d4",
    indigo: "#6366f1",
    lime: "#84cc16",
    rose: "#f43f5e",
    sky: "#0ea5e9",
    slate: "#64748b",
    teal: "#14b8a6",
    violet: "#8b5cf6",
    amber: "#f59e0b",
    emerald: "#10b981",
    fuchsia: "#d946ef",
  };
  return colorMap[colorName.toLowerCase()] || "#cbd5e1";
};

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  const [selected, setSelected] = useState(0);
  if (!colors.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Palette size={12} strokeWidth={2.5} className="text-[#B8ADA4]" />
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B8ADA4]">
          Color —{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={colors[selected]}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="text-[#FF5000]"
            >
              {colors[selected]}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5 p-3.5 rounded-2xl bg-[#F7F5F2] border border-[#EAE4DC]">
        {colors.map((color, i) => (
          <motion.button
            key={i}
            onClick={() => setSelected(i)}
            title={color}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.04, duration: 0.28 }}
            className="relative group/sw"
          >
            <div
              className="w-8 h-8 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: getColorCode(color),
                border:
                  i === selected
                    ? "3px solid #FF5000"
                    : "2.5px solid rgba(255,255,255,0.9)",
                boxShadow:
                  i === selected
                    ? "0 0 0 2px rgba(255,80,0,0.25), 0 4px 12px rgba(0,0,0,0.15)"
                    : "0 2px 8px rgba(0,0,0,0.12)",
              }}
            />
            {i === selected && (
              <motion.div
                layoutId="color-ring"
                className="absolute -inset-1 rounded-2xl pointer-events-none"
                style={{ border: "2px solid rgba(255,80,0,0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {/* Tooltip */}
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#6B5F56] whitespace-nowrap opacity-0 group-hover/sw:opacity-100 transition-opacity duration-150 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-[#EAE4DC] pointer-events-none z-10">
              {color}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
