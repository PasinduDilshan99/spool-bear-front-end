"use client";
import React from "react";

const NavBarSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      <div className="backdrop-blur-md border-b shadow-lg sticky top-0 z-50 bg-white/97 border-orange-200/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="animate-pulse">
                <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Desktop Navigation Skeleton */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="animate-pulse flex space-x-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-9 w-20 bg-gray-200 rounded-md"
                  ></div>
                ))}
                {/* Auth buttons skeleton */}
                <div className="h-9 w-24 bg-gray-200 rounded-md ml-4"></div>
                <div className="h-9 w-24 bg-orange-200 rounded-md"></div>
              </div>
            </div>

            {/* Mobile Menu Button Skeleton */}
            <div className="flex items-center lg:hidden">
              <div className="animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional: More detailed skeleton with shimmer effect
export const NavBarSkeletonWithShimmer = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950">
      <div className="backdrop-blur-md border-b shadow-lg sticky top-0 z-50 bg-white/97 border-orange-200/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section with Shimmer */}
            <div className="flex items-center">
              <div className="relative overflow-hidden">
                <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
                <div className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Desktop Navigation Shimmer */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="relative overflow-hidden flex space-x-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-9 w-20 bg-gray-200 rounded-md"
                  ></div>
                ))}
                <div className="h-9 w-24 bg-gray-200 rounded-md ml-4"></div>
                <div className="h-9 w-24 bg-orange-200 rounded-md"></div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>

            {/* Mobile Menu Button Shimmer */}
            <div className="flex items-center lg:hidden">
              <div className="relative overflow-hidden">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
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

export default NavBarSkeleton;