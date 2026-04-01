"use client";
import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { MaterialDetailsInfoProps } from "@/types/material-types";

export const MaterialInfo: React.FC<MaterialDetailsInfoProps> = ({
  name,
  type,
  price,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-4"
    >
      {type && (
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
          >
            <Package size={10} strokeWidth={2.5} />
            {type}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-4xl lg:text-5xl font-black text-[#1C1714] leading-tight">
          {name}
        </h1>
      </div>

      <div className="h-px bg-gradient-to-r from-[#FF5000]/20 via-[#EAE4DC] to-transparent" />

      <div
        className="relative p-5 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F7F5F2 0%, #FDF8F5 100%)",
          border: "1px solid #EAE4DC",
        }}
      >
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(225deg,#FF5000,transparent)" }}
        />
        <p className="text-[15px] text-[#6B5F56] leading-relaxed relative z-10">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
