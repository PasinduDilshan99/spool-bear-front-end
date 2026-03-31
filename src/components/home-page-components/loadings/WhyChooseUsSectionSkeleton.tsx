// WhyChooseUsSectionSkeleton.tsx
"use client";
import React from "react";

const WhyChooseUsSectionSkeleton = () => {
  return (
    <>
      <style jsx>{`
        @keyframes whyOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes whyFilament {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -60;
          }
        }
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
            opacity: 0.7;
          }
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{
          background: "#e4e7ec",
          fontFamily: "'Faculty Glyphic', sans-serif",
          padding: "clamp(48px, 7vw, 112px) 0",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Radial glows */}
        <div
          className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,80,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(255,80,0,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Filament threads skeleton */}
        <svg
          className="absolute top-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "36px" }}
          viewBox="0 0 1200 36"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 18 Q 300 4, 600 18 T 1200 18"
            stroke="rgba(255,80,0,0.10)"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
          />
          <path
            d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.05)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            fill="none"
          />
        </svg>

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1540px",
            padding: "0 clamp(16px, 4vw, 64px)",
          }}
        >
          {/* Heading Skeleton */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            {/* Eyebrow skeleton */}
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 animate-pulse">
              <div
                className="h-[2px] rounded-full bg-orange-300/50"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
              <div
                className="h-3 bg-orange-200/50 rounded"
                style={{ width: "clamp(120px, 12vw, 160px)" }}
              />
              <div
                className="h-[2px] rounded-full bg-orange-300/50"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
            </div>

            {/* Title skeleton */}
            <div className="animate-pulse">
              <div
                className="h-12 bg-gray-300/50 rounded-lg mx-auto mb-4"
                style={{ width: "clamp(200px, 40%, 350px)" }}
              />
            </div>

            {/* Underline skeleton */}
            <div
              className="h-[3px] sm:h-[4px] rounded-full mx-auto bg-orange-300/40"
              style={{ width: "clamp(80px, 10vw, 140px)" }}
            />

            {/* Subtitle skeleton */}
            <div className="animate-pulse mt-4 sm:mt-5">
              <div
                className="h-4 bg-gray-300/40 rounded mx-auto mb-2"
                style={{ width: "clamp(250px, 50%, 400px)" }}
              />
              <div
                className="h-4 bg-gray-300/40 rounded mx-auto"
                style={{ width: "clamp(200px, 40%, 320px)" }}
              />
            </div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Card Shell */}
                <div
                  className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden"
                  style={{
                    padding: "clamp(20px, 3vw, 36px) clamp(16px, 2.5vw, 28px)",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 6px 28px rgba(0,0,0,0.09)",
                  }}
                >
                  {/* Step watermark skeleton */}
                  <div
                    className="absolute top-3 right-4 sm:top-4 sm:right-5 font-black leading-none pointer-events-none"
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      color: "rgba(0,0,0,0.04)",
                    }}
                  >
                    {String(index).padStart(2, "0")}
                  </div>

                  {/* Icon Area Skeleton */}
                  <div className="relative mb-5 sm:mb-6 flex items-center justify-center">
                    {/* Glow blob skeleton */}
                    <div
                      className="absolute pointer-events-none rounded-full bg-orange-300/20 animate-pulse"
                      style={{
                        width: "clamp(80px, 10vw, 120px)",
                        height: "clamp(80px, 10vw, 120px)",
                        filter: "blur(24px)",
                      }}
                    />

                    {/* Orbit ring SVG skeleton */}
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        width: "clamp(100px, 12vw, 148px)",
                        height: "clamp(100px, 12vw, 148px)",
                      }}
                      viewBox="0 0 148 148"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="74"
                        cy="74"
                        r="66"
                        stroke="rgba(255,80,0,0.10)"
                        strokeWidth="1.5"
                        strokeDasharray="6 8"
                      />
                    </svg>

                    {/* Diamond icon tile skeleton */}
                    <div
                      className="relative flex items-center justify-center flex-shrink-0 animate-pulse"
                      style={{
                        width: "clamp(72px, 9vw, 108px)",
                        height: "clamp(72px, 9vw, 108px)",
                        borderRadius: "clamp(12px, 1.5vw, 18px)",
                        background: "linear-gradient(145deg, #ffffff 0%, #f7f7f7 100%)",
                        transform: "rotate(45deg)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.09)",
                      }}
                    >
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "clamp(40px, 5vw, 60px)",
                          height: "clamp(40px, 5vw, 60px)",
                          transform: "rotate(-45deg)",
                        }}
                      >
                        <div
                          className="bg-gray-300/50 rounded-full"
                          style={{
                            width: "clamp(32px, 4vw, 48px)",
                            height: "clamp(32px, 4vw, 48px)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Rings skeleton */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        inset: "-10px",
                        border: "1.5px solid rgba(255,80,0,0.08)",
                      }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        inset: "-18px",
                        border: "1px solid rgba(255,80,0,0.04)",
                      }}
                    />
                  </div>

                  {/* Title skeleton */}
                  <div className="animate-pulse mb-2 sm:mb-3">
                    <div
                      className="h-5 bg-gray-300/50 rounded mx-auto mb-1"
                      style={{ width: "clamp(80px, 12vw, 100px)" }}
                    />
                    <div
                      className="h-5 bg-gray-300/50 rounded mx-auto"
                      style={{ width: "clamp(60px, 10vw, 80px)" }}
                    />
                  </div>

                  {/* Body text skeleton */}
                  <div className="animate-pulse">
                    <div
                      className="h-3 bg-gray-300/40 rounded mx-auto mb-1"
                      style={{ width: "clamp(100px, 14vw, 120px)" }}
                    />
                    <div
                      className="h-3 bg-gray-300/40 rounded mx-auto mb-1"
                      style={{ width: "clamp(90px, 12vw, 110px)" }}
                    />
                    <div
                      className="h-3 bg-gray-300/40 rounded mx-auto"
                      style={{ width: "clamp(80px, 11vw, 100px)" }}
                    />
                  </div>

                  {/* Bottom accent bar skeleton */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-orange-300/30"
                    style={{ width: "0px" }}
                  />
                </div>

                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,80,0,0.06), transparent)",
                    animation: "shimmer 2s infinite",
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Bottom divider dots skeleton */}
          <div className="mt-12 sm:mt-16 flex justify-center items-center gap-2 sm:gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <div
                  className="rounded-full bg-orange-300/40 animate-pulse"
                  style={{
                    width: "clamp(6px, 0.8vw, 9px)",
                    height: "clamp(6px, 0.8vw, 9px)",
                    animationDelay: `${i * 180}ms`,
                  }}
                />
                {i < 4 && (
                  <div
                    className="h-px bg-orange-300/30"
                    style={{ width: "clamp(14px, 2vw, 28px)" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Enhanced version with shimmer effect on cards
export const WhyChooseUsSectionSkeletonWithShimmer = () => {
  return (
    <>
      <style jsx>{`
        @keyframes whyOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes whyFilament {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -60;
          }
        }
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
          background: linear-gradient(90deg, transparent, rgba(255,80,0,0.08), transparent);
          animation: shimmer 1.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{
          background: "#e4e7ec",
          fontFamily: "'Faculty Glyphic', sans-serif",
          padding: "clamp(48px, 7vw, 112px) 0",
        }}
      >
        {/* Background elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1540px",
            padding: "0 clamp(16px, 4vw, 64px)",
          }}
        >
          {/* Heading with shimmer */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 shimmer-overlay">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div
                className="h-[2px] rounded-full bg-orange-300/50"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
              <div
                className="h-3 bg-orange-200/50 rounded"
                style={{ width: "clamp(120px, 12vw, 160px)" }}
              />
              <div
                className="h-[2px] rounded-full bg-orange-300/50"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
            </div>
            <div
              className="h-12 bg-gray-300/50 rounded-lg mx-auto mb-4"
              style={{ width: "clamp(200px, 40%, 350px)" }}
            />
            <div
              className="h-[3px] rounded-full mx-auto bg-orange-300/40"
              style={{ width: "clamp(80px, 10vw, 140px)" }}
            />
            <div className="mt-4 sm:mt-5">
              <div
                className="h-4 bg-gray-300/40 rounded mx-auto mb-2"
                style={{ width: "clamp(250px, 50%, 400px)" }}
              />
              <div
                className="h-4 bg-gray-300/40 rounded mx-auto"
                style={{ width: "clamp(200px, 40%, 320px)" }}
              />
            </div>
          </div>

          {/* Cards Grid with individual shimmer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="shimmer-overlay rounded-2xl sm:rounded-3xl"
              >
                <div
                  className="relative w-full"
                  style={{
                    padding: "clamp(20px, 3vw, 36px) clamp(16px, 2.5vw, 28px)",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div
                    className="absolute top-3 right-4 sm:top-4 sm:right-5"
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      color: "rgba(0,0,0,0.04)",
                    }}
                  >
                    {String(index).padStart(2, "0")}
                  </div>

                  <div className="relative mb-5 sm:mb-6 flex items-center justify-center">
                    <div
                      className="absolute rounded-full bg-orange-300/20"
                      style={{
                        width: "clamp(80px, 10vw, 120px)",
                        height: "clamp(80px, 10vw, 120px)",
                        filter: "blur(24px)",
                      }}
                    />
                    <div
                      className="relative flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "clamp(72px, 9vw, 108px)",
                        height: "clamp(72px, 9vw, 108px)",
                        borderRadius: "clamp(12px, 1.5vw, 18px)",
                        background: "linear-gradient(145deg, #ffffff 0%, #f7f7f7 100%)",
                        transform: "rotate(45deg)",
                      }}
                    >
                      <div
                        className="bg-gray-300/50 rounded-full"
                        style={{
                          width: "clamp(32px, 4vw, 48px)",
                          height: "clamp(32px, 4vw, 48px)",
                          transform: "rotate(-45deg)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-3">
                    <div
                      className="h-5 bg-gray-300/50 rounded mx-auto mb-1"
                      style={{ width: "clamp(80px, 12vw, 100px)" }}
                    />
                    <div
                      className="h-5 bg-gray-300/50 rounded mx-auto"
                      style={{ width: "clamp(60px, 10vw, 80px)" }}
                    />
                  </div>

                  <div>
                    <div
                      className="h-3 bg-gray-300/40 rounded mx-auto mb-1"
                      style={{ width: "clamp(100px, 14vw, 120px)" }}
                    />
                    <div
                      className="h-3 bg-gray-300/40 rounded mx-auto mb-1"
                      style={{ width: "clamp(90px, 12vw, 110px)" }}
                    />
                    <div
                      className="h-3 bg-gray-300/40 rounded mx-auto"
                      style={{ width: "clamp(80px, 11vw, 100px)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom dots with shimmer */}
          <div className="mt-12 sm:mt-16 flex justify-center items-center gap-2 sm:gap-3 shimmer-overlay">
            {[0, 1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <div
                  className="rounded-full bg-orange-300/40 animate-pulse"
                  style={{
                    width: "clamp(6px, 0.8vw, 9px)",
                    height: "clamp(6px, 0.8vw, 9px)",
                  }}
                />
                {i < 4 && (
                  <div
                    className="h-px bg-orange-300/30"
                    style={{ width: "clamp(14px, 2vw, 28px)" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Mobile-optimized skeleton (fewer cards per row)
export const WhyChooseUsSectionSkeletonMobile = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#e4e7ec",
        fontFamily: "'Faculty Glyphic', sans-serif",
        padding: "clamp(48px, 7vw, 112px) 0",
      }}
    >
      <div
        className="container mx-auto relative z-10"
        style={{
          maxWidth: "1540px",
          padding: "0 clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 animate-pulse">
            <div className="h-[2px] w-6 rounded-full bg-orange-300/50" />
            <div className="h-3 w-28 bg-orange-200/50 rounded" />
            <div className="h-[2px] w-6 rounded-full bg-orange-300/50" />
          </div>
          <div className="h-10 bg-gray-300/50 rounded-lg w-48 mx-auto mb-3 animate-pulse" />
          <div className="h-[3px] w-20 rounded-full mx-auto bg-orange-300/40" />
        </div>

        {/* Mobile: 1 column */}
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{
                padding: "clamp(20px, 3vw, 36px) clamp(16px, 2.5vw, 28px)",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="relative mb-4 flex items-center justify-center"
                  style={{
                    width: "clamp(72px, 9vw, 108px)",
                    height: "clamp(72px, 9vw, 108px)",
                    borderRadius: "clamp(12px, 1.5vw, 18px)",
                    background: "linear-gradient(145deg, #ffffff 0%, #f7f7f7 100%)",
                  }}
                >
                  <div
                    className="bg-gray-300/50 rounded-full"
                    style={{ width: "clamp(32px, 4vw, 48px)", height: "clamp(32px, 4vw, 48px)" }}
                  />
                </div>
                <div className="h-5 bg-gray-300/50 rounded w-24 mb-2" />
                <div className="h-3 bg-gray-300/40 rounded w-32 mb-1" />
                <div className="h-3 bg-gray-300/40 rounded w-28" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
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

export default WhyChooseUsSectionSkeleton;