// components/material-details-page-components/MaterialTags.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap, Layers } from "lucide-react";

interface MaterialTagsProps {
  strength: string;
  flexibility: string;
}

const strengthConfig: Record<
  string,
  { color: string; bar: string; bg: string; width: string; label: string }
> = {
  High: {
    color: "#10b981",
    bar: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    width: "90%",
    label: "High Strength",
  },
  Medium: {
    color: "#f59e0b",
    bar: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    width: "55%",
    label: "Medium Strength",
  },
  Low: {
    color: "#ef4444",
    bar: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    width: "22%",
    label: "Low Strength",
  },
};

const flexConfig: Record<
  string,
  { color: string; bar: string; bg: string; width: string; label: string }
> = {
  High: {
    color: "#6366f1",
    bar: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    width: "90%",
    label: "Flexible",
  },
  Medium: {
    color: "#0ea5e9",
    bar: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    width: "55%",
    label: "Semi-Flex",
  },
  Low: {
    color: "#64748b",
    bar: "#64748b",
    bg: "rgba(100,116,139,0.08)",
    width: "20%",
    label: "Rigid",
  },
};

export const MaterialTags: React.FC<MaterialTagsProps> = ({
  strength,
  flexibility,
}) => {
  const s = strengthConfig[strength] ?? strengthConfig.Medium;
  const f = flexConfig[flexibility] ?? flexConfig.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-5 rounded-2xl"
      style={{ background: "#F7F5F2", border: "1px solid #EAE4DC" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-4 w-1 rounded-full"
          style={{ background: "linear-gradient(180deg,#FF5000,#FF8C42)" }}
        />
        <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#3D3530]">
          Performance
        </h2>
      </div>

      <div className="space-y-4">
        {/* Strength */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap size={13} strokeWidth={2.5} style={{ color: s.color }} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8ADA4]">
                Strength
              </span>
            </div>
            <span
              className="text-[11px] font-black px-2.5 py-1 rounded-xl"
              style={{ color: s.color, background: s.bg }}
            >
              {s.label}
            </span>
          </div>
          <div className="h-2 bg-[#EAE4DC] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: s.bar }}
              initial={{ width: 0 }}
              animate={{ width: s.width }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
            />
          </div>
        </div>

        {/* Flexibility */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Layers size={13} strokeWidth={2.5} style={{ color: f.color }} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8ADA4]">
                Flexibility
              </span>
            </div>
            <span
              className="text-[11px] font-black px-2.5 py-1 rounded-xl"
              style={{ color: f.color, background: f.bg }}
            >
              {f.label}
            </span>
          </div>
          <div className="h-2 bg-[#EAE4DC] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: f.bar }}
              initial={{ width: 0 }}
              animate={{ width: f.width }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
