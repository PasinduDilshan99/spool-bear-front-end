"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    }))
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
            background: "#ff5000",
            opacity: p.opacity,
            animation: `heroFloat ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   FILAMENT ORBIT SVG (behind printer image)
══════════════════════════════════════════ */
function FilamentOrbit() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer orbit */}
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
      {/* Mid orbit */}
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
      {/* Inner orbit */}
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

      {/* Orbit rider dots — outer */}
      <g
        style={{
          animation: "orbitCW 28s linear infinite",
          transformOrigin: "250px 250px",
        }}
      >
        <circle cx="460" cy="250" r="5" fill="#ff5000" opacity="0.7" />
        <circle cx="40" cy="250" r="3" fill="#ff5000" opacity="0.4" />
      </g>
      {/* Orbit rider dots — mid */}
      <g
        style={{
          animation: "orbitCCW 20s linear infinite",
          transformOrigin: "250px 250px",
        }}
      >
        <circle cx="250" cy="85" r="4" fill="#ff5000" opacity="0.6" />
        <circle cx="415" cy="250" r="3" fill="#ff5000" opacity="0.35" />
      </g>

      {/* Cross-hairs (static) */}
      <line
        x1="250"
        y1="30"
        x2="250"
        y2="80"
        stroke="rgba(255,80,0,0.12)"
        strokeWidth="1"
      />
      <line
        x1="250"
        y1="420"
        x2="250"
        y2="470"
        stroke="rgba(255,80,0,0.12)"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="250"
        x2="80"
        y2="250"
        stroke="rgba(255,80,0,0.12)"
        strokeWidth="1"
      />
      <line
        x1="420"
        y1="250"
        x2="470"
        y2="250"
        stroke="rgba(255,80,0,0.12)"
        strokeWidth="1"
      />

      {/* Glow centre */}
      <circle cx="250" cy="250" r="80" fill="url(#heroGlow)" opacity="0.35" />
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff5000" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ══════════════════════════════════════════
   ANIMATED COUNTER (stats row)
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
          const duration = 1600;
          const steps = 40;
          const inc = to / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= to) {
              setCount(to);
              clearInterval(timer);
            } else setCount(Math.floor(cur));
          }, duration / steps);
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
          fontSize: "clamp(22px, 2.2vw, 32px)",
          letterSpacing: "-0.03em",
          color: "#101113",
        }}
      >
        {count.toLocaleString()}
        <span style={{ color: "#ff5000" }}>{suffix}</span>
      </span>
      <span
        className="text-[11px] font-bold uppercase tracking-[0.10em] mt-1"
        style={{ color: "#2b2e33" }}
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
  // subtitle = "Premium filaments and resins for your next creation",
  primaryCtaText = "Shop Now",
  primaryCtaLink = "/shop",
  secondaryCtaText = "Learn More",
  secondaryCtaLink = "/about-us",
  imagePath = "/images/3D_Printer(Home).png",
  imageAlt = "3D Printer",
  className = "",
}) => {
  return (
    <>
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap");

        /* ── particle drift ── */
        @keyframes heroFloat {
          from {
            transform: translateY(0px) rotate(0deg);
          }
          to {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        /* ── orbit rings ── */
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

        /* ── image levitate ── */
        @keyframes levitate {
          0%,
          100% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-18px) rotate(1deg);
          }
        }

        /* ── scan line ── */
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

        /* ── content stagger reveal ── */
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

        /* ── accent underline draw ── */
        @keyframes underlineDraw {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        /* ── CTA button shimmer ── */
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        /* ── image glow pulse ── */
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

        /* ── filament slide ── */
        @keyframes filamentSlide {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -60;
          }
        }

        /* stagger helpers */
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
        className={`relative min-h-[580px] flex items-center overflow-hidden ${className}`}
        style={{
          background: "#dfe3e8",
          fontFamily: "'Faculty Glyphic', sans-serif",
        }}
      >
        {/* ── Background grid ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── Diagonal accent bar (top-right) ── */}
        <div
          className="absolute -top-10 -right-10 w-[420px] h-[420px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,80,0,0.07) 0%, transparent 60%)",
            borderRadius: "0 0 0 100%",
          }}
        />

        {/* ── Bottom-left corner accent ── */}
        <div
          className="absolute -bottom-14 -left-14 w-[320px] h-[320px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,80,0,0.08) 0%, transparent 70%)",
          }}
        />

        {/* ── Scan line ── */}
        <div
          className="absolute left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,80,0,0.5), transparent)",
            animation: "scanLine 5s ease-in-out infinite",
          }}
        />

        {/* ── Floating particles (client-only) ── */}
        <FloatingParticles />

        {/* ── Filament threads bottom ── */}
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

        {/* ── MAIN GRID ── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* ── LEFT: copy ── */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="hero-item-1 inline-flex items-center gap-2 mb-5">
                <div
                  className="h-[2px] w-8 rounded-full"
                  style={{ background: "#ff5000" }}
                />
                <span
                  className="text-[11px] font-black uppercase tracking-[0.18em]"
                  style={{ color: "#ff5000" }}
                >
                  Premium 3D Printing Supplies
                </span>
                <div
                  className="h-[2px] w-8 rounded-full"
                  style={{ background: "#ff5000" }}
                />
              </div>

              {/* Headline */}
              <h1
                className="hero-item-2 font-black leading-[1.09]"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(34px, 4vw, 48px)",
                    color: "#101113",
                  }}
                >
                  {title}
                </span>
                {/* Accent with animated underline */}
                <span
                  className="relative inline-block"
                  style={{
                    fontSize: "clamp(34px, 4vw, 58px)",
                    color: "#ff5000",
                  }}
                >
                  {accentText}
                  <span
                    className="absolute bottom-0 left-0 h-[4px] rounded-full"
                    style={{
                      background: "rgba(255,80,0,0.30)",
                      animation: "underlineDraw 1.0s 0.8s ease-out both",
                      width: "0%" /* starts at 0, keyframe takes it to 100% */,
                    }}
                  />
                </span>
              </h1>

              {/* Subtitle */}
              {/* <p
                className="hero-item-3 mt-5 font-medium leading-relaxed"
                style={{
                  fontSize: "clamp(15px, 1.4vw, 19px)",
                  color: "#2b2e33",
                  maxWidth: "460px",
                  margin: "20px auto 0",
                  textAlign: "inherit",
                }}
              >
                {subtitle}
              </p> */}

              {/* CTA buttons */}
              <div className="hero-item-4 mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                {/* Primary */}
                <Link
                  href={primaryCtaLink}
                  className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-[0.08em] text-sm text-white transition-all duration-300"
                  style={{
                    background: "#ff5000",
                    borderRadius: "14px",
                    boxShadow: "0 6px 24px rgba(255,80,0,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e34800";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 32px rgba(255,80,0,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#ff5000";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 6px 24px rgba(255,80,0,0.35)";
                  }}
                >
                  {/* Shimmer overlay */}
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
                  className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-[0.08em] text-sm transition-all duration-300"
                  style={{
                    color: "#101113",
                    border: "2px solid rgba(0,0,0,0.20)",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.50)",
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
                    e.currentTarget.style.background = "rgba(255,255,255,0.50)";
                    e.currentTarget.style.color = "#101113";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.20)";
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
              <div className="hero-item-5 mt-10 flex gap-8 justify-center lg:justify-start">
                <div
                  className="h-8 w-[1.5px] self-center hidden lg:block"
                  style={{ background: "rgba(0,0,0,0.12)" }}
                />
                <AnimatedStat to={12} suffix="+" label="Models" />
                <div
                  className="h-8 w-[1.5px] self-center"
                  style={{ background: "rgba(0,0,0,0.12)" }}
                />
                <AnimatedStat to={4} suffix="+" label="Materials" />
                <div
                  className="h-8 w-[1.5px] self-center"
                  style={{ background: "rgba(0,0,0,0.12)" }}
                />
                <AnimatedStat to={48} suffix="h" label="Dispatch" />
              </div>
            </div>

            {/* ── RIGHT: image ── */}
            <div className="order-1 lg:order-2 relative w-full flex items-center justify-center">
              {/* Orbit rings behind image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[480px] h-[480px] relative">
                  <FilamentOrbit />
                </div>
              </div>

              {/* Image glow */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                  className="w-[360px] h-[360px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,80,0,0.22) 0%, transparent 70%)",
                    animation: "glowPulse 4s ease-in-out infinite",
                    filter: "blur(40px)",
                  }}
                />
              </div>

              {/* Printer image */}
              <div className="hero-img relative h-[300px] sm:h-[400px] lg:h-[520px] w-full max-w-[560px]">
                <Image
                  src={imagePath}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  style={{
                    filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))",
                  }}
                />
              </div>

              {/* Floating badge — top left of image area */}
              <div
                className="absolute top-8 left-4 lg:-left-4 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl pointer-events-none"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  animation: "heroReveal 0.7s 1.0s ease-out both",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,80,0,0.12)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="#ff5000"
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
                    className="text-[10px] font-black uppercase tracking-[0.10em]"
                    style={{ color: "rgba(0,0,0,0.40)" }}
                  >
                    Quality
                  </p>
                  <p
                    className="text-[13px] font-black leading-none"
                    style={{ color: "#101113" }}
                  >
                    Pro Grade
                  </p>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div
                className="absolute bottom-12 right-4 lg:-right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl pointer-events-none"
                style={{
                  background: "#ff5000",
                  boxShadow: "0 8px 28px rgba(255,80,0,0.40)",
                  animation: "heroReveal 0.7s 1.2s ease-out both",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.18)" }}
                >
                  <svg
                    width="16"
                    height="16"
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
                    className="text-[10px] font-black uppercase tracking-[0.10em]"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    Ships in
                  </p>
                  <p className="text-[13px] font-black leading-none text-white">
                    48 Hours
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
