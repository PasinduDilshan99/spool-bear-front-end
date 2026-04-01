"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { MaterialDetailsPropertiesProps } from "@/types/material-types";

export const MaterialProperties: React.FC<MaterialDetailsPropertiesProps> = ({
  properties,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-4 w-1 rounded-full"
          style={{ background: "linear-gradient(180deg,#FF5000,#FF8C42)" }}
        />
        <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#3D3530]">
          Technical Properties
        </h2>
        <Zap size={12} className="text-[#FF5000]" strokeWidth={2.5} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {properties.map((prop, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -8 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.05, duration: 0.35 }}
            whileHover={{ backgroundColor: "#FDF8F5" }}
            className="px-4 py-3 rounded-2xl border border-[#EAE4DC] bg-white transition-colors duration-150"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8ADA4] mb-1">
              {prop.propertyName}
            </div>
            <div className="text-[14px] font-black text-[#1C1714]">
              {prop.propertyValue}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
