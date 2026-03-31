// GalleryHomeSkeleton.tsx
"use client";
import React from "react";
import { Layers } from "lucide-react";

interface GalleryHomeSkeletonProps {
  isMobile?: boolean;
  isTablet?: boolean;
  isLaptop?: boolean;
}

const GalleryHomeSkeleton: React.FC<GalleryHomeSkeletonProps> = ({
  isMobile = false,
  isTablet = false,
  isLaptop = false,
}) => {
  const getImageDimensions = () => {
    if (isMobile) return { width: 160, height: 160 };
    if (isTablet) return { width: 200, height: 200 };
    if (isLaptop) return { width: 240, height: 240 };
    return { width: 280, height: 280 };
  };

  const { width, height } = getImageDimensions();
  const numberOfRows = isMobile ? 2 : 3;
  const imagesPerRow = 6;

  return (
    <div className="bg-[#F7F7F7] py-6 sm:py-10 px-2 sm:px-4">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      {/* Carousel Rows Skeleton */}
      <div className="space-y-3 sm:space-y-4 max-w-full mx-auto">
        {[...Array(numberOfRows)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="relative overflow-hidden py-2"
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#F7F7F7] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#F7F7F7] to-transparent z-10 pointer-events-none" />
            
            {/* Images Row */}
            <div className="flex gap-3 sm:gap-4" style={{ width: "fit-content" }}>
              {[...Array(imagesPerRow)].map((_, index) => (
                <div
                  key={`${rowIndex}-${index}`}
                  className="flex-shrink-0 rounded-xl bg-gray-200 overflow-hidden relative"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Pulse animation */}
                  <div
                    className="absolute inset-0"
                    style={{
                      animation: "pulse 1.5s ease-in-out infinite",
                      animationDelay: `${rowIndex * 100 + index * 50}ms`,
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                  
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,80,0,0.08) 50%, transparent 100%)",
                      animation: "shimmer 1.8s infinite",
                      backgroundSize: "200% 100%",
                    }}
                  />
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers size={24} className="text-gray-300" />
                  </div>
                  
                  {/* Hover overlay skeleton */}
                  <div className="absolute inset-0 bg-black/0" />
                  
                  {/* Orange corner accent skeleton */}
                  <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 bg-[#FF5000]/30 rotate-45 -translate-x-4 -translate-y-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Loading Toast */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-3 px-5 py-3 bg-[#1A1A1A] rounded-full shadow-xl">
          <div className="w-4 h-4 rounded-full border-2 border-[#FF5000] border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-white/80">
            Loading gallery...
          </span>
        </div>
      </div>
    </div>
  );
};

// Enhanced version with more detailed skeleton
export const GalleryHomeSkeletonDetailed = () => {
  return (
    <div className="bg-[#F7F7F7] py-6 sm:py-10 px-2 sm:px-4">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .shimmer-overlay {
          position: relative;
          overflow: hidden;
        }
        .shimmer-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,80,0,0.1), transparent);
          animation: shimmer 1.5s infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Header Suggestion */}
      <div className="max-w-7xl mx-auto mb-8 px-4">
        <div className="text-center shimmer-overlay">
          <div className="inline-block">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
            <div className="h-1 w-16 bg-orange-300/50 rounded-full mx-auto mt-3 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Carousel Rows */}
      <div className="space-y-4">
        {[1, 2, 3].map((row) => (
          <div key={row} className="relative overflow-hidden py-3">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F7F7F7] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F7F7F7] to-transparent z-10" />
            
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="flex-shrink-0 rounded-xl bg-gray-200 overflow-hidden relative shimmer-overlay"
                  style={{
                    width: "clamp(160px, 20vw, 280px)",
                    height: "clamp(160px, 20vw, 280px)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      animation: `pulse 1.5s ease-in-out infinite`,
                      animationDelay: `${(row - 1) * 200 + item * 50}ms`,
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300/50 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-3 px-6 py-3 bg-[#1A1A1A] rounded-full shadow-lg">
          <div className="relative">
            <div className="w-5 h-5 rounded-full border-2 border-[#FF5000]/30 border-t-[#FF5000] animate-spin" />
          </div>
          <span className="text-sm font-semibold text-white/90 tracking-wide">
            Loading Gallery
          </span>
          <div className="flex gap-1 ml-1">
            {[0, 0.15, 0.3].map((delay) => (
              <div
                key={delay}
                className="w-1.5 h-1.5 rounded-full bg-[#FF5000]"
                style={{
                  animation: "pulse 1s ease-in-out infinite",
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-full bg-orange-300/40 animate-pulse"
            style={{
              width: "clamp(4px, 0.8vw, 6px)",
              height: "clamp(4px, 0.8vw, 6px)",
              animationDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Mobile-optimized skeleton
export const GalleryHomeSkeletonMobile = () => {
  return (
    <div className="bg-[#F7F7F7] py-4 px-2">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="space-y-3">
        {[1, 2].map((row) => (
          <div key={row} className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F7F7F7] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F7F7F7] to-transparent z-10" />
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="flex-shrink-0 rounded-lg bg-gray-200 overflow-hidden relative"
                  style={{
                    width: "140px",
                    height: "140px",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      animation: `pulse 1.2s ease-in-out infinite`,
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gray-300/50 animate-pulse" />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,80,0,0.08), transparent)",
                      animation: "shimmer 1.5s infinite",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Loading Toast */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] rounded-full shadow-lg">
          <div className="w-3 h-3 rounded-full border-2 border-[#FF5000] border-t-transparent animate-spin" />
          <span className="text-xs font-medium text-white/80">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

// Skeleton with actual carousel animation simulation
export const GalleryHomeSkeletonWithAnimation = () => {
  return (
    <div className="bg-[#F7F7F7] py-6 sm:py-10 px-2 sm:px-4 overflow-hidden">
      <style jsx>{`
        @keyframes scroll-left-skeleton {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-scroll-skeleton {
          animation: scroll-left-skeleton 30s linear infinite;
        }
        .animate-scroll-skeleton:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="space-y-4">
        {[1, 2, 3].map((row) => (
          <div key={row} className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F7F7F7] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F7F7F7] to-transparent z-10" />
            
            <div className="animate-scroll-skeleton flex gap-4" style={{ width: "fit-content" }}>
              {/* Double the items for infinite scroll effect */}
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-xl bg-gray-200 overflow-hidden relative"
                  style={{
                    width: "clamp(160px, 20vw, 280px)",
                    height: "clamp(160px, 20vw, 280px)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers size={30} className="text-gray-300 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Loading Status */}
      <div className="flex justify-center mt-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF5000] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-[#FF5000] animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-[#FF5000] animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="text-xs font-medium text-gray-400">Preparing gallery...</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryHomeSkeleton;