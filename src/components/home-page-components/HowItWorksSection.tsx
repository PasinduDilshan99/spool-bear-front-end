"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HowItWorksStep {
  iconWrapClass: string;
  icon: { src: string; alt: string; ariaHidden?: boolean };
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
function StepCard({
  step,
  index,
  total,
  visible,
}: {
  step: HowItWorksStep;
  index: number;
  total: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const delay = `${0.12 + index * 0.18}s`;

  return (
    <div
      className="relative flex flex-col items-center text-center"
      style={{
        animation: visible ? `hiwReveal 0.72s ${delay} ease-out both` : "none",
        opacity: visible ? undefined : 0,
      }}
    >
      {/* ── Step number badge ── */}
      <div
        className="relative z-20 flex items-center justify-center font-black text-white"
        style={{
          width: "clamp(48px, 6vw, 68px)",
          height: "clamp(48px, 6vw, 68px)",
          borderRadius: "50%",
          fontSize: "clamp(18px, 2.2vw, 26px)",
          marginBottom: "clamp(-24px, -3vw, -34px)",
          background: "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
          boxShadow:
            "0 6px 24px rgba(255,80,0,0.42), inset 0 2px 4px rgba(255,255,255,0.22)",
        }}
      >
        {index + 1}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Icon area ── */}
      <div
        className="relative flex items-center justify-center"
        style={{ margin: "0 auto clamp(20px, 3vw, 36px) auto" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Outer orbit ring */}
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
            stroke="rgba(255,80,0,0.12)"
            strokeWidth="1.5"
            strokeDasharray="8 10"
            style={{
              animation: "hiwOrbitCW 24s linear infinite",
              transformOrigin: "130px 130px",
            }}
          />
          <circle
            cx="130"
            cy="130"
            r="96"
            stroke="rgba(255,80,0,0.07)"
            strokeWidth="1"
            strokeDasharray="6 8"
            style={{
              animation: "hiwOrbitCCW 18s linear infinite",
              transformOrigin: "130px 130px",
            }}
          />
          <circle
            cx="248"
            cy="130"
            r="4"
            fill="#FF5000"
            opacity="0.5"
            style={{
              animation: "hiwOrbitCW 24s linear infinite",
              transformOrigin: "130px 130px",
            }}
          />
          <circle
            cx="12"
            cy="130"
            r="3"
            fill="#FF5000"
            opacity="0.28"
            style={{
              animation: "hiwOrbitCW 24s linear infinite",
              transformOrigin: "130px 130px",
            }}
          />
        </svg>

        {/* Glow blob */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "clamp(100px, 14vw, 180px)",
            height: "clamp(100px, 14vw, 180px)",
            background:
              "radial-gradient(circle, rgba(255,80,0,0.17) 0%, transparent 70%)",
            filter: "blur(32px)",
            opacity: hovered ? 1 : 0.5,
            animation: "hiwGlow 3.5s ease-in-out infinite",
            transition: "opacity 0.4s",
          }}
        />

        {/* Main icon circle */}
        <div
          className="relative flex items-center justify-center transition-all duration-500"
          style={{
            width: "clamp(120px, 16vw, 210px)",
            height: "clamp(120px, 16vw, 210px)",
            borderRadius: "50%",
            background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
            boxShadow: hovered
              ? "0 20px 60px rgba(0,0,0,0.16), inset 0 2px 6px rgba(255,255,255,0.75)"
              : "0 10px 40px rgba(0,0,0,0.11), inset 0 2px 6px rgba(255,255,255,0.75)",
            transform: hovered ? "translateY(-8px) scale(1.04)" : "none",
            border: hovered
              ? "1.5px solid rgba(255,80,0,0.18)"
              : "1.5px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="relative"
            style={{
              width: "clamp(72px, 10vw, 130px)",
              height: "clamp(72px, 10vw, 130px)",
            }}
          >
            <Image
              src={step.icon.src}
              alt={step.icon.alt}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 72px, (max-width: 1024px) 100px, 130px"
              priority={index === 0}
            />
          </div>
        </div>

        {/* Accent rings */}
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-500"
          style={{
            inset: "clamp(-12px, -1.5vw, -18px)",
            border: "1.5px solid rgba(255,80,0,0.16)",
            opacity: hovered ? 1 : 0.6,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-700"
          style={{
            inset: "clamp(-20px, -2.5vw, -30px)",
            border: "1px solid rgba(255,80,0,0.08)",
            opacity: hovered ? 1 : 0.4,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>

      {/* Title */}
      <h3
        className="font-black leading-tight text-[#101113] mb-2 sm:mb-3 transition-colors duration-300"
        style={{
          fontSize: "clamp(17px, 2vw, 26px)",
          letterSpacing: "-0.02em",
          color: hovered ? "#FF5000" : "#101113",
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="font-medium leading-relaxed text-[#2b2e33] mx-auto"
        style={{
          fontSize: "clamp(13px, 1.3vw, 15px)",
          maxWidth: "clamp(200px, 22vw, 300px)",
        }}
      >
        {step.textHtml}
      </p>

      {/* Mobile down-arrow between steps */}
      {index < total - 1 && (
        <div className="flex lg:hidden mt-8 mb-2 items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "clamp(44px, 6vw, 56px)",
              height: "clamp(44px, 6vw, 56px)",
              background: "rgba(255,80,0,0.10)",
              border: "1.5px solid rgba(255,80,0,0.25)",
              animation: "hiwBounce 2s ease-in-out infinite",
            }}
          >
            <svg
              fill="none"
              stroke="#FF5000"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              style={{
                width: "clamp(18px, 2.5vw, 24px)",
                height: "clamp(18px, 2.5vw, 24px)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════ */
const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  className = "",
  title = "How It Works?",
  steps = [
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774768676/nxulbgutpu3yhvobiyw7.png",
        alt: "Upload icon",
      },
      title: "Upload and Describe",
      textHtml:
        "Upload your 3D design file, or tell us about your idea if you don't have a design yet.",
    },
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774768660/ljdaxcopoyyqb6915ig6.png",
        alt: "Quote icon",
      },
      title: "Get an Instant Quote",
      textHtml:
        "Our system automatically analyzes your request and generates a real-time quotation.",
    },
    {
      iconWrapClass: "",
      icon: {
        src: "https://res.cloudinary.com/dkfonkmwr/image/upload/v1774768592/vmsjqy46lwpf0b1pj8j6.png",
        alt: "Print and delivery icon",
      },
      title: "Print & Deliver",
      textHtml:
        "Once confirmed, we manufacture your part with care and deliver it to you.",
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap");

        @keyframes hiwReveal {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        @keyframes hiwGlow {
          0%,
          100% {
            opacity: 0.16;
            transform: scale(1);
          }
          50% {
            opacity: 0.34;
            transform: scale(1.15);
          }
        }
        @keyframes hiwBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes hiwLineDraw {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
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
        @keyframes hiwUnderlineDraw {
          from {
            width: 0;
          }
          to {
            width: clamp(80px, 10vw, 140px);
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

        {/* Filament threads */}
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
            style={{ animation: "hiwFilament 5s linear infinite" }}
          />
          <path
            d="M 0 28 Q 300 14, 600 28 T 1200 28"
            stroke="rgba(255,80,0,0.07)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            fill="none"
            style={{ animation: "hiwFilament 5s linear infinite reverse" }}
          />
        </svg>

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1400px",
            padding: "0 clamp(16px, 4vw, 64px)",
          }}
        >
          {/* ── Heading ── */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5"
              style={{
                animation: visible ? "hiwReveal 0.6s 0s ease-out both" : "none",
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
                Simple Process
              </span>
              <div
                className="h-[2px] rounded-full bg-[#FF5000]"
                style={{ width: "clamp(20px, 3vw, 36px)" }}
              />
            </div>

            {/* Title */}
            <h2
              className="font-black leading-tight text-[#101113] mb-4"
              style={{
                fontSize: "clamp(30px, 5.5vw, 64px)",
                letterSpacing: "-0.03em",
                animation: visible
                  ? "hiwReveal 0.6s 0.1s ease-out both"
                  : "none",
                opacity: visible ? undefined : 0,
              }}
            >
              {title}
            </h2>

            {/* Underline */}
            <div
              className="h-[3px] sm:h-[4px] rounded-full mx-auto bg-[#FF5000]"
              style={{
                animation: visible
                  ? "hiwUnderlineDraw 0.9s 0.55s ease-out both"
                  : "none",
                width: 0,
              }}
            />
          </div>

          {/* ── Steps ── */}
          <div className="relative">
            {/* Desktop connecting path */}
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
                  opacity="0.22"
                  style={{
                    strokeDasharray: "1000",
                    strokeDashoffset: visible ? undefined : "1000",
                    animation: visible
                      ? "hiwLineDraw 1.8s 0.85s ease-out both"
                      : "none",
                  }}
                />
                {/* Arrow nodes */}
                {[
                  { x: 390, y: 38 },
                  { x: 810, y: 56 },
                ].map((pos, i) => (
                  <g
                    key={i}
                    style={{
                      opacity: 0,
                      animation: visible
                        ? `hiwReveal 0.4s ${1.1 + i * 0.3}s ease-out both`
                        : "none",
                    }}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="16"
                      fill="rgba(255,255,255,0.95)"
                      stroke="rgba(255,80,0,0.28)"
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M ${pos.x - 5} ${pos.y} L ${pos.x + 5} ${pos.y} M ${pos.x + 1} ${pos.y - 4} L ${pos.x + 5} ${pos.y} L ${pos.x + 1} ${pos.y + 4}`}
                      stroke="#FF5000"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-10 xl:gap-14">
              {steps.map((step, index) => (
                <StepCard
                  key={index}
                  step={step}
                  index={index}
                  total={steps.length}
                  visible={visible}
                />
              ))}
            </div>
          </div>

          {/* Bottom decorative dots */}
          <div
            className="mt-12 sm:mt-16 flex justify-center items-center gap-2 sm:gap-3"
            style={{
              animation: visible ? "hiwReveal 0.6s 0.9s ease-out both" : "none",
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
                    style={{ width: "clamp(12px, 2vw, 28px)", opacity: 0.2 }}
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

export default HowItWorksSection;
