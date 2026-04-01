// DesignQuestionSectionSkeleton.tsx
"use client";
import React from "react";

const DesignQuestionSectionSkeleton = () => {
  return (
    <>
      <style jsx>{`
        @keyframes dqsLevitate {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }
        @keyframes dqsOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes dqsOrbitCCW {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes dqsGlowPulse {
          0%, 100% {
            opacity: 0.12;
            transform: scale(1);
          }
          50% {
            opacity: 0.28;
            transform: scale(1.12);
          }
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{
          background: "#ffffff",
          fontFamily: "'Faculty Glyphic', sans-serif",
          padding: "clamp(48px, 7vw, 112px) 0",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Corner glows */}
        <div
          className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[520px] max-h-[520px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(255,80,0,0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[35vw] h-[35vw] max-w-[440px] max-h-[440px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom left, rgba(255,80,0,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Filament threads skeleton */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "36px" }}
          viewBox="0 0 1200 36"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 18 Q 300 4, 600 18 T 1200 18"
            stroke="rgba(255,80,0,0.08)"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
          />
          <path
            d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.04)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            fill="none"
          />
        </svg>

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1400px",
            padding: "0 clamp(16px, 4vw, 64px)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-24 items-center">
            {/* ══ LEFT: content skeleton ═══════════════════════════════════ */}
            <div className="flex flex-col items-center lg:items-start">
              {/* Eyebrow skeleton */}
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-7 animate-pulse">
                <div
                  className="h-[2px] rounded-full bg-orange-300/50"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
                <div
                  className="h-3 bg-orange-200/50 rounded"
                  style={{ width: "clamp(100px, 10vw, 130px)" }}
                />
                <div
                  className="h-[2px] rounded-full bg-orange-300/50"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
              </div>

              {/* Headline skeleton */}
              <div className="w-full mb-5 sm:mb-7">
                <div className="animate-pulse">
                  <div
                    className="h-10 bg-gray-200/70 rounded-lg mb-3"
                    style={{ width: "clamp(200px, 80%, 400px)" }}
                  />
                  <div
                    className="h-12 bg-orange-100/50 rounded-lg"
                    style={{ width: "clamp(180px, 70%, 350px)" }}
                  />
                  <div
                    className="h-3 bg-orange-200/30 rounded-full mt-2"
                    style={{ width: "clamp(150px, 60%, 300px)" }}
                  />
                </div>
              </div>

              {/* Sub-question skeleton */}
              <div className="text-center lg:text-left mb-8 sm:mb-10 w-full">
                <div className="animate-pulse">
                  <div
                    className="h-4 bg-gray-300/50 rounded mb-2 mx-auto lg:mx-0"
                    style={{ width: "clamp(180px, 40%, 250px)" }}
                  />
                  <div
                    className="h-6 bg-gray-300/60 rounded mx-auto lg:mx-0"
                    style={{ width: "clamp(200px, 50%, 300px)" }}
                  />
                </div>
              </div>

              {/* CTA buttons skeleton */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Yes button skeleton */}
                <div className="animate-pulse">
                  <div
                    className="bg-gray-200/60 rounded-xl border-2 border-gray-300/40"
                    style={{
                      padding:
                        "clamp(12px, 1.4vw, 16px) clamp(20px, 2.5vw, 36px)",
                      width: "clamp(160px, 18vw, 200px)",
                    }}
                  />
                </div>
                {/* No button skeleton */}
                <div className="animate-pulse">
                  <div
                    className="bg-orange-300/60 rounded-xl"
                    style={{
                      padding:
                        "clamp(12px, 1.4vw, 16px) clamp(20px, 2.5vw, 36px)",
                      width: "clamp(160px, 18vw, 200px)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ══ RIGHT: image skeleton ════════════════════════════════════ */}
            <div className="relative flex items-center justify-center order-first lg:order-last">
              {/* Orbit rings skeleton */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  className="max-w-full max-h-full animate-pulse"
                  style={{
                    width: "clamp(260px, 45vw, 520px)",
                    height: "clamp(260px, 45vw, 520px)",
                  }}
                  viewBox="0 0 500 500"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="250"
                    cy="250"
                    r="220"
                    stroke="rgba(255,80,0,0.10)"
                    strokeWidth="1.5"
                    strokeDasharray="10 14"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="175"
                    stroke="rgba(255,80,0,0.12)"
                    strokeWidth="1"
                    strokeDasharray="7 11"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="130"
                    stroke="rgba(255,80,0,0.15)"
                    strokeWidth="1"
                    strokeDasharray="5 8"
                  />
                  <circle cx="470" cy="250" r="4" fill="#FF5000" opacity="0.25" />
                  <circle cx="250" cy="75" r="3" fill="#FF5000" opacity="0.20" />
                  <circle cx="250" cy="250" r="95" fill="url(#dqsGlowSkeleton)" />
                  <defs>
                    <radialGradient id="dqsGlowSkeleton" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FF5000" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#FF5000" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Glow blob skeleton */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="rounded-full bg-orange-300/20 animate-pulse"
                  style={{
                    width: "clamp(160px, 22vw, 300px)",
                    height: "clamp(160px, 22vw, 300px)",
                    filter: "blur(48px)",
                  }}
                />
              </div>

              {/* Main image skeleton */}
              <div
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto bg-gray-200/50 rounded-2xl animate-pulse"
                style={{
                  height: "clamp(240px, 40vw, 560px)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
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
              </div>

              {/* Badge skeleton — top left (Materials) */}
              <div
                className="absolute flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl animate-pulse"
                style={{
                  top: "clamp(4px, 2vw, 24px)",
                  left: "clamp(-8px, -1vw, -16px)",
                  padding: "clamp(8px, 1vw, 12px) clamp(10px, 1.4vw, 16px)",
                  background: "rgba(255,255,255,0.97)",
                  border: "1.5px solid rgba(255,80,0,0.14)",
                }}
              >
                <div
                  className="rounded-lg sm:rounded-xl bg-orange-100"
                  style={{
                    width: "clamp(28px, 3.5vw, 38px)",
                    height: "clamp(28px, 3.5vw, 38px)",
                  }}
                />
                <div>
                  <div
                    className="h-2 bg-gray-300 rounded mb-1"
                    style={{ width: "clamp(40px, 5vw, 60px)" }}
                  />
                  <div
                    className="h-3 bg-gray-400 rounded"
                    style={{ width: "clamp(60px, 7vw, 80px)" }}
                  />
                </div>
              </div>

              {/* Badge skeleton — bottom right (Fast Turn) */}
              <div
                className="absolute flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl animate-pulse"
                style={{
                  bottom: "clamp(4px, 3vw, 40px)",
                  right: "clamp(-8px, -1vw, -16px)",
                  padding: "clamp(8px, 1vw, 12px) clamp(10px, 1.4vw, 16px)",
                  background: "#FF5000",
                }}
              >
                <div
                  className="rounded-lg sm:rounded-xl bg-white/20"
                  style={{
                    width: "clamp(28px, 3.5vw, 38px)",
                    height: "clamp(28px, 3.5vw, 38px)",
                  }}
                />
                <div>
                  <div
                    className="h-2 bg-white/40 rounded mb-1"
                    style={{ width: "clamp(40px, 5vw, 60px)" }}
                  />
                  <div
                    className="h-3 bg-white/60 rounded"
                    style={{ width: "clamp(50px, 6vw, 70px)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Enhanced version with shimmer effect
export const DesignQuestionSectionSkeletonWithShimmer = () => {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes dqsLevitate {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 1.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{
          background: "#ffffff",
          fontFamily: "'Faculty Glyphic', sans-serif",
          padding: "clamp(48px, 7vw, 112px) 0",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Corner glows */}
        <div
          className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[520px] max-h-[520px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(255,80,0,0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[35vw] h-[35vw] max-w-[440px] max-h-[440px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom left, rgba(255,80,0,0.04) 0%, transparent 65%)",
          }}
        />

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1400px",
            padding: "0 clamp(16px, 4vw, 64px)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-24 items-center">
            {/* LEFT: Shimmer content */}
            <div className="flex flex-col items-center lg:items-start shimmer-overlay">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-7">
                <div
                  className="h-[2px] rounded-full bg-orange-300/50"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
                <div
                  className="h-3 bg-orange-200/50 rounded"
                  style={{ width: "clamp(100px, 10vw, 130px)" }}
                />
                <div
                  className="h-[2px] rounded-full bg-orange-300/50"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
              </div>

              {/* Headline */}
              <div className="w-full mb-5 sm:mb-7">
                <div
                  className="h-10 bg-gray-200/70 rounded-lg mb-3"
                  style={{ width: "clamp(200px, 80%, 400px)" }}
                />
                <div
                  className="h-12 bg-orange-100/50 rounded-lg"
                  style={{ width: "clamp(180px, 70%, 350px)" }}
                />
              </div>

              {/* Sub-question */}
              <div className="text-center lg:text-left mb-8 sm:mb-10 w-full">
                <div
                  className="h-4 bg-gray-300/50 rounded mb-2 mx-auto lg:mx-0"
                  style={{ width: "clamp(180px, 40%, 250px)" }}
                />
                <div
                  className="h-6 bg-gray-300/60 rounded mx-auto lg:mx-0"
                  style={{ width: "clamp(200px, 50%, 300px)" }}
                />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <div
                  className="bg-gray-200/60 rounded-xl"
                  style={{
                    padding:
                      "clamp(12px, 1.4vw, 16px) clamp(20px, 2.5vw, 36px)",
                    width: "clamp(160px, 18vw, 200px)",
                  }}
                />
                <div
                  className="bg-orange-300/60 rounded-xl"
                  style={{
                    padding:
                      "clamp(12px, 1.4vw, 16px) clamp(20px, 2.5vw, 36px)",
                    width: "clamp(160px, 18vw, 200px)",
                  }}
                />
              </div>
            </div>

            {/* RIGHT: Shimmer image */}
            <div className="relative flex items-center justify-center order-first lg:order-last">
              <div className="shimmer-overlay w-full flex justify-center">
                <div
                  className="relative bg-gray-200/50 rounded-2xl"
                  style={{
                    width: "clamp(260px, 40vw, 500px)",
                    height: "clamp(240px, 40vw, 560px)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
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
                </div>
              </div>

              {/* Badges with shimmer */}
              <div className="shimmer-overlay absolute top-0 left-0">
                <div
                  className="flex items-center gap-2 rounded-xl bg-white/97 p-2"
                  style={{
                    top: "clamp(4px, 2vw, 24px)",
                    left: "clamp(-8px, -1vw, -16px)",
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100" />
                  <div>
                    <div className="h-2 bg-gray-300 rounded w-12 mb-1" />
                    <div className="h-3 bg-gray-400 rounded w-16" />
                  </div>
                </div>
              </div>

              <div className="shimmer-overlay absolute bottom-0 right-0">
                <div
                  className="flex items-center gap-2 rounded-xl bg-[#FF5000] p-2"
                  style={{
                    bottom: "clamp(4px, 3vw, 40px)",
                    right: "clamp(-8px, -1vw, -16px)",
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20" />
                  <div>
                    <div className="h-2 bg-white/40 rounded w-12 mb-1" />
                    <div className="h-3 bg-white/60 rounded w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignQuestionSectionSkeleton;