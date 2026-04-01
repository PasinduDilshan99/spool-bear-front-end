// NoDesignSectionSkeleton.tsx
"use client";
import React from "react";

const NoDesignSectionSkeleton = () => {
  return (
    <section className="relative bg-[#EBEBEB] overflow-hidden">
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF5000 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.045,
        }}
      />

      {/* Orange vertical accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF5000] hidden lg:block" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-7xl py-16 sm:py-20 md:py-24 lg:py-32 xl:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-center">
          {/* LEFT: Text content skeleton */}
          <div className="order-2 lg:order-1">
            {/* Badge skeleton */}
            <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-7 animate-pulse">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-200 rounded-xl rotate-6 flex-shrink-0" />
              <div className="w-20 h-3 bg-orange-200 rounded" />
            </div>

            {/* Title skeleton */}
            <div className="animate-pulse">
              <div
                className="h-12 bg-gray-300/50 rounded-lg mb-3"
                style={{ width: "clamp(200px, 70%, 350px)" }}
              />
              <div
                className="h-12 bg-gray-300/50 rounded-lg mb-3"
                style={{ width: "clamp(180px, 60%, 300px)" }}
              />
            </div>

            {/* Subtitle skeleton */}
            <div className="animate-pulse mb-6 sm:mb-8">
              <div
                className="h-8 bg-orange-200/50 rounded-lg"
                style={{ width: "clamp(200px, 60%, 320px)" }}
              />
            </div>

            {/* Paragraphs skeleton */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 animate-pulse">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-200 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div
                      className="h-4 bg-gray-300/40 rounded"
                      style={{ width: i === 3 ? "85%" : "100%" }}
                    />
                    {i !== 4 && (
                      <div
                        className="h-4 bg-gray-300/40 rounded mt-2"
                        style={{ width: i === 1 ? "90%" : "95%" }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Closing line skeleton */}
            <div className="relative mb-8 sm:mb-10 animate-pulse">
              <div className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-1 bg-orange-300 rounded-full" />
              <div
                className="h-6 bg-gray-300/40 rounded pl-5 sm:pl-7"
                style={{ width: "clamp(200px, 70%, 400px)" }}
              />
            </div>

            {/* CTA button skeleton */}
            <div className="animate-pulse">
              <div
                className="bg-orange-300/60 rounded-full"
                style={{
                  width: "clamp(180px, 30vw, 220px)",
                  height: "clamp(48px, 6vw, 56px)",
                }}
              />
            </div>
          </div>

          {/* RIGHT: Image skeleton */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto">
              {/* Glow blob skeleton */}
              <div className="absolute inset-0 bg-orange-200/20 rounded-[40px] blur-3xl scale-110 animate-pulse" />

              {/* Main image skeleton */}
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[480px] mx-auto">
                <div className="w-full h-full bg-gray-200/60 rounded-2xl animate-pulse flex items-center justify-center">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M22 14l-4-4-4 4" />
                  </svg>
                </div>

                {/* Thought bubble skeleton */}
                <div
                  className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 md:-top-8 md:-right-6 bg-white/80 rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-4 sm:py-3 shadow-2xl z-10 animate-pulse"
                  style={{ rotate: "3deg" }}
                >
                  <div
                    className="h-3 bg-gray-300 rounded"
                    style={{ width: "80px" }}
                  />
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/80 rotate-45" />
                </div>

                {/* Floating pencil skeleton */}
                <div className="absolute -left-3 sm:-left-5 top-1/4 w-9 h-9 sm:w-11 sm:h-11 bg-white/80 rounded-xl shadow-xl flex items-center justify-center z-10 animate-pulse">
                  <span className="text-lg sm:text-2xl opacity-50">✏️</span>
                </div>

                {/* Floating ruler skeleton */}
                <div className="absolute -right-3 sm:-right-5 bottom-1/4 w-9 h-9 sm:w-11 sm:h-11 bg-white/80 rounded-xl shadow-xl flex items-center justify-center z-10 animate-pulse">
                  <span className="text-lg sm:text-2xl opacity-50">📐</span>
                </div>

                {/* Subtle corner glows skeleton */}
                <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-28 sm:h-28 bg-orange-200/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-orange-200/20 rounded-full blur-2xl animate-pulse" />
              </div>

              {/* Process steps skeleton */}
              <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                {[1, 2, 3].map((item, i) => (
                  <div key={item} className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto bg-gray-200/80 rounded-xl sm:rounded-2xl shadow-md mb-2 sm:mb-3 animate-pulse" />
                    <div className="h-2 w-8 bg-orange-200 rounded mx-auto mb-1 animate-pulse" />
                    <div className="h-3 w-12 bg-gray-300/50 rounded mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom paw trail skeleton */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center items-center gap-2 sm:gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-orange-300/50 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
              {i < 4 && (
                <div className="w-4 sm:w-6 md:w-8 h-0.5 bg-orange-300/30 rounded-full" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced version with shimmer effect
export const NoDesignSectionSkeletonWithShimmer = () => {
  return (
    <section className="relative bg-[#EBEBEB] overflow-hidden">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
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

      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF5000 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.045,
        }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF5000] hidden lg:block" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-7xl py-16 sm:py-20 md:py-24 lg:py-32 xl:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-center">
          {/* LEFT: Shimmer content */}
          <div className="order-2 lg:order-1 shimmer-overlay">
            <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-7">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-200 rounded-xl rotate-6" />
              <div className="w-20 h-3 bg-orange-200 rounded" />
            </div>

            <div>
              <div className="h-12 bg-gray-300/50 rounded-lg mb-3 w-64" />
              <div className="h-12 bg-gray-300/50 rounded-lg mb-3 w-56" />
            </div>

            <div className="h-8 bg-orange-200/50 rounded-lg w-60 mb-6" />

            <div className="space-y-3 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-200 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300/40 rounded w-full" />
                    {i !== 4 && (
                      <div className="h-4 bg-gray-300/40 rounded w-11/12 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mb-8">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-orange-300 rounded-full" />
              <div className="h-6 bg-gray-300/40 rounded w-80 pl-5" />
            </div>

            <div className="bg-orange-300/60 rounded-full w-48 h-12" />
          </div>

          {/* RIGHT: Shimmer image */}
          <div className="order-1 lg:order-2 shimmer-overlay">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto">
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[480px] mx-auto">
                <div className="w-full h-full bg-gray-200/60 rounded-2xl flex items-center justify-center">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M22 14l-4-4-4 4" />
                  </svg>
                </div>

                <div
                  className="absolute -top-4 -right-2 bg-white/80 rounded-2xl px-3 py-2 shadow-2xl"
                  style={{ rotate: "3deg" }}
                >
                  <div className="h-3 bg-gray-300 rounded w-20" />
                </div>

                <div className="absolute -left-3 top-1/4 w-9 h-9 bg-white/80 rounded-xl shadow-xl flex items-center justify-center">
                  <span className="opacity-50">✏️</span>
                </div>

                <div className="absolute -right-3 bottom-1/4 w-9 h-9 bg-white/80 rounded-xl shadow-xl flex items-center justify-center">
                  <span className="opacity-50">📐</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="text-center">
                    <div className="w-10 h-10 mx-auto bg-gray-200/80 rounded-xl mb-2" />
                    <div className="h-2 w-8 bg-orange-200 rounded mx-auto mb-1" />
                    <div className="h-3 w-12 bg-gray-300/50 rounded mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom paw trail */}
        <div className="mt-12 flex justify-center items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div
                className="w-5 h-5 rounded-full bg-orange-300/50 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
              {i < 4 && <div className="w-4 h-0.5 bg-orange-300/30" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

// Mobile-optimized skeleton
export const NoDesignSectionSkeletonMobile = () => {
  return (
    <section className="relative bg-[#EBEBEB] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF5000 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.045,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Image skeleton (shown first on mobile) */}
          <div className="mx-auto">
            <div className="relative aspect-square w-64 mx-auto">
              <div className="w-full h-full bg-gray-200/60 rounded-2xl animate-pulse flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(0,0,0,0.15)"
                >
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>

            {/* Mobile process steps */}
            <div className="mt-6 grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {[1, 2, 3].map((item) => (
                <div key={item} className="text-center">
                  <div className="w-10 h-10 mx-auto bg-gray-200/80 rounded-xl animate-pulse mb-2" />
                  <div className="h-2 w-8 bg-orange-200 rounded mx-auto mb-1 animate-pulse" />
                  <div className="h-3 w-10 bg-gray-300/50 rounded mx-auto animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Content skeleton */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4 animate-pulse">
              <div className="w-8 h-8 bg-orange-200 rounded-xl rotate-6" />
              <div className="w-16 h-2 bg-orange-200 rounded" />
            </div>

            <div className="animate-pulse">
              <div className="h-10 bg-gray-300/50 rounded-lg mb-2 w-48" />
              <div className="h-10 bg-gray-300/50 rounded-lg mb-3 w-40" />
            </div>

            <div className="h-6 bg-orange-200/50 rounded-lg w-44 mb-5 animate-pulse" />

            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2 animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-orange-200 mt-1" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-300/40 rounded w-full" />
                    {i !== 4 && (
                      <div className="h-3 bg-gray-300/40 rounded w-10/12 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mb-6 animate-pulse">
              <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-orange-300 rounded-full" />
              <div className="h-5 bg-gray-300/40 rounded w-56 pl-4" />
            </div>

            <div className="bg-orange-300/60 rounded-full w-40 h-10 animate-pulse" />
          </div>
        </div>

        {/* Mobile loading indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] rounded-full">
            <div className="w-3 h-3 rounded-full border-2 border-[#FF5000] border-t-transparent animate-spin" />
            <span className="text-xs font-medium text-white/80">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoDesignSectionSkeleton;