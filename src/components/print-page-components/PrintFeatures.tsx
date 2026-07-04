"use client";
import { featuresData } from "@/data/print-page-data";
import React, { useEffect, useRef, useState } from "react";

const PrintFeatures: React.FC = () => {
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
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-14 sm:py-16 md:py-20">
      <div
        className="text-center mb-10 sm:mb-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
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
            Why Choose Us
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
          Why choose our{" "}
          <span className="text-[#FF5000]">printing service</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {featuresData.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(28px)",
                transition: `opacity 0.55s ${0.1 + i * 0.09}s ease-out, transform 0.55s ${0.1 + i * 0.09}s ease-out, box-shadow 0.3s, translate 0.3s`,
              }}
            >
              <div className="h-1 bg-gray-100 group-hover:bg-[#FF5000] transition-colors duration-300" />
              <div className="p-5 sm:p-6">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 group-hover:bg-[#FF5000] group-hover:border-[#FF5000] transition-all duration-300">
                  <Icon
                    size={20}
                    className="text-[#FF5000] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3
                  className="font-bold text-[#101113] mb-2 group-hover:text-[#FF5000] transition-colors duration-200"
                  style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[#2b2e33] leading-relaxed"
                  style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
                >
                  {f.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PrintFeatures;
