// components/product-details-page-components/ProductInfo.tsx
"use client";

import { Product } from "@/types/product-types";
import { ColorSwatches } from "./ColorSwatches";
import { ProductActions } from "./ProductActions";
import { ProductSpecs } from "./ProductSpecs";
import { Wrench } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductInfoProps {
  product: Product;
  isWished: boolean;
  visible: boolean;
  onWishlistToggle: () => void;
}

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
  const originalPrice = product.price;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(20px)",
        transition:
          "opacity 0.65s 0.1s ease-out, transform 0.65s 0.1s ease-out",
      }}
    >
      {/* Category + Type breadcrumb */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="px-2.5 py-1 rounded-full font-black uppercase tracking-widest text-[#FF5000] bg-orange-50 border border-orange-200"
          style={{ fontSize: "clamp(8px, 0.85vw, 10px)" }}
        >
          {product.categoryName}
        </span>
        <span className="text-gray-300">·</span>
        <span
          className="font-bold text-gray-400"
          style={{ fontSize: "clamp(10px, 1vw, 12px)" }}
        >
          {product.typeName}
        </span>
      </div>

      {/* Product name */}
      <h1
        className="font-black text-[#101113] tracking-tight leading-[1.06] mb-4"
        style={{
          fontSize: "clamp(22px, 3.5vw, 44px)",
          letterSpacing: "-0.03em",
        }}
      >
        {product.productName}
      </h1>

      {/* Price + stock row */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <div>
          <span
            className="font-black text-[#FF5000]"
            style={{ fontSize: "clamp(24px, 3.5vw, 42px)", lineHeight: 1 }}
          >
            {formattedPrice}
          </span>
          {showOriginalPrice && (
            <span
              className="ml-2 text-sm text-gray-400 line-through"
              style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
            >
              LKR {originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: inStock ? "#22c55e" : "#ef4444" }}
          />
          <span
            className="font-bold"
            style={{
              fontSize: "clamp(11px, 1.1vw, 13px)",
              color: inStock ? "#22c55e" : "#ef4444",
            }}
          >
            {inStock ? `${product.stockQuantity} in stock` : "Out of stock"}
          </span>
        </div>

        {product.isCustomizable && (
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1A1A] text-white font-black uppercase tracking-widest"
            style={{ fontSize: "clamp(8px, 0.85vw, 10px)" }}
          >
            <Wrench size={10} />
            Customizable
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className="text-[#2b2e33] font-medium leading-relaxed mb-6"
        style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
      >
        {product.productDescription}
      </p>

      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <ColorSwatches colors={product.colors} />
        </div>
      )}

      {/* CTA buttons */}
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

      {/* Specs card */}
      <ProductSpecs product={product} />
    </div>
  );
}