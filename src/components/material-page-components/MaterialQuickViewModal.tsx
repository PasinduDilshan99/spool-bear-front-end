"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Zap,
  Layers,
  Thermometer,
  Droplets,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { MATERIAL_PAGE_PATH } from "@/utils/urls";
import { MaterialQuickViewModalProps } from "@/types/material-types";
import {
  materialQuickViewModelFlexConfigData,
  materialQuickViewModelStrengthConfigData,
} from "@/data/materials-page-data";

const strengthConfig = materialQuickViewModelStrengthConfigData;

const flexConfig = materialQuickViewModelFlexConfigData;

const MetricBar = ({
  label,
  color,
  barColor,
  width,
  bg,
}: {
  label: string;
  color: string;
  barColor: string;
  width: string;
  bg: string;
}) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8ADA4]">
        {label}
      </span>
      <span
        className="text-[11px] font-bold px-2 py-0.5 rounded-lg"
        style={{ color, background: bg }}
      ></span>
    </div>
    <div className="h-1.5 bg-[#F0EBE5] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: barColor }}
        initial={{ width: 0 }}
        animate={{ width }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  </div>
);

const StatTile = ({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div
    className="flex flex-col gap-1.5 p-3.5 rounded-2xl"
    style={{
      background: accent
        ? "linear-gradient(135deg,#FF5000,#FF7A40)"
        : "#F7F5F2",
      border: accent ? "none" : "1px solid #EAE4DC",
    }}
  >
    <div className="flex items-center gap-1.5">
      <Icon
        size={12}
        strokeWidth={2.5}
        style={{ color: accent ? "rgba(255,255,255,0.8)" : "#B8ADA4" }}
      />
      <span
        className="text-[10px] font-bold uppercase tracking-widest"
        style={{ color: accent ? "rgba(255,255,255,0.75)" : "#B8ADA4" }}
      >
        {label}
      </span>
    </div>
    <span
      className="text-[15px] font-black leading-none"
      style={{ color: accent ? "#fff" : "#1C1714" }}
    >
      {value}
    </span>
  </div>
);

export const MaterialQuickViewModal: React.FC<MaterialQuickViewModalProps> = ({
  material,
  onClose,
}) => {
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState(false);

  if (!material) return null;

  const images = material.images ?? [];
  const strength =
    strengthConfig[material.strength as keyof typeof strengthConfig] ??
    strengthConfig.Medium;
  const flex =
    flexConfig[material.flexibility as keyof typeof flexConfig] ??
    flexConfig.Medium;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
        style={{
          background: "rgba(15,10,8,0.65)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white"
          style={{
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-3">
              {material.materialType?.name && (
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-xl text-white"
                  style={{
                    background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                  }}
                >
                  {material.materialType.name}
                </span>
              )}
              <h3 className="text-lg font-black text-[#1C1714]">
                {material.materialName}
              </h3>
              {material.isPopular && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FF5000]">
                  <Star size={10} fill="#FF5000" />
                  Popular
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-[#F5F0EA] transition-colors duration-150"
              title="Close"
            >
              <X
                size={18}
                strokeWidth={2.5}
                className="text-[#6B5F56] hover:text-red-600 cursor-pointer transition-colors duration-300"
              />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-[#F7F5F2]">
                <div
                  className="absolute bottom-0 left-0 w-28 h-28 rounded-tr-full opacity-15 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg,#FF5000,#FF8C42)",
                  }}
                />
                {images[activeImg] && !imgError ? (
                  <Image
                    src={images[activeImg]}
                    alt={material.materialName}
                    fill
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <Layers
                      size={44}
                      className="text-[#D6CEC6]"
                      strokeWidth={1.2}
                    />
                    <span className="text-xs text-[#B8ADA4] font-medium">
                      No preview
                    </span>
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  {material.isAvailable ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-white bg-emerald-500/90 backdrop-blur-sm shadow">
                      <CheckCircle2 size={10} />
                      In Stock
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-white bg-gray-700/80 backdrop-blur-sm">
                      Out of Stock
                    </span>
                  )}
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImg(
                          (i) => (i - 1 + images.length) % images.length,
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={14} className="text-[#3D3530]" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImg((i) => (i + 1) % images.length)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight size={14} className="text-[#3D3530]" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.slice(0, 5).map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-150"
                      style={{
                        border:
                          activeImg === idx
                            ? "2px solid #FF5000"
                            : "2px solid transparent",
                        opacity: activeImg === idx ? 1 : 0.55,
                      }}
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {material.colors && material.colors.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#F7F5F2] border border-[#EAE4DC]">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette
                      size={13}
                      strokeWidth={2}
                      className="text-[#B8ADA4]"
                    />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8ADA4]">
                      Available Colors ({material.colors.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {material.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-1 group/swatch"
                      >
                        <div
                          className="w-8 h-8 rounded-xl border-2 border-white shadow-sm ring-1 ring-black/8 transition-transform duration-150 group-hover/swatch:scale-110"
                          style={{ backgroundColor: color.hexCode }}
                          title={color.colorName}
                        />
                        <span className="text-[9px] text-[#B8ADA4] font-medium text-center leading-tight max-w-[36px] truncate">
                          {color.colorName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-sm text-[#6B5F56] leading-relaxed">
                {material.materialDescription}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <StatTile
                  icon={Droplets}
                  label="Density"
                  value={`${material.density} g/cm³`}
                />
                <StatTile
                  icon={Thermometer}
                  label="Max Temp"
                  value={material.temperatureResistance}
                />
                <StatTile
                  icon={Ruler}
                  label="Layer"
                  value={`${material.minLayerHeight}–${material.maxLayerHeight} mm`}
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1 px-3.5 py-3 rounded-2xl bg-[#F7F5F2] border border-[#EAE4DC]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8ADA4] mb-0.5">
                    Finish
                  </div>
                  <div className="text-sm font-bold text-[#3D3530]">
                    {material.finish}
                  </div>
                </div>
                {material.materialType?.name && (
                  <div className="flex-1 px-3.5 py-3 rounded-2xl bg-[#F7F5F2] border border-[#EAE4DC]">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8ADA4] mb-0.5">
                      Type
                    </div>
                    <div className="text-sm font-bold text-[#3D3530]">
                      {material.materialType.name}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F5F2] border border-[#EAE4DC] space-y-4">
                <MetricBar
                  label="Strength"
                  color={strength.color}
                  barColor={strength.bar}
                  width={strength.width}
                  bg={strength.bg}
                />
                <MetricBar
                  label="Flexibility"
                  color={flex.color}
                  barColor={flex.bar}
                  width={flex.width}
                  bg={flex.bg}
                />
              </div>

              {material.properties?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap
                      size={13}
                      strokeWidth={2.5}
                      className="text-[#FF5000]"
                    />
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#3D3530]">
                      Properties
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {material.properties.map((prop, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#EAE4DC]"
                      >
                        <div className="text-[10px] text-[#B8ADA4] font-semibold mb-0.5">
                          {prop.propertyName}
                        </div>
                        <div className="text-[13px] font-bold text-[#3D3530]">
                          {prop.propertyValue}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(material.pros?.length > 0 || material.cons?.length > 0) && (
                <div className="grid grid-cols-2 gap-3">
                  {/* Pros */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">
                        Pros
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {material.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-1.5 text-[12px] text-emerald-800 leading-snug"
                        >
                          <span className="mt-0.5 text-emerald-400 flex-shrink-0">
                            •
                          </span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <XCircle size={13} className="text-red-400" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-red-500">
                        Cons
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {material.cons.map((con, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-1.5 text-[12px] text-red-800 leading-snug"
                        >
                          <span className="mt-0.5 text-red-300 flex-shrink-0">
                            •
                          </span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="sticky bottom-0 px-6 py-4 flex items-center justify-between gap-4"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div></div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="cursor-pointer px-5 py-2.5 rounded-2xl text-sm font-bold text-[#6B5F56] bg-[#F5F0EA] hover:bg-[#EAE4DC] transition-colors duration-150"
              >
                Close
              </button>
              <Link
                href={`${MATERIAL_PAGE_PATH}/${material.materialId}?name=${material.materialName}`}
                className="group/cta flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white hover:shadow-lg hover:shadow-orange-200 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                }}
                onClick={onClose}
              >
                Full Details
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
