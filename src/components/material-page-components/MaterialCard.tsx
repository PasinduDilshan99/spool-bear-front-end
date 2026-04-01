"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, Zap, Layers, Thermometer, Droplets, Star, ArrowRight, ChevronDown } from "lucide-react";
import { Material } from "@/types/material-types";
import { MATERIAL_PAGE_PATH } from "@/utils/urls";

interface MaterialCardProps {
  material: Material;
  onQuickView: (material: Material) => void;
}

const strengthConfig = {
  High:   { color: "#10b981", bg: "rgba(16,185,129,0.08)",  label: "High"   },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  label: "Medium" },
  Low:    { color: "#ef4444", bg: "rgba(239,68,68,0.08)",   label: "Low"    },
};

const flexConfig = {
  High:   { color: "#6366f1", bg: "rgba(99,102,241,0.08)",  label: "Flexible"  },
  Medium: { color: "#0ea5e9", bg: "rgba(14,165,233,0.08)",  label: "Semi-Flex" },
  Low:    { color: "#64748b", bg: "rgba(100,116,139,0.08)", label: "Rigid"     },
};

const StatPill = ({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  bg: string;
}) => (
  <div
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold"
    style={{ background: bg, color }}
  >
    <Icon size={11} strokeWidth={2.5} />
    <span>{value}</span>
  </div>
);

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, onQuickView }) => {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const strength  = strengthConfig[material.strength  as keyof typeof strengthConfig]  ?? strengthConfig.Medium;
  const flex      = flexConfig[material.flexibility    as keyof typeof flexConfig]      ?? flexConfig.Medium;

  return (
    <div className="flex flex-col">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative flex flex-col bg-white rounded-3xl overflow-hidden"
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.06)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        }}
        whileHover={{
          y: -4,
          boxShadow: "0 8px 32px rgba(255,80,0,0.10), 0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative h-52 overflow-hidden bg-[#F7F5F2]">
          {/* Corner accent */}
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full opacity-20 pointer-events-none"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF8C42)" }}
          />

          {material.images?.[0] && !imgError ? (
            <Image
              src={material.images[0]}
              alt={material.materialName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Layers size={40} className="text-[#D6CEC6]" strokeWidth={1.2} />
              <span className="text-xs text-[#B8ADA4] font-medium">No preview</span>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 z-10">
            {material.isPopular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-white shadow-lg"
                style={{ background: "linear-gradient(135deg,#FF5000,#FF8C42)" }}>
                <Star size={9} fill="white" />
                Popular
              </span>
            )}
            {!material.isAvailable && (
              <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-white bg-gray-800/80 backdrop-blur-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick-view button (hover overlay) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => onQuickView(material)}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Quick view"
          >
            <Eye size={15} className="text-[#3D3530]" />
          </motion.button>

          {/* Like button */}
          <motion.button
            onClick={() => setLiked(l => !l)}
            whileTap={{ scale: 0.85 }}
            className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
            title={liked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={15}
              className="transition-colors duration-200"
              fill={liked ? "#FF5000" : "none"}
              stroke={liked ? "#FF5000" : "#6B5F56"}
              strokeWidth={2}
            />
          </motion.button>

          {/* Colors strip pinned to bottom of image */}
          {material.colors && material.colors.length > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 z-10">
              <div className="flex -space-x-1.5">
                {material.colors.slice(0, 5).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-black/5"
                    style={{ backgroundColor: color.hexCode, zIndex: 5 - idx }}
                    title={color.colorName}
                  />
                ))}
              </div>
              {material.colors.length > 5 && (
                <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-full ml-1">
                  +{material.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Body ─────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-5 gap-4">

          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {material.materialType?.name && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#FF5000] mb-1">
                  {material.materialType.name}
                </span>
              )}
              <h3 className="text-[17px] font-black text-[#1C1714] leading-snug group-hover:text-[#FF5000] transition-colors duration-200 line-clamp-1"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
                {material.materialName}
              </h3>
            </div>

            {/* Price */}
            {/* <div className="flex-shrink-0 text-right">
              <div className="text-[22px] font-black text-[#FF5000] leading-none"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
                ${material.pricePerGram.toFixed(3)}
              </div>
              <div className="text-[10px] text-[#B8ADA4] font-semibold uppercase tracking-wide mt-0.5">per gram</div>
            </div> */}
          </div>

          {/* Description */}
          <p className="text-sm text-[#6B5F56] leading-relaxed line-clamp-2 -mt-1">
            {material.materialDescription}
          </p>

          {/* Stat pills row */}
          <div className="flex flex-wrap gap-1.5">
            <StatPill icon={Zap}         label="Strength"    value={strength.label} color={strength.color} bg={strength.bg} />
            <StatPill icon={Layers}      label="Flexibility" value={flex.label}     color={flex.color}     bg={flex.bg}     />
            <StatPill
              icon={Droplets}
              label="Density"
              value={`${material.density} g/cm³`}
              color="#6B5F56"
              bg="rgba(107,95,86,0.08)"
            />
            <StatPill
              icon={Thermometer}
              label="Temp"
              value={material.temperatureResistance}
              color="#0ea5e9"
              bg="rgba(14,165,233,0.08)"
            />
          </div>

          {/* Layer height bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#B8ADA4] uppercase tracking-wide">
              <span>Layer Height</span>
              <span className="text-[#6B5F56]">{material.minLayerHeight}–{material.maxLayerHeight} mm</span>
            </div>
            <div className="h-1.5 bg-[#F0EBE5] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#FF5000,#FF8C42)" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(((material.maxLayerHeight - material.minLayerHeight) / 0.5) * 100, 100)}%` }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              />
            </div>
          </div>

          {/* Finish badge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#B8ADA4] uppercase tracking-wide">Finish:</span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#F5F0EA] text-[#3D3530] border border-[#EAE4DC]">
              {material.finish}
            </span>
          </div>

          {/* Spacer to push CTA to bottom */}
          <div className="flex-1" />

          {/* CTA row */}
          <div className="flex gap-2 pt-1 border-t border-[#F0EBE5]">
            <Link
              href={`${MATERIAL_PAGE_PATH}/${material.materialId}`}
              className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:gap-3 hover:shadow-lg hover:shadow-orange-200"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
            >
              View Details
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Quick View Strip (below card) ─────────────────── */}
      <motion.button
        onClick={() => onQuickView(material)}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        whileHover={{ backgroundColor: "rgba(255,80,0,0.06)" }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 mt-2 mx-1 py-2.5 rounded-2xl text-[12px] font-semibold text-[#B8ADA4] hover:text-[#FF5000] border border-dashed border-[#EAE4DC] hover:border-[#FF5000]/30 transition-colors duration-200"
      >
        <Eye size={13} strokeWidth={2.2} />
        <span>Quick View</span>
        <ChevronDown size={12} strokeWidth={2.5} className="opacity-60" />
      </motion.button>
    </div>
  );
};