// components/about/AboutCTA.tsx
"use client";
import React from "react";
import Link from "next/link";
import { CONTACT_US_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";

const AboutCTA: React.FC = () => {
  return (
    <section className="py-14 sm:py-16 md:py-20">
      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden text-center"
          style={{ background: "#1A1A1A" }}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #FF5000 2px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Orange top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
          {/* Glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "clamp(200px, 40vw, 500px)",
              height: "clamp(200px, 40vw, 500px)",
              background:
                "radial-gradient(circle, rgba(255,80,0,0.15) 0%, transparent 70%)",
              filter: "blur(48px)",
            }}
          />

          <div
            className="relative z-10 mx-auto"
            style={{
              maxWidth: "clamp(300px, 55vw, 760px)",
              padding: "clamp(40px, 6vw, 80px) clamp(24px, 4vw, 64px)",
            }}
          >
            <h2
              className="font-black text-white tracking-tight mb-4"
              style={{
                fontSize: "clamp(24px, 4vw, 52px)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to Start Your Project?
            </h2>
            <p
              className="text-white/65 font-medium mb-8 sm:mb-10 leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.6vw, 18px)" }}
            >
              Whether you have a 3D model ready or just an idea, our team is
              here to help.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {/* Primary */}
              <Link
                href={CONTACT_US_PAGE_PATH}
                className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] text-[#101113] bg-white hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                style={{
                  fontSize: "clamp(11px, 1.1vw, 14px)",
                  padding: "clamp(13px, 1.5vw, 16px) clamp(22px, 2.8vw, 36px)",
                  borderRadius: "clamp(10px, 1.2vw, 14px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.20)",
                }}
              >
                Get a Free Quote
              </Link>

              {/* Secondary */}
              <Link
                href={SHOP_PAGE_PATH}
                className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] text-white border-2 border-white/25 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                style={{
                  fontSize: "clamp(11px, 1.1vw, 14px)",
                  padding: "clamp(13px, 1.5vw, 16px) clamp(22px, 2.8vw, 36px)",
                  borderRadius: "clamp(10px, 1.2vw, 14px)",
                }}
              >
                Browse Products
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
      </div>
    </section>
  );
};

export default AboutCTA;
