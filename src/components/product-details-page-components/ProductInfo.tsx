// components/product-details-page-components/ProductInfo.tsx
"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product-types";
import { ColorSwatches } from "./ColorSwatches";
import { ProductActions } from "./ProductActions";
import { ProductSpecs } from "./ProductSpecs";
import { Wrench, CheckCircle2, XCircle } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductInfoProps {
  product: Product;
  isWished: boolean;
  visible: boolean;
  onWishlistToggle: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export function ProductInfo({
  product,
  isWished,
  visible,
  onWishlistToggle,
}: ProductInfoProps) {
  const { formatPrice, currentCurrency } = useCurrency();
  const inStock = product.stockQuantity > 0;
  const showOriginalPrice = currentCurrency.code !== "LKR";
  const formattedPrice = formatPrice(product.price);

  if (!visible) return null;

  return (
    <div className="space-y-6">
      {/* Category + Type breadcrumb */}
      <motion.div
        {...fadeUp(0.08)}
        className="flex items-center gap-2 flex-wrap"
      >
        <span
          className="px-3 py-1.5 rounded-xl font-black uppercase tracking-[0.18em] text-white text-[10px]"
          style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
        >
          {product.categoryName}
        </span>
        <span className="text-[#D6CEC6]">·</span>
        <span className="text-[11px] font-bold text-[#B8ADA4] uppercase tracking-widest">
          {product.typeName}
        </span>
      </motion.div>

      {/* Product name */}
      <motion.h1
        {...fadeUp(0.12)}
        className="font-black text-[#1C1714] tracking-tight leading-[1.04]"
        style={{
          fontSize: "clamp(26px, 3.8vw, 46px)",
          letterSpacing: "-0.03em",
          fontFamily: "'Fraunces','Georgia',serif",
        }}
      >
        {product.productName}
      </motion.h1>

      {/* Price + Stock row */}
      <motion.div {...fadeUp(0.16)} className="flex items-end gap-4 flex-wrap">
        <div>
          <div
            className="font-black text-[#FF5000] leading-none"
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontFamily: "'Fraunces','Georgia',serif",
            }}
          >
            {formattedPrice}
          </div>
          {showOriginalPrice && (
            <div className="text-[11px] text-[#B8ADA4] font-semibold mt-1">
              LKR {product.price.toFixed(2)} original
            </div>
          )}
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8ADA4] mt-0.5">
            per unit
          </div>
        </div>

        <div className="flex items-center gap-2 mb-1">
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
              <CheckCircle2 size={11} strokeWidth={2.5} />
              {product.stockQuantity} in stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200">
              <XCircle size={11} strokeWidth={2.5} />
              Out of stock
            </span>
          )}

          {product.isCustomizable && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black text-white"
              style={{ background: "linear-gradient(135deg,#1A1A1A,#3D3530)" }}
            >
              <Wrench size={10} strokeWidth={2.5} />
              Customizable
            </span>
          )}
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="h-px bg-gradient-to-r from-[#FF5000]/20 via-[#EAE4DC] to-transparent"
      />

      {/* Description */}
      <motion.div
        {...fadeUp(0.22)}
        className="relative p-5 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#F7F5F2,#FDF8F5)",
          border: "1px solid #EAE4DC",
        }}
      >
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(225deg,#FF5000,transparent)" }}
        />
        <p className="text-[14px] text-[#6B5F56] leading-relaxed font-medium relative z-10">
          {product.productDescription}
        </p>
      </motion.div>

      {/* Colors */}
      {product.colors?.length > 0 && (
        <motion.div {...fadeUp(0.26)}>
          <ColorSwatches colors={product.colors} />
        </motion.div>
      )}

      {/* CTA Buttons */}
      <motion.div {...fadeUp(0.3)}>
        <ProductActions
          inStock={inStock}
          isWished={isWished}
          onWishlistToggle={onWishlistToggle}
          productId={product.productId}
          productName={product.productName}
          productPrice={product.price}
          stockQuantity={product.stockQuantity}
          colors={product.colors || []}
          material={product.materialName || undefined}
          materialId={product.materialId || undefined}
          type={product.typeName}
          typeId={product.typeId}
        />
      </motion.div>

      {/* Specs */}
      <ProductSpecs product={product} />
    </div>
  );
}
