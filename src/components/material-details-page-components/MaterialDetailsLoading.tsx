// components/material-details-page-components/MaterialDetailsLoading.tsx
"use client";

import React from "react";
import {
  Loader2,
  ArrowLeft,
  Star,
  CheckCircle2,
  Layers,
  Droplets,
  Thermometer,
  Ruler,
  Sparkles,
  Zap,
  Palette,
  TrendingUp,
  CheckCircle,
  XCircle,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MaterialDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple loading header */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white shadow-sm rounded-full border border-gray-200">
            <Loader2 size={18} className="animate-spin text-[#FF5000]" />
            <span className="text-gray-600 text-sm font-medium">
              Loading material details...
            </span>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl w-32 h-10 bg-white border border-gray-200 animate-pulse">
            <ArrowLeft size={15} className="text-gray-400" />
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: Image Gallery Skeleton */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="flex flex-col gap-4">
              {/* Main Image Skeleton */}
              <div className="relative overflow-hidden rounded-3xl bg-gray-100 aspect-square animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-tr-full opacity-15 bg-[#FF5000]/20" />
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-8 bg-[#FF5000]/10" />

                {/* Badges Skeleton */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-200 w-28 h-7 animate-pulse"></div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-300 w-20 h-7 animate-pulse"></div>
                </div>

                {/* Navigation Arrows Skeleton */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ChevronLeft size={18} className="text-gray-400" />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ChevronRight size={18} className="text-gray-400" />
                </div>

                {/* Dot Indicators Skeleton */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full bg-gray-400"
                      style={{ width: i === 0 ? "20px" : "6px" }}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip Skeleton */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 animate-pulse"
                    style={{ animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Material Info Skeleton */}
          <div className="space-y-7">
            {/* Material Info */}
            <div className="space-y-4">
              {/* Type Badge */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-200 w-28 h-7 animate-pulse"></div>
              </div>

              {/* Name */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="h-10 md:h-12 lg:h-14 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="h-8 w-24 bg-orange-100 rounded-lg animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded mt-1 animate-pulse"></div>
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
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Specifications Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-1 rounded-full bg-[#FF5000]" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative p-4 rounded-2xl bg-white border border-gray-200 animate-pulse"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-xl bg-gray-100"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-5 w-24 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Tags Skeleton */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-1 rounded-full bg-[#FF5000]" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 bg-gray-300 rounded"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-20 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Properties Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-1 rounded-full bg-[#FF5000]" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <Zap size={12} className="text-gray-300" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 rounded-2xl border border-gray-200 bg-white animate-pulse"
                  >
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors Skeleton */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 rounded-full bg-[#FF5000]" />
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  <Palette size={12} className="text-gray-300" />
                </div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-10 h-10 rounded-2xl bg-gray-200 animate-pulse"
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-1 rounded-full bg-[#FF5000]" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <TrendingUp size={12} className="text-gray-300" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Pros Skeleton */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 animate-pulse">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={15} className="text-gray-400" />
                    <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cons Skeleton */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 animate-pulse">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={15} className="text-gray-400" />
                    <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="flex-1 h-12 rounded-2xl bg-[#FF5000]/20 animate-pulse"></div>
              <div className="flex-1 h-12 rounded-2xl bg-gray-100 border-2 border-gray-200 animate-pulse"></div>
            </div>

            {/* Shipping Info Skeleton */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200 animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <Package size={14} className="text-gray-300" />
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
              </div>
              <div className="h-3 w-48 bg-gray-200 rounded mt-1"></div>
            </div>
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

export default MaterialDetailsLoading;
