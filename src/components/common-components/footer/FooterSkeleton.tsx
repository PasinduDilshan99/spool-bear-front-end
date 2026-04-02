// FooterSkeleton.tsx
"use client";
import React from "react";

const FooterSkeleton = () => {
  return (
    <footer
      className="relative py-20"
      style={{
        background: "#101113",
        backgroundImage: `linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
        color: "#fff",
        position: "relative" as const,
      }}
    >
      <div className="mx-auto px-[4vw] relative z-10" style={{ maxWidth: "3120px" }}>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-16">
          {/* Column 1 Skeleton */}
          <div>
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-5 w-32 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 Skeleton */}
          <div>
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-5 w-28 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3 Skeleton */}
          <div>
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-5 w-36 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4 Skeleton */}
          <div>
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-5 w-40 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          {/* Divider line skeleton */}
          <div className="animate-pulse">
            <div className="h-[2px] w-[min(720px,78%)] bg-white/10"></div>
          </div>
          
          {/* Brand logo skeleton */}
          <div className="animate-pulse">
            <div
              className="font-black bg-white/5 rounded"
              style={{
                fontSize: "64px",
                letterSpacing: "-0.03em",
                width: "200px",
                height: "76px",
              }}
            ></div>
          </div>
          
          {/* Copyright skeleton */}
          <div className="animate-pulse">
            <div className="h-4 w-48 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Enhanced version with shimmer effect
export const FooterSkeletonWithShimmer = () => {
  return (
    <footer
      className="relative py-20 overflow-hidden"
      style={{
        background: "#101113",
        backgroundImage: `linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
        color: "#fff",
        position: "relative" as const,
      }}
    >
      <div className="mx-auto px-[4vw] relative z-10" style={{ maxWidth: "3120px" }}>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-16">
          {[1, 2, 3, 4].map((col) => (
            <div key={col}>
              <div className="relative overflow-hidden">
                <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-5 w-32 bg-white/10 rounded"></div>
                  ))}
                </div>
                <div className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="relative overflow-hidden w-full flex justify-center">
            <div className="h-[2px] w-[min(720px,78%)] bg-white/10"></div>
            <div className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
          </div>
          
          <div className="relative overflow-hidden">
            <div
              className="bg-white/5 rounded"
              style={{
                fontSize: "64px",
                letterSpacing: "-0.03em",
                width: "200px",
                height: "76px",
              }}
            ></div>
            <div className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="h-4 w-48 bg-white/10 rounded"></div>
            <div className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

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
    </footer>
  );
};

// Responsive skeleton that adapts to screen size
export const ResponsiveFooterSkeleton = () => {
  return (
    <footer
      className="relative py-20"
      style={{
        background: "#101113",
        backgroundImage: `linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
        color: "#fff",
        position: "relative" as const,
      }}
    >
      <div className="mx-auto px-[4vw] relative z-10" style={{ maxWidth: "3120px" }}>
        {/* Mobile: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-16">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
            <div className="space-y-3">
              <div className="h-5 w-32 bg-white/10 rounded"></div>
              <div className="h-5 w-28 bg-white/10 rounded"></div>
              <div className="h-5 w-36 bg-white/10 rounded"></div>
              <div className="h-5 w-40 bg-white/10 rounded"></div>
            </div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
            <div className="space-y-3">
              <div className="h-5 w-28 bg-white/10 rounded"></div>
              <div className="h-5 w-32 bg-white/10 rounded"></div>
              <div className="h-5 w-36 bg-white/10 rounded"></div>
            </div>
          </div>
          {/* Hide last two columns on mobile, show on desktop */}
          <div className="hidden sm:block animate-pulse">
            <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
            <div className="space-y-3">
              <div className="h-5 w-40 bg-white/10 rounded"></div>
              <div className="h-5 w-32 bg-white/10 rounded"></div>
              <div className="h-5 w-36 bg-white/10 rounded"></div>
            </div>
          </div>
          <div className="hidden sm:block animate-pulse">
            <div className="h-4 w-24 bg-orange-500/30 rounded mb-5"></div>
            <div className="space-y-3">
              <div className="h-5 w-28 bg-white/10 rounded"></div>
              <div className="h-5 w-32 bg-white/10 rounded"></div>
              <div className="h-5 w-36 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="animate-pulse w-full flex justify-center">
            <div className="h-[2px] w-[min(720px,78%)] bg-white/10"></div>
          </div>
          <div className="animate-pulse">
            <div
              className="bg-white/5 rounded"
              style={{
                width: "180px",
                height: "60px",
              }}
            ></div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 w-56 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;