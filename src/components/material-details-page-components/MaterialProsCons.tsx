"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import { MaterialDetailsProsConsProps } from "@/types/material-types";

export const MaterialProsCons: React.FC<MaterialDetailsProsConsProps> = ({
  pros,
  cons,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-4 w-1 rounded-full"
          style={{ background: "linear-gradient(180deg,#FF5000,#FF8C42)" }}
        />
        <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#3D3530]">
          Pros & Cons
        </h2>
        <TrendingUp size={12} className="text-[#B8ADA4]" strokeWidth={2} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pros && pros.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.4 }}
            className="p-4 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              border: "1px solid #bbf7d0",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2
                size={15}
                className="text-emerald-500"
                strokeWidth={2.5}
              />
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-emerald-700">
                Pros
              </span>
            </div>
            <ul className="space-y-2">
              {pros.map((pro, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + idx * 0.06 }}
                  className="flex items-start gap-2 text-[13px] text-emerald-800 leading-snug"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {pro}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {cons && cons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.36, duration: 0.4 }}
            className="p-4 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
              border: "1px solid #fecdd3",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={15} className="text-rose-400" strokeWidth={2.5} />
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-rose-600">
                Cons
              </span>
            </div>
            <ul className="space-y-2">
              {cons.map((con, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38 + idx * 0.06 }}
                  className="flex items-start gap-2 text-[13px] text-rose-800 leading-snug"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-300 flex-shrink-0" />
                  {con}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
