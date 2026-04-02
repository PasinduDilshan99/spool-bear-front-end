// components/blog-components/BlogDetailsLoading.tsx
import React from "react";

const BlogDetailsLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6 md:p-8">
                {/* Header Skeleton */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse" />
                    <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                  <div className="w-3/4 h-10 bg-gray-200 rounded animate-pulse" />
                  <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Image Skeleton */}
                <div className="w-full h-96 bg-gray-200 rounded-xl animate-pulse mb-8" />

                {/* Content Skeleton */}
                <div className="space-y-4">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse mt-4" />
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            {/* Author Card Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mb-4" />
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Related Posts Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsLoading;
