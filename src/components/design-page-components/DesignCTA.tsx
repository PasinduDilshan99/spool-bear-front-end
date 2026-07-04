"use client";
import React from "react";
import Link from "next/link";
import { Lightbulb, Send } from "lucide-react";
import { DesignCTAProps } from "@/types/design-page-types";
import { CONTACT_US_PAGE_PATH } from "@/utils/urls";

const DesignCTA: React.FC<DesignCTAProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-14 sm:py-16 md:py-20">
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
          className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "clamp(200px, 40vw, 480px)",
            height: "clamp(200px, 40vw, 480px)",
            background:
              "radial-gradient(circle, rgba(255,80,0,0.15) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />

        <div className="relative z-10 px-8 sm:px-12 md:px-16 py-14 sm:py-16 md:py-20 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FF5000]/20 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <Lightbulb size={28} className="text-[#FF5000]" />
          </div>

          <h2
            className="font-black text-white tracking-tight mb-4"
            style={{
              fontSize: "clamp(24px, 4vw, 48px)",
              letterSpacing: "-0.03em",
            }}
          >
            Have an idea in mind?
          </h2>
          <p
            className="text-white/65 font-medium mb-8 sm:mb-10 leading-relaxed mx-auto"
            style={{
              fontSize: "clamp(14px, 1.6vw, 18px)",
              maxWidth: "clamp(280px, 40vw, 520px)",
            }}
          >
            Let&apos;s bring it to life together. Get a free consultation and
            quote today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onScrollToForm}
              className="cursor-pointer group relative overflow-hidden inline-flex items-center gap-2.5 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
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
                  animation: "designCtaShimmer 2.5s 1s ease-in-out infinite",
                }}
              />
              <Send size={14} className="relative z-10" />
              <span className="relative z-10">Start Your Project</span>
            </button>

            <Link
              href={CONTACT_US_PAGE_PATH}
              className="inline-flex items-center gap-2 font-black uppercase tracking-[0.08em] text-white border-2 border-white/25 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto justify-center"
              style={{
                fontSize: "clamp(11px, 1.1vw, 14px)",
                padding: "clamp(13px, 1.5vw, 16px) clamp(24px, 3vw, 40px)",
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
        @keyframes designCtaShimmer {
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

export default DesignCTA;
