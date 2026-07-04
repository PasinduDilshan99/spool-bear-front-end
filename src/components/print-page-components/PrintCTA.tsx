"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CONTACT_US_PAGE_PATH } from "@/utils/urls";
import { PrintCTAProps } from "@/types/print-page-types";

const PrintCTA: React.FC<PrintCTAProps> = ({ onScrollToForm }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-14 sm:py-16 md:py-20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
      }}
    >
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{ background: "#1A1A1A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #FF5000 2px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,80,0,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 px-8 sm:px-12 md:px-16 py-14 sm:py-16 md:py-20 text-center max-w-3xl mx-auto">
          <h2
            className="font-black text-white mb-4 tracking-tight"
            style={{
              fontSize: "clamp(24px, 4vw, 48px)",
              letterSpacing: "-0.03em",
            }}
          >
            Ready to start your project?
          </h2>
          <p
            className="text-white/65 font-medium mb-8 sm:mb-10 leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
          >
            Upload your design now or contact us for a free consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onScrollToForm}
              className="cursor-pointer group relative overflow-hidden inline-flex items-center gap-2.5 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl w-full sm:w-auto justify-center"
              style={{
                fontSize: "clamp(11px, 1.1vw, 14px)",
                padding: "clamp(13px, 1.5vw, 16px) clamp(24px, 3vw, 40px)",
                background: "#FF5000",
                borderRadius: "clamp(10px, 1.2vw, 14px)",
                boxShadow: "0 6px 24px rgba(255,80,0,0.38)",
              }}
            >
              <span
                className="absolute top-0 bottom-0 w-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                  animation: "ctaShimmer 2.5s 1s ease-in-out infinite",
                }}
              />
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="relative z-10">Upload Now</span>
            </button>

            <Link
              href={CONTACT_US_PAGE_PATH}
              className="cursor-pointer inline-flex items-center gap-2 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              style={{
                fontSize: "clamp(11px, 1.1vw, 14px)",
                padding: "clamp(13px, 1.5vw, 16px) clamp(24px, 3vw, 40px)",
                border: "2px solid rgba(255,255,255,0.25)",
                borderRadius: "clamp(10px, 1.2vw, 14px)",
              }}
            >
              Contact Us
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
        </div>
      </div>

      <style jsx>{`
        @keyframes ctaShimmer {
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

export default PrintCTA;
