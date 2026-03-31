"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface WhyCard {
  iconWrapClass: string;
  icon: { src: string; alt: string; ariaHidden?: boolean };
  headingHtml: string;
  textHtml: string;
}

interface WhyChooseUsProps {
  className?: string;
  title?: string;
  cards?: WhyCard[];
}

/* ══════════════════════════════════════════
   SINGLE CARD
══════════════════════════════════════════ */
function WhyCard({
  card,
  index,
  visible,
}: {
  card: WhyCard;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const delay = `${0.1 + index * 0.1}s`;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stripBr = (html: string) =>
    isMobile ? html.replace(/<br\s*\/?>/gi, " ") : html;

  return (
    <div
      className="group relative flex flex-col items-center text-center"
      style={{
        animation: visible ? `whyReveal 0.65s ${delay} ease-out both` : "none",
        opacity: visible ? undefined : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Card shell ── */}
      <div
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          padding: "clamp(20px, 3vw, 36px) clamp(16px, 2.5vw, 28px)",
          background: hovered
            ? "linear-gradient(160deg, #ffffff 0%, #fff8f5 100%)"
            : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          boxShadow: hovered
            ? "0 24px 64px rgba(0,0,0,0.14), 0 0 0 1.5px rgba(255,80,0,0.28), inset 0 1px 0 rgba(255,255,255,0.9)"
            : "0 6px 28px rgba(0,0,0,0.09), 0 0 0 1.5px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.9)",
          transform: hovered
            ? "translateY(-10px) scale(1.015)"
            : "translateY(0) scale(1)",
        }}
      >
        {/* Step watermark */}
        <div
          className="absolute top-3 right-4 sm:top-4 sm:right-5 font-black leading-none pointer-events-none select-none transition-colors duration-300"
          style={{
            fontSize: "clamp(36px, 4vw, 52px)",
            color: hovered ? "rgba(255,80,0,0.11)" : "rgba(0,0,0,0.04)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover orange gradient wash */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl transition-opacity duration-400"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,80,0,0.07) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── Icon area ── */}
        <div className="relative mb-5 sm:mb-6 flex items-center justify-center">
          {/* Glow blob */}
          <div
            className="absolute pointer-events-none transition-opacity duration-500"
            style={{
              width: "clamp(80px, 10vw, 120px)",
              height: "clamp(80px, 10vw, 120px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,80,0,0.22) 0%, transparent 70%)",
              filter: "blur(24px)",
              opacity: hovered ? 1 : 0.4,
              animation: hovered ? "whyGlow 2.5s ease-in-out infinite" : "none",
            }}
          />

          {/* Orbit ring SVG */}
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
              stroke="rgba(255,80,0,0.13)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              style={{
                animation: hovered ? "whyOrbitCW 14s linear infinite" : "none",
                transformOrigin: "74px 74px",
              }}
            />
            {hovered && (
              <circle
                cx="140"
                cy="74"
                r="3.5"
                fill="#FF5000"
                opacity="0.65"
                style={{
                  animation: "whyOrbitCW 14s linear infinite",
                  transformOrigin: "74px 74px",
                }}
              />
            )}
          </svg>

          {/* Diamond icon tile */}
          <div
            className="relative flex items-center justify-center transition-all duration-500 flex-shrink-0"
            style={{
              width: "clamp(72px, 9vw, 108px)",
              height: "clamp(72px, 9vw, 108px)",
              borderRadius: "clamp(12px, 1.5vw, 18px)",
              background: "linear-gradient(145deg, #ffffff 0%, #f7f7f7 100%)",
              boxShadow: hovered
                ? "0 14px 40px rgba(0,0,0,0.13), inset 0 2px 4px rgba(255,255,255,0.8)"
                : "0 6px 20px rgba(0,0,0,0.09), inset 0 2px 4px rgba(255,255,255,0.8)",
              transform: `rotate(${hovered ? "90deg" : "45deg"})`,
              border: hovered
                ? "1.5px solid rgba(255,80,0,0.18)"
                : "1.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="flex items-center justify-center transition-transform duration-500"
              style={{
                width: "clamp(40px, 5vw, 60px)",
                height: "clamp(40px, 5vw, 60px)",
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
                  sizes="(max-width: 640px) 40px, (max-width: 1024px) 50px, 60px"
                />
              </div>
            </div>
          </div>

          {/* Rings on hover */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-500"
            style={{
              inset: "-10px",
              border: "1.5px solid rgba(255,80,0,0.18)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.05)" : "scale(0.95)",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-700"
            style={{
              inset: "-18px",
              border: "1px solid rgba(255,80,0,0.08)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.05)" : "scale(0.95)",
            }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-black leading-tight mb-2 sm:mb-3 transition-colors duration-300"
          style={{
            fontSize: "clamp(16px, 1.5vw, 21px)",
            letterSpacing: "-0.02em",
            color: hovered ? "#FF5000" : "#101113",
          }}
          dangerouslySetInnerHTML={{ __html: stripBr(card.headingHtml) }}
        />

        {/* Body text */}
        <p
          className="leading-relaxed"
          style={{
            fontSize: "clamp(12px, 1.1vw, 14px)",
            color: "#2b2e33",
            fontWeight: 500,
          }}
          dangerouslySetInnerHTML={{ __html: stripBr(card.textHtml) }}
        />

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-500"
          style={{
            width: hovered ? "56px" : "0px",
            background:
              "linear-gradient(90deg, transparent, #FF5000, transparent)",
          }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════ */
const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({
  className = "",
  title = "WHY CHOOSE US?",
  cards = [
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774770166/frt4rjl9yklsagjnnw0s.png",
        alt: "",
        ariaHidden: true,
      },
      headingHtml: "Instant<br />Quotation",
      textHtml:
        "Get a real-time price<br />the moment you<br />upload your design or<br />request a print.",
    },
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774770194/hnn2nrm6qu5zefw7xihp.png",
        alt: "",
        ariaHidden: true,
      },
      headingHtml: "Design +<br />Print",
      textHtml:
        "From idea to<br />finished part —<br />everything handled<br />in one place.",
    },
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774770208/tblsraufsoyblno5zehm.png",
        alt: "",
        ariaHidden: true,
      },
      headingHtml: "Reliable<br />Quality",
      textHtml:
        "Accurate prints<br />made for both<br />functional and<br />visual use.",
    },
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774770222/qzakrl7gee5vpqzdojo5.png",
        alt: "",
        ariaHidden: true,
      },
      headingHtml: "Transparent<br />Pricing",
      textHtml:
        "Clear pricing<br />with no hidden<br />costs or<br />surprises.",
    },
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774770236/f1qu26csdviqkmryd7vt.png",
        alt: "",
        ariaHidden: true,
      },
      headingHtml: "Local<br />Support",
      textHtml:
        "Fast, reliable<br />help whenever<br />you need<br />assistance.",
    },
  ],
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
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style global jsx>{`
        @keyframes whyReveal {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes whyOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes whyGlow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.18);
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
        @keyframes whyUnderlineDraw {
          from {
            width: 0;
          }
          to {
            width: clamp(80px, 10vw, 140px);
          }
        }
        @keyframes whyHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          background: "#e4e7ec",
          fontFamily: "'Faculty Glyphic', sans-serif",
          padding: "clamp(48px, 7vw, 112px) 0",
        }}
      >
        {/* ── Grid texture ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── Radial glows ── */}
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

        {/* ── Filament threads ── */}
        <svg
          className="absolute top-0 left-0 right-0 w-full pointer-events-none"
          style={{ height: "36px" }}
          viewBox="0 0 1200 36"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 18 Q 300 4, 600 18 T 1200 18"
            stroke="rgba(255,80,0,0.14)"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
            style={{ animation: "whyFilament 5s linear infinite" }}
          />
          <path
            d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.07)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            fill="none"
            style={{ animation: "whyFilament 5s linear infinite reverse" }}
          />
        </svg>

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1540px",
            padding: "0 clamp(16px, 4vw, 64px)",
          }}
        >
          {/* ── Heading ── */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5"
              style={{
                animation: visible
                  ? "whyHeadingReveal 0.6s 0s ease-out both"
                  : "none",
                opacity: visible ? undefined : 0,
              }}
            >
              <div
                className="h-[2px] rounded-full bg-[#FF5000]"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
              <span
                className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
                style={{ fontSize: "clamp(10px, 1.1vw, 12px)" }}
              >
                Why SpoolBear
              </span>
              <div
                className="h-[2px] rounded-full bg-[#FF5000]"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
            </div>

            {/* Headline */}
            <h2
              className="font-black leading-tight text-[#101113] mb-4"
              style={{
                fontSize: "clamp(30px, 5.5vw, 64px)",
                letterSpacing: "-0.03em",
                animation: visible
                  ? "whyHeadingReveal 0.6s 0.1s ease-out both"
                  : "none",
                opacity: visible ? undefined : 0,
              }}
            >
              {title}
            </h2>

            {/* Underline draw */}
            <div
              className="h-[3px] sm:h-[4px] rounded-full mx-auto bg-[#FF5000]"
              style={{
                animation: visible
                  ? "whyUnderlineDraw 0.9s 0.55s ease-out both"
                  : "none",
                width: 0,
              }}
            />

            {/* Subtitle */}
            <p
              className="font-medium text-[#2b2e33] mt-4 sm:mt-5 mx-auto"
              style={{
                fontSize: "clamp(13px, 1.5vw, 18px)",
                maxWidth: "clamp(280px, 55vw, 640px)",
                animation: visible
                  ? "whyHeadingReveal 0.6s 0.25s ease-out both"
                  : "none",
                opacity: visible ? undefined : 0,
              }}
            >
              We combine expertise, technology, and passion to deliver
              exceptional 3D printing services
            </p>
          </div>

          {/* ── Cards grid ── */}
          {/* Mobile: 1 col → sm: 2 col → lg: 3 col → xl: 5 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {cards.map((card, index) => (
              <WhyCard
                key={index}
                card={card}
                index={index}
                visible={visible}
              />
            ))}
          </div>

          {/* ── Bottom divider dots ── */}
          <div
            className="mt-12 sm:mt-16 flex justify-center items-center gap-2 sm:gap-3"
            style={{
              animation: visible
                ? "whyHeadingReveal 0.6s 0.8s ease-out both"
                : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <div
                  className="rounded-full bg-[#FF5000] animate-pulse"
                  style={{
                    width: "clamp(6px, 0.8vw, 9px)",
                    height: "clamp(6px, 0.8vw, 9px)",
                    opacity: 0.3,
                    animationDelay: `${i * 180}ms`,
                  }}
                />
                {i < 4 && (
                  <div
                    className="h-px bg-[#FF5000]"
                    style={{
                      width: "clamp(14px, 2vw, 28px)",
                      opacity: 0.2,
                    }}
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

export default WhyChooseUsSection;
