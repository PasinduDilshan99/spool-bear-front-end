// components/cart/CartSkeleton.tsx
"use client";

import React from "react";

export function CartSkeleton() {
  return (
    <div className="min-h-screen bg-[#e4e7ec]">
      <div
        className="container mx-auto"
        style={{
          maxWidth: "1300px",
          padding: "clamp(32px, 5vw, 72px) clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-xl bg-gray-200 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                        <div className="w-10 h-8 bg-gray-200 rounded animate-pulse" />
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-8">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-3 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse mb-3" />
              <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}