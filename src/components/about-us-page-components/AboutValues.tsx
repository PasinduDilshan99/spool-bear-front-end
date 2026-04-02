"use client";
import React from "react";
import { useScrollReveal } from "./aboutUtils";
import { valuesData } from "@/data/about-us-page-data";

const AboutValues: React.FC = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20">
      <div className="absolute left-0 right-0 pointer-events-none" />

      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div
          className="text-center mb-10 sm:mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
          }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <div
              className="h-[2px] rounded-full bg-[#FF5000]"
              style={{ width: "clamp(20px, 3vw, 36px)" }}
            />
            <span
              className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
              style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
            >
              Core Values
            </span>
            <div
              className="h-[2px] rounded-full bg-[#FF5000]"
              style={{ width: "clamp(20px, 3vw, 36px)" }}
            />
          </div>
          <h2
            className="font-black text-[#101113] tracking-tight"
            style={{
              fontSize: "clamp(24px, 4vw, 46px)",
              letterSpacing: "-0.03em",
            }}
          >
            What We <span className="text-[#FF5000]">Stand For</span>
          </h2>
          <p
            className="font-medium text-[#2b2e33] mt-3 mx-auto"
            style={{
              fontSize: "clamp(13px, 1.4vw, 17px)",
              maxWidth: "clamp(280px, 45vw, 520px)",
            }}
          >
            Our core values drive everything we do, from the first consultation
            to final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {valuesData.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-400"
                style={{
                  padding: "clamp(22px, 3vw, 36px) clamp(16px, 2vw, 24px)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(28px)",
                  transition: `opacity 0.6s ${0.12 + i * 0.1}s ease-out, transform 0.6s ${0.12 + i * 0.1}s ease-out, box-shadow 0.3s, translate 0.4s`,
                }}
              >
                <div
                  className="mx-auto mb-5 sm:mb-6 flex items-center justify-center transition-all duration-500 group-hover:rotate-90 group-hover:scale-110"
                  style={{
                    width: "clamp(52px, 6.5vw, 72px)",
                    height: "clamp(52px, 6.5vw, 72px)",
                    borderRadius: "clamp(10px, 1.3vw, 16px)",
                    background: "rgba(255,80,0,0.10)",
                    border: "1.5px solid rgba(255,80,0,0.15)",
                    transform: "rotate(45deg)",
                  }}
                >
                  <div
                    className="transition-transform duration-500 group-hover:-rotate-90"
                    style={{ transform: "rotate(-45deg)" }}
                  >
                    <Icon size={22} className="text-[#FF5000]" />
                  </div>
                </div>

                <h3
                  className="font-black text-[#101113] mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#FF5000]"
                  style={{ fontSize: "clamp(15px, 1.6vw, 20px)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="font-medium text-[#2b2e33] leading-relaxed"
                  style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
                >
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
