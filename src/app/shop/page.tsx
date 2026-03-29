// app/products/page.tsx
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ProductsPage from "@/pages/ProductsPage";
import { Metadata } from "next";
import { SHOP_PAGE_TITLE } from "@/utils/headerTitle";

export const metadata: Metadata = {
  title: SHOP_PAGE_TITLE,
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#ff5000]" />
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}
