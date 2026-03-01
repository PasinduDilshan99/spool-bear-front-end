"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface DesignQuestionSectionProps {
  className?: string;
  imagePath?: string;
}

const DesignQuestionSection: React.FC<DesignQuestionSectionProps> = ({
  className = "",
  imagePath = "/images/Home_Page_02_BG.png",
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

  const reveal = (delay: string) =>
    visible ? { animation: `dqsReveal 0.65s ${delay} ease-out both` } : { opacity: 0 };

  return (
    <>
      <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');

        @keyframes dqsReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes dqsLevitate {
          0%,100% { transform: translateY(0);  }
          50%     { transform: translateY(-16px); }
        }
        @keyframes dqsGlow {
          0%,100% { opacity: 0.12; transform: scale(1);    }
          50%     { opacity: 0.28; transform: scale(1.12); }
        }
        @keyframes dqsOrbitCW  { to { transform: rotate(360deg);  } }
        @keyframes dqsOrbitCCW { to { transform: rotate(-360deg); } }
        @keyframes dqsFilament {
          from { stroke-dashoffset: 0;   }
          to   { stroke-dashoffset: -60; }
        }
        @keyframes dqsUnderline {
          from { width: 0;    }
          to   { width: 100%; }
        }
        @keyframes dqsShimmer {
          0%   { left: -100%; }
          100% { left: 200%;  }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`relative py-24 overflow-hidden ${className}`}
        style={{ background: "#ffffff", fontFamily: "'Faculty Glyphic', sans-serif" }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        {/* Corner glows */}
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, rgba(255,80,0,0.05) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
          style={{ background: "radial-gradient(circle at bottom left, rgba(255,80,0,0.04) 0%, transparent 65%)" }} />

        {/* Filament threads at bottom */}
        <svg className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "36px" }} viewBox="0 0 1200 36" preserveAspectRatio="none">
          <path d="M 0 18 Q 300 4, 600 18 T 1200 18"
            stroke="rgba(255,80,0,0.12)" strokeWidth="2" strokeDasharray="8 6" fill="none"
            style={{ animation: "dqsFilament 5s linear infinite" }} />
          <path d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.06)" strokeWidth="1.5" strokeDasharray="5 8" fill="none"
            style={{ animation: "dqsFilament 5s linear infinite reverse" }} />
        </svg>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ maxWidth: "1400px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT: copy + CTAs */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-6" style={reveal("0.0s")}>
                <div className="h-[2px] w-8 rounded-full" style={{ background: "#ff5000" }} />
                <span className="text-[11px] font-black uppercase tracking-[0.18em]"
                  style={{ color: "#ff5000" }}>
                  Start Creating
                </span>
                <div className="h-[2px] w-8 rounded-full" style={{ background: "#ff5000" }} />
              </div>

              {/* Headline */}
              <h2 className="font-black leading-[1.04] mb-6" style={reveal("0.12s")}>
                <span className="block text-[clamp(34px,4.8vw,56px)] tracking-[-0.03em]"
                  style={{ color: "#101113" }}>
                  Turn Your Ideas
                </span>
                <span className="block text-[clamp(34px,4.8vw,56px)] tracking-[-0.03em]"
                  style={{ color: "#101113" }}>
                  Into Reality with{" "}
                  {/* Accent + underline */}
                  <span className="relative inline-block" style={{ color: "#ff5000" }}>
                    3D Printing
                    <span className="absolute bottom-0 left-0 h-[4px] rounded-full"
                      style={{
                        background: "rgba(255,80,0,0.25)",
                        animation: visible ? "dqsUnderline 0.9s 0.7s ease-out both" : "none",
                        width: 0,
                      }} />
                  </span>
                </span>
              </h2>

              {/* Sub-question */}
              <div style={reveal("0.22s")}>
                <p className="text-lg font-medium mb-1" style={{ color: "#2b2e33" }}>
                  Start by telling us one thing:
                </p>
                <p className="text-xl sm:text-2xl font-black mb-10" style={{ color: "#101113" }}>
                  Do you already have a 3D design?
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4" style={reveal("0.32s")}>
                {/* Yes - Ghost button */}
                <Link href="/upload"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-black uppercase tracking-[0.08em] text-base transition-all duration-300"
                  style={{
                    color: "#101113",
                    border: "2px solid rgba(0,0,0,0.20)",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.60)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#101113";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#101113";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.14)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.60)";
                    e.currentTarget.style.color = "#101113";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.20)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  Yes, I have a design
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
                    strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* No - Primary button */}
                <Link href="/contact"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 font-black uppercase tracking-[0.08em] text-base text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(145deg, #ff5000 0%, #e34800 100%)",
                    borderRadius: "14px",
                    boxShadow: "0 6px 24px rgba(255,80,0,0.35)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,80,0,0.45)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,80,0,0.35)";
                  }}>
                  {/* Shimmer */}
                  <span className="absolute top-0 bottom-0 w-16 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                      animation: "dqsShimmer 2.5s 1.2s ease-in-out infinite",
                    }} />
                  <span className="relative z-10">No, I need help</span>
                  <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor"
                    strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* RIGHT: image + decorations */}
            <div className="relative flex items-center justify-center" style={reveal("0.15s")}>

              {/* Orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-[500px] h-[500px] max-w-full max-h-full"
                  viewBox="0 0 500 500" fill="none" aria-hidden="true">
                  <circle cx="250" cy="250" r="220"
                    stroke="rgba(255,80,0,0.07)" strokeWidth="1.5" strokeDasharray="10 14"
                    style={{ animation: "dqsOrbitCW 32s linear infinite", transformOrigin: "250px 250px" }} />
                  <circle cx="250" cy="250" r="175"
                    stroke="rgba(255,80,0,0.10)" strokeWidth="1" strokeDasharray="7 11"
                    style={{ animation: "dqsOrbitCCW 24s linear infinite", transformOrigin: "250px 250px" }} />
                  <circle cx="250" cy="250" r="130"
                    stroke="rgba(255,80,0,0.13)" strokeWidth="1" strokeDasharray="5 8"
                    style={{ animation: "dqsOrbitCW 16s linear infinite", transformOrigin: "250px 250px" }} />
                  {/* Rider dots */}
                  <g style={{ animation: "dqsOrbitCW 32s linear infinite", transformOrigin: "250px 250px" }}>
                    <circle cx="470" cy="250" r="5" fill="#ff5000" opacity="0.45" />
                    <circle cx="30"  cy="250" r="3" fill="#ff5000" opacity="0.25" />
                  </g>
                  <g style={{ animation: "dqsOrbitCCW 24s linear infinite", transformOrigin: "250px 250px" }}>
                    <circle cx="250" cy="75"  r="4" fill="#ff5000" opacity="0.40" />
                    <circle cx="425" cy="250" r="3" fill="#ff5000" opacity="0.25" />
                  </g>
                  {/* Centre glow */}
                  <circle cx="250" cy="250" r="95" fill="url(#dqsGlow)" />
                  <defs>
                    <radialGradient id="dqsGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%"   stopColor="#ff5000" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#ff5000" stopOpacity="0"    />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Glow blob */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full"
                  style={{
                    background: "radial-gradient(circle at center, rgba(255,80,0,0.10) 0%, transparent 70%)",
                    filter: "blur(48px)",
                    animation: "dqsGlow 5s ease-in-out infinite",
                  }} />
              </div>

              {/* Image */}
              <div className="relative h-[360px] sm:h-[460px] lg:h-[560px] w-full max-w-[540px]"
                style={{ animation: "dqsLevitate 7s 1s ease-in-out infinite" }}>
                <Image
                  src={imagePath}
                  alt="3D Printing Design"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                  style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.08))" }}
                />
              </div>

              {/* Floating badge - top left */}
              <div className="absolute top-6 left-0 lg:-left-4 flex items-center gap-3 px-4 py-3 rounded-2xl pointer-events-none"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
                  border: "1.5px solid rgba(255,80,0,0.14)",
                  animation: visible ? "dqsReveal 0.6s 0.55s ease-out both" : "none",
                  opacity: visible ? undefined : 0,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,80,0,0.10)" }}>
                  <svg width="16" height="16" fill="none" stroke="#ff5000" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.10em]"
                    style={{ color: "rgba(0,0,0,0.38)" }}>Materials</p>
                  <p className="text-[13px] font-black leading-none" style={{ color: "#101113" }}>230+ Options</p>
                </div>
              </div>

              {/* Floating badge - bottom right */}
              <div className="absolute bottom-10 right-0 lg:-right-4 flex items-center gap-3 px-4 py-3 rounded-2xl pointer-events-none"
                style={{
                  background: "#ff5000",
                  boxShadow: "0 8px 26px rgba(255,80,0,0.32)",
                  animation: visible ? "dqsReveal 0.6s 0.70s ease-out both" : "none",
                  opacity: visible ? undefined : 0,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.18)" }}>
                  <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.10em]"
                    style={{ color: "rgba(255,255,255,0.65)" }}>Fast Turn</p>
                  <p className="text-[13px] font-black leading-none text-white">48h Dispatch</p>
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