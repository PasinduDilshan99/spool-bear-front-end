"use client";
import React from "react";
import { AnimatedCounter, useScrollReveal } from "./aboutUtils";
import { statsData } from "@/data/about-us-page-data";

const AboutStats: React.FC = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="py-12 sm:py-14 md:py-16">
      <div
        className="container mx-auto"
        style={{ maxWidth: "1400px", padding: "0 clamp(16px, 4vw, 64px)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
                style={{
                  padding: "clamp(18px, 2.5vw, 28px) clamp(12px, 1.8vw, 20px)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "scale(0.92)",
                  transition: `opacity 0.55s ${0.08 + i * 0.09}s ease-out, transform 0.55s ${0.08 + i * 0.09}s ease-out, box-shadow 0.3s, translate 0.3s`,
                }}
              >
                <div className="h-1 bg-gray-100 group-hover:bg-[#FF5000] transition-colors duration-300 absolute top-0 left-0 right-0" />

                <div
                  className="mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:bg-[#FF5000] transition-colors duration-300"
                  style={{
                    width: "clamp(36px, 4.5vw, 48px)",
                    height: "clamp(36px, 4.5vw, 48px)",
                    background: "rgba(255,80,0,0.10)",
                  }}
                >
                  <Icon
                    size={18}
                    className="text-[#FF5000] group-hover:text-gray-700 transition-colors duration-300"
                  />
                </div>

                <div
                  className="font-black text-[#FF5000] leading-none mb-1"
                  style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
                >
                  {stat.value === "24/7" ? (
                    "24/7"
                  ) : (
                    <AnimatedCounter target={stat.value} />
                  )}
                </div>
                <div
                  className="font-bold uppercase tracking-[0.08em] text-[#2b2e33]"
                  style={{ fontSize: "clamp(9px, 0.9vw, 12px)" }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
