"use client";
import React from "react";
import { motion } from "framer-motion";
import { MaterialDetailsSpecificationsProps } from "@/types/material-types";
import { specItemsData } from "@/data/material-details-page-data";

export const MaterialSpecifications: React.FC<
  MaterialDetailsSpecificationsProps
> = ({
  density,
  temperatureResistance,
  minLayerHeight,
  maxLayerHeight,
  finish,
}) => {
  const items = specItemsData(
    density,
    temperatureResistance,
    minLayerHeight,
    maxLayerHeight,
    finish,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-4 w-1 rounded-full"
          style={{ background: "linear-gradient(180deg,#FF5000,#FF8C42)" }}
        />
        <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#3D3530]">
          Specifications
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.07, duration: 0.38 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            className="relative p-4 rounded-2xl overflow-hidden transition-shadow duration-200"
            style={{
              background: item.accent
                ? "linear-gradient(135deg,#FF5000,#FF7A40)"
                : "#FFFFFF",
              border: item.accent ? "none" : "1px solid #EAE4DC",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            {!item.accent && (
              <div
                className="absolute top-0 right-0 w-12 h-12 rounded-bl-full opacity-40"
                style={{ background: item.bg }}
              />
            )}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: item.accent ? "rgba(255,255,255,0.2)" : item.bg,
                }}
              >
                <item.icon
                  size={13}
                  strokeWidth={2.5}
                  style={{ color: item.accent ? "#fff" : item.color }}
                />
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{
                  color: item.accent ? "rgba(255,255,255,0.75)" : "#B8ADA4",
                }}
              >
                {item.label}
              </span>
            </div>
            <div
              className="text-[15px] font-black leading-tight"
              style={{
                color: item.accent ? "#fff" : "#1C1714",
              }}
            >
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
