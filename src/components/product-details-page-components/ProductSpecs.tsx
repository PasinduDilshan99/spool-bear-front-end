// components/product-details-page-components/ProductSpecs.tsx
"use client";

import { motion } from "framer-motion";
import { Package, Tag, Layers, Box, Wrench, Palette } from "lucide-react";
import { Product } from "@/types/product-types";

interface ProductSpecsProps {
  product: Product;
}

interface SpecRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  delay?: number;
  accent?: boolean;
}

function SpecRow({
  icon,
  label,
  value,
  delay = 0,
  accent = false,
}: SpecRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-start gap-3.5 py-3.5 border-b border-[#F0EBE5] last:border-0"
    >
      <div
        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: accent
            ? "linear-gradient(135deg,#FF5000,#FF7A40)"
            : "rgba(255,80,0,0.07)",
        }}
      >
        <span style={{ color: accent ? "#fff" : "#FF5000" }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#B8ADA4] mb-0.5">
          {label}
        </div>
        <div className="text-[13px] font-bold text-[#1C1714] leading-snug">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.38 }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAE4DC",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
        }}
      />

      {/* Header */}
      <div className="px-5 py-4 border-b border-[#F0EBE5] flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
        >
          <Package size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <h3
          className="font-black text-[#1C1714] text-[14px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "'Fraunces','Georgia',serif" }}
        >
          Product Details
        </h3>
      </div>

      {/* Rows */}
      <div className="px-5">
        <SpecRow
          icon={<Tag size={13} strokeWidth={2.5} />}
          label="Category"
          value={
            <span>
              {product.categoryName}{" "}
              <span className="text-[#B8ADA4] font-semibold">·</span>{" "}
              {product.typeName}
            </span>
          }
          delay={0.42}
        />
        {product.materialName && (
          <SpecRow
            icon={<Layers size={13} strokeWidth={2.5} />}
            label="Material"
            value={
              product.materialDescription
                ? `${product.materialName} — ${product.materialDescription}`
                : product.materialName
            }
            delay={0.46}
          />
        )}
        <SpecRow
          icon={<Box size={13} strokeWidth={2.5} />}
          label="Stock"
          value={
            <span
              style={{
                color: product.stockQuantity > 0 ? "#10b981" : "#ef4444",
              }}
            >
              {product.stockQuantity > 0
                ? `${product.stockQuantity} units available`
                : "Out of stock"}
            </span>
          }
          delay={0.5}
        />
        <SpecRow
          icon={<Wrench size={13} strokeWidth={2.5} />}
          label="Customizable"
          value={
            <span
              style={{ color: product.isCustomizable ? "#FF5000" : "#B8ADA4" }}
            >
              {product.isCustomizable ? "Yes — custom options available" : "No"}
            </span>
          }
          delay={0.54}
          accent={product.isCustomizable}
        />
        {product.colors?.length > 0 && (
          <SpecRow
            icon={<Palette size={13} strokeWidth={2.5} />}
            label="Available Colors"
            value={
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {product.colors.map((c, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.56 + i * 0.04 }}
                    className="px-2.5 py-0.5 rounded-xl text-[10px] font-bold bg-[#F7F5F2] text-[#3D3530] border border-[#EAE4DC]"
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            }
            delay={0.56}
          />
        )}
      </div>
    </motion.div>
  );
}
