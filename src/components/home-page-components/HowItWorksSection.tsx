"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HowItWorksStep {
  iconWrapClass: string;
  icon: {
    src: string;
    alt: string;
    ariaHidden?: boolean;
  };
  title: string;
  textHtml: string;
}

interface HowItWorksSectionProps {
  className?: string;
  title?: string;
  steps?: HowItWorksStep[];
}

/* ══════════════════════════════════════════
   STEP CARD
══════════════════════════════════════════ */
function StepCard({ step, index, total, visible }: { 
  step: HowItWorksStep; 
  index: number; 
  total: number;
  visible: boolean;
}) {
  const delay = `${0.15 + index * 0.18}s`;
  return (
    <div className="relative flex flex-col items-center text-center group"
      style={{ animation: visible ? `hiwReveal 0.75s ${delay} ease-out both` : "none", opacity: visible ? undefined : 0 }}>
      
      {/* Number badge */}
      <div className="relative z-20 -mb-8 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl"
        style={{
          background: "linear-gradient(145deg, #ff5000 0%, #e34800 100%)",
          boxShadow: "0 6px 24px rgba(255,80,0,0.40), inset 0 2px 4px rgba(255,255,255,0.20)",
        }}>
        {index + 1}
        <span className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
          }} />
      </div>

      {/* Icon container */}
      <div className="relative mt-0 mb-8">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-64 h-64" viewBox="0 0 240 240" fill="none" aria-hidden="true">
            <circle cx="120" cy="120" r="108"
              stroke="rgba(255,80,0,0.12)" strokeWidth="1.5" strokeDasharray="8 10"
              style={{ animation: "hiwOrbitCW 24s linear infinite", transformOrigin: "120px 120px" }} />
            <circle cx="120" cy="120" r="88"
              stroke="rgba(255,80,0,0.08)" strokeWidth="1" strokeDasharray="6 8"
              style={{ animation: "hiwOrbitCCW 18s linear infinite", transformOrigin: "120px 120px" }} />
            {/* Orbital dots */}
            <g style={{ animation: "hiwOrbitCW 24s linear infinite", transformOrigin: "120px 120px" }}>
              <circle cx="228" cy="120" r="4" fill="#ff5000" opacity="0.5" />
              <circle cx="12"  cy="120" r="3" fill="#ff5000" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* Pulsing glow blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-44 h-44 rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(255,80,0,0.16) 0%, transparent 70%)",
              filter: "blur(36px)",
              animation: "hiwGlow 3.5s ease-in-out infinite",
            }} />
        </div>

        {/* Main icon circle */}
        <div className="relative w-52 h-52 rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.12), inset 0 2px 6px rgba(255,255,255,0.70)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-8px) scale(1.04)";
            e.currentTarget.style.boxShadow = "0 18px 56px rgba(0,0,0,0.18), inset 0 2px 6px rgba(255,255,255,0.70)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,0,0,0.12), inset 0 2px 6px rgba(255,255,255,0.70)";
          }}
        >
          {/* Inner icon wrapper */}
          <div className="relative w-32 h-32">
            <Image
              src={step.icon.src}
              alt={step.icon.alt}
              fill
              className="object-contain"
              sizes="128px"
              priority={index === 0}
            />
          </div>
        </div>

        {/* Decorative accent rings */}
        <div className="absolute -inset-4 border-2 rounded-full transition-all duration-500"
          style={{ borderColor: "rgba(255,80,0,0.15)" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
        <div className="absolute -inset-7 border rounded-full transition-all duration-700"
          style={{ borderColor: "rgba(255,80,0,0.08)" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
      </div>

      {/* Title */}
      <h3 className="font-black text-[clamp(20px,2vw,26px)] leading-tight mb-3"
        style={{ color: "#101113", letterSpacing: "-0.02em" }}>
        {step.title}
      </h3>

      {/* Description */}
      <p className="font-medium text-[15px] leading-relaxed max-w-xs"
        style={{ color: "#2b2e33" }}>
        {step.textHtml}
      </p>

      {/* Mobile arrow */}
      {index < total - 1 && (
        <div className="block lg:hidden mt-10 mb-2">
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,80,0,0.10)",
              border: "1.5px solid rgba(255,80,0,0.25)",
              animation: "hiwBounce 2s ease-in-out infinite",
            }}>
            <svg className="w-6 h-6" fill="none" stroke="#ff5000" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  className = "",
  title = "How It Works?",
  steps = [
    {
      iconWrapClass: "how-icon icon-upload",
      icon: { src: "/images/Home_Page_03(Upload_Icon).png", alt: "Upload icon" },
      title: "Upload and Describe",
      textHtml: "Upload your 3D design file, or tell us about your idea if you don't have a design yet.",
    },
    {
      iconWrapClass: "how-icon icon-quote",
      icon: { src: "/images/Home_Page_03(Quote_Icon).png", alt: "Quote icon" },
      title: "Get an Instant Quote",
      textHtml: "Our system automatically analyzes your request and generates a real-time quotation.",
    },
    {
      iconWrapClass: "how-icon icon-delivery",
      icon: { src: "/images/Home_Page_03(print_and_Delivery).png", alt: "Print and delivery icon" },
      title: "Print & Deliver",
      textHtml: "Once confirmed, we manufacture your part with care and deliver it to you.",
    },
  ],
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');

        /* ── reveal on scroll ── */
        @keyframes hiwReveal {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        /* ── orbit rings ── */
        @keyframes hiwOrbitCW  { to { transform: rotate(360deg);  } }
        @keyframes hiwOrbitCCW { to { transform: rotate(-360deg); } }
        /* ── glow pulse ── */
        @keyframes hiwGlow {
          0%,100% { opacity: 0.16; transform: scale(1);    }
          50%     { opacity: 0.32; transform: scale(1.14); }
        }
        /* ── bounce arrow ── */
        @keyframes hiwBounce {
          0%,100% { transform: translateY(0);   }
          50%     { transform: translateY(-8px); }
        }
        /* ── connecting line draw ── */
        @keyframes hiwLineDraw {
          from { stroke-dashoffset: 1000; }
          to   { stroke-dashoffset: 0;    }
        }
        /* ── shimmer CTA ── */
        @keyframes hiwShimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
        /* ── underline draw ── */
        @keyframes hiwUnderline {
          from { width: 0;    }
          to   { width: 100%; }
        }
        /* ── filament scroll ── */
        @keyframes hiwFilament {
          from { stroke-dashoffset: 0;   }
          to   { stroke-dashoffset: -60; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`relative py-20 md:py-28 overflow-hidden ${className}`}
        style={{ background: "#e4e7ec", fontFamily: "'Faculty Glyphic', sans-serif" }}
      >
        {/* ── Grid texture ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        {/* ── Corner glows ── */}
        <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at top left, rgba(255,80,0,0.06) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at bottom right, rgba(255,80,0,0.06) 0%, transparent 65%)" }} />

        {/* ── Filament threads at top ── */}
        <svg className="absolute top-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "36px" }} viewBox="0 0 1200 36" preserveAspectRatio="none">
          <path d="M 0 18 Q 300 4, 600 18 T 1200 18"
            stroke="rgba(255,80,0,0.14)" strokeWidth="2" strokeDasharray="8 6" fill="none"
            style={{ animation: "hiwFilament 5s linear infinite" }} />
          <path d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.07)" strokeWidth="1.5" strokeDasharray="5 8" fill="none"
            style={{ animation: "hiwFilament 5s linear infinite reverse" }} />
        </svg>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ maxWidth: "1400px" }}>

          {/* ── Section heading ── */}
          <div className="text-center mb-16 md:mb-20">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5"
              style={{ animation: visible ? "hiwReveal 0.6s 0.0s ease-out both" : "none", opacity: visible ? undefined : 0 }}>
              <div className="h-[2px] w-8 rounded-full" style={{ background: "#ff5000" }} />
              <span className="text-[11px] font-black uppercase tracking-[0.18em]"
                style={{ color: "#ff5000" }}>
                Simple Process
              </span>
              <div className="h-[2px] w-8 rounded-full" style={{ background: "#ff5000" }} />
            </div>

            {/* Headline */}
            <h2 className="font-black leading-tight mb-4"
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                letterSpacing: "-0.03em",
                color: "#101113",
                animation: visible ? "hiwReveal 0.6s 0.10s ease-out both" : "none",
                opacity: visible ? undefined : 0,
              }}>
              {title}
            </h2>

            {/* Underline accent */}
            <div className="h-1 rounded-full mx-auto"
              style={{
                background: "#ff5000",
                animation: visible ? "hiwUnderline 0.9s 0.60s ease-out both" : "none",
                width: 0,
                maxWidth: "140px",
              }} />
          </div>

          {/* ── Steps grid ── */}
          <div className="relative">
            {/* Desktop connecting path (SVG) */}
            <div className="hidden lg:block absolute top-28 left-0 right-0 pointer-events-none">
              <svg className="w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                  d="M 100 60 Q 400 30, 600 60 T 1100 60"
                  stroke="#ff5000" strokeWidth="2" strokeDasharray="10 6" fill="none" opacity="0.25"
                  style={{
                    strokeDasharray: "1000",
                    strokeDashoffset: "1000",
                    animation: visible ? "hiwLineDraw 1.8s 0.80s ease-out both" : "none",
                  }}
                />
                {/* Arrow heads along path */}
                {[{ x: 380, y: 42 }, { x: 820, y: 58 }].map((pos, i) => (
                  <g key={i} style={{
                    opacity: 0,
                    animation: visible ? `hiwReveal 0.4s ${1.0 + i * 0.3}s ease-out both` : "none",
                  }}>
                    <circle cx={pos.x} cy={pos.y} r="18"
                      fill="rgba(255,255,255,0.95)" stroke="rgba(255,80,0,0.30)" strokeWidth="1.5" />
                    <path d={`M ${pos.x - 6} ${pos.y} L ${pos.x + 6} ${pos.y} M ${pos.x + 2} ${pos.y - 4} L ${pos.x + 6} ${pos.y} L ${pos.x + 2} ${pos.y + 4}`}
                      stroke="#ff5000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 xl:gap-16 relative">
              {steps.map((step, index) => (
                <StepCard key={index} step={step} index={index} total={steps.length} visible={visible} />
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="text-center mt-20 lg:mt-28"
            style={{ animation: visible ? "hiwReveal 0.7s 0.95s ease-out both" : "none", opacity: visible ? undefined : 0 }}>
            <button
              className="relative overflow-hidden inline-flex items-center gap-3 px-10 py-5 font-black uppercase tracking-[0.08em] text-base text-white transition-all duration-300"
              style={{
                background: "linear-gradient(145deg, #ff5000 0%, #e34800 100%)",
                borderRadius: "50px",
                boxShadow: "0 8px 32px rgba(255,80,0,0.40)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(255,80,0,0.50)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,80,0,0.40)";
              }}
            >
              {/* Shimmer overlay */}
              <span className="absolute top-0 bottom-0 w-20 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                  animation: "hiwShimmer 2.5s 1.5s ease-in-out infinite",
                }} />
              <span className="relative z-10">Start Your Project Today</span>
              <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor"
                strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </button>
            <p className="text-[15px] font-semibold mt-4" style={{ color: "#2b2e33" }}>
              From design to delivery in 3 simple steps
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;