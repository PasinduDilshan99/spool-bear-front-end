"use client";

import React, { useEffect, useState } from "react";
import { FileText, Clock, ShieldCheck } from "lucide-react";

interface Props {
  lastUpdated: string;
}

export const TermsHero = ({ lastUpdated }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="text-center mb-14 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Icon badge */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div
          className="absolute inset-0 rounded-3xl blur-xl opacity-30"
          style={{ background: "#FF5000", transform: "scale(1.3)" }}
        />
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF5000] to-[#FF7A40] flex items-center justify-center shadow-lg shadow-orange-200">
          <FileText size={36} className="text-white" />
        </div>
      </div>

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
        <ShieldCheck size={13} className="text-[#FF5000]" />
        <span className="text-xs font-semibold text-[#FF5000] uppercase tracking-widest">
          Legal Document
        </span>
      </div>

      <h1
        className="font-black text-[#1C1714] mb-4 tracking-tight leading-none"
        style={{
          fontSize: "clamp(36px, 5.5vw, 60px)",
          fontFamily: "'Fraunces', 'Georgia', serif",
          letterSpacing: "-0.03em",
        }}
      >
        Terms &{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #FF5000 0%, #FF8C42 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Conditions
        </span>
      </h1>

      <p
        className="text-[#6B5F56] max-w-xl mx-auto leading-relaxed"
        style={{ fontSize: "clamp(15px, 1.8vw, 17px)" }}
      >
        Please read these terms carefully. By accessing our services,
        you agree to be bound by the following terms and conditions.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-[#E8E2DB] shadow-sm text-sm text-[#8C7D73] font-medium">
        <Clock size={13} className="text-[#FF5000]" />
        Last Updated: <strong className="text-[#3D3530]">{lastUpdated}</strong>
      </div>

      {/* Decorative divider */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D8D1C8]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF5000]" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D8D1C8]" />
      </div>
    </div>
  );
};