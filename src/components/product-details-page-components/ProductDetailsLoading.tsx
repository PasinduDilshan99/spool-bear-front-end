// components/product-details-page-components/ProductDetailsLoading.tsx
"use client";

import React from "react";
import {
  Loader2,
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Package,
  Tag,
  Layers,
  Box,
  Wrench,
  Palette,
  MessageCircle,
  ThumbsUp,
  Eye,
  Calendar,
  User,
  ImageIcon,
  Activity,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple loading header */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white shadow-sm rounded-full border border-gray-200">
            <Loader2 size={18} className="animate-spin text-[#FF5000]" />
            <span className="text-gray-600 text-sm font-medium">
              Loading product details...
            </span>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto relative z-10"
        style={{
          maxWidth: "1300px",
          padding: "clamp(32px,5vw,72px) clamp(16px,4vw,64px)",
        }}
      >
        {/* Back Button Skeleton */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl w-36 h-10 bg-white border border-gray-200 animate-pulse">
            <ArrowLeft size={15} className="text-gray-400" />
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20">
          {/* LEFT: Gallery Skeleton */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-3">
              {/* Main Image Skeleton */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />

                {/* Orange corner accent */}
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-[#FF5000]/20 border-b-[40px] border-b-transparent" />

                {/* Navigation Arrows Skeleton */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ChevronLeft size={18} className="text-gray-400" />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>

              {/* Thumbnails Skeleton */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 relative rounded-xl overflow-hidden bg-gray-100 animate-pulse"
                    style={{
                      width: "clamp(52px, 7vw, 72px)",
                      height: "clamp(52px, 7vw, 72px)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info Skeleton */}
          <div className="space-y-6">
            {/* Category + Type Breadcrumb */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3 py-1.5 rounded-xl bg-gray-200 w-24 h-7 animate-pulse"></div>
              <span className="text-gray-300">·</span>
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <div className="h-10 md:h-12 lg:h-14 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-8 md:h-9 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
            </div>

            {/* Price + Stock Row */}
            <div className="flex items-end gap-4 flex-wrap">
              <div>
                <div className="h-10 md:h-12 bg-orange-100 rounded-lg w-32 animate-pulse"></div>
                <div className="h-3 w-20 bg-gray-200 rounded mt-1 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 w-28 h-8 animate-pulse"></div>
                <div className="px-3 py-1.5 rounded-xl bg-gray-800 w-24 h-8 animate-pulse"></div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#FF5000]/20 via-gray-200 to-transparent" />

            {/* Description Skeleton */}
            <div className="relative p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Colors Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette size={12} className="text-gray-300" />
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2.5 p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-2xl bg-gray-200 animate-pulse"
                    style={{ animationDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 h-12 rounded-2xl bg-[#FF5000]/20 animate-pulse"></div>
              <div className="flex-1 h-12 rounded-2xl bg-gray-100 border-2 border-gray-200 animate-pulse"></div>
            </div>

            {/* Specs Skeleton */}
            <div className="rounded-3xl overflow-hidden bg-white border border-gray-200">
              <div className="h-1 bg-[#FF5000]/30" />
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-200 animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="px-5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 py-3.5 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-7 h-7 rounded-xl bg-gray-100 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-2 w-16 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="mt-16">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-9 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-gray-200 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 w-16 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Rating Distribution Skeleton */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} className="text-gray-300" />
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div>
                        <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-gray-200 fill-gray-200"
                              />
                            ))}
                          </div>
                          <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                  </div>

                  {/* Images Skeleton */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-gray-100"
                      />
                    ))}
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <MessageCircle size={16} className="text-gray-300" />
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity size={16} className="text-gray-300" />
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex gap-3">
                  <div className="flex-1 h-10 bg-gray-100 rounded-xl"></div>
                  <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsLoading;
