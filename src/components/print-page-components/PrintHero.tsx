// components/print-page-components/PrintHero.tsx
"use client";
import React, { useEffect, useState } from "react";

interface PrintHeroProps {
  onScrollToForm: () => void;
}

const steps = [
  "Upload your 3D model (STL, OBJ, 3MF, etc.)",
  "Tell us about your requirements — material, color, quantity",
  "Get an instant quote and approve",
  "We print and deliver to your doorstep",
];

const PrintHero: React.FC<PrintHeroProps> = ({ onScrollToForm }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay: string): React.CSSProperties =>
    visible
      ? { animation: `printHeroReveal 0.65s ${delay} ease-out both` }
      : { opacity: 0 };

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left */}
        <div>
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
            style={reveal("0s")}
          >
            <div
              className="h-[2px] rounded-full bg-[#FF5000]"
              style={{ width: "clamp(20px, 3vw, 36px)" }}
            />
            <span
              className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
              style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
            >
              3D Printing Service
            </span>
            <div
              className="h-[2px] rounded-full bg-[#FF5000]"
              style={{ width: "clamp(20px, 3vw, 36px)" }}
            />
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.04] tracking-tight text-[#101113] mb-4 sm:mb-5"
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.03em",
              ...reveal("0.08s"),
            }}
          >
            3D Printing
            <br />
            <span className="text-[#FF5000] relative inline-block">
              Service
              <span
                className="absolute bottom-0 left-0 h-[3px] sm:h-[4px] rounded-full bg-[#FF5000]/30"
                style={{
                  animation: visible
                    ? "printUnderline 0.9s 0.6s ease-out both"
                    : "none",
                  width: 0,
                }}
              />
            </span>
          </h1>

          <p
            className="font-bold text-[#101113] mb-1"
            style={{ fontSize: "clamp(16px, 2.2vw, 26px)", ...reveal("0.16s") }}
          >
            Turn your digital models into
          </p>
          <p
            className="font-semibold text-[#2b2e33] mb-8 sm:mb-10"
            style={{ fontSize: "clamp(14px, 1.8vw, 22px)", ...reveal("0.22s") }}
          >
            real, tangible objects — fast and affordable.
          </p>

          {/* How it works */}
          <div style={reveal("0.28s")}>
            <h2
              className="font-black text-[#101113] mb-5 relative inline-block"
              style={{ fontSize: "clamp(18px, 2.2vw, 28px)" }}
            >
              How it works
              <span className="absolute -bottom-2 left-0 h-[3px] sm:h-[4px] w-full rounded-full bg-[#FF5000]/40" />
            </h2>
            <ul className="mt-5 space-y-3 sm:space-y-4">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 sm:gap-4"
                  style={
                    visible
                      ? {
                          animation: `printHeroReveal 0.5s ${0.35 + i * 0.09}s ease-out both`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-lg font-black text-white bg-[#FF5000] shadow-md shadow-orange-200"
                    style={{
                      width: "clamp(24px, 3vw, 32px)",
                      height: "clamp(24px, 3vw, 32px)",
                      fontSize: "clamp(10px, 1.2vw, 13px)",
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className="text-[#2b2e33] font-semibold leading-snug"
                    style={{ fontSize: "clamp(13px, 1.5vw, 17px)" }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — orbit visual */}
        <div
          className="hidden lg:flex items-center justify-center relative"
          style={reveal("0.15s")}
        >
          <div
            className="relative"
            style={{
              width: "clamp(280px, 35vw, 440px)",
              height: "clamp(280px, 35vw, 440px)",
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 440 440"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="220"
                cy="220"
                r="200"
                stroke="rgba(255,80,0,0.08)"
                strokeWidth="1.5"
                strokeDasharray="10 12"
                style={{
                  animation: "printOrbitCW 28s linear infinite",
                  transformOrigin: "220px 220px",
                }}
              />
              <circle
                cx="220"
                cy="220"
                r="155"
                stroke="rgba(255,80,0,0.12)"
                strokeWidth="1"
                strokeDasharray="7 10"
                style={{
                  animation: "printOrbitCCW 20s linear infinite",
                  transformOrigin: "220px 220px",
                }}
              />
              <circle
                cx="220"
                cy="220"
                r="110"
                stroke="rgba(255,80,0,0.16)"
                strokeWidth="1"
                strokeDasharray="5 8"
                style={{
                  animation: "printOrbitCW 14s linear infinite",
                  transformOrigin: "220px 220px",
                }}
              />
              <g
                style={{
                  animation: "printOrbitCW 28s linear infinite",
                  transformOrigin: "220px 220px",
                }}
              >
                <circle cx="420" cy="220" r="5" fill="#FF5000" opacity="0.6" />
                <circle cx="20" cy="220" r="3" fill="#FF5000" opacity="0.3" />
              </g>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-2xl sm:rounded-3xl text-center"
                style={{
                  width: "clamp(160px, 22vw, 240px)",
                  padding: "clamp(20px, 3vw, 32px)",
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 16px 56px rgba(0,0,0,0.12)",
                  border: "1.5px solid rgba(255,80,0,0.18)",
                  animation: visible
                    ? "printOrbitCardIn 0.7s 0.5s cubic-bezier(0.34,1.56,0.64,1) both"
                    : "none",
                  opacity: visible ? undefined : 0,
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF5000]/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="#FF5000"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="font-black text-[#101113] text-sm mb-1">
                  Upload & Print
                </p>
                <p className="text-xs text-[#2b2e33] font-medium">
                  STL · OBJ · 3MF · STEP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes printHeroReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes printUnderline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes printOrbitCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes printOrbitCCW {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes printOrbitCardIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default PrintHero;
