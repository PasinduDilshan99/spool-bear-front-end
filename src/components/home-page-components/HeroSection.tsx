"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ABOUT_US_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";
import {
  NUMBER_OF_DISPATCH,
  NUMBER_OF_MATERIALS,
  NUMBER_OF_MODELS,
  SHIPS_IN,
} from "@/utils/constant";
import HeroSectionSkeleton from "./loadings/HeroSectionSkeleton";

interface HeroSectionProps {
  title?: string;
  accentText?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imagePath?: string;
  imageAlt?: string;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/* ══════════════════════════════════════════
   FLOATING PARTICLES
══════════════════════════════════════════ */
function FloatingParticles() {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.35,
    })),
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#FF5000",
            opacity: p.opacity,
            animation: `heroFloat ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   FILAMENT ORBIT SVG
══════════════════════════════════════════ */
function FilamentOrbit() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="250"
        cy="250"
        r="210"
        stroke="rgba(255,80,0,0.10)"
        strokeWidth="1.5"
        strokeDasharray="12 14"
        style={{
          animation: "orbitCW 28s linear infinite",
          transformOrigin: "250px 250px",
        }}
      />
      <circle
        cx="250"
        cy="250"
        r="165"
        stroke="rgba(255,80,0,0.14)"
        strokeWidth="1"
        strokeDasharray="8 10"
        style={{
          animation: "orbitCCW 20s linear infinite",
          transformOrigin: "250px 250px",
        }}
      />
      <circle
        cx="250"
        cy="250"
        r="120"
        stroke="rgba(255,80,0,0.18)"
        strokeWidth="1"
        strokeDasharray="5 8"
        style={{
          animation: "orbitCW 14s linear infinite",
          transformOrigin: "250px 250px",
        }}
      />
      {/* Rider dots — outer */}
      <g
        style={{
          animation: "orbitCW 28s linear infinite",
          transformOrigin: "250px 250px",
        }}
      >
        <circle cx="460" cy="250" r="5" fill="#FF5000" opacity="0.7" />
        <circle cx="40" cy="250" r="3" fill="#FF5000" opacity="0.4" />
      </g>
      {/* Rider dots — mid */}
      <g
        style={{
          animation: "orbitCCW 20s linear infinite",
          transformOrigin: "250px 250px",
        }}
      >
        <circle cx="250" cy="85" r="4" fill="#FF5000" opacity="0.6" />
        <circle cx="415" cy="250" r="3" fill="#FF5000" opacity="0.35" />
      </g>
      {/* Cross-hairs */}
      {[
        [250, 30, 250, 80],
        [250, 420, 250, 470],
        [30, 250, 80, 250],
        [420, 250, 470, 250],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(255,80,0,0.12)"
          strokeWidth="1"
        />
      ))}
      {/* Centre glow */}
      <circle cx="250" cy="250" r="80" fill="url(#heroGlow)" opacity="0.35" />
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF5000" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ══════════════════════════════════════════
   ANIMATED STAT COUNTER
══════════════════════════════════════════ */
function AnimatedStat({
  to,
  suffix,
  label,
}: {
  to: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 40;
          const inc = to / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= to) {
              setCount(to);
              clearInterval(timer);
            } else setCount(Math.floor(cur));
          }, 1600 / steps);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-start">
      <span
        className="font-black leading-none"
        style={{
          fontSize: "clamp(18px, 2.2vw, 32px)",
          letterSpacing: "-0.03em",
          color: "#101113",
        }}
      >
        {count.toLocaleString()}
        <span style={{ color: "#FF5000" }}>{suffix}</span>
      </span>
      <span
        className="font-bold uppercase tracking-[0.10em] mt-1"
        style={{ fontSize: "clamp(9px, 0.9vw, 11px)", color: "#2b2e33" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════ */
const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Turning digital designs into",
  accentText = "real-world solutions.",
  primaryCtaText = "Shop Now",
  primaryCtaLink = SHOP_PAGE_PATH,
  secondaryCtaText = "Learn More",
  secondaryCtaLink = ABOUT_US_PAGE_PATH,
  imagePath = "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774766973/xx8944nyn602dmyxcy4b.png",
  imageAlt = "3D Printer",
  className = "",
}) => {
  return (
    <>
      <style global jsx>{`

        @keyframes heroFloat {
          from {
            transform: translateY(0px) rotate(0deg);
          }
          to {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        @keyframes orbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbitCCW {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes levitate {
          0%,
          100% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-18px) rotate(1deg);
          }
        }
        @keyframes scanLine {
          0% {
            top: 0%;
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes underlineDraw {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.18;
            transform: scale(1);
          }
          50% {
            opacity: 0.35;
            transform: scale(1.08);
          }
        }
        @keyframes filamentSlide {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -60;
          }
        }

        .hero-item-1 {
          animation: heroReveal 0.7s 0.1s ease-out both;
        }
        .hero-item-2 {
          animation: heroReveal 0.7s 0.25s ease-out both;
        }
        .hero-item-3 {
          animation: heroReveal 0.7s 0.4s ease-out both;
        }
        .hero-item-4 {
          animation: heroReveal 0.7s 0.55s ease-out both;
        }
        .hero-item-5 {
          animation: heroReveal 0.7s 0.7s ease-out both;
        }
        .hero-img {
          animation:
            heroReveal 0.9s 0.2s ease-out both,
            levitate 7s 1s ease-in-out infinite;
        }
      `}</style>

      <section
        className={`relative flex items-center overflow-hidden ${className}`}
        style={{
          background: "#dfe3e8",
          fontFamily: "'Faculty Glyphic', sans-serif",
          minHeight: "clamp(520px, 80vh, 820px)",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Diagonal accent — top right */}
        <div
          className="absolute -top-10 -right-10 pointer-events-none"
          style={{
            width: "clamp(200px, 35vw, 440px)",
            height: "clamp(200px, 35vw, 440px)",
            background:
              "linear-gradient(135deg, rgba(255,80,0,0.07) 0%, transparent 60%)",
            borderRadius: "0 0 0 100%",
          }}
        />

        {/* Bottom-left glow */}
        <div
          className="absolute -bottom-14 -left-14 pointer-events-none"
          style={{
            width: "clamp(160px, 28vw, 340px)",
            height: "clamp(160px, 28vw, 340px)",
            background:
              "radial-gradient(circle at center, rgba(255,80,0,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,80,0,0.5), transparent)",
            animation: "scanLine 5s ease-in-out infinite",
          }}
        />

        <FloatingParticles />

        {/* Filament threads bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "40px" }}
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 20 Q 300 5, 600 20 T 1200 20"
            stroke="rgba(255,80,0,0.18)"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
            style={{ animation: "filamentSlide 5s linear infinite" }}
          />
          <path
            d="M 0 32 Q 300 17, 600 32 T 1200 32"
            stroke="rgba(255,80,0,0.10)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            fill="none"
            style={{ animation: "filamentSlide 5s linear infinite reverse" }}
          />
        </svg>

        {/* ── Main grid ── */}
        <div
          className="container mx-auto relative z-10 w-full"
          style={{
            maxWidth: "1400px",
            padding: "clamp(40px, 6vw, 80px) clamp(16px, 4vw, 64px)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* ══ LEFT: copy ═══════════════════════════════════════════════ */}
            <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Eyebrow */}
              <div className="hero-item-1 inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                <div
                  className="h-[2px] rounded-full bg-[#FF5000]"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
                <span
                  className="font-black uppercase tracking-[0.18em] text-[#FF5000]"
                  style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
                >
                  Premium 3D Printing
                </span>
                <div
                  className="h-[2px] rounded-full bg-[#FF5000]"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
              </div>

              {/* Headline */}
              <h1
                className="hero-item-2 font-black leading-[1.08] tracking-tight mb-6 sm:mb-8"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span
                  className="block text-[#101113]"
                  style={{ fontSize: "clamp(26px, 3.8vw, 50px)" }}
                >
                  {title}
                </span>
                <span
                  className="relative inline-block text-[#FF5000]"
                  style={{ fontSize: "clamp(28px, 4.2vw, 58px)" }}
                >
                  {accentText}
                  <span
                    className="absolute bottom-0 left-0 h-[3px] sm:h-[4px] rounded-full"
                    style={{
                      background: "rgba(255,80,0,0.30)",
                      animation: "underlineDraw 1.0s 0.8s ease-out both",
                      width: 0,
                    }}
                  />
                </span>
              </h1>

              {/* CTA buttons */}
              <div className="hero-item-3 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
                {/* Primary */}
                <Link
                  href={primaryCtaLink}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] text-white transition-all duration-300"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 14px)",
                    padding:
                      "clamp(12px, 1.4vw, 16px) clamp(22px, 2.8vw, 38px)",
                    background: "#FF5000",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                    boxShadow: "0 6px 24px rgba(255,80,0,0.36)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e34800";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(255,80,0,0.46)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FF5000";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 6px 24px rgba(255,80,0,0.36)";
                  }}
                >
                  <span
                    className="absolute top-0 bottom-0 w-16 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                      animation: "shimmer 2.5s 1.2s ease-in-out infinite",
                    }}
                  />
                  <span className="relative z-10">{primaryCtaText}</span>
                  <svg
                    className="relative z-10 w-4 h-4"
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

                {/* Secondary */}
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] transition-all duration-300"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 14px)",
                    padding:
                      "clamp(12px, 1.4vw, 16px) clamp(22px, 2.8vw, 38px)",
                    color: "#101113",
                    border: "2px solid rgba(0,0,0,0.18)",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                    background: "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(4px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#101113";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#101113";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.color = "#101113";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {secondaryCtaText}
                  <svg
                    className="w-4 h-4"
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
              </div>

              {/* Stats row */}
              <div className="hero-item-4 flex items-center gap-4 sm:gap-6 lg:gap-8 justify-center lg:justify-start">
                <AnimatedStat to={NUMBER_OF_MODELS} suffix="+" label="Models" />
                <div className="h-7 sm:h-8 w-px bg-black/12 flex-shrink-0" />
                <AnimatedStat
                  to={NUMBER_OF_MATERIALS}
                  suffix="+"
                  label="Materials"
                />
                <div className="h-7 sm:h-8 w-px bg-black/12 flex-shrink-0" />
                <AnimatedStat
                  to={NUMBER_OF_DISPATCH}
                  suffix="h"
                  label="Dispatch"
                />
              </div>
            </div>

            {/* ══ RIGHT: image ══════════════════════════════════════════════ */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center">
              {/* Orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="relative"
                  style={{
                    width: "clamp(260px, 42vw, 500px)",
                    height: "clamp(260px, 42vw, 500px)",
                  }}
                >
                  <FilamentOrbit />
                </div>
              </div>

              {/* Glow blob */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="rounded-full"
                  style={{
                    width: "clamp(200px, 30vw, 380px)",
                    height: "clamp(200px, 30vw, 380px)",
                    background:
                      "radial-gradient(circle, rgba(255,80,0,0.22) 0%, transparent 70%)",
                    animation: "glowPulse 4s ease-in-out infinite",
                    filter: "blur(40px)",
                  }}
                />
              </div>

              {/* Printer image */}
              <div
                className="hero-img relative w-full"
                style={{
                  height: "clamp(240px, 40vw, 540px)",
                  maxWidth: "clamp(260px, 44vw, 560px)",
                }}
              >
                <Image
                  src={imagePath}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 560px"
                  style={{
                    filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))",
                  }}
                />
              </div>

              {/* Badge — top left (Quality) */}
              <div
                className="absolute flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl pointer-events-none"
                style={{
                  top: "clamp(8px, 2.5vw, 32px)",
                  left: "clamp(-4px, -0.5vw, -16px)",
                  padding: "clamp(8px, 1vw, 12px) clamp(10px, 1.4vw, 16px)",
                  background: "rgba(255,255,255,0.93)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  animation: "heroReveal 0.7s 1.0s ease-out both",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0"
                  style={{
                    width: "clamp(26px, 3vw, 36px)",
                    height: "clamp(26px, 3vw, 36px)",
                    background: "rgba(255,80,0,0.12)",
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-black uppercase tracking-[0.10em]"
                    style={{
                      fontSize: "clamp(8px, 0.85vw, 10px)",
                      color: "rgba(0,0,0,0.40)",
                    }}
                  >
                    Quality
                  </p>
                  <p
                    className="font-black leading-none"
                    style={{
                      fontSize: "clamp(11px, 1.2vw, 14px)",
                      color: "#101113",
                    }}
                  >
                    Pro Grade
                  </p>
                </div>
              </div>

              {/* Badge — bottom right (Ships in) */}
              <div
                className="absolute flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl pointer-events-none"
                style={{
                  bottom: "clamp(24px, 4vw, 56px)",
                  right: "clamp(-4px, -0.5vw, -16px)",
                  padding: "clamp(8px, 1vw, 12px) clamp(10px, 1.4vw, 16px)",
                  background: "#FF5000",
                  boxShadow: "0 8px 28px rgba(255,80,0,0.40)",
                  animation: "heroReveal 0.7s 1.2s ease-out both",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg sm:rounded-xl flex-shrink-0"
                  style={{
                    width: "clamp(26px, 3vw, 36px)",
                    height: "clamp(26px, 3vw, 36px)",
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
                      d="M20 7l-8-4-8 4m16 0v10l-8 4m-8-4V7m16 0l-8 4M4 7l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-black uppercase tracking-[0.10em]"
                    style={{
                      fontSize: "clamp(8px, 0.85vw, 10px)",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Ships in
                  </p>
                  <p
                    className="font-black leading-none text-white"
                    style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                  >
                    {SHIPS_IN} Hours
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

export default HeroSection;
