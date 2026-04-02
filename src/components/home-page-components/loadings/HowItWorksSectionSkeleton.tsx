// HowItWorksSectionSkeleton.tsx
"use client";
import React from "react";

const HowItWorksSectionSkeleton = () => {
  return (
    <>
      <style jsx>{`
        @keyframes hiwOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes hiwOrbitCCW {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes hiwGlow {
          0%, 100% {
            opacity: 0.16;
            transform: scale(1);
          }
          50% {
            opacity: 0.34;
            transform: scale(1.15);
          }
        }
        @keyframes hiwFilament {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -60;
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

        {/* Corner glows */}
        <div
          className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,80,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(255,80,0,0.06) 0%, transparent 65%)",
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
            maxWidth: "1400px",
            padding: "0 clamp(16px, 4vw, 64px)",
          }}
        >
          {/* ── Heading Skeleton ── */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            {/* Eyebrow skeleton */}
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 animate-pulse">
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
          </div>

          {/* ── Steps Skeleton ── */}
          <div className="relative">
            {/* Desktop connecting path skeleton */}
            <div
              className="hidden lg:block absolute left-0 right-0 pointer-events-none"
              style={{ top: "clamp(60px, 8vw, 100px)" }}
            >
              <svg
                className="w-full"
                style={{ height: "clamp(60px, 8vw, 100px)" }}
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M 120 50 Q 400 24, 600 50 T 1080 50"
                  stroke="#FF5000"
                  strokeWidth="2"
                  strokeDasharray="10 7"
                  fill="none"
                  opacity="0.12"
                />
                <circle
                  cx="390"
                  cy="38"
                  r="16"
                  fill="rgba(255,255,255,0.8)"
                  stroke="rgba(255,80,0,0.15)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="810"
                  cy="56"
                  r="16"
                  fill="rgba(255,255,255,0.8)"
                  stroke="rgba(255,80,0,0.15)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-10 xl:gap-14">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number badge skeleton */}
                  <div
                    className="relative z-20 flex items-center justify-center animate-pulse"
                    style={{
                      width: "clamp(48px, 6vw, 68px)",
                      height: "clamp(48px, 6vw, 68px)",
                      borderRadius: "50%",
                      marginBottom: "clamp(-24px, -3vw, -34px)",
                      background: "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                      boxShadow: "0 6px 24px rgba(255,80,0,0.42)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(18px, 2.2vw, 26px)",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {index}
                    </span>
                  </div>

                  {/* Icon area skeleton */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{ margin: "0 auto clamp(20px, 3vw, 36px) auto" }}
                  >
                    {/* Orbit rings skeleton */}
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        width: "clamp(160px, 22vw, 260px)",
                        height: "clamp(160px, 22vw, 260px)",
                      }}
                      viewBox="0 0 260 260"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="130"
                        cy="130"
                        r="118"
                        stroke="rgba(255,80,0,0.08)"
                        strokeWidth="1.5"
                        strokeDasharray="8 10"
                      />
                      <circle
                        cx="130"
                        cy="130"
                        r="96"
                        stroke="rgba(255,80,0,0.05)"
                        strokeWidth="1"
                        strokeDasharray="6 8"
                      />
                      <circle
                        cx="248"
                        cy="130"
                        r="4"
                        fill="#FF5000"
                        opacity="0.2"
                      />
                      <circle
                        cx="12"
                        cy="130"
                        r="3"
                        fill="#FF5000"
                        opacity="0.15"
                      />
                    </svg>

                    {/* Glow blob skeleton */}
                    <div
                      className="absolute pointer-events-none rounded-full bg-orange-300/20 animate-pulse"
                      style={{
                        width: "clamp(100px, 14vw, 180px)",
                        height: "clamp(100px, 14vw, 180px)",
                        filter: "blur(32px)",
                      }}
                    />

                    {/* Main icon circle skeleton */}
                    <div
                      className="relative flex items-center justify-center bg-gray-200/80 animate-pulse"
                      style={{
                        width: "clamp(120px, 16vw, 210px)",
                        height: "clamp(120px, 16vw, 210px)",
                        borderRadius: "50%",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.11)",
                        border: "1.5px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <div
                        className="bg-gray-300/60 rounded-full"
                        style={{
                          width: "clamp(72px, 10vw, 130px)",
                          height: "clamp(72px, 10vw, 130px)",
                        }}
                      />
                    </div>

                    {/* Accent rings skeleton */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        inset: "clamp(-12px, -1.5vw, -18px)",
                        border: "1.5px solid rgba(255,80,0,0.08)",
                      }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        inset: "clamp(-20px, -2.5vw, -30px)",
                        border: "1px solid rgba(255,80,0,0.04)",
                      }}
                    />
                  </div>

                  {/* Title skeleton */}
                  <div className="animate-pulse">
                    <div
                      className="h-6 bg-gray-300/60 rounded-lg mb-2"
                      style={{ width: "clamp(120px, 15vw, 180px)" }}
                    />
                  </div>

                  {/* Description skeleton */}
                  <div className="animate-pulse">
                    <div
                      className="h-4 bg-gray-300/40 rounded"
                      style={{ width: "clamp(180px, 20vw, 240px)" }}
                    />
                    <div
                      className="h-4 bg-gray-300/40 rounded mt-2"
                      style={{ width: "clamp(160px, 18vw, 220px)" }}
                    />
                  </div>

                  {/* Mobile down-arrow skeleton (visible on mobile) */}
                  {index < 3 && (
                    <div className="flex lg:hidden mt-8 mb-2 items-center justify-center">
                      <div
                        className="flex items-center justify-center rounded-full bg-orange-100/50 animate-pulse"
                        style={{
                          width: "clamp(44px, 6vw, 56px)",
                          height: "clamp(44px, 6vw, 56px)",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom decorative dots skeleton */}
          <div className="mt-12 sm:mt-16 flex justify-center items-center gap-2 sm:gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <div
                  className="rounded-full bg-orange-300/50 animate-pulse"
                  style={{
                    width: "clamp(6px, 0.8vw, 9px)",
                    height: "clamp(6px, 0.8vw, 9px)",
                  }}
                />
                {i < 4 && (
                  <div
                    className="h-px bg-orange-300/30"
                    style={{ width: "clamp(12px, 2vw, 28px)" }}
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

// Enhanced version with shimmer effect
export const HowItWorksSectionSkeletonWithShimmer = () => {
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
        @keyframes hiwOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes hiwOrbitCCW {
          to {
            transform: rotate(-360deg);
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
          className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,80,0,0.07) 0%, transparent 65%)",
          }}
        />

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1400px",
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
                style={{ width: "clamp(100px, 10vw, 130px)" }}
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
          </div>

          {/* Steps with shimmer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-10 xl:gap-14">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center shimmer-overlay"
              >
                <div
                  className="relative z-20 flex items-center justify-center"
                  style={{
                    width: "clamp(48px, 6vw, 68px)",
                    height: "clamp(48px, 6vw, 68px)",
                    borderRadius: "50%",
                    marginBottom: "clamp(-24px, -3vw, -34px)",
                    background: "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(18px, 2.2vw, 26px)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {index}
                  </span>
                </div>

                <div
                  className="relative flex items-center justify-center"
                  style={{ margin: "0 auto clamp(20px, 3vw, 36px) auto" }}
                >
                  <div
                    className="relative flex items-center justify-center bg-gray-200/80"
                    style={{
                      width: "clamp(120px, 16vw, 210px)",
                      height: "clamp(120px, 16vw, 210px)",
                      borderRadius: "50%",
                    }}
                  >
                    <div
                      className="bg-gray-300/60 rounded-full"
                      style={{
                        width: "clamp(72px, 10vw, 130px)",
                        height: "clamp(72px, 10vw, 130px)",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="h-6 bg-gray-300/60 rounded-lg mb-2"
                  style={{ width: "clamp(120px, 15vw, 180px)" }}
                />
                <div
                  className="h-4 bg-gray-300/40 rounded"
                  style={{ width: "clamp(180px, 20vw, 240px)" }}
                />
                <div
                  className="h-4 bg-gray-300/40 rounded mt-2"
                  style={{ width: "clamp(160px, 18vw, 220px)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksSectionSkeleton;