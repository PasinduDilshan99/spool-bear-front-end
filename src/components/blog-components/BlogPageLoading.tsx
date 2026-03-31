// BlogPageLoading.tsx
import React from "react";
import { Filter, RotateCcw } from "lucide-react";

const BlogPageLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Header Skeleton */}
        <div className="text-center mb-8 md:mb-12">
          <div className="h-10 md:h-12 bg-gray-200 rounded-lg w-48 sm:w-56 md:w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 md:h-6 bg-gray-200 rounded-lg w-64 sm:w-72 md:w-80 mx-auto animate-pulse"></div>
        </div>

        {/* BlogFilter Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <div className="h-5 w-32 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <RotateCcw className="w-4 h-4 text-gray-400" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-11 bg-gray-100 border border-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-11 bg-gray-100 border border-gray-200 rounded-xl animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200"
              >
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Quick Sort Buttons */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="px-3 py-1.5 bg-gray-50 rounded-lg">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="h-6 sm:h-7 bg-gray-200 rounded w-32 animate-pulse"></div>

            {/* Items per page selector */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-9 w-28 bg-gray-100 border border-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, index) => (
              <BlogCardSkeleton key={index} delay={index * 100} />
            ))}
          </div>

          {/* Pagination Controls Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>

            <div className="flex items-center gap-1">
              <div className="h-8 bg-gray-200 rounded-md w-20 animate-pulse"></div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="h-8 bg-gray-200 rounded-md w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// BlogCardSkeleton Component
const BlogCardSkeleton = ({ delay = 0 }) => {
  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gray-200">
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Writer Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="space-y-1 flex-1">
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-2 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4 space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Stats */}
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-3 w-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageLoading;
