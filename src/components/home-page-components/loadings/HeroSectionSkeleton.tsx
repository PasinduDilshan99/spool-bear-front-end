// HeroSectionSkeleton.tsx
"use client";

export const HeroSectionSkeleton = () => {
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
        @keyframes heroFloat {
          from {
            transform: translateY(0px) rotate(0deg);
          }
          to {
            transform: translateY(-30px) rotate(180deg);
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 1.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        className="relative flex items-center overflow-hidden"
        style={{
          background: "#dfe3e8",
          fontFamily: "'Faculty Glyphic', sans-serif",
          minHeight: "clamp(520px, 80vh, 820px)",
        }}
      >
        {/* Same background elements as above */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div
          className="container mx-auto relative z-10 w-full"
          style={{
            maxWidth: "1400px",
            padding: "clamp(40px, 6vw, 80px) clamp(16px, 4vw, 64px)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* Left column with shimmer */}
            <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="shimmer-overlay w-full">
                <div className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                  <div className="h-[2px] rounded-full bg-orange-300/50 w-8" />
                  <div className="h-3 bg-orange-200/50 rounded w-32" />
                  <div className="h-[2px] rounded-full bg-orange-300/50 w-8" />
                </div>

                <div className="mb-6 sm:mb-8">
                  <div className="h-10 bg-gray-300/60 rounded-lg mb-3 w-64" />
                  <div className="h-12 bg-orange-200/40 rounded-lg w-56" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <div className="bg-orange-300/60 rounded-xl h-12 w-36" />
                  <div className="bg-gray-300/50 rounded-xl h-12 w-36" />
                </div>

                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                  <div>
                    <div className="h-7 bg-gray-400/40 rounded w-16 mb-1" />
                    <div className="h-3 bg-gray-400/30 rounded w-12" />
                  </div>
                  <div className="h-7 w-px bg-black/10" />
                  <div>
                    <div className="h-7 bg-gray-400/40 rounded w-16 mb-1" />
                    <div className="h-3 bg-gray-400/30 rounded w-14" />
                  </div>
                  <div className="h-7 w-px bg-black/10" />
                  <div>
                    <div className="h-7 bg-gray-400/40 rounded w-16 mb-1" />
                    <div className="h-3 bg-gray-400/30 rounded w-12" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column with shimmer */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center">
              <div className="shimmer-overlay absolute inset-0 flex items-center justify-center">
                <div
                  className="bg-gray-300/40 rounded-2xl"
                  style={{
                    height: "clamp(240px, 40vw, 540px)",
                    width: "clamp(260px, 44vw, 560px)",
                  }}
                />
              </div>

              {/* Badges with shimmer */}
              <div className="shimmer-overlay absolute top-0 left-0">
                <div
                  className="flex items-center gap-2 rounded-xl bg-white/93 p-2"
                  style={{ top: "clamp(8px, 2.5vw, 32px)", left: "clamp(-4px, -0.5vw, -16px)" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100" />
                  <div>
                    <div className="h-2 bg-gray-300 rounded w-12 mb-1" />
                    <div className="h-3 bg-gray-400 rounded w-16" />
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

export default HeroSectionSkeleton;