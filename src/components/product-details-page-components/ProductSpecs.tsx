// components/product/ProductSpecs.tsx
import { Package, Tag, Layers, Box, Wrench, Palette } from "lucide-react";
import { Product } from "@/types/product-types";
import { SpecRow } from "./SpecRow";

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="h-1 bg-[#FF5000]" />
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
          <Package size={14} className="text-[#FF5000]" />
        </div>
        <h3
          className="font-black text-[#101113]"
          style={{ fontSize: "clamp(12px, 1.3vw, 15px)" }}
        >
          Product Details
        </h3>
      </div>
      <div className="px-5">
        <SpecRow
          icon={<Tag size={13} />}
          label="Category"
          value={`${product.categoryName} · ${product.typeName}`}
        />
        {product.materialName && (
          <SpecRow
            icon={<Layers size={13} />}
            label="Material"
            value={
              product.materialDescription
                ? `${product.materialName} — ${product.materialDescription}`
                : product.materialName
            }
          />
        )}
        <SpecRow
          icon={<Box size={13} />}
          label="Stock Quantity"
          value={`${product.stockQuantity} units`}
        />
        <SpecRow
          icon={<Wrench size={13} />}
          label="Customizable"
          value={
            <span
              className={
                product.isCustomizable ? "text-[#FF5000]" : "text-gray-500"
              }
            >
              {product.isCustomizable ? "Yes — custom options available" : "No"}
            </span>
          }
        />
        {product.colors.length > 0 && (
          <SpecRow
            icon={<Palette size={13} />}
            label="Available Colors"
            value={
              <div className="flex flex-wrap gap-1.5 mt-1">
                {product.colors.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-[#101113]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
