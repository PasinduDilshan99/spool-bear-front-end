"use client";

import React from "react";
import { 
  Loader2, 
  Search, 
  Grid3x3, 
  List, 
  Filter, 
  Zap, 
  Layers, 
  Package,
  Star,
  Eye,
  Heart,
  ArrowRight,
  ChevronDown,
  Droplets,
  Thermometer,
  Ruler
} from "lucide-react";

const MaterialsLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple loading header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white shadow-sm rounded-full border border-gray-200">
            <Loader2 size={18} className="animate-spin text-[#FF5000]" />
            <span className="text-gray-600 text-sm font-medium">Loading materials...</span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-12 text-center">
          <div className="h-10 md:h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-3 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-96 max-w-full mx-auto animate-pulse"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="w-full h-12 bg-gray-100 rounded-xl animate-pulse"></div>
              <Search size={18} className="absolute left-3 top-3.5 text-gray-300" />
            </div>
            <div className="flex gap-3">
              <div className="w-32 h-12 bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-300" />
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Grid View Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 animate-pulse"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image Skeleton */}
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                
                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full bg-[#FF5000]/10" />
                
                {/* Badges Skeleton */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <div className="px-2.5 py-1 rounded-xl bg-gray-200 w-16 h-6"></div>
                </div>
                
                {/* Quick view button Skeleton */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-2xl bg-white/80 opacity-0 group-hover:opacity-100"></div>
                
                {/* Like button Skeleton */}
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-2xl bg-white/80"></div>
                
                {/* Colors strip Skeleton */}
                <div className="absolute bottom-3 left-3 flex gap-1">
                  <div className="flex -space-x-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Content Skeleton */}
              <div className="p-5 space-y-4">
                {/* Type and Name */}
                <div>
                  <div className="h-3 w-20 bg-gray-200 rounded mb-1 animate-pulse"></div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse"></div>
                </div>
                
                {/* Stat Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-6 w-16 bg-gray-100 rounded-xl animate-pulse"></div>
                  ))}
                </div>
                
                {/* Layer Height Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div className="h-full w-1/2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* Finish Badge */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-16 bg-gray-100 rounded-xl animate-pulse"></div>
                </div>
                
                {/* CTA Button */}
                <div className="h-10 w-full bg-gray-200 rounded-2xl animate-pulse mt-2"></div>
              </div>
              
              {/* Quick View Strip */}
              <div className="flex items-center justify-center gap-2 mt-2 mx-1 py-2.5 rounded-2xl border border-dashed border-gray-200">
                <Eye size={13} className="text-gray-300" />
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                <ChevronDown size={12} className="text-gray-300" />
              </div>
            </div>
          ))}
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

export default MaterialsLoading;