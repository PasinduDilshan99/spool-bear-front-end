// components/blog-components/BlogDetailsLoading.tsx
import React from "react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

const BlogDetailsLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#e4e7ec] relative">
      {/* Decorative Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${spoolbearTheme.colors.accent}1a 1px, transparent 1px), 
                           linear-gradient(90deg, ${spoolbearTheme.colors.accent}1a 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button Skeleton */}
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8">
              {/* Header Skeleton */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="w-3/4 h-12 bg-gray-200 rounded animate-pulse" />
                <div className="w-1/2 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Skeleton */}
              <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse my-8" />

              {/* Content Skeleton */}
              <div className="space-y-4">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mb-4" />
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsLoading;