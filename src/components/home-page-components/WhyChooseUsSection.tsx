"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface WhyCard {
  iconWrapClass: string;
  icon: {
    src: string;
    alt: string;
    ariaHidden?: boolean;
  };
  headingHtml: string;
  textHtml: string;
}

interface WhyChooseUsProps {
  className?: string;
  title?: string;
  cards?: WhyCard[];
}

/* ══════════════════════════════════════════
   WHY CARD
══════════════════════════════════════════ */
function WhyCard({ card, index, visible }: { card: WhyCard; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const delay = `${0.15 + index * 0.12}s`;
  
  return (
    <div
      className="group relative flex flex-col items-center text-center"
      style={{
        animation: visible ? `whyReveal 0.7s ${delay} ease-out both` : "none",
        opacity: visible ? undefined : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card container */}
      <div
        className="relative w-full rounded-3xl p-8 transition-all duration-500"
        style={{
          background: hovered
            ? "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)"
            : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.16), inset 0 2px 6px rgba(255,255,255,0.50)"
            : "0 8px 32px rgba(0,0,0,0.10), inset 0 2px 6px rgba(255,255,255,0.50)",
          border: `1.5px solid ${hovered ? "rgba(255,80,0,0.25)" : "rgba(255,255,255,0.60)"}`,
          transform: hovered ? "translateY(-8px)" : "none",
        }}
      >
        {/* Step number watermark */}
        <div
          className="absolute top-4 right-6 font-black leading-none pointer-events-none"
          style={{
            fontSize: "clamp(40px, 4vw, 56px)",
            color: hovered ? "rgba(255,80,0,0.12)" : "rgba(0,0,0,0.04)",
            transition: "color 0.3s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Gradient overlay on hover */}
        {hovered && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: "linear-gradient(145deg, rgba(255,80,0,0.06) 0%, transparent 100%)",
              animation: "whyFadeIn 0.3s ease-out both",
            }}
          />
        )}

        {/* Icon container */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Orbit ring (spins) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-36 h-36" viewBox="0 0 140 140" fill="none" aria-hidden="true">
              <circle cx="70" cy="70" r="62"
                stroke="rgba(255,80,0,0.12)" strokeWidth="1.5" strokeDasharray="6 8"
                style={{
                  animation: hovered ? "whyOrbitCW 12s linear infinite" : "none",
                  transformOrigin: "70px 70px",
                }} />
              <g style={{ animation: hovered ? "whyOrbitCW 12s linear infinite" : "none", transformOrigin: "70px 70px" }}>
                <circle cx="132" cy="70" r="3" fill="#ff5000" opacity="0.6" />
                <circle cx="8"   cy="70" r="2" fill="#ff5000" opacity="0.35" />
              </g>
            </svg>
          </div>

          {/* Glow blob */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.5s",
            }}
          >
            <div
              className="w-28 h-28 rounded-full"
              style={{
                background: "radial-gradient(circle at center, rgba(255,80,0,0.18) 0%, transparent 70%)",
                filter: "blur(28px)",
                animation: hovered ? "whyGlow 2.5s ease-in-out infinite" : "none",
              }}
            />
          </div>

          {/* Rotating diamond */}
          <div
            className="relative w-28 h-28 rounded-2xl flex items-center justify-center transition-all duration-500"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)",
              boxShadow: hovered
                ? "0 12px 36px rgba(0,0,0,0.14), inset 0 2px 5px rgba(255,255,255,0.70)"
                : "0 6px 24px rgba(0,0,0,0.10), inset 0 2px 5px rgba(255,255,255,0.70)",
              transform: `rotate(${hovered ? "90deg" : "45deg"})`,
            }}
          >
            {/* Icon wrapper (counter-rotates) */}
            <div
              className="w-16 h-16 flex items-center justify-center transition-transform duration-500"
              style={{
                transform: `rotate(${hovered ? "-90deg" : "-45deg"})`,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.icon.src}
                  alt={card.icon.alt || "Why choose us icon"}
                  fill
                  className="object-contain"
                  aria-hidden={card.icon.ariaHidden}
                  sizes="64px"
                />
              </div>
            </div>
          </div>

          {/* Decorative rings on hover */}
          <div
            className="absolute -inset-3 border-2 rounded-full transition-all duration-500"
            style={{
              borderColor: "rgba(255,80,0,0.20)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
          <div
            className="absolute -inset-5 border rounded-full transition-all duration-700"
            style={{
              borderColor: "rgba(255,80,0,0.10)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-black leading-tight mb-3"
          style={{
            fontSize: "clamp(18px, 1.6vw, 22px)",
            letterSpacing: "-0.02em",
            color: "#101113",
          }}
          dangerouslySetInnerHTML={{ __html: card.headingHtml }}
        />

        {/* Description */}
        <p
          className="font-medium text-[14px] leading-relaxed"
          style={{ color: "#2b2e33" }}
          dangerouslySetInnerHTML={{ __html: card.textHtml }}
        />

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-500"
          style={{
            width: hovered ? "64px" : "0",
            background: "linear-gradient(90deg, transparent, #ff5000, transparent)",
          }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({
  className = "",
  title = "WHY CHOOSE US?",
  cards = [
    {
      iconWrapClass: "why-icon why-icon-instant",
      icon: { src: "/images/quote.png", alt: "", ariaHidden: true },
      headingHtml: "Instant<br />Quotation",
      textHtml: "Get a real-time price<br />the moment you<br />upload your design or<br />request a print.",
    },
    {
      iconWrapClass: "why-icon why-icon-design",
      icon: { src: "/images/design.png", alt: "", ariaHidden: true },
      headingHtml: "Design +<br />Print",
      textHtml: "From idea to<br />finished part —<br />everything handled<br />in one place.",
    },
    {
      iconWrapClass: "why-icon why-icon-quality",
      icon: { src: "/images/quality.png", alt: "", ariaHidden: true },
      headingHtml: "Reliable<br />Quality",
      textHtml: "Accurate prints<br />made for both<br />functional and<br />visual use.",
    },
    {
      iconWrapClass: "why-icon why-icon-pricing",
      icon: { src: "/images/price.png", alt: "", ariaHidden: true },
      headingHtml: "Transparent<br />Pricing",
      textHtml: "Clear pricing<br />with no hidden<br />costs or<br />surprises.",
    },
    {
      iconWrapClass: "why-icon why-icon-support",
      icon: { src: "/images/support.png", alt: "", ariaHidden: true },
      headingHtml: "Local<br />Support",
      textHtml: "Fast, reliable<br />help whenever<br />you need<br />assistance.",
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');

        /* ── reveal on scroll ── */
        @keyframes whyReveal {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        /* ── fade in overlay ── */
        @keyframes whyFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        /* ── orbit ring ── */
        @keyframes whyOrbitCW {
          to { transform: rotate(360deg); }
        }
        /* ── glow pulse ── */
        @keyframes whyGlow {
          0%,100% { opacity: 0.18; transform: scale(1);    }
          50%     { opacity: 0.38; transform: scale(1.15); }
        }
        /* ── filament scroll ── */
        @keyframes whyFilament {
          from { stroke-dashoffset: 0;   }
          to   { stroke-dashoffset: -60; }
        }
        /* ── underline draw ── */
        @keyframes whyUnderline {
          from { width: 0;    }
          to   { width: 100%; }
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

        {/* ── Corner glows (multiple) ── */}
        <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at top left, rgba(255,80,0,0.06) 0%, transparent 65%)" }} />
        <div className="absolute top-1/3 right-0 w-80 h-80 pointer-events-none"
          style={{ background: "radial-gradient(circle at center right, rgba(255,80,0,0.05) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle at bottom, rgba(255,80,0,0.05) 0%, transparent 60%)" }} />

        {/* ── Filament threads at top ── */}
        <svg className="absolute top-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "36px" }} viewBox="0 0 1200 36" preserveAspectRatio="none">
          <path d="M 0 18 Q 300 4, 600 18 T 1200 18"
            stroke="rgba(255,80,0,0.14)" strokeWidth="2" strokeDasharray="8 6" fill="none"
            style={{ animation: "whyFilament 5s linear infinite" }} />
          <path d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.07)" strokeWidth="1.5" strokeDasharray="5 8" fill="none"
            style={{ animation: "whyFilament 5s linear infinite reverse" }} />
        </svg>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ maxWidth: "1540px" }}>

          {/* ── Section heading ── */}
          <div className="text-center mb-16 md:mb-20">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5"
              style={{ animation: visible ? "whyReveal 0.6s 0.0s ease-out both" : "none", opacity: visible ? undefined : 0 }}>
              <div className="h-[2px] w-8 rounded-full" style={{ background: "#ff5000" }} />
              <span className="text-[11px] font-black uppercase tracking-[0.18em]"
                style={{ color: "#ff5000" }}>
                Why SpoolBear
              </span>
              <div className="h-[2px] w-8 rounded-full" style={{ background: "#ff5000" }} />
            </div>

            {/* Headline */}
            <h2 className="font-black leading-tight mb-4"
              style={{
                fontSize: "clamp(38px, 6vw, 64px)",
                letterSpacing: "-0.03em",
                color: "#101113",
                animation: visible ? "whyReveal 0.6s 0.10s ease-out both" : "none",
                opacity: visible ? undefined : 0,
              }}>
              {title}
            </h2>

            {/* Underline */}
            <div className="h-1 rounded-full mx-auto"
              style={{
                background: "#ff5000",
                animation: visible ? "whyUnderline 0.9s 0.60s ease-out both" : "none",
                width: 0,
                maxWidth: "140px",
              }} />

            {/* Subtitle */}
            <p className="text-lg font-medium mt-6 max-w-2xl mx-auto"
              style={{
                color: "#2b2e33",
                animation: visible ? "whyReveal 0.6s 0.30s ease-out both" : "none",
                opacity: visible ? undefined : 0,
              }}>
              We combine expertise, technology, and passion to deliver exceptional 3D printing services
            </p>
          </div>

          {/* ── Cards grid (5 columns on XL) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {cards.map((card, index) => (
              <WhyCard key={index} card={card} index={index} visible={visible} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default WhyChooseUsSection;