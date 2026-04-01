"use client";
import { stepsData } from "@/data/design-page-data";
import { DesignHeroProps } from "@/types/design-page-types";
import { PRINT_PAGE_HERO_SECTION } from "@/utils/imagesUrl";
import React, { useRef, useState } from "react";

const DesignHero: React.FC<DesignHeroProps> = ({ onScrollToForm }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "#dfe3e8",
        padding: "clamp(48px, 7vw, 100px) 0 clamp(40px, 5vw, 72px)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: `url(${PRINT_PAGE_HERO_SECTION})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "min(1000px, 65vw)",
          opacity: 0.28,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, #dfe3e8 0%, #dfe3e8 40%, rgba(223,227,232,0.82) 60%, rgba(223,227,232,0.45) 100%)",
        }}
      />

      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "clamp(200px, 30vw, 480px)",
          height: "clamp(200px, 30vw, 480px)",
          background:
            "radial-gradient(circle at top right, rgba(255,80,0,0.07) 0%, transparent 65%)",
        }}
      />

      <div
        className="container mx-auto relative z-10"
        style={{ padding: "0 clamp(16px, 4vw, 64px)", maxWidth: "1300px" }}
      >
        <div
          className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div
            className="h-[2px] rounded-full bg-[#FF5000]"
            style={{ width: "clamp(20px, 3vw, 36px)" }}
          />
          <span
            className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
            style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
          >
            Design Service
          </span>
          <div
            className="h-[2px] rounded-full bg-[#FF5000]"
            style={{ width: "clamp(20px, 3vw, 36px)" }}
          />
        </div>

        <h1
          className="font-black text-[#101113] tracking-tight leading-[1.04] mb-4 sm:mb-5"
          style={{
            fontSize: "clamp(36px, 5.5vw, 80px)",
            letterSpacing: "-0.03em",
            maxWidth: "clamp(300px, 55vw, 760px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition:
              "opacity 0.65s 0.08s ease-out, transform 0.65s 0.08s ease-out",
          }}
        >
          Have an idea?
        </h1>

        <p
          className="font-black text-[#101113] mb-2"
          style={{
            fontSize: "clamp(20px, 2.8vw, 44px)",
            maxWidth: "clamp(280px, 50vw, 680px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition:
              "opacity 0.65s 0.16s ease-out, transform 0.65s 0.16s ease-out",
          }}
        >
          We&apos;ll turn it into a 3D model.
        </p>

        <p
          className="font-semibold text-[#2b2e33] mb-10 sm:mb-12 leading-relaxed"
          style={{
            fontSize: "clamp(14px, 1.8vw, 24px)",
            maxWidth: "clamp(280px, 55vw, 760px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition:
              "opacity 0.65s 0.24s ease-out, transform 0.65s 0.24s ease-out",
          }}
        >
          No CAD file? No problem. Tell us what you want to make, and we&apos;ll
          handle the design, revisions, and print-ready files.
        </p>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition:
              "opacity 0.65s 0.32s ease-out, transform 0.65s 0.32s ease-out",
          }}
        >
          <h2
            className="font-black text-[#101113] mb-5 sm:mb-6 relative inline-block"
            style={{ fontSize: "clamp(18px, 2.2vw, 32px)" }}
          >
            How it works:
            <span
              className="absolute -bottom-2 left-0 h-[3px] sm:h-[4px] rounded-full bg-[#FF5000]/40"
              style={{ width: "100%" }}
            />
          </h2>

          <ul
            className="mt-4 space-y-4 sm:space-y-5 mb-10 sm:mb-12"
            style={{ maxWidth: "clamp(280px, 55vw, 760px)" }}
          >
            {stepsData.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl font-black text-white bg-[#FF5000] shadow-md shadow-orange-200"
                  style={{
                    width: "clamp(32px, 4vw, 48px)",
                    height: "clamp(32px, 4vw, 48px)",
                    fontSize: "clamp(12px, 1.4vw, 16px)",
                    marginTop: "2px",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <p
                    className="font-bold text-[#101113] leading-snug"
                    style={{ fontSize: "clamp(13px, 1.6vw, 20px)" }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="font-medium text-[#2b2e33] mt-0.5"
                    style={{ fontSize: "clamp(11px, 1.2vw, 16px)" }}
                  >
                    {step.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-wrap items-center gap-4 sm:gap-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition:
              "opacity 0.65s 0.42s ease-out, transform 0.65s 0.42s ease-out",
          }}
        >
          <button
            onClick={onScrollToForm}
            className="cursor-pointer group relative overflow-hidden inline-flex items-center gap-3 font-black uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontSize: "clamp(12px, 1.4vw, 16px)",
              padding: "clamp(14px, 1.6vw, 18px) clamp(24px, 3vw, 44px)",
              background: "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
              borderRadius: "clamp(40px, 5vw, 60px)",
              boxShadow: "0 8px 28px rgba(255,80,0,0.38)",
            }}
          >
            <span
              className="absolute top-0 bottom-0 w-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                animation: "designShimmer 2.5s 1s ease-in-out infinite",
              }}
            />
            <span className="relative z-10">Start your design request</span>
            <svg
              className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
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
          </button>
          <span
            className="font-bold text-[#2b2e33]"
            style={{ fontSize: "clamp(11px, 1.2vw, 15px)" }}
          >
            Usually reply within 24–48 hours.
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes designShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>
    </section>
  );
};

export default DesignHero;
