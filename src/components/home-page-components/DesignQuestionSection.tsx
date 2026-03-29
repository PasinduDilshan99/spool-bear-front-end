"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTACT_US_PAGE_PATH, PRINT_PAGE_PATH } from "@/utils/urls";
import { NUMBER_OF_DISPATCH, NUMBER_OF_MATERIALS } from "@/utils/constant";

interface DesignQuestionSectionProps {
  className?: string;
  imagePath?: string;
}

const DesignQuestionSection: React.FC<DesignQuestionSectionProps> = ({
  className = "",
  imagePath = "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774767052/bx3ck5cm75ep2bmjaop6.png",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay: string): React.CSSProperties =>
    visible
      ? { animation: `dqsReveal 0.65s ${delay} ease-out both` }
      : { opacity: 0 };

  return (
    <>
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap");

        @keyframes dqsReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        @keyframes dqsGlow {
          0%,
          100% {
            opacity: 0.12;
            transform: scale(1);
          }
          50% {
            opacity: 0.28;
            transform: scale(1.12);
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
        @keyframes dqsFilament {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -60;
          }
        }
        @keyframes dqsUnderline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes dqsShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`relative overflow-hidden ${className}`}
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

        {/* Filament threads */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "36px" }}
          viewBox="0 0 1200 36"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 18 Q 300 4, 600 18 T 1200 18"
            stroke="rgba(255,80,0,0.12)"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
            style={{ animation: "dqsFilament 5s linear infinite" }}
          />
          <path
            d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.06)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            fill="none"
            style={{ animation: "dqsFilament 5s linear infinite reverse" }}
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
            {/* ══ LEFT: copy + CTAs ══════════════════════════════════════ */}
            <div
              className="flex flex-col items-center lg:items-start"
              style={reveal("0s")}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-7">
                <div
                  className="h-[2px] rounded-full bg-[#FF5000]"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
                <span
                  className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
                  style={{ fontSize: "clamp(10px, 1.1vw, 12px)" }}
                >
                  Start Creating
                </span>
                <div
                  className="h-[2px] rounded-full bg-[#FF5000]"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
              </div>

              {/* Headline */}
              <h2
                className="font-black leading-[1.08] tracking-tight text-[#101113] text-center lg:text-left mb-5 sm:mb-7"
                style={{
                  fontSize: "clamp(28px, 4.8vw, 58px)",
                  letterSpacing: "-0.03em",
                  ...reveal("0.1s"),
                }}
              >
                Turn Your Ideas Into Reality with{" "}
                <span className="relative inline-block text-[#FF5000]">
                  3D Printing
                  <span
                    className="absolute bottom-0 left-0 h-[3px] sm:h-[4px] rounded-full"
                    style={{
                      background: "rgba(255,80,0,0.28)",
                      animation: visible
                        ? "dqsUnderline 0.9s 0.65s ease-out both"
                        : "none",
                      width: 0,
                    }}
                  />
                </span>
              </h2>

              {/* Sub-question */}
              <div
                className="text-center lg:text-left mb-8 sm:mb-10"
                style={reveal("0.2s")}
              >
                <p
                  className="font-medium text-[#2b2e33] mb-1"
                  style={{ fontSize: "clamp(13px, 1.5vw, 18px)" }}
                >
                  Start by telling us one thing:
                </p>
                <p
                  className="font-black text-[#101113]"
                  style={{ fontSize: "clamp(16px, 2vw, 24px)" }}
                >
                  Do you already have a 3D design?
                </p>
              </div>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                style={reveal("0.3s")}
              >
                {/* Yes — ghost */}
                <Link
                  href={PRINT_PAGE_PATH}
                  className="group relative inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] text-[#101113] transition-all duration-300 overflow-hidden"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 14px)",
                    padding:
                      "clamp(12px, 1.4vw, 16px) clamp(20px, 2.5vw, 36px)",
                    border: "2px solid rgba(0,0,0,0.18)",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                    background: "rgba(255,255,255,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#101113";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#101113";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.color = "#101113";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Yes, I have a design
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                {/* No — primary orange */}
                <Link
                  href={CONTACT_US_PAGE_PATH}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] text-white transition-all duration-300"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 14px)",
                    padding:
                      "clamp(12px, 1.4vw, 16px) clamp(20px, 2.5vw, 36px)",
                    background:
                      "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                    boxShadow: "0 6px 24px rgba(255,80,0,0.36)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(255,80,0,0.46)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 6px 24px rgba(255,80,0,0.36)";
                  }}
                >
                  {/* Shimmer sweep */}
                  <span
                    className="absolute top-0 bottom-0 w-16 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                      animation: "dqsShimmer 2.5s 1.2s ease-in-out infinite",
                    }}
                  />
                  <span className="relative z-10">No, I need help</span>
                  <svg
                    className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5-5 5M6 12h12"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ══ RIGHT: image + decorations ════════════════════════════ */}
            <div
              className="relative flex items-center justify-center order-first lg:order-last"
              style={reveal("0.15s")}
            >
              {/* Orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  className="max-w-full max-h-full"
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
                    stroke="rgba(255,80,0,0.07)"
                    strokeWidth="1.5"
                    strokeDasharray="10 14"
                    style={{
                      animation: "dqsOrbitCW 32s linear infinite",
                      transformOrigin: "250px 250px",
                    }}
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="175"
                    stroke="rgba(255,80,0,0.10)"
                    strokeWidth="1"
                    strokeDasharray="7 11"
                    style={{
                      animation: "dqsOrbitCCW 24s linear infinite",
                      transformOrigin: "250px 250px",
                    }}
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="130"
                    stroke="rgba(255,80,0,0.13)"
                    strokeWidth="1"
                    strokeDasharray="5 8"
                    style={{
                      animation: "dqsOrbitCW 16s linear infinite",
                      transformOrigin: "250px 250px",
                    }}
                  />
                  {/* Rider dots */}
                  <g
                    style={{
                      animation: "dqsOrbitCW 32s linear infinite",
                      transformOrigin: "250px 250px",
                    }}
                  >
                    <circle
                      cx="470"
                      cy="250"
                      r="5"
                      fill="#FF5000"
                      opacity="0.45"
                    />
                    <circle
                      cx="30"
                      cy="250"
                      r="3"
                      fill="#FF5000"
                      opacity="0.25"
                    />
                  </g>
                  <g
                    style={{
                      animation: "dqsOrbitCCW 24s linear infinite",
                      transformOrigin: "250px 250px",
                    }}
                  >
                    <circle
                      cx="250"
                      cy="75"
                      r="4"
                      fill="#FF5000"
                      opacity="0.40"
                    />
                    <circle
                      cx="425"
                      cy="250"
                      r="3"
                      fill="#FF5000"
                      opacity="0.25"
                    />
                  </g>
                  <circle cx="250" cy="250" r="95" fill="url(#dqsGlow)" />
                  <defs>
                    <radialGradient id="dqsGlow" cx="50%" cy="50%" r="50%">
                      <stop
                        offset="0%"
                        stopColor="#FF5000"
                        stopOpacity="0.08"
                      />
                      <stop offset="100%" stopColor="#FF5000" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Glow blob */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="rounded-full"
                  style={{
                    width: "clamp(160px, 22vw, 300px)",
                    height: "clamp(160px, 22vw, 300px)",
                    background:
                      "radial-gradient(circle, rgba(255,80,0,0.10) 0%, transparent 70%)",
                    filter: "blur(48px)",
                    animation: "dqsGlow 5s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Main image — responsive height */}
              <div
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto"
                style={{
                  height: "clamp(240px, 40vw, 560px)",
                  animation: "dqsLevitate 7s 1s ease-in-out infinite",
                }}
              >
                <Image
                  src={imagePath}
                  alt="3D Printing Design"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 50vw, 540px"
                  style={{
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.08))",
                  }}
                />
              </div>

              {/* Badge — top left (Materials) */}
              <div
                className="absolute flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl pointer-events-none"
                style={{
                  top: "clamp(4px, 2vw, 24px)",
                  left: "clamp(-8px, -1vw, -16px)",
                  padding: "clamp(8px, 1vw, 12px) clamp(10px, 1.4vw, 16px)",
                  background: "rgba(255,255,255,0.97)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
                  border: "1.5px solid rgba(255,80,0,0.14)",
                  ...reveal("0.55s"),
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0"
                  style={{
                    width: "clamp(28px, 3.5vw, 38px)",
                    height: "clamp(28px, 3.5vw, 38px)",
                    background: "rgba(255,80,0,0.10)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="#FF5000"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-black uppercase tracking-[0.10em]"
                    style={{
                      fontSize: "clamp(8px, 0.9vw, 11px)",
                      color: "rgba(0,0,0,0.38)",
                    }}
                  >
                    Materials
                  </p>
                  <p
                    className="font-black leading-none"
                    style={{
                      fontSize: "clamp(11px, 1.2vw, 14px)",
                      color: "#101113",
                    }}
                  >
                    {NUMBER_OF_MATERIALS}+ Options
                  </p>
                </div>
              </div>

              {/* Badge — bottom right (Fast Turn) */}
              <div
                className="absolute flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl pointer-events-none"
                style={{
                  bottom: "clamp(4px, 3vw, 40px)",
                  right: "clamp(-8px, -1vw, -16px)",
                  padding: "clamp(8px, 1vw, 12px) clamp(10px, 1.4vw, 16px)",
                  background: "#FF5000",
                  boxShadow: "0 8px 26px rgba(255,80,0,0.32)",
                  ...reveal("0.70s"),
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0"
                  style={{
                    width: "clamp(28px, 3.5vw, 38px)",
                    height: "clamp(28px, 3.5vw, 38px)",
                    background: "rgba(255,255,255,0.18)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-black uppercase tracking-[0.10em]"
                    style={{
                      fontSize: "clamp(8px, 0.9vw, 11px)",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Fast Turn
                  </p>
                  <p
                    className="font-black leading-none text-white"
                    style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                  >
                    {NUMBER_OF_DISPATCH}h Dispatch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignQuestionSection;
